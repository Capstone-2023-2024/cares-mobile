import React, {useState} from 'react';
import {Image, Modal, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useChat} from '~/contexts/ChatContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';
import {ConcernProps} from '~/types/complaints';
import {collectionRef} from '~/utils/firebase';

const ChatNav = () => {
  const {role} = useUser();
  const {handleSelectedChat, selectedChat, handleOtherConcerns} = useChat();
  const {handleNavigation, initialRouteName} = useNav();
  const {currentStudent} = useUser();
  const [modal, setModal] = useState(false);
  const condition =
    selectedChat === null ||
    selectedChat === 'adviser' ||
    currentStudent.email === 'null';

  function handlePressRoute() {
    handleNavigation(initialRouteName);
  }

  // function handleGoBack() {
  //   navigation.goBack();
  // }
  async function handleActionEvent(type: 'resolve' | 'turnover') {
    const concern: Omit<ConcernProps, 'id'> = {
      sender: 'system',
      withDocument: false,
      dateCreated: new Date().getTime(),
      message: type === 'resolve' ? 'resolved' : 'turnover to bm',
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
        visible={modal}
        animationType="slide"
        transparent
        onRequestClose={() => setModal(false)}>
        <TouchableOpacity
          activeOpacity={1}
          className="transparent h-full w-full"
          onPressOut={() => setModal(false)}>
          <View className="m-auto h-1/4 w-5/6 rounded-lg bg-primary p-6 shadow-sm">
            <Text className="text-center text-lg font-bold text-paper">
              Info
            </Text>
            <Text className="my-auto h-max text-paper">
              Communicate with your class mayor and adviser directly here
              regarding your complaints/concerns, if it is not resolved, it will
              be escalated to higher position in CICS
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <View className="h-16 flex-row items-center justify-between px-2">
        <TouchableOpacity onPress={handlePressRoute}>
          <Image
            source={require('~/assets/arrow-sm-right-svgrepo-com.png')}
            className="h-12 w-12 rotate-180 "
          />
        </TouchableOpacity>
        <Image
          source={require('~/assets/chatHeader.png')}
          className="ml-8 h-10 w-1/2"
          resizeMode="center"
        />
        {/* <Text className="text-xs text-white">
              {currentStudent.recipient === 'class_section'
                ? 'Chat your Class Mayor & Adviser Here'
                : currentStudent.recipient === 'bm'
                ? ''
                : 'You are now talking to the Program Chair'}
            </Text> */}
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text className="ml-12 rounded-full border border-paper px-3 py-1 text-sm text-paper">
            i
          </Text>
        </TouchableOpacity>
      </View>
      {(role === 'mayor' || role === 'adviser') && (
        <View className="bg-paper shadow-sm">
          <View className="m-2 mt-2 flex-row items-center justify-center pb-2">
            <TouchableOpacity
              className={`${
                selectedChat === 'concerns' ? 'bg-secondary' : 'bg-primary'
              } w-1/2 p-2`}
              onPress={() =>
                handleSelectedChat(
                  selectedChat === 'concerns' ? null : 'concerns',
                )
              }>
              <Text
                className={`${
                  selectedChat === 'concerns' ? 'text-paper' : 'text-paper'
                } text-center capitalize`}>
                concerns
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`${
                selectedChat === 'adviser' ? 'bg-secondary' : 'bg-primary'
              } w-1/2 p-2`}
              onPress={() =>
                handleSelectedChat(
                  selectedChat === 'adviser' ? null : 'adviser',
                )
              }>
              <Text
                className={`${
                  selectedChat === 'adviser' ? 'text-paper' : 'text-paper'
                } text-center capitalize`}>
                adviser
              </Text>
            </TouchableOpacity>
          </View>
          {selectedChat !== 'adviser' &&
            selectedChat !== null &&
            selectedChat !== 'concerns' && (
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
              </View>
            )}
        </View>
      )}
    </View>
  );
};

export default ChatNav;
