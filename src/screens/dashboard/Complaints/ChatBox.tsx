import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import type {ChatTextProps, ConcernProps} from '~/types/complaints';
import {collectionRef} from '~/utils/firebase';

const ChatBox = () => {
  const {currentUser} = useAuth();
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
            if (!snapshot.empty) {
              const reversedArray = snapshot.docs.reverse();
              reversedArray.forEach(doc => {
                const data = doc.data() as Omit<ConcernProps, 'id'>;
                const id = doc.id;
                placeholder.push({...data, id});
              });
            }
            setState(placeholder);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentUser]);

  useEffect(() => {
    return void getConcerns();
  }, [getConcerns]);

  function renderChatBox() {
    return state.map(({id, sender, message, dateCreated}) => {
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

  return (
    <View className="mt-4 h-4/5">
      <ScrollView>{renderChatBox()}</ScrollView>
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
