import AsyncStorage from '@react-native-async-storage/async-storage';
import type {StudentCORProps} from '~/types/student';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Background from '~/components/Background';
import FooterNav from '~/components/FooterNav';
import {useAuth} from '~/contexts/AuthContext';
import type {UserCacheType} from '~/screens/authentication/Register/types';
import {collectionRef} from '~/utils/firebase';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './CalendarOfActivities';
import Usertab from './Usertab';
import type {PushToCacheProps, StudentInfoProps} from './types';
import {Text} from '~/components';
import {useNav} from '~/contexts/NavigationContext';

const Home = () => {
  const {currentUser} = useAuth();
  const {handleNavigation} = useNav();
  const [state, setState] = useState<
    Omit<StudentCORProps, 'studentNo'> | undefined
  >();
  const [section, setSection] = useState<boolean | undefined>(undefined);

  function setUpSection() {
    handleNavigation('UserInfo');
  }

  const getSection = useCallback(async () => {
    if (currentUser !== null) {
      const snap = await collectionRef('student')
        .where('email', '==', currentUser.email)
        .get();
      const isSectionExist = snap.docs[0]?.data().section;
      return setSection(isSectionExist !== undefined);
    }
  }, [currentUser]);

  void getSection();

  const setupForStudents = useCallback(async () => {
    try {
      async function fetchStudentInfo() {
        if (currentUser !== null) {
          const studInfo = await collectionRef('student')
            .where('email', '==', currentUser.email)
            .get();
          const doc = studInfo.docs[0] as unknown as
            | StudentInfoProps
            | undefined;
          return doc;
        }
      }
      async function pushToCache({usersCache}: PushToCacheProps) {
        const doc = await fetchStudentInfo();
        if (doc !== undefined) {
          setState(doc.data());
          usersCache.push({
            [doc.id]: {...doc.data()},
          });
          return await AsyncStorage.setItem(
            'usersCache',
            JSON.stringify(usersCache),
          );
        }
        return console.log('Document in firestore is Empty');
      }
      const getUserCache = await AsyncStorage.getItem('usersCache');
      if (getUserCache !== null) {
        const usersCache: UserCacheType[] = JSON.parse(getUserCache);
        let studInfo: typeof state;
        usersCache.forEach(user => {
          const currentLogin = Object.values(user).filter(
            values => currentUser?.email === values.email,
          )[0];
          studInfo = currentLogin;
        });
        setState(studInfo);
        if (studInfo === undefined) {
          return void pushToCache({usersCache});
        }
      }
      void pushToCache({usersCache: []});
    } catch (err) {
      console.log(err);
    }
  }, [currentUser, state]);

  useEffect(() => {
    return () => {
      void setupForStudents();
    };
  }, [setupForStudents]);

  return (
    <View className="flex-1">
      <Background>
        {section === false && (
          <View className="flex-row justify-center bg-yellow-100 p-2">
            <Text className="mr-2 text-xs text-yellow-600">
              Looks like you didn't have your class section set-up.
            </Text>
            <TouchableOpacity onPress={setUpSection}>
              <Text className="text-xs text-yellow-600 underline">
                Tap here
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView>
          <Usertab name={state?.name ?? ''} />
          <UniversitySchedule />
          <Announcements />
          <Notifications />
        </ScrollView>
      </Background>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};

export default Home;
