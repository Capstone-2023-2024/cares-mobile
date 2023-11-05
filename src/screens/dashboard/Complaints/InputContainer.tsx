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
import {useUser} from '~/contexts/UserContext';
import type {ConcernProps, DocumentProps} from '~/types/complaints';
import {collectionRef} from '~/utils/firebase';

export interface InitiatStateProps {
  message: string;
  files: DocumentPickerResponse[];
}

const InputContainer = () => {
  const initProps: InitiatStateProps = {
    message: '',
    files: [],
  };
  const {currentUser} = useAuth();
  const {role, currentStudent} = useUser();
  const {selectedChat} = useChat();
  const [state, setState] = useState(initProps);

  async function selectMultipleFile() {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setState(prevState => ({...prevState, files: results}));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        ToastAndroid.show(
          'Canceled from multiple doc picker',
          ToastAndroid.SHORT,
        );
      } else {
        // console.log(err);
        Alert.alert('Image picker error');
      }
    }
  }
  async function handleUploadImage(names: string[]) {
    try {
      state.files.forEach(async ({uri}, index) => {
        console.log({uri, names});
        const reference = storage().ref(
          `concerns/${currentUser?.email}/${names[index]}`,
        );
        await reference.putFile(uri);
      });
      setState(prevState => ({...prevState, files: []}));
    } catch (err) {
      ToastAndroid.show('Error', ToastAndroid.SHORT);
      // console.log(err);
    }
  }
  async function handleSendMessage() {
    try {
      if (state.message.trim() !== '' && currentStudent.studentNo !== 'null') {
        const isImage = state.files.length > 0;
        const id = currentStudent.studentNo;
        let concern: Omit<ConcernProps, 'id'> = {
          message: state.message,
          withDocument: isImage,
          sender: currentUser?.email ?? '',
          dateCreated: new Date().getTime(),
        };
        if (isImage && state.files !== null) {
          const holder: DocumentProps['files'] = [];
          state.files.forEach((v, index) => {
            const date = new Date();
            const ISOString = date
              .toISOString()
              .substring(0, 10)
              .replace(/-/g, '_');
            const time = date.toTimeString().substring(0, 5).replace(':', '');
            const divider = '_';
            const fileName = `${ISOString}${divider}${time}${divider}${index}.png`;
            holder.push(fileName ?? '');
          });
          concern = {...concern, files: holder};
          isImage && handleUploadImage(holder);
        }
        await collectionRef('student')
          .doc(selectedChat === 'board_member' ? id : selectedChat ?? id)
          .collection('concerns')
          .add(concern);
        setState(prevState => ({...prevState, message: initProps.message}));
      }
    } catch (err) {
      ToastAndroid.show('Error in sending message', ToastAndroid.SHORT);
    }
  }

  return (
    <View className="border-top-1 absolute bottom-2 h-16 w-full flex-row items-center rounded-lg border-primary bg-paper p-2">
      <TouchableOpacity
        disabled={currentStudent.email === 'null'}
        onPress={selectMultipleFile}
        className="mr-2">
        <Image
          source={require('~/assets/add_document.png')}
          className="h-8 w-8"
        />
      </TouchableOpacity>
      <TextInput
        value={state.message}
        onChangeText={text =>
          role !== null
            ? setState(prevState => ({...prevState, message: text}))
            : Alert.alert('Cannot enter message')
        }
        placeholder="Type your message here..."
        className="mr-2 flex-1 rounded-lg border border-primary bg-paper"
        multiline
      />
      <TouchableOpacity disabled={role === null} onPress={handleSendMessage}>
        <Image source={require('~/assets/send.png')} className="h-8 w-8" />
      </TouchableOpacity>
    </View>
  );
};

export default InputContainer;
