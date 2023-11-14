import React, {useEffect, useState} from 'react';
import {Modal, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from '~/components';
import SvgContainer from '~/components/SVGContainer';
import {useAuth} from '~/contexts/AuthContext';
import {useChat} from '~/contexts/ChatContext';
import {useUser} from '~/contexts/UserContext';
import {ConcernProps} from '~/types/complaints';
import {StudentWithClassSection} from '~/types/student';
import {collectionRef} from '~/utils/firebase';
import {arrowUri} from '~/utils/svgIcons';

interface ChatPrivilegeProps {
  studentNoSelected: string | null;
  students: StudentWithClassSection[];
}

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
  const {role, currentStudent} = useUser();

  function handleExitModal() {
    ToastAndroid.show('Chat modal closed', ToastAndroid.SHORT);
    handleChatModalVisible(false);
  }
  function handleStudentPress(studentNo: string) {
    setState(prevState => ({...prevState, studentNoSelected: studentNo}));
    const collectionReference = collectionRef('student')
      .doc(studentNo)
      .collection('concerns')
      .limit(12)
      .orderBy('dateCreated', 'desc');

    return collectionReference.onSnapshot(snapshot => {
      // console.log(snapshot.size, 'student, concerns');
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
  }

  const renderStudent = () =>
    state.students.map(({studentNo, name}) => {
      return (
        <TouchableOpacity
          className="m-1 self-center rounded-lg bg-primary p-2 shadow-sm"
          onPress={() => handleStudentPress(studentNo)}
          key={studentNo}>
          <Text className="text-paper">{name}</Text>
        </TouchableOpacity>
      );
    });

  useEffect(() => {
    const section = currentStudent.section;
    const LIMIT = 10;
    const unsub = collectionRef('student')
      .where('recipient', '==', 'class_section')
      .where('section', '==', section)
      .where('email', '!=', currentUser?.email)
      .limit(LIMIT);

    return unsub.onSnapshot(snapshot => {
      const placeholder: StudentWithClassSection[] = [];
      snapshot.forEach(doc => {
        const data = doc.data() as StudentWithClassSection;
        placeholder.push({...data});
      });
      setState(prevState => ({...prevState, students: placeholder}));
    });
  }, [currentUser, role, currentStudent]);

  return (
    <Modal visible={chatModalVisible} onRequestClose={handleExitModal}>
      <View className="h-12 flex-row items-center justify-around bg-primary">
        <TouchableOpacity className="w-12 rotate-180" onPress={handleExitModal}>
          <SvgContainer uri={arrowUri} size="sm" />
        </TouchableOpacity>
        <Text className="text-paper">List of student with concerns</Text>
      </View>
      <View className="flex-1">
        <ScrollView>{renderStudent()}</ScrollView>
      </View>
    </Modal>
  );
};

export default ChatPrivilege;
