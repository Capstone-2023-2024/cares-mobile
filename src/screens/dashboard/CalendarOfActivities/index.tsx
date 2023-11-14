import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';
// import type {UniversityScheduleType} from 'mobile/../../~/types';
import type {MarkedDates} from 'react-native-calendars/src/types';
import {Text} from '~/components';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useNav} from '~/contexts/NavigationContext';
import {retrieveImageFBStorage} from '~/utils/image';

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
    <View className="flex-1">
      <Text className="mb-6 p-4 text-center text-4xl text-black">
        Calendar of Activities
      </Text>
      {markedDates && (
        <Calendar
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
      )}
      <FlatList
        className="p-2"
        horizontal
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => {
          const {photoUrl, id, markedDates, endDate, type} = item;
          const dates = markedDates.map(date => date.split('-')[2]);
          const expiration = new Date();
          expiration.setTime(endDate);
          const date = expiration.toLocaleString().split(',')[0];
          const dateMonth = date?.substring(0, date?.lastIndexOf('/'));
          return type === 'event' &&
            expiration.getTime() > new Date().getTime() ? (
            <TouchableOpacity
              className="h-auto w-96"
              onPress={() => handleNavigation('Announcements', id)}>
              <View className="relative w-full flex-1">
                <Image
                  source={require('~/assets/error.svg')}
                  src={retrieveImageFBStorage(photoUrl ?? [])}
                  className="h-16 w-full bg-secondary"
                />
                <View>
                  <Text className="font-black text-black">
                    {dates.toString()}
                  </Text>
                  <Text className="font-black text-black">
                    {`End date: ${dateMonth}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="h-auto w-96"
              onPress={() => handleNavigation('Announcements', id)}>
              <View className="relative w-full flex-1">
                <Image
                  source={require('~/assets/error.svg')}
                  src={retrieveImageFBStorage(photoUrl ?? [])}
                  className="h-16 w-full bg-secondary"
                />
                <View>
                  <Text className="font-black text-black">
                    {dates.toString()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CalendarOfActivities;
