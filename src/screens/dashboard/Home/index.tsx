import AsyncStorage from '@react-native-async-storage/async-storage';
import type {StudInfoSortedType} from 'cics-mobile-client/../../shared/types';
import React, {useCallback, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import Background from '~/components/Background';
import FooterNav from '~/components/FooterNav';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import {firestoreApp} from '~/utils/firebase';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';
import Usertab from './Usertab';

const Home = () => {
  const {currentUser} = useAuth();
  const {handleStudentInfo} = useContent();
  const email = currentUser?.email || '{}';

  const setup = useCallback(async () => {
    const cacheStudInfo = await AsyncStorage.getItem(email);
    if (cacheStudInfo === null) {
      const studInfo = await firestoreApp
        .collection('students')
        .where('email', '==', email)
        .get();
      await AsyncStorage.setItem(
        email,
        JSON.stringify({
          ...studInfo.docs[0]?.data(),
          studentNo: studInfo.docs[0]?.id,
        }),
      );
    }
    const props = JSON.parse(cacheStudInfo ?? '{}');
    handleStudentInfo(props as StudInfoSortedType);
  }, [email, handleStudentInfo]);

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
          <Usertab />
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
