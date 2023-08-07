import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Platform, PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import BackHeader4Chat from '~/components/headers/BackHeader4Chat';

const ell = '~/assets/ellipsis.png';
const pho = '~/assets/phone-call.png';
const vid = '~/assets/video-call.png';
const file = '~/assets/attach-file.png';
const img = '~/assets/attach-image.png';
const send = '~/assets/send.png';
const user = '~/assets/user1.jpg';


const Chats = () => {
  
  const [singleFile, setSingleFile] = useState('');
  const [multipleFile, setMultipleFile] = useState([]);

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      setMultipleFile(results)
      //Setting the state to show multiple file attributes
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: Math.random().toString(), // Generate a unique ID for the message
        text: message.trim(),
        sender: 'user', // You can use 'user' or 'receiver' depending on who is sending the message
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(''); // Clear the message input after sending
    }
  };

  const scrollViewRef = useRef();

  // Function to scroll to the last message whenever messages change
  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  // Function to scroll to the last message
  const scrollToLastMessage = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleImagePicker = useCallback(() => {
    const options = {
      mediaType: 'photo', // Change this to 'video' if you want to select videos
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

  launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode === 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode === 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode === 'others') {
        console.log(response.errorMessage);
      } else {
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      }
    });
  }, []);



  return (
    
    <View>
      <BackHeader4Chat />
        <View style={styles.chat}>
          <View style={styles.chatContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Gian Carlo Carranza</Text>
            <View style={styles.options}>
              <TouchableOpacity style={styles.ellipsisButton}>
                <Image source={require(pho)} style={styles.ellipsisIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ellipsisButton}>
                <Image source={require(vid)} style={styles.ellipsisIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ellipsisButton}>
                <Image source={require(ell)} style={styles.ellipsisIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.categories}>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', color: 'black', paddingLeft: '2%' }}>Complains</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', color: 'black' }}>Concerns</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity>
              <Text style={{ fontWeight: '500', color: 'black', paddingRight: '2%' }}>Announcements</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={selectMultipleFile} style={{marginLeft:'3%'}}>
          <Image source={require(file)} style={{width:30,height:30,marginLeft:'3%'}} /></TouchableOpacity>
          <TouchableOpacity onPress={handleImagePicker}>
          <Image source={require(img)} style={{width:30,height:30, marginRight:'3%',marginLeft:'3%'}} /></TouchableOpacity>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Type your message here..."
            style={styles.input}
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage}>
          <Image source={require(send)} style={{width:30,height:30,marginRight:'4%'}} />
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.chatpeople}>
          <ScrollView>
            <ChatPeopleContainer />
            <ChatPeopleContainer />
            <ChatPeopleContainer />
            <ChatPeopleContainer />
          </ScrollView>
        </View>
        <View style={styles.chatbox}>
          <ScrollView ref={scrollViewRef}>
    {messages.map((message) => (
      <View key={message.id} style={[styles.messageWrapper, message.sender === 'user' ? styles.userMessageWrapper : styles.receiverMessageWrapper]}>
        {message.sender === 'user' && (
          <Image
            source={require(user)} // Replace 'user' with the correct variable representing the sender's profile picture path
            style={styles.senderProfilePicture}
          />
        )}
        <View style={[styles.messageContainer, message.sender === 'user' ? styles.userMessage : styles.receiverMessage]}>
          <Text style={styles.messageText}>{message.text}</Text>
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
      <View style={styles.people}>
        <Text style={{ color: 'black' }}>Gian Carlo Carranza</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrImage: {
    marginTop: '5%',
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 20,
  },
  Title: {
    position: 'relative',
    fontSize: 35,
    fontWeight: '600',
    color: 'rgb(118,52,53)',
    marginTop: '-9%',
    textAlign: 'center',
  },
  chat: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(118,52,53)',
  },
  chatpeople: {
    width: '25%',
    height: 614,
    backgroundColor: 'rgb(118,52,53)',
    borderTopWidth: 1,
    borderRightWidth: 2,
  },
  people: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    backgroundColor: 'rgb(217,217,217)',
  },
  chatContainer: {
    flexDirection: 'row', // Aligns the text and ellipsis button in a row// Distributes space between text and ellipsis button
    alignItems: 'center', // Aligns the items vertically centered
    marginLeft: '27%',
    marginTop: '13%',
    width: '71%',
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    paddingHorizontal: 10, // Add some padding for better spacing
  },
  ellipsisButton: {
    width: 35,
    height: 35,
  },
  ellipsisIcon: {
    width: '75%',
    height: '75%',
  },
  options:{
    flexDirection: 'row', // Aligns the text and ellipsis button in a row// Distributes space between text and ellipsis button
    alignItems: 'center',
    left:'20%',
    top:'10%',
  },
  categories: {
    flexDirection: 'row', // Aligns the text and ellipsis button in a row// Distributes space between text and ellipsis button
    alignItems: 'center', // Aligns the items vertically centered
    justifyContent:'space-between',
    marginLeft: '26%',
    marginTop: '2%',
    width: '73%',
    height: 25,
    backgroundColor: 'lightgray',
    paddingHorizontal: 10, // Add some padding for better spacing
  },
  divider: {
    width: 1,
    height: '100%', // Adjust the height as needed
    backgroundColor: 'black', // Change the color of the divider as needed
    justifyContent:'space-between',
  },
  chatbox: {
    position:'absolute',
    marginLeft: '27%',
    marginTop: '50%',
    width: '71%',
    height: 440, // Limit the maximum height of the chatbox to avoid it going beyond the screen
    backgroundColor: 'lightblue',
    borderRadius: 15,
    paddingHorizontal: 10, // Add some padding for better spacing
    overflow: 'hidden', // Hide any content beyond the maxHeight
  },
  messageContainer: {
    marginBottom: 8,
    marginTop:8,
    marginRight:5,
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%', // Limit the maximum width of the message container
    alignSelf: 'flex-start',
  },
  userMessageWrapper: {
    flexDirection: 'row-reverse', // Align the items from right to left for user messages
    alignItems: 'center', // Vertically align the items in the center
  },
  receiverMessageWrapper: {
    flexDirection: 'row', // Align the items from left to right for receiver messages
    alignItems: 'center', // Vertically align the items in the center
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgray', // Replace with the background color for the sender's messages
  },
  receiverMessage: {
    backgroundColor: 'white', // Replace with the background color for the receiver's messages
  },
  senderProfilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: '0%', // Add some space between the profile picture and the message text
  },
  messageText: {
    fontSize: 14,
    color:'black',
  },
  inputContainer: {
    flexDirection: 'row', // Align the TextInput and "Send" button in a row
    alignItems: 'center', // Vertically align items in the center
    marginLeft:'27%',
    marginTop:'107%',
    width:'70%',
    borderRadius:25,
    height:55,
    paddingTop:4,
    paddingBottom:4,
    backgroundColor:'lightgray', // Adjust the margin as needed
  },
  input: {
    borderWidth:1,
    flex: 1, // Take up the available space inside the chatbox
    fontSize: 14,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 8, // Add some space between the TextInput and the "Send" button
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
});



export default Chats;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}