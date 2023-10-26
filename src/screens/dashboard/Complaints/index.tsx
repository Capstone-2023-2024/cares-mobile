import React, {useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import ChatProvider from '~/contexts/ChatContext';
import {collectionRef} from '~/utils/firebase';
import ChatBox from './ChatBox';
import ChatNav from './ChatNav';
import InputContainer from './InputContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StudentWithClassSection} from '~/types/student';
import {ConcernProps} from '~/types/complaints';
import {useContent} from '~/contexts/ContentContext';
import ChatPrivilege from './ChatPrivilege';

const Chats = () => {
  return (
    <ChatProvider>
      <ChatChildren />
    </ChatProvider>
  );
};

const ChatChildren = () => {
  const {currentUser} = useAuth();
  const {privilege} = useContent();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<DocumentPickerResponse[]>([]);
  const [filePath, setFilePath] = useState<ImagePickerResponse | null>(null);

  async function selectMultipleFile() {
    try {
      Alert.alert(file.toString());
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled from multiple doc picker');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  async function handleSendMessage() {
    try {
      const studentQuery = await collectionRef('student')
        .where('email', '==', currentUser?.email)
        .get();
      if (message.trim() !== '' && !studentQuery.empty) {
        const id = studentQuery.docs[0]?.id ?? '';
        const concern: Omit<ConcernProps, 'id'> = {
          message,
          withDocument: false,
          sender: currentUser?.email ?? '',
          dateCreated: new Date().getTime(),
        };
        await collectionRef('student')
          .doc(id)
          .collection('concerns')
          .add(concern);
        setMessage('');
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleImagePicker = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      const {didCancel, errorCode, errorMessage} = response;
      if (didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (errorCode === 'camera_unavailable') {
        Alert.alert('Camera not available on device');
      } else if (errorCode === 'permission') {
        Alert.alert('Permission not satisfied');
      } else if (errorCode === 'others') {
        Alert.alert(errorMessage ?? '');
      } else {
        setFilePath(response);
      }
    });
  }, []);
  const inputContainerProps = {
    handleImagePicker,
    handleSendMessage,
    selectMultipleFile,
    setMessage,
    message,
    filePath,
  };

  console.log({privilege});

  return (
    <View className="relative flex-1">
      {privilege && <ChatPrivilege />}
      <ChatNav />
      <ChatBox />
      <InputContainer {...inputContainerProps} />
    </View>
  );
};

const IconOptions = () => {
  return (
    <View className="flex-row items-center justify-center">
      <Text>Info</Text>
    </View>
  );
};

export default Chats;
