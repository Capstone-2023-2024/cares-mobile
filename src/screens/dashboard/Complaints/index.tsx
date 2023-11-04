import React from 'react';
import {View} from 'react-native';
import ChatProvider, {useChat} from '~/contexts/ChatContext';
import ChatBox from './ChatBox';
import ChatNav from './ChatNav';
import InputContainer from './InputContainer';
import {useContent} from '~/contexts/ContentContext';

const Chats = () => {
  return (
    <ChatProvider>
      <ChatChildren />
    </ChatProvider>
  );
};

const ChatChildren = () => {
  const {role} = useContent();
  const {selectedChat} = useChat();
  // console.log({role});

  return (
    <View className="relative flex-1">
      <ChatNav />
      {(!(role === 'mayor' || role === 'adviser') ||
        !(selectedChat === null)) && (
        <>
          <ChatBox />
          <InputContainer />
        </>
      )}
    </View>
  );
};

export default Chats;
