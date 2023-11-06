import React, {createContext, useContext, useEffect, useState} from 'react';
import type {AnnouncementProps} from '~/types/announcement';
import {collectionRef} from '~/utils/firebase';
import type {
  AnnouncementContextProps,
  AnnouncementProviderProps,
  AnnouncementStateProps,
} from './types';

const initState: AnnouncementStateProps = {
  tag: '',
  data: [],
  type: 'event',
};
const AnnouncementContext = createContext<AnnouncementContextProps>({
  ...initState,
  handleTypeChange: () => null,
  handleTag: () => null,
});

const AnnouncementProvider = ({children}: AnnouncementProviderProps) => {
  const [state, setState] = useState(initState);

  function handleTypeChange(type: string) {
    if (type === 'Event') {
      return setState(prevState => ({...prevState, type: 'event'}));
    } else if (type === 'University Memo') {
      return setState(prevState => ({
        ...prevState,
        type: 'university_memorandum',
      }));
    }
    return setState(prevState => ({...prevState, type: 'recognition'}));
  }
  function handleTag(tag: AnnouncementStateProps['tag']) {
    setState(prevState => ({...prevState, tag}));
  }

  useEffect(() => {
    const limitNumber = 10;
    const eventRecognitionQuery = collectionRef('announcement')
      .where('type', '==', state.type)
      .where('endDate', '>', new Date().getTime())
      .orderBy('endDate', 'asc')
      .limit(limitNumber);

    const eventRecognitionWithTagsQuery = collectionRef('announcement')
      .where('type', '==', state.type)
      .where('tags', 'array-contains', state.tag.toLowerCase())
      .where('endDate', '>', new Date().getTime())
      .orderBy('endDate', 'asc')
      .limit(limitNumber);

    const memoQuery = collectionRef('announcement')
      .where('type', '==', state.type)
      .orderBy('dateCreated', 'asc')
      .limit(limitNumber);

    const memoWithTagsQuery = collectionRef('announcement')
      .where('type', '==', state.type)
      .where('tags', 'array-contains', state.tag.toLowerCase())
      .orderBy('dateCreated', 'asc')
      .limit(limitNumber);

    function query() {
      if (state.type === 'university_memorandum' && state.tag.trim() !== '') {
        return memoWithTagsQuery;
      } else if (
        state.type === 'university_memorandum' &&
        state.tag.trim() === ''
      ) {
        return memoQuery;
      } else if (state.tag.trim() !== '') {
        return eventRecognitionWithTagsQuery;
      }
      return eventRecognitionQuery;
    }
    return query().onSnapshot(snapshot => {
      const announcementHolder: AnnouncementProps[] = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        announcementHolder.push({
          ...data,
          id,
        } as AnnouncementProps);
      });
      setState(prevState => ({...prevState, data: announcementHolder}));
    });
  }, [state.type, state.tag]);
  return (
    <AnnouncementContext.Provider
      value={{...state, handleTypeChange, handleTag}}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
export default AnnouncementProvider;
