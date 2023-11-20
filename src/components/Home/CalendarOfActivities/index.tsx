import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {HeadingTemplate, TabContainer} from '~/components/Home/Usertab';
import Text from '~/components/Text';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';
import {AnnouncementProps} from '~/types/announcement';
import {retrieveImageFBStorage} from '~/utils/image';
import {PathListType} from '~/utils/navPaths/types';

const CalendarOfActivities = () => {
  const {data} = useAnnouncement();
  const {currentStudent} = useUser();

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={data.length === 0 || currentStudent.email === 'null'}
        title="calendar of activities"
        navigation="CalendarOfActivities"
      />
      <ScrollView
        horizontal={data.length !== 0}
        showsHorizontalScrollIndicator={data.length === 0}>
        {data.length === 0 ? (
          <PlaceHolder text="Currently no Schedule" />
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
  const navigate = useNavigation();
  const {currentStudent} = useUser();

  function handleNavigation(path: PathListType) {
    navigate.dispatch(CommonActions.navigate({name: path}));
  }

  function handleUniSched() {
    handleNavigation('CalendarOfActivities');
  }

  return (
    <TouchableOpacity
      disabled={currentStudent.email === 'null'}
      className="h-41 ml-2 mr-2 mt-1 w-64 items-start justify-center rounded-3xl border-4 bg-primary shadow-md"
      onPress={handleUniSched}>
      <View className="flex-row items-center">
        {/* <SvgContainer uri={pin} size="sm" /> */}
        {currentStudent.email === 'null' ? (
          <View className="h-40 w-28 bg-primary" />
        ) : (
          <Image
            className="h-40 w-full rounded-2xl"
            source={require('~/assets/error.svg')}
            src={retrieveImageFBStorage(props.photoUrl ?? [])}
          />
        )}
        {/* <Text className="ml-2 w-1/2 text-xs text-white">
          {props.message.substring(0, 15)}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

const PlaceHolder = ({text}: {text: string}) => {
  return (
    <View className="my-2 min-h-max w-full items-center px-[0.6rem] py-5">
      <Text className="text-xl">{text}</Text>
    </View>
  );
};

export default CalendarOfActivities;
