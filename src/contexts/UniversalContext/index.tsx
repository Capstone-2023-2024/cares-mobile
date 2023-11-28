import type {
  ClassSectionProps,
  ReadAdviserInfoProps,
  StudentInfoProps,
} from '@cares/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Alert} from 'react-native';
import {collectionRef} from '~/utils/firebase';
import type {
  UniversalContextProps,
  UniversalProviderProps,
  UniversalProviderStateProps,
} from './types';

const universalInitState: UniversalProviderStateProps = {
  queryId: null,
};
const UniversalContext = createContext<UniversalContextProps>({
  ...universalInitState,
  setRole: () => null,
  setMayorInfo: () => null,
  setAdviserInfo: () => null,
  setStudentsInfo: () => null,
  setCurrentStudentInfo: () => null,
  returnComplaintsQuery: async () => {
    const promise = new Promise(function (
      resolve: (props: void) => void,
      reject: (props: void) => void,
    ) {
      resolve;
      reject;
    });
    return promise;
  },
});

const UniversalProvider = ({children}: UniversalProviderProps) => {
  const [state, setState] = useState(universalInitState);
  const {adviserInfo, currentStudentInfo} = state;
  const setRole = useCallback(
    (role: UniversalProviderStateProps['role']) =>
      setState(prevState => ({...prevState, role})),
    [],
  );
  const setMayorInfo = useCallback(
    (mayorInfo: StudentInfoProps) =>
      setState(prevState => ({...prevState, mayorInfo})),
    [],
  );
  const setAdviserInfo = useCallback(
    (props: ReadAdviserInfoProps) =>
      setState(prevState => ({
        ...prevState,
        adviserInfo: props,
      })),
    [],
  );
  const setStudentsInfo = useCallback(
    (studentsInfo: StudentInfoProps[]) =>
      setState(prevState => ({...prevState, studentsInfo})),
    [],
  );
  const setCurrentStudentInfo = useCallback(
    (props: StudentInfoProps) =>
      setState(prevState => ({...prevState, currentStudentInfo: props})),
    [],
  );
  const returnComplaintsQuery = useCallback(
    async ({yearLevel, section}: ClassSectionProps) => {
      const thisYear = new Date().getFullYear();
      const nextYear = thisYear + 1;
      const formatYearStringify = `${thisYear}-${nextYear}`;
      const complaintQuery = collectionRef('complaints')
        .where('yearLevel', '==', yearLevel)
        .where('section', '==', section)
        .where('academicYear', '==', formatYearStringify);

      try {
        let test = 1;
        const result = await complaintQuery.countFromServer().get();
        if (result.data().count === 0) {
          console.log((test += 1), 'first');
          const documentRef = await collectionRef('complaints').add({
            time: new Date().getTime(),
            section,
            yearLevel,
            academicYear: formatYearStringify,
          });
          return setState(prevState => ({
            ...prevState,
            queryId: documentRef.id,
          }));
        }
        const snapshot = await complaintQuery.get();
        const doc = snapshot.docs[0];
        if (doc?.exists) {
          setState(prevState => ({
            ...prevState,
            queryId: doc.id,
          }));
        }
      } catch (err) {
        Alert.alert('err', 'Error in returning complaints Query');
      }
    },
    [],
  );
  /** Year Level and Sections set-up */
  useEffect(() => {
    const yearLevel = adviserInfo?.yearLevel ?? currentStudentInfo?.yearLevel;
    const section = adviserInfo?.section ?? currentStudentInfo?.section;
    if (yearLevel !== undefined && section !== undefined) {
      const studentsArrayKey = 'cares-students';
      const studentQuery = collectionRef('student')
        .where('yearLevel', '==', yearLevel)
        .where('section', '==', section);
      async function getStudentsFromServer() {
        const snapshot = await studentQuery.get();
        const studentsHolder: StudentInfoProps[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as StudentInfoProps;
          studentsHolder.push(data);
        });
        await AsyncStorage.setItem(
          studentsArrayKey,
          JSON.stringify(studentsHolder),
        );
        setStudentsInfo(studentsHolder);
      }
      AsyncStorage.getItem(studentsArrayKey)
        .then(cacheStudents => {
          /** Caches students into local storage, and TODO: remove cache if logging out */
          async function setStudents() {
            const result = await studentQuery.countFromServer().get();
            if (typeof cacheStudents === 'string') {
              const parsedCachedStudents = JSON.parse(
                cacheStudents,
              ) as StudentInfoProps[];
              const thereIsNewUpdate =
                result.data().count > parsedCachedStudents.length;
              return thereIsNewUpdate
                ? void getStudentsFromServer()
                : setStudentsInfo(parsedCachedStudents);
            }
            return void getStudentsFromServer();
          }
          return void setStudents();
        })
        .catch(() => {
          Alert.alert('err, "Error in cacheing students');
        });
    }
  }, [
    setStudentsInfo,
    // returnComplaintsQuery,
    adviserInfo?.yearLevel,
    adviserInfo?.section,
    currentStudentInfo?.yearLevel,
    currentStudentInfo?.section,
  ]);

  return (
    <UniversalContext.Provider
      value={{
        ...state,
        setRole,
        setMayorInfo,
        setAdviserInfo,
        setStudentsInfo,
        returnComplaintsQuery,
        setCurrentStudentInfo,
      }}>
      {children}
    </UniversalContext.Provider>
  );
};

export const useUniversal = () => useContext(UniversalContext);
export default UniversalProvider;
