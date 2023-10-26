import {Alert, Modal, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '~/components';
import {collectionRef, firestoreApp} from '~/utils/firebase';
import {firebase} from '@react-native-firebase/auth';
import {ConcernProps} from '~/types/complaints';
import {StudentWithClassSection} from '~/types/student';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ChatPrivilegeProps {
  modalVisible: boolean;
  studentNoSelected: string | null;
  students: StudentWithClassSection[];
  concerns: ConcernProps[];
}
type ChatPrivilegeValues =
  | ChatPrivilegeProps['modalVisible']
  | ChatPrivilegeProps['studentNoSelected']
  | ChatPrivilegeProps['students']
  | ChatPrivilegeProps['concerns'];

const ChatPrivilege = () => {
  const initState: ChatPrivilegeProps = {
    modalVisible: true,
    studentNoSelected: null,
    students: [],
    concerns: [],
  };
  const [state, setState] = useState(initState);

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
      .orderBy('dateCreated', 'desc')
      .limit(12)
      .onSnapshot(snapshot => {
        const placeholder: ConcernProps[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as Omit<ConcernProps, 'id'>;
          const id = doc.id;
          placeholder.push({...data, id});
        });
        handleState('concerns', placeholder);
      });
    return unsub();
  }
  const renderStudent = () => {
    return state.students.map(({studentNo}) => {
      return (
        <TouchableOpacity
          onPress={() => handleStudentPress(studentNo)}
          key={studentNo}>
          <Text>{studentNo}</Text>
        </TouchableOpacity>
      );
    });
  };
  const renderConcerns = () => {
    return state.concerns.map(({id, message, sender, dateCreated}) => {
      const date = new Date();
      date.setTime(dateCreated);

      return (
        <View key={id}>
          <Text>{sender}</Text>
          <Text>{message}</Text>
          <Text>{date.toLocaleTimeString()}</Text>
        </View>
      );
    });
  };

  useEffect(() => {
    const unsub = firestoreApp
      .collection('student')
      .where('recipient', '==', 'class_section')
      .limit(12)
      .onSnapshot(snapshot => {
        const placeholder: StudentWithClassSection[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as Omit<StudentWithClassSection, 'studentNo'>;
          const studentNo = doc.id;
          placeholder.push({...data, studentNo});
        });
        handleState('students', placeholder);
      });
    return unsub();
  }, []);

  return (
    <Modal
      visible={state.modalVisible}
      onRequestClose={() => {
        Alert.alert('Closing modal');
        handleState('modalVisible', false);
      }}>
      <View>{renderStudent()}</View>
      {state.concerns.length > 0 && <View>{renderConcerns()}</View>}
    </Modal>
  );
};

export default ChatPrivilege;
