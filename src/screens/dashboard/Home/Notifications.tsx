import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SvgContainer from '~/components/SvgContainer';
import {idea} from '~/utils/svgIcons';
import {HeadingTemplate} from './Usertab';

const Notifications = () => {
  return (
    <View className="m-4 rounded-3xl bg-primary/20 p-4 shadow-sm">
      <HeadingTemplate navigation="Dashboard Home" title="Notifications" />
      <NotifContainer />
      <NotifContainer />
      <NotifContainer />
    </View>
  );
};

const NotifContainer = () => {
  return (
    <TouchableOpacity className="mx-auto mb-1 w-11/12 rounded-full bg-white">
      <View className="flex-row p-2 text-left">
        <SvgContainer uri={idea} size="sm" />
        <View className="ml-2 ">
          <Text className="text-left text-xs font-bold text-black">
            Final Examination
          </Text>
          <Text>(Non-graduating Students) in 7 days</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notifications;
