import React from 'react';
import {View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';
import {useUniversal} from '~/contexts/UniversalContext';
import ProfilePictureContainer from './ProfilePictureContainer';

const RenderStudents = () => {
  const {currentStudentComplaints} = useComplaints();
  const {showStudents, setShowStudents} = useModal();
  const {studentsInfo, currentStudentInfo} = useUniversal();
  const {selectedStudent, setSelectedStudent, setSelectedChatHead} =
    useContentManipulation();
  const studentNumbers = [
    ...new Set(currentStudentComplaints.map(props => props.studentNo)),
  ];
  console.log({stude: studentsInfo?.map(props => props.studentNo)});
  const filteredStudentList = studentsInfo?.filter(
    props =>
      props.email !== currentStudentInfo?.email &&
      studentNumbers.includes(props.studentNo),
  );

  if (filteredStudentList === undefined) {
    return <></>;
  }

  return (
    <View
      className={`${
        showStudents ? 'flex' : 'hidden'
      }  w-full overflow-x-auto bg-secondary p-2`}>
      {filteredStudentList.length <= 0 ? (
        <View>
          <Text>No Complaints</Text>
        </View>
      ) : (
        <FlatList
          className="h-2/3"
          data={filteredStudentList}
          keyExtractor={props => props.studentNo}
          renderItem={({item}) => {
            const {studentNo, name, src} = item;
            return (
              <TouchableOpacity
                className={`${
                  selectedStudent === studentNo
                    ? 'scale-95 border-2 border-primary bg-secondary p-4 hover:bg-primary/20'
                    : 'scale-90 bg-paper/90 p-4 hover:scale-95 hover:bg-paper'
                } h-24 rounded-lg duration-300 ease-in-out`}
                onPress={() => {
                  setShowStudents(false);
                  setSelectedStudent(studentNo);
                  setSelectedChatHead('students');
                }}>
                <ProfilePictureContainer src={src ?? ''}>
                  <View>
                    <Text
                      className={`${
                        selectedStudent === studentNo
                          ? 'text-paper'
                          : 'text-black'
                      } text-start font-bold`}>
                      {name}
                    </Text>
                    <Text
                      className={`${
                        selectedStudent === studentNo
                          ? 'text-paper'
                          : 'text-primary'
                      } text-start font-bold`}>
                      {studentNo}
                    </Text>
                  </View>
                </ProfilePictureContainer>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default RenderStudents;
