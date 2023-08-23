import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  FlatList,
  type ListRenderItemInfo,
} from 'react-native';
import {Text} from '~/components';
import IconButton from '~/components/IconButton';
import {useAuth} from '~/contexts/AuthContext';
import {ChattableType, useContent} from '~/contexts/ContentContext';

interface AddIconType {
  showSearch: boolean;
  emailList: ChattableType[];
}

const ChatHead = () => {
  const {chat} = useContent();

  function renderChatHeads() {
    return chat.length > 0 ? (
      chat.map(({docId, participants}) => {
        const id = docId ? docId : '';
        return <ChatPeopleContainer key={id} {...{participants, docId: id}} />;
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
  const [state, setState] = useState<AddIconType>({
    showSearch: false,
    emailList: [],
  });
  const {chattables} = useContent();

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
    const emailList = chattables.filter(({email}) => text === email);
    handleState('emailList', emailList);
  }

  const renderEmailList = ({item}: ListRenderItemInfo<ChattableType>) => {
    return (
      <TouchableOpacity>
        <Text>{item.email}</Text>
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
        <View className="mx-auto my-auto h-1/5 w-5/6 rounded-lg bg-white p-4">
          <TextInput
            className={`${
              state.showSearch ? 'w-full' : 'w-1/2'
            } absolute mt-4 self-center rounded-full bg-slate-200 px-4 duration-500 ease-in-out`}
            onChangeText={handleSearch}
          />
          <FlatList
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
