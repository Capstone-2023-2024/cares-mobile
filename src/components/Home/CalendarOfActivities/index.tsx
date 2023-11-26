import React from 'react';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {HeadingTemplate, TabContainer} from '../Usertab';
import {useUser} from '~/contexts/UserContext';

const CalendarOfActivities = () => {
  const {data} = useAnnouncement();
  const {currentStudent} = useUser();

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={data.length === 0 || currentStudent.email === 'null'}
        title="calendar of activities"
        navigation="CalendarOfActivities"
      />
    </TabContainer>
  );
};

export default CalendarOfActivities;
