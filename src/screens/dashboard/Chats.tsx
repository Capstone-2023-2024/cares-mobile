import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker, {
  type DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  type ImageLibraryOptions,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import BackHeader4Chat from '~/components/headers/BackHeader4Chat';

const ell = '~/assets/ellipsis.png';
const pho = '~/assets/phone-call.png';
const vid = '~/assets/video-call.png';
const file = '~/assets/attach-file.png';
const img = '~/assets/attach-image.png';
const send = '~/assets/send.png';
const user = '~/assets/user1.jpg';

interface MessageType {
  id: string;
  text: string;
  sender: string;
}

const Chats = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [filePath, setFilePath] = useState<ImagePickerResponse>();
  const [multipleFile, setMultipleFile] = useState<DocumentPickerResponse[]>(
    [],
  );
  const scrollViewRef = useRef<ScrollView | null>(null);

  async function selectMultipleFile() {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setMultipleFile(results);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: Math.random().toString(),
        text: message.trim(),
        sender: 'user',
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  useEffect(() => {
    let unsub = true;
    function setUp() {
      console.log(filePath, multipleFile);
      scrollToLastMessage();
    }
    if (unsub) {
      setUp();
    }
    return () => {
      unsub = false;
    };
  }, [messages, filePath, multipleFile]);

  const scrollToLastMessage = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const handleImagePicker = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      try {
        response.didCancel
          ? console.log('User cancelled image picker')
          : setFilePath(response);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  return (
    <View>
      <BackHeader4Chat />
      <View>
        <View>
          <Text>Gian Carlo Carranza</Text>
          <View>
            <TouchableOpacity>
              <Image source={require(pho)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require(vid)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require(ell)} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Complains</Text>
          </TouchableOpacity>
          <View />
          <TouchableOpacity>
            <Text>Concerns</Text>
          </TouchableOpacity>
          <View />
          <TouchableOpacity>
            <Text>Announcements</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={selectMultipleFile}>
            <Image source={require(file)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image source={require(img)} />
          </TouchableOpacity>
          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Type your message here..."
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Image source={require(send)} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ScrollView>
          <ChatPeopleContainer />
          <ChatPeopleContainer />
          <ChatPeopleContainer />
          <ChatPeopleContainer />
        </ScrollView>
      </View>
      <View>
        <ScrollView ref={scrollViewRef}>
          {messages.map(({id, sender, text}) => (
            <View key={id}>
              {sender === 'user' && (
                <Image
                  source={require(user)} // Replace 'user' with the correct variable representing the sender's profile picture path
                />
              )}
              <View>
                <Text>{text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const ChatPeopleContainer = () => {
  return (
    <TouchableOpacity>
      <View>
        <Text>Gian Carlo Carranza</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chats;
