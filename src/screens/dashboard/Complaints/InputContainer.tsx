import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {type ImagePickerResponse} from 'react-native-image-picker';
import {DocumentSvg, PhotoSvg, SendSvg} from '~/utils/image';

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
    <View className="absolute bottom-0 h-16 w-full flex-row items-center rounded-lg bg-primary p-2">
      <TouchableOpacity onPress={selectMultipleFile} className="mx-2">
        <TouchableOpacity onPress={selectMultipleFile} className="w-8">
          <DocumentSvg />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleImagePicker} className="mr-2 w-8">
        <PhotoSvg />
      </TouchableOpacity>
      <TextInput
        value={message}
        onChangeText={text => setMessage(text)}
        placeholder="Type your message here..."
        className="flex-1 rounded-lg bg-paper"
        // multiline
      />
      <TouchableOpacity onPress={handleSendMessage} className="w-8">
        <SendSvg />
      </TouchableOpacity>
    </View>
  );
};

export default InputContainer;
