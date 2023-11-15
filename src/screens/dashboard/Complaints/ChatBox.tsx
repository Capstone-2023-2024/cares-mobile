import React, {useCallback, useEffect, useState} from 'react';
import {Image, Modal, ScrollView, ToastAndroid, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useChat} from '~/contexts/ChatContext';
import {useUser} from '~/contexts/UserContext';
import type {ChatTextProps, ConcernProps} from '~/types/complaints';
import {collectionRef} from '~/utils/firebase';

const ChatBox = () => {
  const {role} = useUser();
  const {currentUser} = useAuth();
  const {selectedChat, otherConcerns} = useChat();
  const [state, setState] = useState<ConcernProps[]>([]);
  const [imageToggle, setImageToggle] = useState<boolean[]>([]);

  const getConcerns = useCallback(async () => {
    try {
      const studentSnap = await collectionRef('student')
        .where('email', '==', currentUser?.email)
        .get();
      if (!studentSnap.empty) {
        const id = studentSnap.docs[0]?.id;
        return collectionRef('student')
          .doc(id)
          .collection('concerns')
          .limit(12)
          .orderBy('dateCreated', 'desc')
          .onSnapshot(snapshot => {
            // console.log(snapshot.size, 'Concerns');
            const placeholder: ConcernProps[] = [];
            const reversedArray = snapshot.docs.reverse();
            reversedArray.forEach(async doc => {
              const docId = doc.id;
              const data = doc.data() as Omit<ConcernProps, 'id'>;
              placeholder.push({...data, id: docId});
            });
            setState(placeholder);
          });
      }
    } catch (err) {
      // console.log(err);
      ToastAndroid.show('Error in getting concerns', ToastAndroid.SHORT);
    }
  }, [currentUser]);

  async function handleDownload({name}: {name: string}) {
    // const reference = storage().ref(`concerns/${currentUser?.email}/${name}`);
    // const url = await reference.getDownloadURL();
    ToastAndroid.show(`${name}`, ToastAndroid.SHORT);
  }
  function toggleIndex(value: boolean, index: number) {
    let holder = [...imageToggle];
    holder[index] = value;
    setImageToggle(holder);
  }
  const renderPhotos = (array?: string[]) => {
    const HOST = 'https://firebasestorage.googleapis.com';
    const divider_1 = '/v0/b/';
    const STORAGE_BUCKET = 'cics-a78de.appspot.com';
    const divider_2 = '/o/';
    const space = '%2F';
    const concern = `concerns${space}`;
    const email = (currentUser?.email ?? '').replace('@', '%40');
    const prefixUrl = `${HOST}${divider_1}${STORAGE_BUCKET}${divider_2}${concern}${email}${space}`;
    return array?.map((value, index) => {
      const URL = `${prefixUrl}${value}?alt=media`;
      return (
        <TouchableOpacity
          key={value}
          onLongPress={() => handleDownload({name: value})}
          onPress={() => toggleIndex(true, index)}>
          <Modal
            visible={
              imageToggle[index] === undefined ? false : imageToggle[index]
            }
            animationType="fade"
            onRequestClose={() => toggleIndex(false, index)}>
            <View className="bg-primary p-2">
              <Text className="text-paper">{value}</Text>
            </View>
            <Image
              source={require('~/assets/error.svg')}
              src={URL}
              className="h-screen w-screen"
            />
          </Modal>
          <Image
            source={require('~/assets/error.svg')}
            src={URL}
            className="h-32 w-32"
          />
        </TouchableOpacity>
      );
    });
  };

  function renderChatBox(concerns: ConcernProps[]) {
    return concerns.map(({id, sender, message, dateCreated, files}) => {
      const date = new Date();
      date.setTime(dateCreated);
      return (
        <View
          key={id}
          className={`m-2 w-max rounded-lg p-2 shadow-sm ${
            sender === currentUser?.email
              ? 'self-end bg-blue-400'
              : sender === 'system'
              ? 'self-center text-center'
              : 'self-start bg-slate-200'
          }`}>
          {sender !== 'system' && (
            <ChatText
              text={sender ?? currentUser?.displayName}
              condition={sender === currentUser?.email}
            />
          )}
          {files !== undefined && files.length > 0 && (
            <View
              className={`${
                files.length > 0 ? 'justify-between' : 'justify-center'
              } w-full items-center`}>
              {renderPhotos(files)}
            </View>
          )}
          <ChatText text={message} condition={sender === currentUser?.email} />
          <ChatText
            textSize="sm"
            text={date.toLocaleTimeString()}
            condition={sender === currentUser?.email}
          />
        </View>
      );
    });
  }

  useEffect(() => {
    if (role === 'mayor') {
      if (selectedChat === 'board_member') {
        return void getConcerns();
      }
      return;
    }
    return void getConcerns();
  }, [getConcerns, role, selectedChat]);

  return (
    <View
      className={`${
        role === 'mayor' || role === 'adviser' ? 'h-3/5 w-4/5' : 'h-4/5'
      } mt-4`}>
      <ScrollView>
        {renderChatBox(
          selectedChat === 'board_member' || role !== 'mayor'
            ? state
            : otherConcerns,
        )}
      </ScrollView>
    </View>
  );
};

const ChatText = ({text, condition, textSize}: ChatTextProps) => {
  function getTextSize() {
    if (textSize === 'xs') {
      return 'text-xs';
    } else if (textSize === 'sm') {
      return 'text-sm';
    } else if (textSize === 'lg') {
      return 'text-lg';
    } else if (textSize === 'xl') {
      return 'text-xl';
    }
    return 'text-md';
  }
  return (
    <Text
      className={`${
        condition
          ? 'text-white'
          : text === 'resolved'
          ? 'text-green-400'
          : text === 'rejected'
          ? 'text-red-400'
          : text.substring(0, 4) === 'turn'
          ? 'text-yellow-400'
          : 'text-black'
      } ${getTextSize()}`}>
      {text}
    </Text>
  );
};

export default ChatBox;
