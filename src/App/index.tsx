import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HeaderDefault from '~/components/Header';
import CtxProviders from '~/contexts';
import {useAuth} from '~/contexts/AuthContext';
import NavigationProvider, {useNav} from '~/contexts/NavigationContext';
import Screens, {optionsList} from '~/screens';
import {pathWithoutUserList, pathWithUserList} from '~/utils/navPaths';
import type {IteratePathsType, StackType} from './types';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const App = () => {
  const ONE_SIGNAL_APP_ID = 'dfe68e63-8a9c-46ac-a342-cea86b433e03';
  OneSignal.initialize(ONE_SIGNAL_APP_ID);
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.Notifications.requestPermission(true);
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  return (
    <CtxProviders>
      <NavigationRouter />
    </CtxProviders>
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
