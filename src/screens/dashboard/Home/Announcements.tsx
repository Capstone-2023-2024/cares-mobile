import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';
import {announcementPreview1, cics} from '~/utils/imagePaths';
import type {AnnouncementType} from 'cics-mobile-client/../../shared/types';
import {HeadingTemplate, TabContainer} from './Usertab';
import {Text} from '~/components';

const Announcements = () => {
  const {announcements} = useContent();
  const stateLengthEmpty = announcements.length === 0;

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={stateLengthEmpty}
        navigation="Dashboard Announcements"
        title="announcements"
      />
      <ScrollView
        horizontal={!stateLengthEmpty}
        showsHorizontalScrollIndicator={!stateLengthEmpty}>
        {stateLengthEmpty ? (
          <PlaceHolder text="Currently no Announcements" />
        ) : (
          announcements.map((props, i) => {
            return <Container {...props} key={i} />;
          })
        )}
      </ScrollView>
    </TabContainer>
  );
};

const Container = (props: AnnouncementType) => {
  const {navigateTo} = useNav();
  const {department, message, photoUrl, docId} = props;
  // console.log(dateCreated);
  return (
    <View className="ml-2 mr-2 items-center justify-center overflow-hidden rounded-3xl border-2 bg-white p-4 px-6 shadow-xl">
      <View className="flex-row">
        <View className="items-start">
          <View className="flex-row items-center justify-center">
            <Image source={cics} className="h-6 w-6 " resizeMode="center" />
            <View className="ml-6">
              <Text className="text-center text-base font-bold uppercase text-black">
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
            onPress={() => navigateTo('Announcements', docId)}>
            <Text className="justify-center rounded-full border-2 border-black p-1 text-xs">
              Read More
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-28 w-24 overflow-hidden rounded-full bg-primary/40">
          <Image
            className="h-full w-full "
            source={announcementPreview1}
            src={photoUrl}
            resizeMode="center"
          />
        </View>
      </View>
    </View>
  );
};

const PlaceHolder = ({text}: {text: string}) => {
  return (
    <View className="my-2 min-h-max w-full items-center px-[0.6rem] py-5">
      <Text className="text-xl">{text}</Text>
    </View>
  );
};

export default Announcements;
