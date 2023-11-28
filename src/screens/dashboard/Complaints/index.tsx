import type {ComplaintBaseProps, ComplaintProps} from '@cares/types/complaint';
import type {FirestoreDatabaseProps} from '@cares/types/document';
import type {AdviserInfoProps, StudentInfoProps} from '@cares/types/user';
import React, {useCallback, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {OneSignal} from 'react-native-onesignal';
import Header from '~/components/Header';
import Loading from '~/components/SplashScreen';
import ChatHeadButton from '~/components/others/complaints/ChatHeadButton';
import ComplaintBox from '~/components/others/complaints/ComplaintBox';
import ComplaintBoxRenderer from '~/components/others/complaints/ComplaintBoxRenderer';
import RenderChatHeads from '~/components/others/complaints/RenderChatHeads';
import RenderInputMessageContainer from '~/components/others/complaints/RenderInputMessageContainer';
import RenderStudents from '~/components/others/complaints/RenderStudents';
import {useAuth} from '~/contexts/AuthContext';
import ComplaintsProvider, {useComplaints} from '~/contexts/ComplaintContext';
import ContentManipulationProvider, {
  useContentManipulation,
} from '~/contexts/ContentManipulationContext';
import ModalProvider, {useModal} from '~/contexts/ModalContext';
import UniversalProvider, {useUniversal} from '~/contexts/UniversalContext';
import type {
  UniversalProviderStateProps,
  YearLevelSectionProps,
} from '~/contexts/UniversalContext/types';
import {collectionRef} from '~/utils/firebase';

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
// /** User's initial Set-up */
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
          const snap = adviserSnapshot.docs[0];
          const adviserData = snap?.data() as AdviserInfoProps;
          const id = snap?.id ?? 'null';
          setAdviserInfo({...adviserData, id});
        }
      } else {
        const adviserSnapshot = await collectionRef('adviser')
          .where('email', '==', currentUser.email)
          .get();
        if (!adviserSnapshot.empty) {
          const doc = adviserSnapshot.docs[0];
          const id = doc?.id ?? '';
          const adviserData = doc?.data() as AdviserInfoProps;
          setAdviserInfo({...adviserData, id});
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
  const {
    role,
    queryId,
    studentsInfo,
    currentStudentInfo,
    adviserInfo,
    setMayorInfo,
    returnComplaintsQuery,
  } = useUniversal();
  const {setShowMayorModal, setShowStudents} = useModal();

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

// const MainPage = () => {
//   const [showAdviserModal, setShowAdviserModal] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [showClassmateModal, setShowClassmateModal] = useState(false);
//   const [showResolvedModal, setShowResolvedModal] = useState(false);
//   const [selectedButton, setSelectedButton] = useState('');
//   const {
//     currentStudentComplaints,
//     otherComplaints,
//     setClassSectionComplaints,
//     setCurrentStudentComplaints,
//     setOtherComplaints,
//   } = useComplaints();
//   const {
//     selectedChatHead,
//     selectedStudent,
//     setMessage,
//     setNewComplaints,
//     setSelectedChatId,
//     setSelectedStudent,
//     setSelectedChatHead,
//   } = useContentManipulation();
//   const {
//     role,
//     queryId,
//     studentsInfo,
//     currentStudentInfo,
//     adviserInfo,
//     setMayorInfo,
//     returnComplaintsQuery,
//   } = useUniversal();
//   const {showMayorModal, setShowMayorModal, setShowStudents} = useModal();

//   const getChattablesForStudent = useCallback(
//     async ({yearLevel, section}: YearLevelSectionProps) => {
//       try {
//         const mayorSnapshot = await collectionRef('mayor')
//           .where('yearLevel', '==', yearLevel)
//           .where('section', '==', section)
//           .get();
//         if (!mayorSnapshot.empty) {
//           const doc = mayorSnapshot.docs[0];
//           const data = doc?.data() as StudentInfoProps;
//           setMayorInfo(data);
//         }
//       } catch (err) {
//         Alert.alert('err', 'Error in getting other chattables for student');
//       }
//     },
//     [setMayorInfo],
//   );
//   /** if role is === `mayor`, recipient is set to `adviser` and if called in student follow-up set-up, studentNo should be undefined */
//   const fetchClassSectionComplaints = useCallback(() => {
//     const unsub =
//       queryId !== null &&
//       collectionRef('complaints')
//         .doc(queryId)
//         .collection('group')
//         .orderBy('timestamp', 'desc')
//         .limit(LIMIT)
//         .onSnapshot(snapshot => {
//           const groupComplaintsHolder: ReadComplaintBaseProps[] = [];
//           const newSnapshot = snapshot.docs.reverse();
//           newSnapshot.forEach(doc => {
//             const data = doc.data() as ComplaintBaseProps;
//             const id = doc.id;
//             groupComplaintsHolder.push({...data, id});
//           });
//           setClassSectionComplaints(groupComplaintsHolder);
//         });
//     return unsub ? unsub : () => null;
//   }, [setClassSectionComplaints, queryId]);
//   /** If studentNo is undefined, concerns will be redirected to currentStudentComplaints */
//   const fetchOtherComplaints = useCallback(
//     ({studentNo, recipient}: FetchComplaintCollectionsProps) => {
//       const unsub =
//         queryId !== null &&
//         (studentNo === undefined
//           ? collectionRef('complaints')
//               .doc(queryId)
//               .collection('individual')
//               .where('recipient', '==', recipient)
//               .orderBy('dateCreated', 'desc')
//               .limit(LIMIT)
//           : collectionRef('complaints')
//               .doc(queryId)
//               .collection('individual')
//               .where('studentNo', '==', studentNo)
//               .limit(LIMIT)
//         ).onSnapshot(snapshot => {
//           const concernsHolder: ReadComplaintProps[] = [];
//           const newSnapshot = snapshot.docs.reverse();
//           newSnapshot.forEach(doc => {
//             const data = doc.data() as ComplaintProps;
//             const id = doc.id;
//             concernsHolder.push({...data, id});
//           });
//           if (studentNo === undefined) {
//             return setCurrentStudentComplaints(concernsHolder);
//           }
//           setOtherComplaints(concernsHolder);
//         });
//       return unsub;
//     },
//     [setCurrentStudentComplaints, setOtherComplaints, queryId],
//   );
//   /** Setup `targetDocument`, `complaintRecord`, and `groupComplaints` in state.*/
//   const fetchStudentConcerns = useCallback(
//     ({studentNo}: Pick<StudentInfoProps, 'studentNo'>) => {
//       try {
//         const fetchComplaintProps: FetchComplaintCollectionsProps = {
//           recipient: 'mayor',
//         };
//         fetchOtherComplaints(
//           role === 'mayor'
//             ? fetchComplaintProps
//             : {studentNo, ...fetchComplaintProps},
//         );
//       } catch (err) {
//         Alert.alert('err', 'fetch student concerns');
//       }
//     },
//     [role, fetchOtherComplaints],
//   );
//   /** Mayor's Setup for Student concerns, and Mayor's concern for Adviser */
//   const mayorSetup = useCallback(
//     ({studentNo}: Pick<StudentInfoProps, 'studentNo'>) => {
//       try {
//         return fetchOtherComplaints({
//           recipient: 'adviser',
//           studentNo: studentNo,
//         });
//       } catch (err) {
//         Alert.alert('err', 'fetch student concerns');
//       }
//     },
//     [fetchOtherComplaints],
//   );
//   /** Adviser's Setup for Student concerns, and Mayor's concerns */
//   const adviserSetup = useCallback(() => {
//     try {
//       return fetchOtherComplaints({
//         recipient: 'adviser',
//       });
//     } catch (err) {
//       Alert.alert('err', 'fetch student concerns');
//     }
//   }, [fetchOtherComplaints]);
//   /** If role is `mayor` it is directed to `adviser`, else if role is `student` it is directed to `mayor` */
//   function handleNewConcern() {
//     if (currentStudentInfo?.studentNo !== undefined) {
//       const recipient = role === 'mayor' ? 'adviser' : 'mayor';
//       const newConcernDetails: Omit<ComplaintProps, 'messages'> = {
//         status: 'processing',
//         recipient,
//         studentNo: currentStudentInfo.studentNo,
//         dateCreated: new Date().getTime(),
//       };
//       setSelectedChatHead(recipient);
//       setSelectedChatId('object');
//       // setShowMayorModal(false);
//       return setNewComplaints(newConcernDetails);
//     }
//     Alert.alert('studentNo is undefined');
//   }
//   const renderClassSectionButton = () => {
//     const classSectionName = 'class_section';
//     return (
//       <ChatHeadButton
//         name={classSectionName.replace(/_/g, ' ')}
//         onPress={() => {
//           setSelectedChatHead(classSectionName);
//           setSelectedChatId(classSectionName);
//           setSelectedStudent(null);
//           setShowStudents(false);
//           setShowMayorModal(false);
//           setMessage('');
//         }}
//         condition={selectedChatHead === classSectionName}
//       />
//     );
//   };

//   /** Set-up for whole class section with same `yearLevel` and `section`*/
//   useEffect(() => {
//     const yearLevel = adviserInfo?.yearLevel ?? currentStudentInfo?.yearLevel;
//     const section = adviserInfo?.section ?? currentStudentInfo?.section;
//     if (yearLevel !== undefined && section !== undefined) {
//       void returnComplaintsQuery({yearLevel, section});
//     }
//     return fetchClassSectionComplaints();
//   }, [
//     returnComplaintsQuery,
//     fetchClassSectionComplaints,
//     currentStudentInfo?.yearLevel,
//     currentStudentInfo?.section,
//     adviserInfo?.yearLevel,
//     adviserInfo?.section,
//   ]);
//   /** Student follow-up Set-up */
//   useEffect(() => {
//     const yearLevel = currentStudentInfo?.yearLevel;
//     const section = currentStudentInfo?.section;
//     const studentNo = currentStudentInfo?.studentNo;
//     if (
//       yearLevel !== undefined &&
//       section !== undefined &&
//       studentNo !== undefined
//     ) {
//       void getChattablesForStudent({yearLevel, section});
//       void fetchStudentConcerns({studentNo});
//     }
//   }, [
//     currentStudentInfo?.section,
//     currentStudentInfo?.studentNo,
//     currentStudentInfo?.yearLevel,
//     getChattablesForStudent,
//     fetchStudentConcerns,
//   ]);
//   /** Mayor Set-up for fetching complaints */
//   useEffect(() => {
//     const studentNo = currentStudentInfo?.studentNo;
//     if (role === 'mayor' && studentNo !== undefined) {
//       void mayorSetup({studentNo});
//     }
//   }, [role, currentStudentInfo?.studentNo, mayorSetup]);
//   /** Adviser set-up for fetching complaints */
//   useEffect(() => {
//     if (role === 'adviser') {
//       void adviserSetup();
//     }
//   }, [role, adviserSetup]);

//   if (role === undefined) {
//     return <Loading />;
//   }

//   const handleButtonPress = (buttonName: React.SetStateAction<string>) => {
//     setSelectedButton(buttonName);
//   };
//   const toggleAdviserModal = () => {
//     setShowAdviserModal(!showAdviserModal);
//   };

//   const toggleMessageModal = () => {
//     setShowMessageModal(!showMessageModal);
//   };

//   const toggleClassmateModal = () => {
//     setShowClassmateModal(!showClassmateModal);
//   };

//   const toggleResolvedModal = () => {
//     setShowResolvedModal(!showResolvedModal);
//   };

//   const AdviserModal = () => {
//     return (
//       <Modal
//         visible={showAdviserModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={toggleAdviserModal}>
//         <View className="mx-4 my-52 h-5/6 items-center border bg-gray-400">
//           <TouchableOpacity className="mt-4 w-11/12 items-center rounded-full bg-white px-2 py-2">
//             <Text className="self-center font-bold text-black">
//               Esteban, Robin Arnold
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     );
//   };

//   const MessageModal = () => {
//     return (
//       <Modal
//         visible={showMessageModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={toggleMessageModal}>
//         <View className="h-5/6">
//           <View className="mx-4 my-52 h-5/6 border bg-gray-400">
//             {/* Classmates Modal content */}
//             <View className="mx-4 my-4 flex-row items-center justify-between rounded-full bg-gray-500 p-2">
//               <Text className="mx-2 w-1/2 truncate font-bold text-white">
//                 Ububbwebwe Onyetenwebe Ububbwebwe Ossas
//               </Text>
//               <TouchableOpacity className="items-center rounded-full border bg-green-400 px-2 py-2">
//                 <Text className="text-black">Resolved</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="items-center rounded-full border bg-yellow-400  px-2 py-2">
//                 <Text className="text-black">Turn over</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <RenderInputMessageContainer />
//         </View>
//       </Modal>
//     );
//   };

//   const ClassmateModal = () => {
//     return (
//       <Modal
//         visible={showClassmateModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={toggleClassmateModal}>
//         <View className="h-5/6">
//           <View className="mx-4 my-52 h-5/6 items-center border bg-gray-400">
//             <View className="mt-4 w-11/12 items-center rounded-3xl bg-white px-4 py-6">
//               <Text className="self-center font-bold text-black">
//                 List of Students from your section
//               </Text>
//             </View>
//             <FlatList
//               data={studentsInfo}
//               keyExtractor={props => props.studentNo}
//               renderItem={({item}) => {
//                 const {studentNo} = item;
//                 return (
//                   <TouchableOpacity className="mt-4 w-11/12 items-center rounded-full bg-white px-2 py-2">
//                     <Text className="self-center font-bold text-black">
//                       {studentNo}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           </View>
//         </View>
//       </Modal>
//     );
//   };

//   const ResolvedModal = () => {
//     return (
//       <Modal
//         visible={showResolvedModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={toggleResolvedModal}>
//         <View className="h-5/6">
//           <View className="mx-4 my-52 h-5/6 items-center border bg-gray-400">
//             <TouchableOpacity className="mt-4 w-11/12 items-center rounded-full bg-white px-2 py-2">
//               <Text className="self-center font-bold text-black">
//                 Reklamo 1
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="mt-4 w-11/12 items-center rounded-full bg-white px-2 py-2">
//               <Text className="self-center font-bold text-black">
//                 Reklamo 2
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="mt-4 w-11/12 items-center rounded-full bg-white px-2 py-2">
//               <Text className="self-center font-bold text-black">
//                 reklamo 3
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//   };

//   return (
//     <View className="h-5/6">
//       <Header />
//       <View className="mt-4 flex-row justify-center">
//         <TouchableOpacity
//           className={`items-center border-r ${
//             selectedButton === 'Complaints' ? 'bg-gray-400' : 'bg-gray-300'
//           }`}
//           onPress={() => handleButtonPress('Complaints')}>
//           <Text className="mx-4 self-center px-12 py-2 text-black">
//             Complaints
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className={`items-center ${
//             selectedButton === 'ClassSection' ? 'bg-gray-400' : 'bg-gray-300'
//           }`}
//           onPress={() => handleButtonPress('ClassSection')}>
//           <Text className="mx-4 self-center px-12 py-2 text-black">
//             Class Section
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View className="mt-4 flex-row justify-evenly">
//         <TouchableOpacity className=" my-2 items-center rounded-full bg-gray-300">
//           <Text className="self-center px-6 py-2 text-black">Inbox</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className=" my-2 items-center rounded-full bg-gray-300"
//           onPress={toggleClassmateModal}>
//           <Text className="self-center px-6 py-2 text-black">Classmates</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className=" my-2 items-center rounded-full bg-gray-300"
//           onPress={toggleAdviserModal}>
//           <Text className="self-center px-6 py-2 text-black">Adviser</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className=" my-2 items-center rounded-full bg-gray-300"
//           onPress={toggleResolvedModal}>
//           <Text className="self-center px-6 py-2 text-black">Resolved</Text>
//         </TouchableOpacity>
//       </View>
//       <View className="mx-4 mt-6 h-5/6 bg-gray-400">
//         <View className="mt-6 items-center">
//           <TouchableOpacity
//             className="w-11/12 flex-row items-center justify-between rounded-full bg-white px-4 py-6"
//             onPress={toggleMessageModal}>
//             <Text className="font-bold text-black">Calderon, Andrei T.</Text>
//             <View className="flex-col">
//               <Text className="">Sent Message</Text>
//               <Text className="">11/12/23</Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="mt-4 w-11/12 flex-row items-center justify-between rounded-full bg-white px-4 py-6"
//             onPress={toggleMessageModal}>
//             <Text className="font-bold text-black">
//               Carranza, Gian Carlo A.
//             </Text>
//             <View className="flex-col">
//               <Text className="">Sent Message</Text>
//               <Text className="">11/12/23</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//       {showAdviserModal && <AdviserModal />}
//       {showMessageModal && <MessageModal />}
//       {showClassmateModal && <ClassmateModal />}
//       {showResolvedModal && <ResolvedModal />}
//     </View>
//   );
// };

// export default Complaints;
