import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useChat} from '~/contexts/ChatContext';
import {useUser} from '~/contexts/UserContext';
import {ConcernProps} from '~/types/complaints';
import {StudentWithClassSection} from '~/types/student';
import {collectionRef} from '~/utils/firebase';

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
  const {handleSelectedChat, handleOtherConcerns} = useChat();
  const {role, currentStudent} = useUser();

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
    });
  }

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
    <FlatList
      className="h-full w-1/5 bg-secondary"
      keyExtractor={({studentNo}) => studentNo}
      data={state.students}
      renderItem={({item}) => (
        <TouchableOpacity
          className="m-1 self-center rounded-lg bg-primary p-2 shadow-sm"
          onPress={() => handleStudentPress(item.studentNo)}>
          {item.src ? (
            <Image source={require('~/assets/error.svg')} src={item.src} />
          ) : (
            <Text className="text-paper">{item.name.split(',')[0]}</Text>
          )}
        </TouchableOpacity>
      )}
    />
  );
};

export default ChatPrivilege;
