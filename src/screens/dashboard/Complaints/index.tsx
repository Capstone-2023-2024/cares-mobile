import type {ComplaintBaseProps, ComplaintProps} from '@cares/types/complaint';
import type {FirestoreDatabaseProps} from '@cares/types/document';
import type {CurrentUserRoleType, StudentInfoProps} from '@cares/types/user';
import React, {useCallback, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {OneSignal} from 'react-native-onesignal';
import {ActivityIndicator} from 'react-native-paper';
import Header from '~/components/Header';
import Text from '~/components/Text';
import ChatHeadButton from '~/components/others/complaints/ChatHeadButton';
import ComplaintBox from '~/components/others/complaints/ComplaintBox';
import ComplaintBoxRenderer from '~/components/others/complaints/ComplaintBoxRenderer';
import RenderChatHeads from '~/components/others/complaints/RenderChatHeads';
import RenderInputMessageContainer from '~/components/others/complaints/RenderInputMessageContainer';
import RenderStudents from '~/components/others/complaints/RenderStudents';
import {ComplaintProviders} from '~/contexts';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';
import {useUniversal} from '~/contexts/UniversalContext';
import type {YearLevelSectionProps} from '~/contexts/UniversalContext/types';
import {useUser} from '~/contexts/UserContext';
import {collectionRef} from '~/utils/firebase';

interface ReadComplaintBaseProps
  extends ComplaintBaseProps,
    FirestoreDatabaseProps {}
interface ReadComplaintProps extends ComplaintProps, FirestoreDatabaseProps {}
interface FetchComplaintCollectionsProps {
  studentNo?: string;
  recipient: CurrentUserRoleType;
}

const LIMIT = 15;
const Complaints = () => {
  return (
    <ComplaintProviders>
      <MainPage />
    </ComplaintProviders>
  );
};

const MainPage = () => {
  const {
    currentStudentComplaints,
    setClassSectionComplaints,
    setCurrentStudentComplaints,
    setOtherComplaints,
  } = useComplaints();
  const {
    selectedChatHead,
    selectedStudent,
    setMessage,
    setSelectedChatId,
    setSelectedStudent,
    setSelectedChatHead,
  } = useContentManipulation();
  const {queryId, studentsInfo, currentStudentInfo, setMayorInfo} =
    useUniversal();
  const {role} = useUser();
  const {setShowMayorModal, setShowStudents} = useModal();
  console.log(queryId);
  const getChattablesForStudent = useCallback(
    async ({yearLevel, section}: YearLevelSectionProps) => {
      try {
        const mayorSnapshot = await collectionRef('mayor')
          .where('yearLevel', '==', yearLevel)
          .where('section', '==', section)
          .get();
        if (!mayorSnapshot.empty) {
          const doc = mayorSnapshot.docs[0];
          const data = doc?.data() as StudentInfoProps;
          setMayorInfo(data);
        }
      } catch (err) {
        Alert.alert('err', 'Error in getting other chattables for student');
      }
    },
    [setMayorInfo],
  );
  /** if role is === `mayor`, recipient is set to `adviser` and if called in student follow-up set-up, studentNo should be undefined */
  const fetchClassSectionComplaints = useCallback(() => {
    const unsub =
      queryId !== null &&
      collectionRef('complaints')
        .doc(queryId)
        .collection('group')
        .orderBy('timestamp', 'desc')
        .limit(LIMIT)
        .onSnapshot(snapshot => {
          const groupComplaintsHolder: ReadComplaintBaseProps[] = [];
          const newSnapshot = snapshot.docs.reverse();
          newSnapshot.forEach(doc => {
            const data = doc.data() as ComplaintBaseProps;
            const id = doc.id;
            groupComplaintsHolder.push({...data, id});
          });
          setClassSectionComplaints(groupComplaintsHolder);
        });
    return unsub ? unsub : () => null;
  }, [setClassSectionComplaints, queryId]);
  /** If studentNo is undefined, concerns will be redirected to currentStudentComplaints */
  const fetchOtherComplaints = useCallback(
    ({studentNo, recipient}: FetchComplaintCollectionsProps) => {
      const unsub =
        queryId !== null &&
        (studentNo === undefined
          ? collectionRef('complaints')
              .doc(queryId)
              .collection('individual')
              .where('recipient', '==', recipient)
              .orderBy('dateCreated', 'desc')
              .limit(LIMIT)
          : collectionRef('complaints')
              .doc(queryId)
              .collection('individual')
              .where('studentNo', '==', studentNo)
              .limit(LIMIT)
        ).onSnapshot(snapshot => {
          const concernsHolder: ReadComplaintProps[] = [];
          const newSnapshot = snapshot.docs.reverse();
          newSnapshot.forEach(doc => {
            const data = doc.data() as ComplaintProps;
            const id = doc.id;
            concernsHolder.push({...data, id});
          });
          if (studentNo === undefined) {
            return setCurrentStudentComplaints(concernsHolder);
          }
          setOtherComplaints(concernsHolder);
        });
      return unsub;
    },
    [setCurrentStudentComplaints, setOtherComplaints, queryId],
  );
  /** Setup `targetDocument`, `complaintRecord`, and `groupComplaints` in state.*/
  const fetchStudentConcerns = useCallback(
    ({studentNo}: Pick<StudentInfoProps, 'studentNo'>) => {
      try {
        const fetchComplaintProps: FetchComplaintCollectionsProps = {
          recipient: 'mayor',
        };
        fetchOtherComplaints(
          role === 'mayor'
            ? fetchComplaintProps
            : {studentNo, ...fetchComplaintProps},
        );
      } catch (err) {
        Alert.alert('err', 'fetch student concerns');
      }
    },
    [role, fetchOtherComplaints],
  );
  /** Mayor's Setup for Student concerns, and Mayor's concern for Adviser */
  const mayorSetup = useCallback(
    ({studentNo}: Pick<StudentInfoProps, 'studentNo'>) => {
      try {
        return fetchOtherComplaints({
          recipient: 'adviser',
          studentNo: studentNo,
        });
      } catch (err) {
        Alert.alert('err', 'fetch student concerns');
      }
    },
    [fetchOtherComplaints],
  );
  /** Adviser's Setup for Student concerns, and Mayor's concerns */
  const adviserSetup = useCallback(() => {
    try {
      return fetchOtherComplaints({
        recipient: 'adviser',
      });
    } catch (err) {
      Alert.alert('err', 'fetch student concerns');
    }
  }, [fetchOtherComplaints]);
  /** If role is `mayor` it is directed to `adviser`, else if role is `student` it is directed to `mayor` */
  const renderClassSectionButton = () => {
    const classSectionName = 'class_section';
    return (
      <ChatHeadButton
        name={classSectionName.replace(/_/g, ' ')}
        onPress={() => {
          setSelectedChatHead(classSectionName);
          setSelectedChatId(classSectionName);
          setSelectedStudent(null);
          setShowStudents(false);
          setShowMayorModal(false);
          setMessage('');
        }}
        condition={selectedChatHead === classSectionName}
      />
    );
  };

  /** Set-up for whole class section with same `yearLevel` and `section`*/
  useEffect(() => {
    return fetchClassSectionComplaints();
  }, [fetchClassSectionComplaints]);
  /** Student follow-up Set-up */
  useEffect(() => {
    const yearLevel = currentStudentInfo?.yearLevel;
    const section = currentStudentInfo?.section;
    const studentNo = currentStudentInfo?.studentNo;
    if (
      yearLevel !== undefined &&
      section !== undefined &&
      studentNo !== undefined
    ) {
      void getChattablesForStudent({yearLevel, section});
      void fetchStudentConcerns({studentNo});
    }
  }, [
    currentStudentInfo?.section,
    currentStudentInfo?.studentNo,
    currentStudentInfo?.yearLevel,
    getChattablesForStudent,
    fetchStudentConcerns,
  ]);
  /** Mayor Set-up for fetching complaints */
  useEffect(() => {
    const studentNo = currentStudentInfo?.studentNo;
    if (role === 'mayor' && studentNo !== undefined) {
      void mayorSetup({studentNo});
    }
  }, [role, currentStudentInfo?.studentNo, mayorSetup]);
  /** Adviser set-up for fetching complaints */
  useEffect(() => {
    if (role === 'adviser') {
      void adviserSetup();
    }
  }, [role, adviserSetup]);

  if (role === null) {
    return (
      <View className="h-screen items-center justify-center">
        <Text className="text-bold">Fetching complaints from the server</Text>
        <ActivityIndicator animating={true} color="gray" />
      </View>
    );
  }

  return (
    <>
      <Header />
      <View className="h-full">
        {role !== 'student' ? (
          <>
            <RenderChatHeads>
              <ChatHeadButton
                name={role === 'mayor' ? 'My Classmates' : 'Students'}
                onPress={() => {
                  OneSignal.User.pushSubscription;
                  setSelectedChatHead('students');
                  setSelectedChatId(null);
                  setShowStudents(true);
                  setShowMayorModal(false);
                }}
                condition={selectedChatHead === 'students'}
              />
              {renderClassSectionButton()}
            </RenderChatHeads>
            <RenderStudents />
            <ComplaintBoxRenderer
              data={currentStudentComplaints
                ?.filter(props => props.studentNo === selectedStudent)
                ?.sort((a, b) => b.dateCreated - a.dateCreated)}
              heading={`${
                studentsInfo
                  ?.filter(props => selectedStudent === props.studentNo)[0]
                  ?.name.split(',')[0]
              }'s Complaint/Concern(s):`}
              condition={selectedStudent !== null}
            />
          </>
        ) : (
          <RenderChatHeads>{renderClassSectionButton()}</RenderChatHeads>
        )}
        <ComplaintBox />
        <RenderInputMessageContainer />
      </View>
    </>
  );
};

export type {ReadComplaintBaseProps, ReadComplaintProps};
export default Complaints;
