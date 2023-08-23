import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useContent} from '~/contexts/ContentContext';
import {announcementPreview2} from '~/utils/imagePaths';
import type {UniversityScheduleType} from 'cics-mobile-client/../../shared/types';
import {Text} from '~/components';

const UniversitySchedule = () => {
  const {schedules} = useContent();

  return (
    <View>
      <Calendar />
      <ScrollView>
        <Text className="text-center text-4xl text-black">Announcements</Text>
        {schedules.map((props, i) => {
          return <Container key={i} {...props} />;
        })}
      </ScrollView>
    </View>
  );
};

const Container = (props: UniversityScheduleType) => {
  const {title, dateCreated, photoUrl} = props;
  const newDate = new Date();
  newDate.setTime(dateCreated);

  return (
    <View className="h-screen shadow-sm">
      <Image
        className="h-64 w-full"
        source={announcementPreview2}
        src={photoUrl}
      />
      <View className="mx-auto w-11/12">
        <Text className="mb-2 text-xl font-black capitalize text-primary">
          {title}
        </Text>
        <Text className="text-black">{newDate.toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

export default UniversitySchedule;
