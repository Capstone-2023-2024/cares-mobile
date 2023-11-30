import {MarkedDatesProps} from '@cares/types/announcement';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import type {
  DateData,
  MarkedDates,
  MarkingTypes,
} from 'react-native-calendars/src/types';
import Text from '~/components/Text';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useNav} from '~/contexts/NavigationContext';

interface CalendarStateProps {
  markedDates: MarkedDates;
  markingType: MarkingTypes;
  calendar: {
    month: number;
    year: number;
  };
}

const CalendarOfActivities = () => {
  const date = new Date();
  const {data} = useAnnouncement();
  const {handleNavigation} = useNav();
  const route = useRoute();
  const [state, setState] = useState<CalendarStateProps>({
    markedDates: {},
    markingType: 'multi-period',
    calendar: {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    },
  });

  function handleMonthChange(props: DateData) {
    setState(prevState => ({
      ...prevState,
      calendar: {
        month: props.month,
        year: props.year,
      },
    }));
  }

  function handleDayPress(event: DateData) {
    console.log({event});

    // filtered?.id !== undefined &&
    //   handleNavigation('Announcements', filtered?.id);
  }

  interface ExtendedReactCalendarProps
    extends Omit<MarkedDatesProps, 'calendar'> {
    marked?: boolean;
    startingDay?: boolean;
    endingDay?: boolean;
  }

  useEffect(() => {
    return data.forEach(({markedDates}) => {
      const dateKeys = Object.keys(markedDates).sort((a, b) =>
        a.localeCompare(b),
      );
      const objLength = dateKeys.length;
      let markedDatesHolder: Record<string, ExtendedReactCalendarProps> = {};
      dateKeys.forEach((key, i) => {
        const objRest = markedDates[key];
        if (objLength === 1) {
          console.log(key, 'one length');
          return (markedDatesHolder[key] = {marked: true, ...objRest});
        }
        switch (i) {
          case 0:
            console.log(key, 'starting');
            return (markedDatesHolder[key] = {startingDay: true, ...objRest});
          case objLength - 1:
            console.log(key, 'ending');
            return (markedDatesHolder[key] = {endingDay: true, ...objRest});
          default:
            console.log(key, 'default');
            return (markedDatesHolder[key] = {...objRest});
        }
      });
      setState(prevState => ({
        ...prevState,
        markedDates: {...prevState.markedDates, ...markedDatesHolder},
      }));
    });
  }, [data]);

  return (
    <View className="flex-1 bg-stone-300">
      <View className="mx-10 mb-3 mt-6 flex items-center justify-center">
        <Image
          source={require('~/assets/calender_of_activities.png')}
          className=" h-6 w-11/12  "
          resizeMode="stretch"
        />
      </View>

      {state && (
        <View className="mx-4 my-3 rounded-2xl bg-gray-200 ">
          <Calendar
            className="w-25 mx-5 my-5 rounded-xl border-2"
            onMonthChange={handleMonthChange}
            onDayPress={handleDayPress}
            markingType={'period'}
            markedDates={{...state.markedDates}}
          />
        </View>
      )}
      {/* <View className="mx-4 ml-6 h-64 border bg-customADC2D2 ">
        <View className="border-b ">
          <Text className="mb-4 ml-4 mt-4 font-bold"> Month</Text>
        </View>
        <FlatList
          className="mt-2 p-2"
          data={data}
          showsVerticalScrollIndicator={true}
          keyExtractor={({id}) => id}
          renderItem={({item}) => {
            const dates = item.markedDates.map(date => date.split('-')[2]);
            const expiration = new Date();
            expiration.setTime(item.endDate);
            const date = expiration.toLocaleString().split(',')[0];
            const dateMonth = date?.substring(0, date?.lastIndexOf('/'));
            return item.type === 'event' &&
              expiration.getTime() > new Date().getTime() ? (
              <TouchableOpacity
                className="h-auto"
                onPress={() => handleNavigation('Announcements', item.id)}>
                <View className="relative mb-3 w-full flex-row">
                  <View className="h-20 w-24 content-center items-center justify-center border-2">
                    <Text className="px-4 py-4 text-2xl font-black text-black">
                      {dates.toString()}
                    </Text>
                  </View>
                  <Text className="ml-3 py-5 text-lg font-black text-black">{`[End date: ${dateMonth}]`}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="h-auto"
                onPress={() => handleNavigation('Announcements', item.id)}>
                <View className=" mb-3 w-full flex-row">
                  <View className="mb-3 h-20 w-24 content-center items-center justify-center border-2">
                    <Text className="px-4 py-4 text-xl font-black text-black">
                      {dates.toString()}
                    </Text>
                  </View>
                  <Text className="ml-3 py-5 text-lg font-black text-black">
                    [{dates.toString()}]
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}
    </View>
  );
};

export default CalendarOfActivities;
