import React, {createContext, useContext, useEffect, useState} from 'react';
import type {
  AnnouncementProps,
  ReadAnnouncementProps,
} from '@cares/common/types/announcement';
import {collectionRef} from '~/utils/firebase';
import type {
  AnnouncementContextProps,
  AnnouncementProviderProps,
  AnnouncementStateProps,
} from './types';
import {currentMonth} from '@cares/common/utils/date';
import {useUniversal} from '../UniversalContext';

const initState: AnnouncementStateProps = {
  title: '',
  data: [],
  type: 'event',
};
const AnnouncementContext = createContext<AnnouncementContextProps>({
  ...initState,
  handleTypeChange: () => null,
  handleTitle: () => null,
});

const AnnouncementProvider = ({children}: AnnouncementProviderProps) => {
  const [state, setState] = useState(initState);
  const {calendar} = useUniversal();

  function handleTypeChange(type: string) {
    if (type === 'Event') {
      return setState(prevState => ({...prevState, type: 'event'}));
    } else if (type === 'University Memo') {
      return setState(prevState => ({
        ...prevState,
        type: 'university_memorandum',
      }));
    } else if (type === 'Others') {
      return setState(prevState => ({...prevState, type: 'others'}));
    }
    return setState(prevState => ({...prevState, type: 'recognition'}));
  }
  function handleTitle(tag: AnnouncementStateProps['title']) {
    setState(prevState => ({...prevState, tag}));
  }

  useEffect(() => {
    // const limitNumber = 30;
    const date = new Date();
    const month = calendar.month - 1;
    const year = calendar.year;
    const {maxDays} = currentMonth({month, year});
    date.setDate(maxDays);
    console.log({maxDays, year, month});
    const endDate = date.getTime();
    const announcementQuery = collectionRef('announcement')
      .where('endDate', '<=', endDate)
      .orderBy('endDate', 'desc');

    return announcementQuery.onSnapshot(snapshot => {
      const announcementHolder: ReadAnnouncementProps[] = [];
      // console.log({snapshot});
      if (snapshot === null) {
        return setState(prevState => ({...prevState, data: []}));
      }
      snapshot.docs.forEach(doc => {
        const id = doc.id;
        const data = doc.data() as AnnouncementProps;
        announcementHolder.push({
          id,
          ...data,
        });
      });
      setState(prevState => ({
        ...prevState,
        data: announcementHolder,
      }));
    });
  }, [calendar.month, calendar.year]);

  return (
    <AnnouncementContext.Provider
      value={{...state, handleTypeChange, handleTitle}}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
export default AnnouncementProvider;
