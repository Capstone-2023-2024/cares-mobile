import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import SvgContainer from '~/components/SvgContainer';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import {Error} from '~/utils/error';
import {validateEmailWithCOR} from '~/utils/firebase';
import {userSvg} from '~/utils/svgIcons';
import {ResultType} from 'cics-mobile-client/../../shared/types';
import {Text} from '~/components';

interface TextRowType {
  title: string;
  value: string;
}

const UserInfo = () => {
  const {signout} = useAuth();
  const {studentInfo} = useContent();
  const {
    name,
    age,
    curriculum,
    college,
    yearLevel,
    scholarship,
    schoolYear,
    major,
    gender,
  } = studentInfo;
  const props = (type: ResultType['type']) =>
    !name ? {name: ''} : {name, type};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);
  const middleInitial = validateEmailWithCOR(props('initial') as ResultType);
  console.log(scholarship);
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
      <Hero />
      <Text className="m-8 text-3xl font-semibold text-black">
        Student details
      </Text>
      <TextRow title="first_name" value={`${firstName}`} />
      <TextRow title="middle_initial" value={`${middleInitial}`} />
      <TextRow title="last_name" value={`${lastName}`} />
      <TextRow title="college" value={`${college}`} />
      <TextRow title="year_level" value={`${yearLevel}`} />
      <TextRow title="school_year" value={`${schoolYear}`} />
      <TextRow title="curriculum" value={`${curriculum}`} />
      <TextRow
        title="scholarship"
        value={`${
          scholarship?.replace(/Official Receipt:/y, '') ?? scholarship
        }`}
      />
      <TextRow title="major" value={`${major}`} />
      <TextRow title="sex" value={`${gender}`} />
      <TextRow title="age" value={`${age}`} />
      <TouchableOpacity
        onPress={handleSignout}
        className="mt-14 self-center rounded-xl bg-error p-4 px-10 shadow-sm">
        <Text className="text-paper">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Hero = () => {
  const {currentUser} = useAuth();
  const {studentInfo} = useContent();
  const {name, studentNo} = studentInfo;
  const props = (type: ResultType['type']) =>
    !name ? {name: ''} : {name, type};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);

  return (
    <View className="mx-auto w-11/12 flex-row rounded-xl bg-accent p-6">
      <SvgContainer uri={userSvg} size="base" isCircle />
      <View className="ml-2">
        <Text className="text-xl capitalize text-paper">{`${lastName}, ${firstName}`}</Text>
        <Text className="text-xs text-paper">{`${studentNo}`}</Text>
        <Text className="text-xs text-paper">{`${currentUser?.email}`}</Text>
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
