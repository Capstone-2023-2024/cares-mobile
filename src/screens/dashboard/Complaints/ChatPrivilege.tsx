import React, {useEffect, useState} from 'react';
import {Modal, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useChat} from '~/contexts/ChatContext';
import {useContent} from '~/contexts/ContentContext';
import {ConcernProps} from '~/types/complaints';
import {StudentWithClassSection} from '~/types/student';
import {collectionRef, firestoreApp} from '~/utils/firebase';
import {NextSvg} from '~/utils/image';

interface ChatPrivilegeProps {
  studentNoSelected: string | null;
  students: StudentWithClassSection[];
}
type ChatPrivilegeValues =
  | ChatPrivilegeProps['studentNoSelected']
  | ChatPrivilegeProps['students'];

const ChatPrivilege = () => {
  const initState: ChatPrivilegeProps = {
    studentNoSelected: null,
    students: [],
  };
  const [state, setState] = useState(initState);
  const {currentUser} = useAuth();
  const {
    chatModalVisible,
    handleSelectedChat,
    handleChatModalVisible,
    handleOtherConcerns,
  } = useChat();
  const {handleUsersCache} = useContent();

  function handleState(
    key: keyof ChatPrivilegeProps,
    value: ChatPrivilegeValues,
  ) {
    setState(prevState => ({...prevState, [key]: value}));
  }
  function handleStudentPress(studentNo: string) {
    handleState('studentNoSelected', studentNo);
    const unsub = collectionRef('student')
      .doc(studentNo)
      .collection('concerns')
      .limit(12)
      .orderBy('dateCreated', 'desc')
      .onSnapshot(snapshot => {
        const concernsArray: ConcernProps[] = [];
        const reversedArray = snapshot.docs.reverse();
        reversedArray.forEach(doc => {
          const data = doc.data() as Omit<ConcernProps, 'id'>;
          const id = doc.id;
          concernsArray.push({...data, id});
        });
        handleSelectedChat(studentNo);
        handleOtherConcerns(concernsArray);
        handleExitModal();
      });
    return unsub;
  }
  function handleExitModal() {
    ToastAndroid.show('Chat modal closed', ToastAndroid.SHORT);
    handleChatModalVisible(false);
  }
  const renderStudent = () =>
    state.students.map(({studentNo, name}) => {
      const comaIndex = name.indexOf(',');
      return (
        <TouchableOpacity
          className="absolute z-10 self-center rounded-lg border border-black bg-purple-500 p-2 shadow-sm"
          onPress={() => handleStudentPress(studentNo)}
          key={studentNo}>
          <Text>{name.substring(0, comaIndex)}</Text>
        </TouchableOpacity>
      );
    });

  useEffect(() => {
    handleUsersCache()
      .then(array => {
        const filteredArray = array.filter(
          ({email}) => currentUser?.email === email,
        );
        const section = filteredArray[0]?.section;
        const unsub = firestoreApp
          .collection('student')
          .where('recipient', '==', 'class_section')
          .where('section', '==', section)
          .where('email', '!=', currentUser?.email)
          .limit(12)
          .onSnapshot(snapshot => {
            const placeholder: StudentWithClassSection[] = [];
            snapshot.forEach(doc => {
              const data = doc.data() as StudentWithClassSection;
              placeholder.push({...data});
            });
            handleState('students', placeholder);
          });
        return unsub;
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentUser, handleUsersCache]);

  return (
    <Modal visible={chatModalVisible} onRequestClose={handleExitModal}>
      <View className="h-12 flex-row items-center justify-around bg-primary">
        <TouchableOpacity className="w-12 rotate-180" onPress={handleExitModal}>
          <NextSvg />
        </TouchableOpacity>
        <Text className="text-paper">List of student with concerns</Text>
      </View>
      <ScrollView>
        <View className="relative h-screen flex-col items-center justify-center">
          {renderStudent()}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ChatPrivilege;
