import React from 'react';
import {ScrollView, View} from 'react-native';
import FooterNav from '~/components/FooterNav';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';
import Usertab from './Usertab';

const Home = () => {
  return (
    <View className="flex-1">
      <ScrollView>
        <Usertab />
        <UniversitySchedule />
        <Announcements />
        <Notifications />
      </ScrollView>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};

export default Home;
