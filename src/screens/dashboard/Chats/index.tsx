import React, {useCallback, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Text} from '~/components';
import IconButton from '~/components/IconButton';
import ChatBox from './ChatBox';
import ChatHead from './ChatHead';
import ChatNav from './ChatNav';
import InputContainer from './InputContainer';

const Chats = () => {
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

  function handleSendMessage() {
    if (message.trim() !== '') {
      // chatColReference.
      setMessage('');
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
    <View className="relative flex-1 bg-violet-300">
      <ChatNav />
      <View className="absolute right-0 top-16 w-3/4 bg-tertiary">
        <View className="w-full flex-row justify-around rounded-xl bg-primary p-2">
          <Text className="text-lg font-semibold">Gian Carlo Carranza</Text>
          <IconOptions />
        </View>
        <Categories />
      </View>
      <ChatHead />
      <ChatBox />
      <InputContainer {...inputContainerProps} />
    </View>
  );
};

const IconOptions = () => {
  return (
    <View className="flex-row items-center justify-center">
      <IconButton uri={require('~/assets/phone-call.png')} />
      <IconButton uri={require('~/assets/video-call.png')} />
      <IconButton uri={require('~/assets/ellipsis.png')} />
    </View>
  );
};

const Categories = () => {
  return (
    <View className="w-1/2 flex-row">
      <CategoryButton name="Complains" />
      <CategoryButton name="Announcements" />
    </View>
  );
};

const CategoryButton = ({name}: {name: string}) => {
  return (
    <TouchableOpacity className="w-full border bg-paper">
      <Text className="px-2 text-center text-xs font-semibold text-black">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Chats;
