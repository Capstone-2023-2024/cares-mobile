import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View, Image, Modal} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useChat} from '~/contexts/ChatContext';
import {useContent} from '~/contexts/ContentContext';
import type {ChatTextProps, ConcernProps} from '~/types/complaints';
import {collectionRef} from '~/utils/firebase';
import storage from '@react-native-firebase/storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatBox = () => {
  const {role} = useContent();
  const {currentUser} = useAuth();
  const {selectedChat, otherConcerns} = useChat();
  const [state, setState] = useState<ConcernProps[]>([]);

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
            const placeholder: ConcernProps[] = [];
            const reversedArray = snapshot.docs.reverse();
            reversedArray.forEach(async doc => {
              const id = doc.id;
              const data = doc.data() as Omit<ConcernProps, 'id'>;
              const fileHolder: string[] = [];
              data.files?.forEach(async fileName => {
                const url = await storage()
                  .ref(`concerns/${currentUser?.email}/${fileName}`)
                  .getDownloadURL();
                fileHolder.push(url);
              });
              placeholder.push({...data, id, files: fileHolder});
            });
            setState(placeholder);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentUser]);

  useEffect(() => {
    if (role === 'mayor') {
      if (selectedChat === 'board_member') {
        return void getConcerns();
      }
      return;
    }
    return void getConcerns();
  }, [getConcerns, role, selectedChat]);

  function renderChatBox(concerns: ConcernProps[]) {
    return concerns.map(
      ({id, sender, message, dateCreated, withDocument, files}) => {
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
            {withDocument && (
              <View>
                {files?.map((value, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <Modal>
                        <Image
                          source={require('~/assets/error.svg')}
                          src={value}
                          className="h-screen w-screen"
                        />
                      </Modal>
                      <Image
                        source={require('~/assets/error.svg')}
                        src={value}
                        className="h-32 w-32"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            {sender !== 'system' && (
              <ChatText
                text={sender ?? currentUser?.displayName}
                condition={sender === currentUser?.email}
              />
            )}
            <ChatText
              text={message}
              condition={sender === currentUser?.email}
            />
            <ChatText
              textSize="sm"
              text={date.toLocaleTimeString()}
              condition={sender === currentUser?.email}
            />
          </View>
        );
      },
    );
  }

  return (
    <View
      className={`${
        role === 'mayor' || role === 'adviser' ? 'h-3/5' : 'h-4/5'
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
