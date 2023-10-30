import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {useAuth} from '~/contexts/AuthContext';
import {useChat} from '~/contexts/ChatContext';
import {useContent} from '~/contexts/ContentContext';
import type {ConcernProps, DocumentProps} from '~/types/complaints';
import {collectionRef} from '~/utils/firebase';

export interface InitiatStateProps {
  message: string;
  files: DocumentPickerResponse[];
}
export type InitiatStateValue =
  | InitiatStateProps['message']
  | InitiatStateProps['files'];

const InputContainer = () => {
  const initProps: InitiatStateProps = {
    message: '',
    files: [],
  };
  const {currentUser} = useAuth();
  const {handleUsersCache} = useContent();
  const {selectedChat} = useChat();
  const [state, setState] = useState(initProps);

  function handleState(key: keyof InitiatStateProps, value: InitiatStateValue) {
    setState(prevState => ({...prevState, [key]: value}));
  }
  async function selectMultipleFile() {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      handleState('files', results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled from multiple doc picker');
      } else {
        console.log(err);
      }
    }
  }
  async function handleSendMessage() {
    try {
      const usersCache = await handleUsersCache();
      const filteredUser = usersCache.filter(
        ({email}) => currentUser?.email === email,
      );
      if (state.message.trim() !== '' && filteredUser.length > 0) {
        const isImage = state.files.length > 0;
        const id = filteredUser[0]?.studentNo ?? '';
        let concern: Omit<ConcernProps, 'id'> = {
          message: state.message,
          withDocument: isImage,
          sender: currentUser?.email ?? '',
          dateCreated: new Date().getTime(),
        };
        if (isImage && state.files !== null) {
          const holder: DocumentProps['files'] = [];
          state.files.forEach(({name}) => {
            holder.push(name ?? '');
          });
          concern = {...concern, files: holder};
        }
        await collectionRef('student')
          .doc(selectedChat === 'board_member' ? id : selectedChat ?? id)
          .collection('concerns')
          .add(concern);
        handleState('message', initProps.message);
        isImage && handleUploadImage();
      }
    } catch (err) {
      ToastAndroid.show('Error in sending message', ToastAndroid.SHORT);
    }
  }
  async function handleUploadImage() {
    try {
      void state.files.forEach(async ({uri}) => {
        const name = new Date().toDateString();
        const reference = storage().ref(
          `concerns/${currentUser?.email}/${name}`,
        );
        await reference.putFile(uri);
      });
      handleState('files', []);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View className="border-top-1 absolute bottom-2 h-16 w-full flex-row items-center rounded-lg border-primary bg-paper p-2">
      {/* <TouchableOpacity onPress={selectMultipleFile} className="mx-2"> */}
      {/* <TouchableOpacity onPress={selectMultipleFile} className="w-8">
          <DocumentSvg />
        </TouchableOpacity> */}
      {/* </TouchableOpacity> */}
      <TouchableOpacity onPress={selectMultipleFile} className="mr-2">
        <Image
          source={require('~/assets/add_document.png')}
          className="h-8 w-8"
        />
      </TouchableOpacity>
      <TextInput
        value={state.message}
        onChangeText={text => handleState('message', text)}
        placeholder="Type your message here..."
        className="mr-2 flex-1 rounded-lg border border-primary bg-paper"
        // multiline
      />
      <TouchableOpacity onPress={handleSendMessage}>
        <Image source={require('~/assets/send.png')} className="h-8 w-8" />
      </TouchableOpacity>
    </View>
  );
};

export default InputContainer;
