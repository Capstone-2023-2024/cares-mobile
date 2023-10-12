import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import type {AnnouncementProps} from 'mobile/../../shared/types/announcement';
import {Text} from '~/components';
import SvgContainer from '~/components/SVGContainer';
import {useContent} from '~/contexts/ContentContext';
import {pin} from '~/utils/svgIcons';
import {HeadingTemplate, TabContainer} from './Usertab';
import type {PathListType} from '~/utils/navPaths/types';

const UniversitySchedule = () => {
  const {announcement} = useContent();
  const stateLengthEmpty = announcement.length === 0;

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={stateLengthEmpty}
        title="university schedule"
        navigation="UniversitySchedule"
      />
      <ScrollView
        horizontal={!stateLengthEmpty}
        showsHorizontalScrollIndicator={!stateLengthEmpty}>
        {stateLengthEmpty ? (
          <PlaceHolder text="Currently no Schedule" />
        ) : (
          announcement.map((props, i) => {
            return <Container {...props} key={i} />;
          })
        )}
      </ScrollView>
    </TabContainer>
  );
};

const Container = (props: AnnouncementProps) => {
  const navigate = useNavigation();

  function handleNavigation(path: PathListType) {
    navigate.dispatch(CommonActions.navigate({name: path}));
  }

  function handleUniSched() {
    handleNavigation('UniversitySchedule');
  }

  return (
    <TouchableOpacity
      className="ml-2 mr-5 mt-5 min-h-max w-64 items-start justify-center rounded-full border-2 bg-tertiary px-2 py-4"
      onPress={handleUniSched}>
      <View className="flex-row items-center">
        <SvgContainer uri={pin} size="sm" />
        <Text className="ml-2 w-1/2 text-xs text-white">
          {props.message.substring(0, 15)}
        </Text>
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

export default UniversitySchedule;
