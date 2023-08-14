import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from 'react';
import {firestoreApp} from '~/utils/firebase';
import {AnnouncementType, UniversityScheduleType} from '../../../shared/types';

interface InitialStateType {
  announcements: AnnouncementType[];
  schedules: UniversityScheduleType[];
}

interface ContentContextType extends InitialStateType {}

type HolderType = AnnouncementType | UniversityScheduleType;

const initialState: InitialStateType = {
  announcements: [],
  schedules: [],
};

const ContentContext = createContext<ContentContextType>({
  ...initialState,
});

const ContentProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<InitialStateType>(initialState);

  function handleState(name: keyof InitialStateType, value: HolderType[]) {
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
  };
  return (
    <ContentContext.Provider value={values}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export default ContentProvider;
