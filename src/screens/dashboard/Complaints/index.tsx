import React from 'react';
import {View} from 'react-native';
import ChatProvider, {useChat} from '~/contexts/ChatContext';
import {useUser} from '~/contexts/UserContext';
import ChatBox from './ChatBox';
import ChatNav from './ChatNav';
import ChatPrivilege from './ChatPrivilege';
import InputContainer from './InputContainer';

const Chats = () => {
  return (
    <ChatProvider>
      <ChatChildren />
    </ChatProvider>
  );
};

const ChatChildren = () => {
  const {role} = useUser();
  const {selectedChat} = useChat();
  // console.log({role});

  return (
    <View className="relative flex-1">
      <ChatNav />
      <View className={`${selectedChat !== null ? '' : 'flex-row'} flex-1`}>
        {(selectedChat !== 'adviser' || selectedChat !== null) && (
          <ChatPrivilege />
        )}
        {(!(role === 'mayor' || role === 'adviser') ||
          !(selectedChat === null || selectedChat === 'concerns')) && (
          <>
            <ChatBox />
            <InputContainer />
          </>
        )}
      </View>
    </View>
  );
};

export default Chats;
