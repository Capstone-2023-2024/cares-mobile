import type {
  ReadStudentInfoProps,
  SectionType,
  StudentInfoProps,
} from '@cares/common/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Alert} from 'react-native';
import {OneSignal} from 'react-native-onesignal';
import {Role} from '~/screens/authentication/Landing/types';
import {CURRENT_STUDENT_KEY} from '~/utils/config';
import {collectionRef} from '~/utils/firebase';
import {useAuth} from '../AuthContext';
import type {
  UserContextProps,
  UserProviderProps,
  UserStateProps,
} from './types';

const initialStudent: Partial<ReadStudentInfoProps> = {};
const userStateProps: UserStateProps = {
  role: null,
  currentStudent: {...initialStudent},
};

const UserContext = createContext<UserContextProps>({
  ...userStateProps,
  handleRole: () => null,
  setSection: () => null,
});

function UserProvider({children}: UserProviderProps) {
  const {currentUser} = useAuth();
  const [state, setState] = useState(userStateProps);
  // console.log({UseUserState: state.role});

  const handleRole = useCallback((props: UserStateProps['role']) => {
    setState(prevState => ({...prevState, role: props}));
  }, []);

  function setSection(section?: SectionType) {
    const {currentStudent, ...rest} = state;
    const newStudent: Partial<ReadStudentInfoProps> = {
      ...currentStudent,
      section,
    };
    setState({...rest, currentStudent: newStudent});
  }

  useEffect(() => {
    async function checkRoleIfExistInDB(
      email: FirebaseAuthTypes.User['email'],
      role: Role,
    ) {
      try {
        const result = await collectionRef(role)
          .where('email', '==', email)
          .count()
          .get();
        return result.data().count;
      } catch (err) {
        // console.log(err);
        Alert.alert('Error in checking of mayor or adviser');
        return -1;
      }
    }
    async function setRoleInLocalCache(newRole: 'mayor' | 'adviser') {
      try {
        await AsyncStorage.setItem('role', newRole);
        handleRole(newRole);
      } catch (err) {
        // console.log(err);
        Alert.alert('Error in setting local role in cache');
      }
    }
    async function getUserInfoQuery(
      email: FirebaseAuthTypes.User['email'],
      path: 'student' | 'adviser',
    ) {
      try {
        const collectionReference = collectionRef(path).where(
          'email',
          '==',
          email,
        );
        const snapshotOfCount = await collectionReference.count().get();
        const count = snapshotOfCount.data().count;
        if (count > 0) {
          const snapshot = await collectionReference.get();
          return snapshot.docs[0]?.data();
        }
        return {};
      } catch (err) {
        // console.log(err)
        Alert.alert('Error in Getting User Info');
        return {};
      }
    }
    async function setup() {
      try {
        const role = (await AsyncStorage.getItem(
          'role',
        )) as UserStateProps['role'];
        handleRole(role);

        if (currentUser !== null) {
          if (role === 'student' || role === 'mayor') {
            const queryCount = await checkRoleIfExistInDB(
              currentUser.email,
              'mayor',
            );
            const studentCache =
              await AsyncStorage.getItem(CURRENT_STUDENT_KEY);
            if (typeof studentCache === 'string') {
              const parsedStudentCache = JSON.parse(
                studentCache,
              ) as StudentInfoProps;
              return setState(prevState => ({
                ...prevState,
                currentStudent: parsedStudentCache,
              }));
            }
            const studentInfo = await getUserInfoQuery(
              currentUser?.email,
              'student',
            );
            if (queryCount > 0) {
              setRoleInLocalCache('mayor');
            }
            if (studentInfo !== undefined) {
              await AsyncStorage.setItem(
                CURRENT_STUDENT_KEY,
                JSON.stringify(studentInfo),
              );

              return setState(prevState => ({
                ...prevState,
                currentStudent: studentInfo as StudentInfoProps,
              }));
            }
          } else if (role === 'faculty' || role === 'adviser') {
            const queryCount = await checkRoleIfExistInDB(
              currentUser.email,
              'adviser',
            );
            // const facultyInfo = await getUserInfoQuery(
            //   currentUser?.email,
            //   'adviser',
            // );
            if (queryCount > 0) {
              setRoleInLocalCache('adviser');
            }
            // console.log({facultyInfo});
            return;
          }
        }
        setState(userStateProps);
        // console.log('noUser');
      } catch (err) {
        Alert.alert('Error in setting up student in Home');
      }
    }
    return void setup();
  }, [currentUser, handleRole]);
  useEffect(() => {
    function oneSignalLogin() {
      const currentStudentNo = state.currentStudent.studentNo;
      const studentNoExist = currentStudentNo !== undefined;
      OneSignal.login(
        studentNoExist ? currentStudentNo : currentUser?.email ?? 'anonymous',
      );
    }
    return oneSignalLogin();
  }, [state.currentStudent.studentNo, currentUser?.email]);
  useEffect(() => {
    function setupOneSignalTag() {
      const role = state.role;
      const roleExists = role !== null;
      roleExists && OneSignal.User.addTag('role', role);
    }
    return setupOneSignalTag();
  }, [state.role]);

  return (
    <UserContext.Provider value={{...state, handleRole, setSection}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
export default UserProvider;
