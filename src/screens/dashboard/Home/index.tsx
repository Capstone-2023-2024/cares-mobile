import React from 'react';
import {ScrollView, View} from 'react-native';
import FooterNav from '~/components/FooterNav';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';
import Usertab from './Usertab';
import {Text} from 'react-native';

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

export const PlaceHolder = ({text}: {text: string}) => {
  return (
    <View className="my-2 min-h-max w-full items-center px-[0.6rem] py-5">
      <Text className="text-xl">{text}</Text>
    </View>
  );
};

export default Home;
