import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {ToastAndroid} from 'react-native';
import type {AnnouncementProps} from '~/types/announcement';
import {StudentWithClassSection} from '~/types/student';
import {collectionRef} from '~/utils/firebase';
import {MessagePrompt} from '../AuthContext/types';
import type {
  ContentContextType,
  InitialStateProps,
  InitialStateValues,
} from './types';

const initialState: InitialStateProps = {
  message: null,
  role: null,
  announcement: [],
};

const ContentContext = createContext<ContentContextType>({
  ...initialState,
  handleMessage: () => null,
  handleRole: () => null,
  handleUsersCache: async () => {
    const holder: StudentWithClassSection[] = [];
    return holder;
  },
});

const ContentProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<InitialStateProps>(initialState);

  function handleState(
    name: keyof InitialStateProps,
    value: InitialStateValues,
  ) {
    setState(prevState => ({...prevState, [name]: value}));
  }
  function handleMessage(props: MessagePrompt) {
    handleState('message', props);
  }
  const handleRole = useCallback((props: InitialStateProps['role']) => {
    // console.log({props});
    handleState('role', props);
  }, []);
  async function handleUsersCache(studentCORProps?: StudentWithClassSection) {
    const USER_KEY = 'usersCache';
    try {
      const usersCache = await AsyncStorage.getItem(USER_KEY);
      if (studentCORProps === undefined) {
        return JSON.parse(usersCache ?? '[]') as StudentWithClassSection[];
      }
      if (typeof usersCache === 'string') {
        const parsedUserCache = JSON.parse(
          usersCache,
        ) as StudentWithClassSection[];
        const filteredParsedUserCache = parsedUserCache.filter(
          ({studentNo}) => studentCORProps.studentNo === studentNo,
        );
        if (filteredParsedUserCache.length < 1) {
          parsedUserCache.push(studentCORProps);
          const arrayHolder = [...parsedUserCache];
          await AsyncStorage.setItem(USER_KEY, JSON.stringify(arrayHolder));
          return arrayHolder;
        }
        // Alert.alert('Data is already present in the users cache');
        return [];
      }
      await AsyncStorage.setItem(USER_KEY, JSON.stringify([studentCORProps]));
      return [studentCORProps];
    } catch (err) {
      ToastAndroid.show('Error in handling user cache', ToastAndroid.SHORT);
      return [];
    }
  }
  const handleRoleAsyncStorage = useCallback(async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      handleRole(role as InitialStateProps['role']);
    } catch (err) {
      ToastAndroid.show(
        'item in async storage maybe null => ContentContext.tsx',
        ToastAndroid.SHORT,
      );
    }
  }, [handleRole]);

  useEffect(() => {
    const unsub = collectionRef('announcement')
      .where('type', '==', 'event')
      .where('endDate', '>', new Date().getTime())
      .onSnapshot(snapshot => {
        // console.log(snapshot.size, 'Announcements');
        const holder: AnnouncementProps[] = [];
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(doc => {
            const data = doc.data() as Omit<AnnouncementProps, 'id'>;
            holder.push({...data, id: doc.id} as AnnouncementProps);
          });
        }
        handleState(
          'announcement',
          holder.sort((a, b) => b.dateCreated - a.dateCreated),
        );
      });
    return void unsub;
  }, []); // Announcement Snapshot
  useEffect(() => {
    return void handleRoleAsyncStorage();
  }, [handleRoleAsyncStorage]);

  return (
    <ContentContext.Provider
      value={{
        ...state,
        handleMessage,
        handleRole,
        handleUsersCache,
      }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export default ContentProvider;
