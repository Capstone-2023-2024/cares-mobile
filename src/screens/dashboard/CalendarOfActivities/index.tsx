import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import type {MarkedDates} from 'react-native-calendars/src/types';
import Text from '~/components/Text';
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
    <View className="flex-1 bg-stone-300">
      <View className="mx-10 mb-3 mt-6 flex items-center justify-center">
        <Image
          source={require('~/assets/calender_of_activities.png')}
          className=" h-6 w-11/12  "
          resizeMode="stretch"
        />
      </View>

      {markedDates && (
        <View className="mx-4 my-3 rounded-2xl bg-gray-200 ">
          <Calendar
            className="w-25 mx-5 my-5 rounded-xl border-2"
            onDayPress={e => {
              const filtered = data.filter(
                props => props.markedDates.indexOf(e.dateString) > -1,
              )[0];

              filtered?.id !== undefined &&
                handleNavigation('Announcements', filtered?.id);
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
      <View className="mx-4 ml-6 h-64 border bg-customADC2D2 ">
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
      </View>
    </View>
  );
};

export default CalendarOfActivities;
