import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SvgContainer from '~/components/SvgContainer';
import {useNav} from '~/contexts/NavigationContext';
import {pin} from '~/utils/svgIcons';
import {HeadingTemplate, TabContainer} from './Usertab';

interface ContainerType {
  title: string;
}

const UniversitySchedule = () => {
  return (
    <TabContainer>
      <HeadingTemplate
        title="university schedule"
        navigation="Dashboard University Schedule"
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <Container title="Final Examination" />
        <Container title="Final Examination" />
        <Container title="Final Examination" />
      </ScrollView>
    </TabContainer>
  );
};

const Container = (props: ContainerType) => {
  const {navigateTo} = useNav();
  const {title} = props;

  return (
    <TouchableOpacity
      className="m-2 w-64 items-start justify-center rounded-full bg-primary px-2 py-4"
      onPress={() => navigateTo('Dashboard University Schedule')}>
      <View className="flex-row items-center">
        <SvgContainer uri={pin} size="sm" />
        <Text className="ml-2 w-1/2 text-xs text-white">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UniversitySchedule;
