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

const Chats = () => {
  return (
    <ChatProvider>
      <ChatChildren />
    </ChatProvider>
  );
};

const ChatChildren = () => {
  const {currentUser} = useAuth();
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
      const studentSnap = await collectionRef('student')
        .where('email', '==', currentUser?.email)
        .get();
      if (message.trim() !== '' && !studentSnap.empty) {
        const id = studentSnap.docs[0]?.id;
        const newDate = new Date();
        const year = newDate.getFullYear().toString();
        const month = newDate.getMonth().toString();
        const date = newDate.getDate().toString();
        await collectionRef('concerns')
          .doc(id)
          .set({dateUpdated: newDate.getTime()});
        await collectionRef('concerns')
          .doc(id)
          .collection(`${year}-${month}-${date}`)
          .add({
            message,
            withDocument: false,
            sender: currentUser?.email,
            dateCreated: newDate.getTime(),
          });
        // chatColReference.
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

  return (
    <View className="relative flex-1">
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
