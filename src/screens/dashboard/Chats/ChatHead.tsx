import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {Text} from '~/components';
import IconButton from '~/components/IconButton';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';

interface AddChatIconType {
  showSearch: boolean;
}

const ChatHead = () => {
  const {chats} = useContent();

  function renderChatHeads() {
    return chats.map(({docId, participants}) => {
      const id = docId ? docId : '';
      return <ChatPeopleContainer key={id} {...{participants, docId: id}} />;
    });
  }

  return (
    <View className="h-full w-1/4 bg-tertiary">
      <ScrollView>
        <AddChatIcon />
        {renderChatHeads()}
      </ScrollView>
    </View>
  );
};

const ChatPeopleContainer = (props: {
  participants: string[];
  docId: string;
}) => {
  const {currentUser} = useAuth();
  const {handleSelectedChat} = useContent();
  const {participants, docId} = props;
  const recipient = participants.filter(
    email => currentUser?.email !== email,
  )[0];

  return (
    <TouchableOpacity onPress={() => handleSelectedChat(docId)}>
      <View className="items-center justify-center bg-paper p-2">
        <Text>{recipient ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AddChatIcon = () => {
  const [state, setState] = useState<AddChatIconType>({
    showSearch: false,
  });

  function handleState(
    key: keyof AddChatIconType,
    value: AddChatIconType['showSearch'],
  ) {
    setState(prevState => ({...prevState, [key]: value}));
  }

  function handleToggleButton() {
    handleState('showSearch', !state.showSearch);
  }

  return (
    <View className="relative mt-4 h-12 w-12 items-center justify-center self-center rounded-lg bg-paper">
      <TextInput
        onPressIn={handleToggleButton}
        className={`${
          state.showSearch ? 'w-full' : 'w-1/2'
        } absolute bg-slate-400 duration-500 ease-in-out`}
      />
      <View className="absolute">
        <IconButton uri={require('~/assets/icons/Award-Icon.png')} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={state.showSearch}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          handleState('showSearch', !state.showSearch);
        }}>
        <View />
      </Modal>
    </View>
  );
};

export default ChatHead;
