import {AdviserInfoProps, StudentInfoProps} from '@cares/types/user';
import {ONE_SIGNAL_APP_ID} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import HeaderDefault from '~/components/Header';
import {GeneralProviders} from '~/contexts';
import {useAuth} from '~/contexts/AuthContext';
import NavigationProvider, {useNav} from '~/contexts/NavigationContext';
import {useUniversal} from '~/contexts/UniversalContext';
import Screens, {optionsList} from '~/screens';
import {collectionRef} from '~/utils/firebase';
import {pathWithUserList, pathWithoutUserList} from '~/utils/navPaths';
import type {IteratePathsType, StackType} from './types';

const App = () => {
  useEffect(() => {
    function oneSignalEvent() {
      OneSignal.initialize(ONE_SIGNAL_APP_ID);
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      void OneSignal.Notifications.requestPermission(true);
      return OneSignal.Notifications.addEventListener('click', () => {
        // const actionId = event.result.actionId ?? 'actionId';
        // const url = event.result.url ?? 'url';
        // const notification = event.notification;
        // console.log({notification});
        // Alert.alert('OneSignal: notification clicked:', `${actionId} ${url}`);
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
  const {setAdviserInfo, setCurrentStudentInfo} = useUniversal();
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

  /**  setCurrentStudentInfo, and setAdviserInfo */
  const fetchUserInfo = useCallback(async () => {
    if (typeof currentUser?.email === 'string') {
      const studentSnapshot = await collectionRef('student')
        .where('email', '==', currentUser.email)
        .get();

      if (!studentSnapshot.empty) {
        const doc = studentSnapshot.docs[0];
        const data = doc?.data() as StudentInfoProps;
        const {yearLevel, section} = data;
        setCurrentStudentInfo(data);
        const adviserSnapshot = await collectionRef('adviser')
          .where('yearLevel', '==', yearLevel)
          .where('section', '==', section)
          .get();

        if (!adviserSnapshot.empty) {
          const snap = adviserSnapshot.docs[0];
          const adviserData = snap?.data() as AdviserInfoProps;
          const id = snap?.id ?? 'null';
          setAdviserInfo({...adviserData, id});
        }
      } else {
        const adviserSnapshot = await collectionRef('adviser')
          .where('email', '==', currentUser.email)
          .get();
        if (!adviserSnapshot.empty) {
          const doc = adviserSnapshot.docs[0];
          const id = doc?.id ?? '';
          const adviserData = doc?.data() as AdviserInfoProps;
          setAdviserInfo({...adviserData, id});
        }
      }
    }
  }, [currentUser?.email, setAdviserInfo, setCurrentStudentInfo]);

  useEffect(() => {
    return void fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {[...(currentUser === null ? withoutUser : withUser)].map((props, i) => {
        return <Stack.Screen key={i} {...props} />;
      })}
    </Stack.Navigator>
  );
};

export default App;
