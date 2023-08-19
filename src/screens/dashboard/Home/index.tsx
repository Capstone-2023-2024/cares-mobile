import React, {useCallback, useEffect} from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import FooterNav from '~/components/FooterNav';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';
import Usertab from './Usertab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '~/contexts/AuthContext';
import type {DataSortedType} from 'cics-mobile-client/../../shared/types';
import {firestoreApp} from '~/utils/firebase';
import {useContent} from '~/contexts/ContentContext';

const bsu = require('~/assets/BSUBACKGROUND.png');

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
    handleStudentInfo(props as DataSortedType);
  }, []);

  useEffect(() => {
    const unsub = setup();
    return () => {
      unsub;
    };
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={bsu} // Replace with your background image path
        style={styles.backgroundImage}
        imageStyle={{opacity: 0.7}} // Set the opacity of the background image
      >
        <ScrollView>
          <Usertab />
          <UniversitySchedule />
          <Announcements />
          <Notifications />
        </ScrollView>
      </ImageBackground>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Home;
