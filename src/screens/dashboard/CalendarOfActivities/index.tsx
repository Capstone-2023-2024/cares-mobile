import {
  MarkedDatesProps,
  ReadAnnouncementProps,
} from '@cares/types/announcement';
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ListRenderItemInfo, View} from 'react-native';
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
import {currentMonth} from '~/utils/date';

interface CalendarParamProps {
  id: string;
  filteredAnnouncement: ReadAnnouncementProps[];
  restAnnouncements: ReadAnnouncementProps[];
}

interface CalendarStateProps extends Omit<CalendarParamProps, 'id'> {
  currentSelectedID: string;
  markedDates: MarkedDates;
  markingType: MarkingTypes;
  calendar: {
    month: number;
    year: number;
  };
}

interface ExtendedReactCalendarProps
  extends Omit<MarkedDatesProps, 'calendar'> {
  marked?: boolean;
  startingDay?: boolean;
  endingDay?: boolean;
}

const CalendarOfActivities = () => {
  const date = new Date();
  const route = useRoute();
  const FLATLIST_COMPONENT_HEIGHT = 120;
  const {setCurrentSelectedActivityId, currentSelectedActivityId} =
    useUniversal();
  const flatListRef = useRef<FlatList | null>(null);
  const [state, setState] = useState<CalendarStateProps>({
    filteredAnnouncement: [],
    restAnnouncements: [],
    currentSelectedID: '',
    markedDates: {},
    markingType: 'multi-period',
    calendar: {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    },
  });
  const currentMonthInfo = currentMonth({
    month: state.calendar.month - 1,
    year: state.calendar.year,
  });

  function handleMonthChange(props: DateData) {
    state.filteredAnnouncement.length > 0 &&
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: 0,
      });
    setState(prevState => {
      const filteredAnnouncement = prevState.restAnnouncements.filter(
        restProps => {
          const endDate = new Date();
          const currentMonth = props.month - 1;
          const currentYear = props.year;
          endDate.setTime(restProps.endDate);
          const endMonth = endDate.getMonth();
          const endYear = endDate.getFullYear();

          return currentMonth === endMonth && currentYear === endYear;
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
        calendar: {
          month: props.month,
          year: props.year,
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
      if (id !== undefined) {
        setCurrentSelectedActivityId(id);
      }
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
    <View className="flex-1 bg-stone-300">
      {state && (
        <View className="h-10/12 m-auto w-11/12 rounded-2xl bg-gray-200">
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
              dotColor: '#000',
              selectedDotColor: '#ffffff',
              arrowColor: '#f5f5f5',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#000',
              indicatorColor: '#000',
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
      <View className="mx-4 ml-6 h-64 rounded-xl border bg-customADC2D2">
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
            const index = ids.indexOf(currentSelectedActivityId ?? '') ?? 0;
            index >= 0 &&
              flatListRef.current?.scrollToIndex({
                animated: true,
                index,
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
