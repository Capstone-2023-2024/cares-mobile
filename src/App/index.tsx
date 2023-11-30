import {ONE_SIGNAL_APP_ID} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import HeaderDefault from '~/components/Header';
import {GeneralProviders} from '~/contexts';
import {useAuth} from '~/contexts/AuthContext';
import NavigationProvider, {useNav} from '~/contexts/NavigationContext';
import Screens, {optionsList} from '~/screens';
import {pathWithUserList, pathWithoutUserList} from '~/utils/navPaths';
import type {IteratePathsType, StackType} from './types';

const App = () => {
  useEffect(() => {
    function oneSignalEvent() {
      OneSignal.initialize(ONE_SIGNAL_APP_ID);
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      void OneSignal.Notifications.requestPermission(true);
      return OneSignal.Notifications.addEventListener('click', event => {
        const actionId = event.result.actionId ?? 'actionId';
        const url = event.result.url ?? 'url';
        const notification = event.notification;
        console.log({notification});
        Alert.alert('OneSignal: notification clicked:', `${actionId} ${url}`);
      });
    }
    return oneSignalEvent();
  }, []);

  return (
    <GeneralProviders>
      <NavigationRouter />
    </GeneralProviders>
  );
};

const NavigationRouter = () => {
  return (
    <NavigationContainer>
      <NavigationProvider>
        <StackComponent />
      </NavigationProvider>
    </NavigationContainer>
  );
};

const Header = () => {
  return <HeaderDefault />;
};

const StackComponent = () => {
  const Stack = createStackNavigator();
  const {currentUser} = useAuth();
  const {initialRouteName} = useNav();
  const withUser = iteratePaths({
    pathList: pathWithUserList,
  });
  const withoutUser = iteratePaths({
    pathList: pathWithoutUserList,
  });

  function iteratePaths(props: IteratePathsType) {
    const {pathList} = props;
    const pathListHolder: StackType<(typeof pathList)[number]>[] = [];
    pathList.forEach(path => {
      const name = path;
      const Element = Screens.filter(cmp => name === cmp.name)[0];
      const options = optionsList.filter(cmp => name === cmp.name)[0]
        ?.options ?? {
        header: Header,
      };
      if (Element !== undefined) {
        const Component = () => Element();
        pathListHolder.push({name, component: Component, options});
      }
    });
    return pathListHolder;
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {[...(currentUser === null ? withoutUser : withUser)].map((props, i) => {
        return <Stack.Screen key={i} {...props} />;
      })}
    </Stack.Navigator>
  );
};

export default App;
