import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  AnnouncementType,
  StudInfoSortedType,
} from 'cics-mobile-client/../../shared/types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {RoleType} from '~/screens/authentication/Landing/types';
import {currentMonth} from '~/utils/date';
import {FirestoreCollectionPath, collectionRef} from '~/utils/firebase';
import {useAuth} from '../AuthContext';
import {MessagePromptType} from '../AuthContext/types';
import type {ContentContextType, InitialStateType} from './types';

const firestoreCollection = {
  announcement: [],
  chat: [],
  schedule: [],
};
const initialState: InitialStateType = {
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
  const [state, setState] = useState<InitialStateType>(initialState);
  const {currentUser} = useAuth();

  function handleState(
    name: keyof InitialStateType | FirestoreCollectionPath,
    value: AnnouncementType[] | StudInfoSortedType | string | MessagePromptType,
  ) {
    setState(prevState => ({...prevState, [name]: value}));
  }

  function handleMessage(props: MessagePromptType) {
    handleState('message', props);
  }

  const handleRole = useCallback((props: RoleType) => {
    handleState('role', props);
  }, []);

  const handleSnapshot = useCallback((name: FirestoreCollectionPath) => {
    const newDate = new Date();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const MONTH = currentMonth({month, year})?.name.toUpperCase();

    return collectionRef(name)
      .doc(MONTH)
      .collection(`${year}`)
      .onSnapshot(snapshot => {
        const holder: AnnouncementType[] = [];
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(doc => {
            holder.push({...doc.data(), docId: doc.id} as AnnouncementType);
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
        handleRole(role as RoleType);
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
