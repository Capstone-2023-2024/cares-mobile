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
import {FirestoreCollectionPath, collectionRef} from '~/utils/firebase';
import {useAuth} from './AuthContext';
import {currentMonth} from '~/utils/date';

interface InitialStateType {
  chat: ClientChatType[];
  announcement: AnnouncementType[];
  studentInfo: Partial<StudInfoSortedType>;
  selectedChat: string | null;
  chattables: ChattableType[];
}

interface ContentContextType extends InitialStateType {
  handleStudentInfo: (props: StudInfoSortedType) => void;
  handleSelectedChat: (props: string) => void;
}

export interface ChattableType extends Pick<StudInfoSortedType, 'email'> {
  type: 'student' | 'faculty';
}

const firestoreCollection = {
  announcement: [],
  chat: [],
  schedule: [],
};
const initialState: InitialStateType = {
  ...firestoreCollection,
  studentInfo: {},
  selectedChat: null,
  chattables: [],
};

const ContentContext = createContext<ContentContextType>({
  ...initialState,
  handleStudentInfo: () => null,
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

  const handleChattables = useCallback(async (type: ChattableType['type']) => {
    try {
      const colRef = collectionRef(type);
      const {count} = (await colRef.count().get()).data();
      if (count > 0) {
        const colList = await colRef.get();
        const emails: ChattableType[] = [];

        colList.forEach(async doc => {
          const docRef = await colRef.doc(doc.id).get();
          const data = docRef.data() as StudInfoSortedType;
          emails.push({email: data.email, type});
        });

        handleState('chattables', emails);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleStudentInfo = useCallback((props: StudInfoSortedType) => {
    handleState('studentInfo', props);
  }, []);

  function handleSelectedChat(docId: string) {
    handleState('selectedChat', docId);
  }

  useEffect(() => {
    const unsub = handleSnapshot('announcement');
    return () => unsub();
  }, [handleSnapshot]);

  useEffect(() => {
    let unsub = true;
    if (unsub) {
      handleChattables('student');
      handleChattables('faculty');
    }
    return () => {
      unsub = false;
    };
  }, [handleChattables]);

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
    handleStudentInfo,
    handleSelectedChat,
  };
  return (
    <ContentContext.Provider value={values}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export default ContentProvider;
