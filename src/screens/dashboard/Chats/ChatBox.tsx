import {icon, imageDimension} from 'cics-mobile-client/../../shared/images';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Text} from '~/components';
import {useContent} from '~/contexts/ContentContext';

const ChatBox = () => {
  const {chats, selectedChat} = useContent();

  function renderChatBox() {
    const selectedInbox = chats.filter(({docId}) => docId === selectedChat)[0]
      ?.inbox;
    if (selectedInbox !== undefined) {
      return selectedInbox.map(({content, type, docId}) => (
        <View key={docId}>
          {type === 'photo' && (
            <Image
              {...imageDimension(icon)}
              source={require('~/assets/icons/Award-Icon.png')}
              src={content}
            />
          )}
          {type === 'text' && <Text>{content}</Text>}
        </View>
      ));
    }
    return <View />;
  }

  return (
    <View className="absolute right-0 top-32 h-3/4 w-3/4 overflow-hidden rounded-xl bg-sky-400/40">
      <ScrollView>{renderChatBox()}</ScrollView>
    </View>
  );
};

export default ChatBox;
