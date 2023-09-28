import type {
  AnnouncementType,
  ChatConfigType,
  ChatType,
  ClientChatType,
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
import {currentMonth} from '~/utils/date';
import {FirestoreCollectionPath, collectionRef} from '~/utils/firebase';
import {useAuth} from '../AuthContext';
import type {
  ChattableType,
  ContentContextType,
  InitialStateType,
} from './types';

const firestoreCollection = {
  announcement: [],
  chat: [],
  schedule: [],
};
const initialState: InitialStateType = {
  ...firestoreCollection,
  selectedChat: null,
};

const ContentContext = createContext<ContentContextType>({
  ...initialState,
  handleSelectedChat: () => null,
});

const chatColReference = collectionRef('chat');
const ContentProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<InitialStateType>(initialState);
  const {currentUser} = useAuth();

  function handleState(
    name: keyof InitialStateType | FirestoreCollectionPath,
    value:
      | AnnouncementType[]
      | ClientChatType[]
      | StudInfoSortedType
      | string
      | ChattableType[],
  ) {
    setState(prevState => ({...prevState, [name]: value}));
  }

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

  function handleSelectedChat(docId: string) {
    handleState('selectedChat', docId);
  }

  useEffect(() => {
    const unsub = handleSnapshot('announcement');
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
          handleState('chat', chatHeads);
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
    handleSelectedChat,
  };
  return (
    <ContentContext.Provider value={values}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export default ContentProvider;
