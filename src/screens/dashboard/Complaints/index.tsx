import type {ComplaintBaseProps, ComplaintProps} from '@cares/types/complaint';
import type {FirestoreDatabaseProps} from '@cares/types/document';
import type {AdviserInfoProps, StudentInfoProps} from '@cares/types/user';
import React, {useCallback, useEffect} from 'react';
import {Alert, View} from 'react-native';
import Loading from '~/components/SplashScreen';
import {useAuth} from '~/contexts/AuthContext';
import {collectionRef} from '~/utils/firebase';
import {
  ChatHeadButton,
  ComplaintBox,
  ComplaintBoxRenderer,
  RenderChatHeads,
  RenderInputMessageContainer,
  RenderStudents,
} from './components';
import ComplaintsProvider, {useComplaints} from './contexts/ComplaintsProvider';
import ContentManipulationProvider, {
  useContentManipulation,
} from './contexts/ContentManipulationProvider';
import ModalProvider, {useModal} from './contexts/ModalProvider';
import type {
  UniversalProviderStateProps,
  YearLevelSectionProps,
} from './contexts/UniversalProvider';
import UniversalProvider, {useUniversal} from './contexts/UniversalProvider';

interface ReadComplaintBaseProps
  extends ComplaintBaseProps,
    FirestoreDatabaseProps {}
interface ReadComplaintProps extends ComplaintProps, FirestoreDatabaseProps {}
interface FetchComplaintCollectionsProps {
  studentNo?: string;
  recipient: UniversalProviderStateProps['role'];
}

const LIMIT = 15;
const Complaints = () => {
  return (
    <UniversalProvider>
      <ModalProvider>
        <ContentManipulationProvider>
          <ComplaintsWrapper />
        </ContentManipulationProvider>
      </ModalProvider>
    </UniversalProvider>
  );
};
/** User's initial Set-up */
const ComplaintsWrapper = () => {
  const {currentUser} = useAuth();
  const {setRole, setAdviserInfo, setCurrentStudentInfo} = useUniversal();

  /** Setting up setRole, setCurrentStudentInfo, and setAdviserInfo */
  const fetchUserInfo = useCallback(async () => {
    if (typeof currentUser?.email === 'string') {
      const studentSnapshot = await collectionRef('student')
        .where('email', '==', currentUser.email)
        .get();
      const mayorSnapshot = await collectionRef('mayor')
        .where('email', '==', currentUser.email)
        .get();

      if (!studentSnapshot.empty) {
        const doc = studentSnapshot.docs[0];
        const data = doc?.data() as StudentInfoProps;
        const {yearLevel, section} = data;
        setCurrentStudentInfo(data);
        setRole('student');
        const adviserSnapshot = await collectionRef('adviser')
          .where('yearLevel', '==', yearLevel)
          .where('section', '==', section)
          .get();

        if (!adviserSnapshot.empty) {
          const doc = adviserSnapshot.docs[0];
          const adviserData = doc?.data() as AdviserInfoProps;
          const id = doc?.id ?? 'null';
          setAdviserInfo(adviserData, id);
        }
      } else {
        const adviserSnapshot = await collectionRef('adviser')
          .where('email', '==', currentUser.email)
          .get();
        if (!adviserSnapshot.empty) {
          const doc = adviserSnapshot.docs[0];
          const adviserData = doc?.data() as AdviserInfoProps;
          const id = doc?.id ?? '';
          setAdviserInfo(adviserData, id);
          setRole('adviser');
        }
      }
      if (!mayorSnapshot.empty) {
        setRole('mayor');
      }
    }
  }, [currentUser?.email, setAdviserInfo, setCurrentStudentInfo, setRole]);

  useEffect(() => {
    return void fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <ComplaintsProvider>
      <MainPage />
    </ComplaintsProvider>
  );
};
const MainPage = () => {
  const {
    currentStudentComplaints,
    otherComplaints,
    setClassSectionComplaints,
    setCurrentStudentComplaints,
    setOtherComplaints,
  } = useComplaints();
  const {
    selectedChatHead,
    selectedStudent,
    setMessage,
    setNewComplaints,
    setSelectedChatId,
    setSelectedStudent,
    setSelectedChatHead,
  } = useContentManipulation();
  const {
    role,
    queryId,
    studentsInfo,
    currentStudentInfo,
    adviserInfo,
    setMayorInfo,
    returnComplaintsQuery,
  } = useUniversal();
  const {showMayorModal, setShowMayorModal, setShowStudents} = useModal();

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
  function handleNewConcern() {
    if (currentStudentInfo?.studentNo !== undefined) {
      const recipient = role === 'mayor' ? 'adviser' : 'mayor';
      const newConcernDetails: Omit<ComplaintProps, 'messages'> = {
        status: 'processing',
        recipient,
        studentNo: currentStudentInfo.studentNo,
        dateCreated: new Date().getTime(),
      };
      setSelectedChatHead(recipient);
      setSelectedChatId('object');
      // setShowMayorModal(false);
      return setNewComplaints(newConcernDetails);
    }
    Alert.alert('studentNo is undefined');
  }
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
    const yearLevel = adviserInfo?.yearLevel ?? currentStudentInfo?.yearLevel;
    const section = adviserInfo?.section ?? currentStudentInfo?.section;
    if (yearLevel !== undefined && section !== undefined) {
      void returnComplaintsQuery({yearLevel, section});
    }
    return fetchClassSectionComplaints();
  }, [
    returnComplaintsQuery,
    fetchClassSectionComplaints,
    currentStudentInfo?.yearLevel,
    currentStudentInfo?.section,
    adviserInfo?.yearLevel,
    adviserInfo?.section,
  ]);
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

  if (role === undefined) {
    return <Loading />;
  }

  return (
    <>
      <View className="h-full">
        {role !== 'student' ? (
          <>
            <RenderChatHeads
              handleNewConcern={handleNewConcern}
              data={otherComplaints
                .filter(props => selectedChatHead === props.recipient)
                .sort((a, b) => b.dateCreated - a.dateCreated)}
              condition={showMayorModal}
              chatHeadOnClick={selectedChatHead => {
                selectedChatHead !== 'students' && setSelectedStudent(null);
                setSelectedChatId(null);
                setSelectedChatHead(selectedChatHead);
                setShowStudents(false);
                setShowMayorModal(true);
              }}>
              <ChatHeadButton
                name={role === 'mayor' ? 'My Classmates' : 'Students'}
                onPress={() => {
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
          <RenderChatHeads
            handleNewConcern={handleNewConcern}
            data={otherComplaints
              .filter(props => props.recipient === selectedChatHead)
              .sort((a, b) => b.dateCreated - a.dateCreated)}
            condition={showMayorModal}
            chatHeadOnClick={selectedChatHead => {
              setSelectedChatHead(selectedChatHead);
              setSelectedChatId(null);
              setShowMayorModal(true);
            }}>
            {renderClassSectionButton()}
          </RenderChatHeads>
        )}
        <ComplaintBox />
        <RenderInputMessageContainer />
      </View>
    </>
  );
};

export type {ReadComplaintBaseProps, ReadComplaintProps};
export default Complaints;
