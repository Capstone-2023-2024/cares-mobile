import {icon, imageDimension} from 'cics-mobile-client/../../shared/images';
import React from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {type ImagePickerResponse} from 'react-native-image-picker';
import IconButton from '~/components/IconButton';

interface InputContainerType {
  handleImagePicker: () => void;
  handleSendMessage: () => void;
  selectMultipleFile: () => Promise<void>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  filePath: ImagePickerResponse | null;
}

const InputContainer = (props: InputContainerType) => {
  const {
    handleImagePicker,
    handleSendMessage,
    setMessage,
    message,
    filePath,
    selectMultipleFile,
  } = props;

  return (
    <View className="absolute bottom-0 right-0 h-12 w-3/4 flex-row items-center rounded-lg bg-primary p-2">
      <TouchableOpacity onPress={selectMultipleFile} className="mx-2">
        <Image
          source={require('~/assets/attach-image.png')}
          src={filePath === null ? '' : (filePath as string)}
          {...imageDimension(icon)}
        />
      </TouchableOpacity>
      <IconButton
        uri={require('~/assets/attach-image.png')}
        onPress={handleImagePicker}
      />
      <TextInput
        value={message}
        onChangeText={text => setMessage(text)}
        placeholder="Type your message here..."
        className="m-2 flex-1 rounded-full bg-paper p-4 text-lg"
        multiline
      />
      <IconButton
        uri={require('~/assets/send.png')}
        onPress={handleSendMessage}
      />
    </View>
  );
};

export default InputContainer;
