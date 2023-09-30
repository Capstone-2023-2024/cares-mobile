import React, { createContext, useContext, useEffect, useState } from 'react';
import { collectionRef } from '~/utils/firebase';
import { useAuth } from '../AuthContext';
import type {
  ChatConfigProps,
  ChatContextProps,
  ChatProviderProps,
  MessageProps,
  ClientMessageProps,
  InitialProps,
  InitialPropsType,
  ChattableProps,
} from './types';

const initialProps: InitialProps = {
  chat: [],
  chattables: [],
  selectedChat: null,
};
const ChatContext = createContext<ChatContextProps>({
  ...initialProps,
  handleSelectedChat: (props: string | null) => props,
});
const ChatProvider = ({ children }: ChatProviderProps) => {
  const { currentUser } = useAuth();
  const [state, setState] = useState(initialProps);

  function handleState(key: keyof InitialProps, value: InitialPropsType) {
    setState(prevState => ({ ...prevState, [key]: value }));
  }

  function handleSelectedChat(props: string | null) {
    handleState('selectedChat', props);
  }

  useEffect(() => {
    const email = currentUser ? currentUser.email : '';
    const unsub = collectionRef('chat')
      .where('participants', 'array-contains', email)
      .limit(4)
      .orderBy('dateModified')
      .onSnapshot(snapshot => {
        const chatHeads: ClientMessageProps[] = [];
        if (snapshot !== null) {
          snapshot.docs.forEach(doc => {
            const id = doc.id;
            const data = doc.data();
            const chatHead = { id, ...data } as ChatConfigProps;
            const inbox: MessageProps[] = [];
            collectionRef('chat')
              .doc(doc.id)
              .collection('inbox')
              .limit(20)
              .orderBy('dateCreated')
              .onSnapshot(inboxsnap => {
                inboxsnap.docs.forEach(inDoc => {
                  const inboxId = inDoc.id;
                  const inboxData = inDoc.data();
                  const message = {
                    id: inboxId,
                    ...inboxData,
                  } as MessageProps;
                  inbox.push(message);
                });
              });
            chatHeads.push({ ...chatHead, inbox });
          });
          handleState('chat', chatHeads);
        }
      });
    return () => {
      if (currentUser !== null) {
        void unsub();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    const unsub = async () => {
      collectionRef('faculty')
        .orderBy('email', 'desc')
        .limit(10)
        .onSnapshot(snapshot => {
          const placeholder: ChattableProps[] = [];
          snapshot.docs.forEach(doc => {
            const id = doc.id;
            const data = doc.data() as Omit<ChattableProps, 'id'>;
            placeholder.push({ id, ...data });
          });
          handleState('chattables', placeholder);
        });
    };
    return () => {
      void unsub();
    };
  }, [currentUser]);

  return (
    <ChatContext.Provider value={{ ...state, handleSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
