import AsyncStorage from '@react-native-async-storage/async-storage';
import type {StudInfoSortedType} from 'cics-mobile-client/../../shared/types';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Background from '~/components/Background';
import FooterNav from '~/components/FooterNav';
import {useAuth} from '~/contexts/AuthContext';
import {collectionRef} from '~/utils/firebase';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';
import Usertab from './Usertab';
import type {UserCacheType} from '~/screens/authentication/Register/types';
import {useRoute} from '@react-navigation/native';
import {RoleType} from '~/screens/authentication/Landing/types';

const Home = () => {
  const {currentUser} = useAuth();
  const [state, setState] = useState<
    Omit<StudInfoSortedType, 'studentNo'> | undefined
  >();
  const email = currentUser?.email || '{}';
  const route = useRoute();
  const param = route.params as {role?: RoleType};

  const setup = useCallback(async () => {
    const usersCache: UserCacheType[] = JSON.parse(
      (await AsyncStorage.getItem('usersCache')) ?? '',
    );
    usersCache.forEach(user => {
      const currentLogin = Object.values(user).filter(
        values => email === values.email,
      )[0];
      setState(currentLogin);
    });
    if (state === undefined) {
      const studInfo = await collectionRef('student')
        .where('email', '==', email)
        .get();
      const doc = studInfo.docs[0] as unknown as {
        id: string;
        data: () => Omit<StudInfoSortedType, 'studentNo'>;
      };
      if (doc !== undefined) {
        usersCache.push({
          [doc.id]: {...doc.data()},
        });
        setState(doc.data());
        await AsyncStorage.setItem('usersCache', JSON.stringify(usersCache));
      }
    }
  }, []);

  useEffect(() => {
    const unsub = setup();
    return () => {
      unsub;
    };
  }, [setup]);

  return (
    <View className="flex-1">
      <Background>
        <ScrollView>
          <Usertab
            role={param.role}
            studentInfo={
              state ?? {
                college: '',
                schoolYear: '',
                name: '',
                course: '',
                gender: '',
                major: '',
                curriculum: '',
                age: '',
                yearLevel: '',
                scholarship: '',
                email: '',
              }
            }
          />
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
