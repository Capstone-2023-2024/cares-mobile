import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';
import {announcementPreview1, cics} from '~/utils/imagePaths';
import {HeadingTemplate, TabContainer} from './Usertab';

interface ContainerType {
  department: 'CITE';
  message: string;
  src: string;
}

const Announcements = () => {
  const message =
    'Heads up, future engineers!As per Office Memorandum from the Office of the Director for Administrative and Management Services Division...';
  return (
    <TabContainer>
      <HeadingTemplate
        navigation="Dashboard Announcements"
        title="announcements"
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <Container department="CITE" message={message} src="" />
        <Container department="CITE" message={message} src="" />
        <Container department="CITE" message={message} src="" />
      </ScrollView>
    </TabContainer>
  );
};

const Container = (props: ContainerType) => {
  const {navigateTo} = useNav();
  const {department, message, src} = props;
  return (
    <View className="mr-2 items-center justify-center overflow-hidden rounded-3xl bg-white p-4 px-6 shadow-xl">
      <View className="flex-row">
        <View className="items-start">
          <View className="flex-row items-center justify-center">
            <Image source={cics} className="h-6 w-6 " resizeMode="center" />
            <View className="ml-6">
              <Text className="text-center text-base font-bold text-black">
                {department}
              </Text>
              <Text className="text-center text-base font-bold text-black">
                DEPARTMENT
              </Text>
            </View>
          </View>
          <Text className="w-48 text-xs">{message}</Text>
          <TouchableOpacity
            className="self-center"
            onPress={() => navigateTo('Dashboard Announcements')}>
            <Text className="rounded-full border border-black p-1 text-xs">
              Read More
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-28 w-24 overflow-hidden rounded-full bg-primary/40">
          <Image
            className="h-full w-full "
            source={announcementPreview1}
            src={src}
            resizeMode="center"
          />
        </View>
      </View>
    </View>
  );
};

export default Announcements;
