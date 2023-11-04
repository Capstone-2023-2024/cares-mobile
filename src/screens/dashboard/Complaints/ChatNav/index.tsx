import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ToastAndroid, TouchableOpacity, Modal, View} from 'react-native';
import {Text} from '~/components';
import BackHeader from '~/components/BackHeader';
import {useChat} from '~/contexts/ChatContext';
import {useContent} from '~/contexts/ContentContext';
import {ConcernProps} from '~/types/complaints';
import {collectionRef} from '~/utils/firebase';
import ChatPrivilege from '../ChatPrivilege';

const ChatNav = () => {
  const {role} = useContent();
  const {
    handleChatModalVisible,
    handleSelectedChat,
    selectedChat,
    handleOtherConcerns,
  } = useChat();
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const condition = selectedChat === null || selectedChat === 'board_member';

  function handleGoBack() {
    navigation.goBack();
  }
  async function handleActionEvent(type: 'resolve' | 'reject' | 'turnover') {
    const concern: Omit<ConcernProps, 'id'> = {
      sender: 'system',
      withDocument: false,
      dateCreated: new Date().getTime(),
      message:
        type === 'resolve'
          ? 'resolved'
          : type === 'turnover'
          ? 'turnover to bm'
          : 'rejected',
    };
    if (selectedChat !== null) {
      try {
        await collectionRef('student')
          .doc(selectedChat)
          .collection('concerns')
          .add(concern);
        await collectionRef('student')
          .doc(selectedChat)
          .update({recipient: type === 'turnover' ? 'bm' : 'class_section'});
      } catch (err) {
        ToastAndroid.show('Error in handling rejection', ToastAndroid.SHORT);
      }
    }
    handleSelectedChat(null);
    type === 'turnover' && handleOtherConcerns([]);
  }

  return (
    <View className="bg-primary">
      <Modal
        animationType="slide"
        visible={modal}
        transparent
        onRequestClose={() => setModal(false)}>
        <View className="m-auto h-1/4 w-5/6 rounded-lg bg-primary p-6 shadow-sm">
          <Text className="text-center text-lg font-bold text-paper">Info</Text>
          <Text className="my-auto h-max text-paper">
            Communicate with your class mayor and adviser direcly here regarding
            concerns, if it is not resolved, it will be escalated to higher
            position in CICS
          </Text>
        </View>
      </Modal>
      <View className="h-16 flex-row items-center px-2">
        <BackHeader />
        <View className="flex-1 flex-row items-center justify-center">
          <Text className="text-xl text-white">Complaints/Concerns</Text>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Text className="ml-2 rounded-full border border-paper px-3 py-1 text-sm text-paper">
              i
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ChatPrivilege />
      {(role === 'mayor' || role === 'adviser') && (
        <View className="shadow-md">
          <View className="mb-2 flex-row items-center justify-evenly">
            <TouchableOpacity
              disabled={condition}
              onPress={() => void handleActionEvent('resolve')}
              className={`${
                condition ? 'bg-slate-200' : 'bg-green-400'
              } w-24 rounded-lg p-2`}>
              <Text
                className={`${
                  condition ? 'text-slate-300' : 'text-white'
                } text-center capitalize`}>
                resolve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={condition}
              onPress={() => void handleActionEvent('turnover')}
              className={`${
                condition ? 'bg-slate-200' : 'bg-yellow-400'
              } w-24 rounded-lg p-2`}>
              <Text
                className={`${
                  condition ? 'text-slate-300' : 'text-white'
                } text-center capitalize`}>
                turn-over
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={condition}
              onPress={() => void handleActionEvent('reject')}
              className={`${
                condition ? 'bg-slate-200' : 'bg-red-400'
              } w-24 rounded-lg p-2`}>
              <Text
                className={`${
                  condition ? 'text-slate-300' : 'text-white'
                } text-center capitalize`}>
                reject
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-evenly pb-2">
            <TouchableOpacity
              className="w-32 bg-paper p-2"
              onPress={() => handleChatModalVisible(true)}>
              <Text className="text-center capitalize text-primary">
                concerns
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // disabled={selectedChat === 'board_member'}
              className={`${
                selectedChat === 'board_member' ? 'bg-secondary' : 'bg-paper'
              } w-32 p-2`}
              onPress={() =>
                handleSelectedChat(
                  selectedChat === 'board_member' ? null : 'board_member',
                )
              }>
              <Text
                className={`${
                  selectedChat === 'board_member'
                    ? 'text-paper'
                    : 'text-primary'
                } text-center capitalize`}>
                board member
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChatNav;
