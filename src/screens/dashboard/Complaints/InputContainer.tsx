import React from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {type ImagePickerResponse} from 'react-native-image-picker';

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
    // filePath,
    selectMultipleFile,
  } = props;

  return (
    <View className="border-top-1 absolute bottom-2 h-16 w-full flex-row items-center rounded-lg border-primary bg-paper p-2">
      <TouchableOpacity onPress={selectMultipleFile} className="mx-2">
        {/* <TouchableOpacity onPress={selectMultipleFile} className="w-8">
          <DocumentSvg />
        </TouchableOpacity> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleImagePicker} className="mr-2">
        <Image
          source={require('~/assets/add_document.png')}
          className="h-8 w-8"
        />
      </TouchableOpacity>
      <TextInput
        value={message}
        onChangeText={text => setMessage(text)}
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
