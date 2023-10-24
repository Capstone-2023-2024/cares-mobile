import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, TouchableOpacity, View, ToastAndroid} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import {collectionRef, validateEmailWithCOR} from '~/utils/firebase';
import {UserCacheType} from '../../authentication/Register/types';
import type {StudentInfoProps} from '../Home/types';
import type {TextRowType} from './types';
import type {StudentWithClassSection, ResultType} from '~/types/student';
import ProfilePicture from '~/components/ProfilePicture';
import SelectDropdown from 'react-native-select-dropdown';

const UserInfo = () => {
  const {currentUser, signout} = useAuth();
  const [mayor, setMayor] = useState<'active' | undefined>(undefined);
  const [state, setState] =
    useState<Omit<StudentWithClassSection, 'studentNo'>>();
  const [studNo, setStudNo] = useState('');
  const isStudNotEmpty = studNo !== '';
  const {role} = useContent();
  const props = (type: ResultType['type']) =>
    state?.name ? {name: state?.name, type} : {name: ''};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);
  const middleInitial = validateEmailWithCOR(props('initial') as ResultType);

  async function handleSectionSelect(section: string) {
    if (isStudNotEmpty) {
      try {
        await collectionRef('student').doc(studNo).update({
          section,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleMayorApplication() {
    const date = new Date();
    if (state !== undefined) {
      const candidate = {
        email: state.email,
        name: state.name,
        section: state.section,
        yearLevel: state.yearLevel,
        year: date.getFullYear().toString(),
      };
      try {
        const snap = await collectionRef('mayor')
          .where('email', '==', currentUser?.email)
          .count()
          .get();
        if (snap.data().count <= 0) {
          return await collectionRef('mayor').add(candidate);
        }
        const dataSnap = await collectionRef('mayor')
          .where('email', '==', currentUser?.email)
          .get();
        const status = dataSnap.docs[0]?.data().status as 'active' | undefined;
        if (status === undefined) {
          return ToastAndroid.show(
            "You've already submitted a entry",
            ToastAndroid.SHORT,
          );
        }
        setMayor(status);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleSignout() {
    try {
      await signout();
    } catch (err) {
      interface Error {
        code: string;
      }
      const error = err as Error;
      Alert.alert(error.code);
    }
  }

  const setupForStudents = useCallback(async () => {
    try {
      async function fetchStudentId() {
        if (currentUser !== null) {
          const studInfo = await collectionRef('student')
            .where('email', '==', currentUser.email)
            .get();
          const doc = studInfo.docs[0] as unknown as
            | StudentInfoProps
            | undefined;
          if (doc !== undefined) {
            setStudNo(doc.id);
          }
          const getUserCache = await AsyncStorage.getItem('usersCache');
          if (getUserCache !== null) {
            const usersCache: UserCacheType[] = JSON.parse(getUserCache);
            let studInfo: typeof state;
            usersCache.forEach(studentNo => {
              const currentLogin = Object.values(studentNo).filter(
                values => currentUser.email === values.email,
              )[0];
              studInfo = currentLogin;
            });
            setState(studInfo);
          }
          const snap = await collectionRef('mayor')
            .where('email', '==', currentUser.email)
            .where('status', '==', 'active')
            .count()
            .get();
          if (snap.data().count > 0) {
            setMayor('active');
          }
        }
      }
      void fetchStudentId();
    } catch (err) {
      console.log(err);
    }
  }, [currentUser]);

  useEffect(() => {
    return void setupForStudents();
  }, [setupForStudents]);

  return (
    <View className="my-auto bg-paper">
      <Hero
        name={
          role === 'faculty'
            ? currentUser?.displayName ?? ''
            : state?.name ?? ''
        }
        studentNo={studNo}
      />
      <Text className="mx-4 my-2 text-xl font-semibold capitalize text-black">
        {`${role} details`}
      </Text>
      {role === 'faculty' ? (
        <>
          <TextRow title="name" value={`${currentUser?.displayName}`} />
          <TextRow title="email" value={`${currentUser?.email}`} />
          <TextRow title="phone number" value={`${currentUser?.phoneNumber}`} />
        </>
      ) : (
        <>
          <TextRow
            title="first_name"
            value={`${isStudNotEmpty && firstName}`}
          />
          <TextRow
            title="middle_initial"
            value={`${isStudNotEmpty && middleInitial}`}
          />
          <TextRow title="last_name" value={`${isStudNotEmpty && lastName}`} />
          <TextRow
            title="college"
            value={`${isStudNotEmpty && state?.college}`}
          />
          <TextRow
            title="year_level"
            value={`${isStudNotEmpty && state?.yearLevel}`}
          />
          <TextRow
            title="school_year"
            value={`${isStudNotEmpty && state?.schoolYear}`}
          />
          <TextRow
            title="curriculum"
            value={`${isStudNotEmpty && state?.curriculum}`}
          />
          <TextRow
            title="scholarship"
            value={`${
              state?.scholarship?.replace(/Official Receipt:/y, '') ??
              state?.scholarship
            }`}
          />
          <TextRow title="major" value={`${isStudNotEmpty && state?.major}`} />
          <TextRow title="sex" value={`${isStudNotEmpty && state?.gender}`} />
          <TextRow title="age" value={`${isStudNotEmpty && state?.age}`} />
        </>
      )}
      <View className="mt-2 self-center">
        {role !== 'faculty' && (
          <>
            <SelectDropdown
              disabled={state?.section !== undefined}
              defaultValue={state?.section ? state.section : null}
              buttonTextStyle={{textTransform: 'capitalize'}}
              rowTextStyle={{textTransform: 'capitalize'}}
              defaultButtonText="Choose section"
              data={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
              onSelect={handleSectionSelect}
            />
            <TouchableOpacity
              disabled={state?.section === undefined || mayor !== undefined}
              onPress={handleMayorApplication}
              className={`${
                state?.section === undefined
                  ? 'bg-slate-300 text-slate-400'
                  : 'bg-primary text-primary'
              } rounded-xl p-4 px-10 shadow-sm`}>
              <Text className="text-center text-paper">
                {mayor === undefined
                  ? 'Apply for Mayor'
                  : `${state?.yearLevel.charAt(
                      0,
                    )}${state?.section.toUpperCase()} Mayor`}
              </Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={handleSignout}
          className="rounded-xl bg-error p-4 px-10 shadow-sm">
          <Text className="text-center text-paper">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Hero = ({name, studentNo}: {name: string; studentNo: string}) => {
  const {role} = useContent();
  const {currentUser} = useAuth();
  const props = (type: ResultType['type']) =>
    !name ? {name: ''} : {name, type};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);

  return (
    <View className="mx-auto w-11/12 flex-row rounded-xl bg-accent p-6">
      <ProfilePicture />
      <View className="ml-2">
        {role === 'faculty' ? (
          <>
            <Text className="text-xl capitalize text-paper">{`${name}`}</Text>
          </>
        ) : (
          <>
            <Text className="text-xl capitalize text-paper">{`${lastName}, ${firstName}`}</Text>
            <Text className="text-xs text-paper">{`${studentNo}`}</Text>
            <Text className="text-xs text-paper">{`${currentUser?.email}`}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const TextRow = (props: TextRowType) => {
  const {title, value} = props;
  return (
    <View className="my-1 flex-row justify-between px-14">
      <Text className="capitalize">{title.replace(/_/, ' ')}</Text>
      <Text className="font-sembold text-sm text-black">{value}</Text>
    </View>
  );
};

export default UserInfo;
