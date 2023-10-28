import React, {useEffect, useState} from 'react';
import {ToastAndroid, Modal, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import {ConcernProps} from '~/types/complaints';
import {StudentWithClassSection} from '~/types/student';
import {collectionRef, firestoreApp} from '~/utils/firebase';

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
  const {currentUser} = useAuth();
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
    return unsub;
    //TODO: Push concern contents inside ChatContext then render inside the main Complaint Box -> Complaints.tsx
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
    <Modal
      visible={state.modalVisible}
      onRequestClose={() => {
        ToastAndroid.show('Closing modal', ToastAndroid.SHORT);
        handleState('modalVisible', false);
      }}>
      <ScrollView className=" bg-blue-400">
        <View className="relative h-screen flex-col items-center justify-center bg-yellow-300">
          {renderStudent()}
        </View>
      </ScrollView>
      {state.concerns.length > 0 && <View>{renderConcerns()}</View>}
    </Modal>
  );
};

export default ChatPrivilege;
