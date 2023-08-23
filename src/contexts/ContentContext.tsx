import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from 'react';
import {collectionRef, firestoreApp} from '~/utils/firebase';
import type {
  AnnouncementType,
  ChatConfigType,
  ChatType,
  ClientChatType,
  StudInfoSortedType,
  UniversityScheduleType,
} from 'cics-mobile-client/../../shared/types';
import {useAuth} from './AuthContext';

interface InitialStateType {
  chats: ClientChatType[];
  announcements: AnnouncementType[];
  schedules: UniversityScheduleType[];
  studentInfo: Partial<StudInfoSortedType>;
  selectedChat: string | null;
}

interface ContentContextType extends InitialStateType {
  handleStudentInfo: (props: StudInfoSortedType) => void;
  handleSelectedChat: (props: string) => void;
}

type HolderType = AnnouncementType | UniversityScheduleType;

const initialState: InitialStateType = {
  announcements: [],
  chats: [],
  schedules: [],
  studentInfo: {},
  selectedChat: null,
};

const ContentContext = createContext<ContentContextType>({
  ...initialState,
  handleStudentInfo: () => null,
  handleSelectedChat: () => null,
});

const chatColReference = collectionRef('chats');
const ContentProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<InitialStateType>(initialState);
  const {currentUser} = useAuth();

  function handleState(
    name: keyof InitialStateType,
    value: HolderType[] | ClientChatType[] | StudInfoSortedType | string,
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

  function handleStudentInfo(props: StudInfoSortedType) {
    handleState('studentInfo', props);
  }

  function handleSelectedChat(docId: string) {
    handleState('selectedChat', docId);
  }

  useEffect(() => {
    const unsub = handleSnapshot('announcements');
    return () => unsub();
  }, [handleSnapshot]);

  useEffect(() => {
    const unsub = handleSnapshot('schedules');
    return () => unsub();
  }, [handleSnapshot]);

  useEffect(() => {
    const email = currentUser !== null ? currentUser.email : '';
    const unsub = chatColReference
      .where('participants', 'array-contains', email)
      .limit(8)
      .orderBy('dateModified')
      .onSnapshot(snapshot => {
        const chatHeads: ClientChatType[] = [];
        if (snapshot !== null) {
          snapshot.docs.forEach(doc => {
            const chatHead = {...doc.data(), docId: doc.id} as ChatConfigType;
            const inbox: ChatType[] = [];
            chatColReference
              .doc(doc.id)
              .collection('inbox')
              .limit(20)
              .orderBy('dateCreated')
              .onSnapshot(inboxsnap => {
                inboxsnap.docs.forEach(inDoc => {
                  const message = {
                    ...inDoc.data(),
                    docId: inDoc.id,
                  } as ChatType;
                  inbox.push(message);
                });
              });
            chatHeads.push({...chatHead, inbox});
          });
          handleState('chats', chatHeads);
        }
      });
    return () => {
      if (currentUser !== null) {
        unsub();
      }
    };
  }, [currentUser]);

  const values = {
    ...state,
    handleStudentInfo,
    handleSelectedChat,
  };
  return (
    <ContentContext.Provider value={values}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export default ContentProvider;
