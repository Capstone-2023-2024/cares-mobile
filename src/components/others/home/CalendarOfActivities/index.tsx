import React from 'react';
import HeadingTemplate from '~/components/HeadingTemplate';
import TabContainer from '~/components/TabContainer';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';

const HomeCalendarOfActivities = () => {
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

export default HomeCalendarOfActivities;
