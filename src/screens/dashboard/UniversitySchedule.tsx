import React, {useEffect, useState} from 'react';
import {ScrollView, View, ToastAndroid} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useContent} from '~/contexts/ContentContext';
// import type {UniversityScheduleType} from 'mobile/../../~/types';
import type {MarkedDates} from 'react-native-calendars/src/types';
import Announcements from './Announcements';

const UniversitySchedule = () => {
  const {announcement} = useContent();
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const unsub = announcement.forEach(({markedDates}) => {
      const length = markedDates.length;
      const endingDay = length - 1;
      markedDates.forEach((value, i) =>
        setMarkedDates(prevState => ({
          ...prevState,
          [value]: {
            startingDay: i < 1,
            endingDay: endingDay === i,
            color: 'lightgreen',
            textColor: 'white',
          },
        })),
      );
    });
    return () => unsub;
  }, [announcement]);

  return (
    <View>
      {markedDates && (
        <Calendar
          onDayPress={e => ToastAndroid.show(`${e}`, ToastAndroid.LONG)}
          markingType="period"
          markedDates={{...markedDates}}
        />
      )}
      <ScrollView>
        <Announcements />
      </ScrollView>
    </View>
  );
};

export default UniversitySchedule;
