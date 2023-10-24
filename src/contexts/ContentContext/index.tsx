import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Role} from '~/screens/authentication/Landing/types';
import {currentMonth} from '~/utils/date';
import {collectionRef} from '~/utils/firebase';
import {useAuth} from '../AuthContext';
import {MessagePrompt} from '../AuthContext/types';
import type {ContentContextType, InitialStateProps} from './types';
import type {AnnouncementProps} from '~/types/announcement';
import type {StudentCORProps} from '~/types/student';
import type {CollectionPath} from '~/types/firebase';

const firestoreCollection = {
  announcement: [],
  chat: [],
  schedule: [],
};
const initialState: InitialStateProps = {
  message: null,
  role: null,
  ...firestoreCollection,
};

const ContentContext = createContext<ContentContextType>({
  ...initialState,
  handleMessage: () => null,
  handleRole: () => null,
});

// const chatColReference = collectionRef('chat');
const ContentProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<InitialStateProps>(initialState);
  const {currentUser} = useAuth();

  function handleState(
    name: keyof InitialStateProps | CollectionPath,
    value: AnnouncementProps[] | StudentCORProps | string | MessagePrompt,
  ) {
    setState(prevState => ({...prevState, [name]: value}));
  }

  function handleMessage(props: MessagePrompt) {
    handleState('message', props);
  }

  const handleRole = useCallback((props: Role) => {
    handleState('role', props);
  }, []);

  const handleSnapshot = useCallback((name: CollectionPath) => {
    const newDate = new Date();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const MONTH = currentMonth({month, year})?.name.toUpperCase();

    return collectionRef(name)
      .doc(MONTH)
      .collection(`${year}`)
      .onSnapshot(snapshot => {
        const holder: AnnouncementProps[] = [];
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(doc => {
            const data = doc.data() as Omit<AnnouncementProps, 'id'>;
            holder.push({...data, id: doc.id} as AnnouncementProps);
          });
        }
        handleState(
          name,
          holder.sort((a, b) => b.dateCreated - a.dateCreated),
        );
      });
  }, []);

  useEffect(() => {
    const unsub = handleSnapshot('announcement');
    return () => unsub();
  }, [handleSnapshot]);

  useEffect(() => {
    async function getRole() {
      try {
        const role = await AsyncStorage.getItem('role');
        handleRole(role as Role);
      } catch (err) {
        console.log(err, 'Error in role');
      }
    }
    return () => {
      void getRole();
    };
  }, [currentUser, handleRole]);

  return (
    <ContentContext.Provider
      value={{
        ...state,
        handleMessage,
        handleRole,
      }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export default ContentProvider;
