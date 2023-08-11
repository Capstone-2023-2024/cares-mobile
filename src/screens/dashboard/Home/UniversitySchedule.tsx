import React, {useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SvgContainer from '~/components/SvgContainer';
import {useNav} from '~/contexts/NavigationContext';
import {pin} from '~/utils/svgIcons';
import {HeadingTemplate, TabContainer} from './Usertab';
import {firestoreApp} from '~/utils/firebase';
// import piin from '~/assets/icons/Pin.svg';

interface ContainerType {
  title: string;
  date: number;
}

const UniversitySchedule = () => {
  const [state, setState] = useState<ContainerType[]>([]);
  const stateLengthEmpty = state.length === 0;

  useEffect(
    () =>
      firestoreApp.collection('schedule').onSnapshot(snapshot => {
        let holder: ContainerType[] = [];
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(doc => {
            holder.push(doc.data() as ContainerType);
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
        title="university schedule"
        navigation="Dashboard University Schedule"
      />
      <ScrollView
        horizontal={!stateLengthEmpty}
        showsHorizontalScrollIndicator={!stateLengthEmpty}>
        {stateLengthEmpty ? (
          <PlaceHolder text="Currently no Schedule" />
        ) : (
          state.map(({title, date}, i) => {
            return <Container title={title} date={date} key={i} />;
          })
        )}
      </ScrollView>
    </TabContainer>
  );
};

const Container = (props: ContainerType) => {
  const {navigateTo} = useNav();
  const {title, date} = props;
  console.log(date);
  return (
    <TouchableOpacity
      className="m-2 min-h-max w-64 items-start justify-center rounded-full bg-primary px-2 py-4"
      onPress={() => navigateTo('Dashboard University Schedule')}>
      <View className="flex-row items-center">
        <SvgContainer uri={pin} size="sm" />
        <Text className="ml-2 w-1/2 text-xs text-white">{title}</Text>
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
