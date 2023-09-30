import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StudInfoSortedType } from 'cics-mobile-client/../../shared/types';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Background from '~/components/Background';
import FooterNav from '~/components/FooterNav';
import { useAuth } from '~/contexts/AuthContext';
import type { UserCacheType } from '~/screens/authentication/Register/types';
import { collectionRef } from '~/utils/firebase';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';
import Usertab from './Usertab';
import type { PushToCacheProps, StudentInfoProps } from './types';

const Home = () => {
  const { currentUser } = useAuth();
  const [state, setState] = useState<
    Omit<StudInfoSortedType, 'studentNo'> | undefined
  >();

  const setupForStudents = useCallback(async () => {
    try {
      async function fetchStudentInfo() {
        // console.log({email: currentUser?.email});
        try {
          const studInfo = await collectionRef('student')
            .where('email', '==', currentUser?.email)
            .get();
          const doc = studInfo.docs[0] as unknown as
            | StudentInfoProps
            | undefined;
          return doc;
        } catch (err) {
          console.log(err);
        }
      }
      async function pushToCache({ usersCache }: PushToCacheProps) {
        const doc = await fetchStudentInfo();
        if (doc !== undefined) {
          setState(doc.data());
          usersCache.push({
            [doc.id]: { ...doc.data() },
          });
          return await AsyncStorage.setItem(
            'usersCache',
            JSON.stringify(usersCache),
          );
        }
        return console.log('Document in firestore is Empty');
      }
      const getUserCache = await AsyncStorage.getItem('usersCache');
      // console.log({getUserCache});
      if (getUserCache !== null) {
        const usersCache: UserCacheType[] = JSON.parse(getUserCache);
        usersCache.forEach(user => {
          const currentLogin = Object.values(user).filter(
            values => currentUser?.email === values.email,
          )[0];
          setState(currentLogin);
        });
        if (state === undefined) {
          return void pushToCache({ usersCache });
        }
      }
      void pushToCache({ usersCache: [] });
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
      {/* <Background> */}
      <ScrollView>
        <Usertab name={state?.name ?? ''} />
        <UniversitySchedule />
        <Announcements />
        <Notifications />
      </ScrollView>
      {/* </Background> */}
      <View>
        <FooterNav />
      </View>
    </View>
  );
};

export default Home;
