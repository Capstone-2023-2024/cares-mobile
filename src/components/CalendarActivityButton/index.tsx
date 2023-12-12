import type {ReadAnnouncementProps} from '@cares/common/types/announcement';
import {View, TouchableOpacity} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';
import {useUniversal} from '~/contexts/UniversalContext';
import Text from '../Text';
import React, {memo} from 'react';

const CalendarActivityButton = (props: ReadAnnouncementProps) => {
  const {handleNavigation} = useNav();
  const {currentSelectedActivityId} = useUniversal();
  const {markedDates, endDate, id, title} = props;
  const markedDatesKeys = Object.keys(markedDates).sort((a, b) =>
    a.localeCompare(b),
  );
  const expiration = new Date();
  expiration.setTime(endDate);
  const firstDate = markedDatesKeys[0]?.split('-')[2];

  return (
    <TouchableOpacity
      className={`${
        currentSelectedActivityId === id ? 'bg-secondary' : 'bg-transparent'
      } h-32 border-b`}
      onPress={() => handleNavigation('Announcements', id)}>
      <View
        className={`${
          currentSelectedActivityId === id ? 'scale-95' : 'scale-90'
        } relative my-auto h-max w-full flex-row items-center`}>
        <View
          className={`${
            currentSelectedActivityId === id ? 'border-paper' : ''
          } ml-2 h-20 w-24 content-center items-center justify-center rounded-xl border`}>
          <Text
            className={`${
              currentSelectedActivityId === id ? 'text-white' : 'text-primary'
            } text-2xl font-black`}>
            {firstDate}
          </Text>
        </View>
        <Text
          className={`${
            currentSelectedActivityId === id ? 'text-white' : 'text-primary'
          } ml-2 text-lg font-black`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CalendarActivityButton);
