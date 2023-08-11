import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';
import {announcementPreview1, cics} from '~/utils/imagePaths';
import {HeadingTemplate, TabContainer} from './Usertab';
import {firestoreApp} from '~/utils/firebase';
import {PlaceHolder} from '.';

import {type AnnouncementType} from '../../../../../shared/types';

const Announcements = () => {
  const [state, setState] = useState<AnnouncementType[]>([]);
  const stateLengthEmpty = state.length === 0;

  useEffect(
    () =>
      firestoreApp.collection('announcements').onSnapshot(snapshot => {
        let holder: AnnouncementType[] = [];
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(doc => {
            holder.push(doc.data() as AnnouncementType);
          });
        }
        setState(holder);
      }),
    [],
  );

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
          state.map((props, i) => {
            return <Container {...props} key={i} />;
          })
        )}
      </ScrollView>
    </TabContainer>
  );
};

const Container = (props: AnnouncementType) => {
  const {navigateTo} = useNav();
  const {department, message, bannerSrc} = props;
  // console.log(dateCreated);
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
            src={bannerSrc}
            resizeMode="center"
          />
        </View>
      </View>
    </View>
  );
};

export default Announcements;
