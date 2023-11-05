import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
// import type {UniversityScheduleType} from 'mobile/../../~/types';
import type {MarkedDates} from 'react-native-calendars/src/types';
import {Text} from '~/components';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useNav} from '~/contexts/NavigationContext';

const CalendarOfActivities = () => {
  const {data} = useAnnouncement();
  const {handleNavigation} = useNav();
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const unsub = data.forEach(props => {
      const length = props.markedDates.length;
      const endingDay = length - 1;
      props.markedDates.forEach((value, i) =>
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
  }, [data]);

  return (
    <View>
      <Text className="text-center text-lg font-bold">
        Calendar of Activities
      </Text>
      {markedDates && (
        <Calendar
          onDayPress={e => {
            const filtered = data.filter(
              props => props.markedDates.indexOf(e.dateString) > -1,
            )[0];
            handleNavigation('Announcements', filtered?.id);
            ToastAndroid.show(`${filtered?.message}`, ToastAndroid.SHORT);
          }}
          markingType="period"
          markedDates={{...markedDates}}
        />
      )}
    </View>
  );
};

export default CalendarOfActivities;
