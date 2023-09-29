import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import SvgContainer from '~/components/SvgContainer';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';
import {pin} from '~/utils/svgIcons';
import type {AnnouncementType} from 'cics-mobile-client/../../shared/types';
import {HeadingTemplate, TabContainer} from './Usertab';
import {Text} from '~/components';

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

const Container = (props: AnnouncementType) => {
  const {navigateTo} = useNav();
  const {dateCreated} = props;
  // console.log(dateCreated);
  return (
    <TouchableOpacity
      className="ml-2 mr-5 mt-5 min-h-max w-64 items-start justify-center rounded-full border-2 bg-tertiary px-2 py-4"
      onPress={() => navigateTo('UniversitySchedule')}>
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
