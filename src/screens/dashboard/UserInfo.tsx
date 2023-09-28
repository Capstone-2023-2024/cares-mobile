import React, { useCallback, useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View, Image } from 'react-native';
import { useAuth } from '~/contexts/AuthContext';
import { Error } from '~/utils/error';
import { collectionRef, validateEmailWithCOR } from '~/utils/firebase';
import {
  ResultType,
  StudInfoSortedType,
} from 'cics-mobile-client/../../shared/types';
import { Text } from '~/components';
import { UserCacheType } from '../authentication/Register/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user } from '~/utils/imagePaths';
import { RoleType } from '../authentication/Landing/types';
import { useContent } from '~/contexts/ContentContext';

interface TextRowType {
  title: string;
  value: string;
}

const UserInfo = () => {
  const {currentUser, signout} = useAuth();
  const [state, setState] = useState<Omit<StudInfoSortedType, 'studentNo'>>();
  const [studNo, setStudNo] = useState('');
  const {role } = useContent()
  const props = (type: ResultType['type']) =>
    state?.name ? {name: state?.name, type} : {name: ''};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);
  const middleInitial = validateEmailWithCOR(props('initial') as ResultType);

  const setup = useCallback(async () => {
    const usersCache: UserCacheType[] = JSON.parse(
      (await AsyncStorage.getItem('usersCache')) ?? '',
    );
    usersCache.forEach(user => {
      const currentLogin = Object.values(user).filter(async values => {
        try {
          const studNo = await collectionRef('student')
            .where('email', '==', currentUser?.email)
            .get();
          setStudNo(studNo.docs[0]?.id ?? '');
          return currentUser?.email === values.email;
        } catch (err) {
          console.log(err);
        }
      })[0];
      setState(currentLogin);
    });
  }, []);

  useEffect(() => {
    const unsub = setup();
    return () => {
      unsub;
    };
  }, []);

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
      <Hero name={state?.name ?? ''} studentNo={studNo} />
      <Text className="m-8 text-3xl font-semibold capitalize text-black">
        {`${role} details`}
      </Text>
      {role === 'faculty' ? (
        <>
          <TextRow title="name" value={`${currentUser?.displayName}`} />
          <TextRow title="name" value={`${currentUser?.email}`} />
          <TextRow title="name" value={`${currentUser?.phoneNumber}`} />
        </>
      ) : (
        <>
          <TextRow title="first_name" value={`${firstName}`} />
          <TextRow title="middle_initial" value={`${middleInitial}`} />
          <TextRow title="last_name" value={`${lastName}`} />
          <TextRow title="college" value={`${state?.college}`} />
          <TextRow title="year_level" value={`${state?.yearLevel}`} />
          <TextRow title="school_year" value={`${state?.schoolYear}`} />
          <TextRow title="curriculum" value={`${state?.curriculum}`} />
          <TextRow
            title="scholarship"
            value={`${
              state?.scholarship?.replace(/Official Receipt:/y, '') ??
              state?.scholarship
            }`}
          />
          <TextRow title="major" value={`${state?.major}`} />
          <TextRow title="sex" value={`${state?.gender}`} />
          <TextRow title="age" value={`${state?.age}`} />
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

const Hero = ({
  name,
  studentNo,
}: {
  name: string;
  studentNo: string;
}) => {
  const {role } = useContent()
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
          <></>
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
      <Text className="font-sembold capitalize text-black">{value}</Text>
    </View>
  );
};

export default UserInfo;
