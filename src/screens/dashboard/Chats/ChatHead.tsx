import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  type ListRenderItemInfo,
} from 'react-native';
import {Text} from '~/components';
import IconButton from '~/components/IconButton';
import {useAuth} from '~/contexts/AuthContext';
import {useChat} from '~/contexts/ChatContext';
import type {ChattableProps} from '~/contexts/ChatContext/types';

interface AddIconType {
  showSearch: boolean;
  emailList: ChattableProps[];
}

const ChatHead = () => {
  const {chat} = useChat();

  function renderChatHeads() {
    return chat.length > 0 ? (
      chat.map(({id, participants}) => {
        return <ChatPeopleContainer key={id} {...{participants, id}} />;
      })
    ) : (
      <></>
    );
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

const ChatPeopleContainer = (props: {participants: string[]; id: string}) => {
  const {currentUser} = useAuth();
  const {handleSelectedChat} = useChat();
  const {participants, id} = props;
  const recipient = participants.filter(
    email => currentUser?.email !== email,
  )[0];

  return (
    <TouchableOpacity onPress={() => handleSelectedChat(id)}>
      <View className="items-center justify-center bg-paper p-2">
        <Text>{recipient ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AddChatIcon = () => {
  const [state, setState] = useState<AddIconType>({
    showSearch: false,
    emailList: [],
  });
  const {handleSelectedChat, selectedChat} = useChat();

  function handleState(
    key: keyof AddIconType,
    value: AddIconType['showSearch'] | AddIconType['emailList'],
  ) {
    setState(prevState => ({...prevState, [key]: value}));
  }

  function handleToggleButton() {
    handleState('showSearch', !state.showSearch);
  }

  function handleSearch(text: string) {
    handleSelectedChat(null);
    if (text.trim() !== '') {
      const emailList = chattables.filter(({email}) => email.match(text));
      handleState('emailList', emailList);
    }
  }

  function handleEmailSelection() {
    const selectedEmail = state.emailList[0];
    handleSelectedChat(selectedEmail?.email ?? '');
  }

  const renderEmailList = ({item}: ListRenderItemInfo<ChattableType>) => {
    return (
      <TouchableOpacity onPress={handleEmailSelection} className="bg-white/90">
        <Text className="p-2 px-4">{item.email}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="relative mt-4 h-12 w-12 items-center justify-center self-center overflow-hidden rounded-lg bg-paper">
      <View className="absolute">
        <IconButton
          onPress={handleToggleButton}
          uri={require('~/assets/icons/Award-Icon.png')}
        />
      </View>
      <Modal
        animationType="fade"
        transparent
        statusBarTranslucent
        visible={state.showSearch}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          handleState('showSearch', !state.showSearch);
        }}>
        <View className="mx-auto my-auto h-1/3 w-5/6 rounded-lg bg-white p-4">
          <TextInput
            value={selectedChat !== null ? selectedChat : ''}
            className={`${
              state.showSearch ? 'w-full' : 'w-1/2'
            } absolute mt-4 self-center rounded-full bg-slate-200 px-4 duration-500 ease-in-out`}
            onChangeText={handleSearch}
          />
          <FlatList
            className="mt-16 h-full"
            data={state.emailList}
            renderItem={renderEmailList}
            keyExtractor={item => item.email}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ChatHead;
