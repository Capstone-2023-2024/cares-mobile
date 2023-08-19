import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from 'react';
import {firestoreApp} from '~/utils/firebase';
import type {
  AnnouncementType,
  DataSortedType,
  UniversityScheduleType,
} from 'cics-mobile-client/../../shared/types';

interface InitialStateType {
  announcements: AnnouncementType[];
  schedules: UniversityScheduleType[];
  studentInfo: DataSortedType;
}

interface ContentContextType extends InitialStateType {
  handleStudentInfo: (props: DataSortedType) => void;
}

type HolderType = AnnouncementType | UniversityScheduleType;

const initialState: InitialStateType = {
  announcements: [],
  schedules: [],
  studentInfo: {},
};

const ContentContext = createContext<ContentContextType>({
  ...initialState,
  handleStudentInfo: () => null,
});

const ContentProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<InitialStateType>(initialState);

  function handleState(
    name: keyof InitialStateType,
    value: HolderType[] | DataSortedType,
  ) {
    setState(prevState => ({...prevState, [name]: value}));
  }

  const handleSnapshot = useCallback((name: keyof InitialStateType) => {
    return firestoreApp.collection(name).onSnapshot(snapshot => {
      let holder: HolderType[] = [];
      if (snapshot.docs.length > 0) {
        snapshot.docs.forEach(doc => {
          holder.push({...doc.data(), docId: doc.id} as HolderType);
        });
      }
      handleState(
        name,
        holder.sort((a, b) => b.dateCreated - a.dateCreated),
      );
    });
  }, []);

  function handleStudentInfo(props: DataSortedType) {
    handleState('studentInfo', props);
  }

  useEffect(() => {
    const unsub = handleSnapshot('announcements');
    return () => unsub();
  }, [handleSnapshot]);
  useEffect(() => {
    const unsub = handleSnapshot('schedules');
    return () => unsub();
  }, [handleSnapshot]);

  const values = {
    ...state,
    handleStudentInfo,
  };
  return (
    <ContentContext.Provider value={values}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export default ContentProvider;
