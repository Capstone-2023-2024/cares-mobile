import React, {createContext, useContext, useState} from 'react';
import type {
  ChatContextProps,
  ChatProviderProps,
  InitialProps,
  InitialPropsType,
} from './types';

const initialProps: InitialProps = {
  otherConcerns: [],
  selectedChat: null,
  chatModalVisible: false,
};
const ChatContext = createContext<ChatContextProps>({
  ...initialProps,
  handleOtherConcerns: () => null,
  handleChatModalVisible: () => null,
  handleSelectedChat: () => null,
});
const ChatProvider = ({children}: ChatProviderProps) => {
  const [state, setState] = useState(initialProps);

  function handleState(key: keyof InitialProps, value: InitialPropsType) {
    setState(prevState => ({...prevState, [key]: value}));
  }

  function handleChatModalVisible(value: InitialProps['chatModalVisible']) {
    handleState('chatModalVisible', value);
  }
  function handleSelectedChat(value: InitialProps['selectedChat']) {
    handleState('selectedChat', value);
  }
  function handleOtherConcerns(value: InitialProps['otherConcerns']) {
    handleState('otherConcerns', value);
  }

  return (
    <ChatContext.Provider
      value={{
        ...state,
        handleChatModalVisible,
        handleOtherConcerns,
        handleSelectedChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
