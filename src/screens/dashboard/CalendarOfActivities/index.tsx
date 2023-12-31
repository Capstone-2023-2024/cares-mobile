import {
  MarkedDatesProps,
  ReadAnnouncementProps,
} from '@cares/common/types/announcement';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ListRenderItemInfo, View, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';
import type {
  DateData,
  MarkedDates,
  MarkingTypes,
} from 'react-native-calendars/src/types';
import {FlatList} from 'react-native-gesture-handler';
import CalendarActivityButton from '~/components/CalendarActivityButton';
import Text from '~/components/Text';
import {useUniversal} from '~/contexts/UniversalContext';
import {currentMonth} from '@cares/common/utils/date';

interface CalendarParamProps {
  id: string;
  filteredAnnouncement: ReadAnnouncementProps[];
  restAnnouncements: ReadAnnouncementProps[];
}

interface CalendarStateProps extends Omit<CalendarParamProps, 'id'> {
  currentSelectedID: string;
  markedDates: MarkedDates;
  markingType: MarkingTypes;
}

interface ExtendedReactCalendarProps
  extends Omit<MarkedDatesProps, 'calendar'> {
  marked?: boolean;
  startingDay?: boolean;
  endingDay?: boolean;
}

const CalendarOfActivities = () => {
  const route = useRoute();
  const FLATLIST_COMPONENT_HEIGHT = 120;
  const {setCurrentSelectedActivityId, currentSelectedActivityId} =
    useUniversal();
  const flatListRef = useRef<FlatList | null>(null);
  const {calendar, setCalendar} = useUniversal();
  const [state, setState] = useState<CalendarStateProps>({
    filteredAnnouncement: [],
    restAnnouncements: [],
    currentSelectedID: '',
    markedDates: {},
    markingType: 'multi-period',
  });
  const currentMonthInfo = currentMonth({
    month: calendar.month - 1,
    year: calendar.year,
  });

  console.log({
    restAnnouncements: state.restAnnouncements.map(props => props.id),
    selected: state.filteredAnnouncement.map(props => props.id),
  });
  function handleMonthChange(props: DateData) {
    state.filteredAnnouncement.length > 0 &&
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: 0,
      });
    setCalendar({
      month: props.month,
      year: props.year,
    });
    setState(prevState => {
      const filteredAnnouncement = prevState.restAnnouncements.filter(
        restProps => {
          const endDate = new Date();
          const restCurrentMonth = props.month - 1;
          const currentYear = props.year;
          endDate.setTime(restProps.endDate);
          const endMonth = endDate.getMonth();
          const endYear = endDate.getFullYear();

          return restCurrentMonth === endMonth && currentYear === endYear;
        },
      );
      const markedDates = setMarkedDates(filteredAnnouncement);
      return {
        ...prevState,
        filteredAnnouncement,
        markedDates: {
          ...prevState.markedDates,
          ...markedDates,
        },
      };
    });
  }
  function handleDayPress(event: DateData) {
    console.log({event});
  }

  const setMarkedDates = useCallback(
    (announcementData: ReadAnnouncementProps[]) => {
      let markedDatesHolder: Record<string, ExtendedReactCalendarProps> = {};
      announcementData.forEach(({markedDates}) => {
        const dateKeys = Object.keys(markedDates).sort((a, b) =>
          a.localeCompare(b),
        );
        const objLength = dateKeys.length;
        dateKeys.forEach((key, i) => {
          const objRest = markedDates[key];
          if (objLength === 1) {
            return (markedDatesHolder[key] = {marked: true, ...objRest});
          }
          switch (i) {
            case 0:
              return (markedDatesHolder[key] = {startingDay: true, ...objRest});
            case objLength - 1:
              return (markedDatesHolder[key] = {endingDay: true, ...objRest});
            default:
              return (markedDatesHolder[key] = {...objRest});
          }
        });
      });
      return markedDatesHolder;
    },
    [],
  );
  const setFilteredAnnouncementAndAnimation = useCallback(() => {
    const condition = typeof route.params === 'string';
    if (condition) {
      const {id, filteredAnnouncement, restAnnouncements} = JSON.parse(
        route.params,
      ) as CalendarParamProps;

      const markedDatesHolder = setMarkedDates(filteredAnnouncement);
      setCurrentSelectedActivityId(id);
      setState(prevState => ({
        ...prevState,
        markedDates: {
          ...prevState.markedDates,
          ...markedDatesHolder,
        },
        restAnnouncements,
        filteredAnnouncement,
      }));
    }
  }, [route.params, setCurrentSelectedActivityId, setMarkedDates]);

  useEffect(() => {
    setFilteredAnnouncementAndAnimation();
  }, [setFilteredAnnouncementAndAnimation]);

  return (
    <View className="flex-1">
      <View className="w-full items-center justify-center bg-stone-300">
        <Image
          source={require('~/assets/calender_of_activities.png')}
          className="my-4 h-6 w-10/12"
          resizeMode="stretch"
        />
      </View>
      {state && (
        <View className="h-10/12 mx-4 mb-4 mt-2 w-11/12 rounded-2xl">
          <Calendar
            className="rounded-xl border-2"
            theme={{
              // backgroundColor: '#767373',
              calendarBackground: '#D2D2D2',
              textSectionTitleColor: '#28303B',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#050505',
              selectedDotColor: '#ffffff',
              arrowColor: '#050505',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#050505',
              indicatorColor: '#050505',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            onMonthChange={handleMonthChange}
            onDayPress={handleDayPress}
            markingType={'period'}
            markedDates={{...state.markedDates}}
          />
        </View>
      )}
      <View className="mx-4 h-60 rounded-xl border bg-customADC2D2">
        <View className="border-b ">
          <Text className="mb-4 ml-4 mt-4 font-bold capitalize">
            {currentMonthInfo?.name}
          </Text>
        </View>
        <FlatList
          className="flex-1"
          ref={flatListRef}
          data={state.filteredAnnouncement}
          onScroll={e => {
            const {contentOffset} = e.nativeEvent;
            const position = contentOffset.y / FLATLIST_COMPONENT_HEIGHT;
            const currentIndex = Math.floor(position);
            const currentData = state.filteredAnnouncement[currentIndex];
            setCurrentSelectedActivityId(currentData?.id ?? '');
          }}
          onLayout={() => {
            const ids = state.filteredAnnouncement.map(props => props.id);
            const index = ids.indexOf(currentSelectedActivityId ?? '');
            flatListRef.current?.scrollToIndex({
              animated: true,
              index: index === -1 ? 0 : index,
            });
          }}
          keyExtractor={({id}) => id}
          renderItem={_renderItem}
        />
      </View>
    </View>
  );
};

const _renderItem = ({item}: ListRenderItemInfo<ReadAnnouncementProps>) => (
  <CalendarActivityButton {...item} />
);

export default CalendarOfActivities;
