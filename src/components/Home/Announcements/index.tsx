import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useNav} from '~/contexts/NavigationContext';
import type {AnnouncementProps} from '~/types/announcement';
import {retrieveImageFBStorage} from '~/utils/image';
import {HeadingTemplate, TabContainer} from '../../../components/Home/Usertab';
import {useUser} from '~/contexts/UserContext';

const Announcements = () => {
  const {data} = useAnnouncement();
  const {currentStudent} = useUser();
  const stateLengthEmpty = data.length === 0;

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={stateLengthEmpty || currentStudent.email === 'null'}
        navigation="Announcements"
        title="announcements"
      />
      <ScrollView
        horizontal={!stateLengthEmpty}
        showsHorizontalScrollIndicator={!stateLengthEmpty}>
        {stateLengthEmpty ? (
          <PlaceHolder text="Currently no Announcements" />
        ) : (
          data.map((props, i) => {
            return <Container {...props} key={i} />;
          })
        )}
      </ScrollView>
    </TabContainer>
  );
};

const Container = (props: AnnouncementProps) => {
  const {handleNavigation} = useNav();
  const {currentStudent} = useUser();
  const {id, department, message, photoUrl, postedBy, type} = props;

  function handlePressReadMore(announcementId: string) {
    handleNavigation('Announcements', announcementId);
  }
  return (
    <View className="ml-2 mr-2 items-center justify-center overflow-hidden rounded-3xl bg-paper p-4 px-6 shadow-md">
      <View className="flex-row">
        <View className="items-start">
          <View className="flex-row items-center justify-center">
            {currentStudent.email === 'null' ? (
              <View className="h-8 w-8 bg-primary" />
            ) : (
              <Image
                source={require('~/assets/cics_icon.png')}
                className="h-8 w-8 "
                resizeMode="center"
              />
            )}
            <View className="ml-6">
              <Text className="text-center text-base font-bold uppercase text-black">
                {currentStudent.email === 'null' ? '.....' : department}
              </Text>
              <Text className="text-center text-base font-bold text-black">
                {currentStudent.email === 'null' ? '......' : 'DEPARTMENT'}
              </Text>
            </View>
            <View className="rounded-lg bg-primary px-2 py-1 ">
              {currentStudent.email === 'null' ? (
                <View className="h-12 w-12 bg-secondary" />
              ) : (
                <Text className="text-xs capitalize text-paper">
                  {type === 'university_memorandum' ? 'memo' : type}
                </Text>
              )}
            </View>
          </View>
          <Text className="w-48 text-xs">
            {currentStudent.email === 'null'
              ? '........'
              : message.substring(0, 23)}
          </Text>
          <TouchableOpacity
            className="self-center"
            onPress={() => handlePressReadMore(id)}>
            <Text className="justify-center rounded-full border-2 border-black p-1 text-xs">
              {currentStudent.email === 'null' ? '.....' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>
        {photoUrl !== undefined ? (
          <View className="h-28 w-24 overflow-hidden rounded-full bg-primary/40">
            {currentStudent.email === 'null' ? (
              <View className="h-12 w-12 bg-primary" />
            ) : (
              <Image
                className="h-full w-full "
                source={require('~/assets/error.svg')}
                src={retrieveImageFBStorage(photoUrl)}
                resizeMode="cover"
              />
            )}
          </View>
        ) : (
          <View />
        )}
      </View>
      <Text className="text-xs">
        {currentStudent.email === 'null' ? '...' : `Posted by: ${postedBy}`}
      </Text>
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
