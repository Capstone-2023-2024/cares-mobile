import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
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
      <Text className="mx-6 my-8 py-4 text-center text-4xl ">
        Calendar of Activities
      </Text>
      {markedDates && (
        <View className="mx-4 mb-3 rounded-2xl bg-slate-300 ">
          <Calendar
            className="w-25 mx-5 my-5 rounded-xl border-2"
            onDayPress={e => {
              const filtered = data.filter(
                props => props.markedDates.indexOf(e.dateString) > -1,
              )[0];
              {
                filtered?.id !== undefined &&
                  handleNavigation('Announcements', filtered?.id);
              }
            }}
            markingType={
              markedDates !== undefined &&
              markedDates.length !== undefined &&
              Object.keys(markedDates).length <= 1
                ? 'dot'
                : 'period'
            }
            markedDates={{...markedDates}}
          />
        </View>
      )}
      <View className="mx-4 ml-6 h-52 bg-ActivitiesBG ">
        <View className="border-b border-primary">
          <Text className="mb-4 ml-4 mt-4 font-bold"> Month</Text>
        </View>
        <FlatList
          className="mt-4 p-2"
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={({id}) => id}
          renderItem={({item}) => {
            const {id, markedDates, endDate, type} = item;
            const dates = markedDates.map(date => date.split('-')[2]);
            const expiration = new Date();
            expiration.setTime(endDate);
            const date = expiration.toLocaleString().split(',')[0];
            const dateMonth = date?.substring(0, date?.lastIndexOf('/'));
            return type === 'event' &&
              expiration.getTime() > new Date().getTime() ? (
              <TouchableOpacity
                className="h-auto"
                onPress={() => handleNavigation('Announcements', id)}>
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
                onPress={() => handleNavigation('Announcements', id)}>
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
      </View>
    </View>
  );
};

export default CalendarOfActivities;
