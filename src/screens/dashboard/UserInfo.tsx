import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ResultType,
  StudInfoSortedType,
} from 'cics-mobile-client/../../shared/types';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import {Error} from '~/utils/error';
import {collectionRef, validateEmailWithCOR} from '~/utils/firebase';
import {user} from '~/utils/imagePaths';
import {UserCacheType} from '../authentication/Register/types';
import type {StudentInfoProps} from './Home/types';

interface TextRowType {
  title: string;
  value: string;
}

const UserInfo = () => {
  const {currentUser, signout} = useAuth();
  const [state, setState] = useState<Omit<StudInfoSortedType, 'studentNo'>>();
  const [studNo, setStudNo] = useState('');
  const isStudNotEmpty = studNo !== '';
  const {role} = useContent();
  const props = (type: ResultType['type']) =>
    state?.name ? {name: state?.name, type} : {name: ''};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);
  const middleInitial = validateEmailWithCOR(props('initial') as ResultType);

  const setupForStudents = useCallback(async () => {
    try {
      async function fetchStudentId() {
        const studInfo = await collectionRef('student')
          .where('email', '==', currentUser?.email)
          .get();
        const doc = studInfo.docs[0] as unknown as StudentInfoProps | undefined;
        if (doc !== undefined) {
          setStudNo(doc.id);
        }
        const getUserCache = await AsyncStorage.getItem('usersCache');
        if (getUserCache !== null) {
          const usersCache: UserCacheType[] = JSON.parse(getUserCache);
          usersCache.forEach(uCache => {
            const currentLogin = Object.values(uCache).filter(
              values => currentUser?.email === values.email,
            )[0];
            setState(currentLogin);
          });
        }
      }
      void fetchStudentId();
    } catch (err) {
      console.log(err);
    }
  }, [currentUser]);

  useEffect(() => {
    const unsub = void setupForStudents();
    return () => {
      unsub;
    };
  }, [setupForStudents]);

  async function handleSignout() {
    try {
      await signout();
    } catch (err) {
      const {code} = err as Error;
      Alert.alert(code);
    }
  }
  return (
    <View className="my-auto h-5/6 bg-paper">
      <Hero
        name={
          role === 'faculty'
            ? currentUser?.displayName ?? ''
            : state?.name ?? ''
        }
        studentNo={studNo}
      />
      <Text className="m-8 text-3xl font-semibold capitalize text-black">
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
      <TouchableOpacity
        onPress={handleSignout}
        className="mt-14 self-center rounded-xl bg-error p-4 px-10 shadow-sm">
        <Text className="text-paper">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Hero = ({name, studentNo}: {name: string; studentNo: string}) => {
  const {role} = useContent();
  const DIMENSION = 40;
  const {currentUser} = useAuth();
  const props = (type: ResultType['type']) =>
    !name ? {name: ''} : {name, type};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);

  return (
    <View className="mx-auto w-11/12 flex-row rounded-xl bg-accent p-6">
      <View className="h-12 w-12 overflow-hidden rounded-full">
        <Image
          alt=""
          className="h-full w-full"
          source={user}
          src={currentUser?.photoURL ?? ''}
          width={DIMENSION}
          height={DIMENSION}
        />
      </View>
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
