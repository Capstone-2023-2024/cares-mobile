import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Alert, Modal, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Text} from '~/components';
import ProfilePicture from '~/components/ProfilePicture';
import {useAuth} from '~/contexts/AuthContext';
import {useUser} from '~/contexts/UserContext';
import type {StudentWithClassSection} from '~/types/student';
import {CURRENT_STUDENT_KEY} from '~/utils/config';
import {collectionRef} from '~/utils/firebase';
import type {TextRowType} from './types';
import {OneSignal} from 'react-native-onesignal';

const UserInfo = () => {
  const {currentUser, signout} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const {role, currentStudent, setSection} = useUser();
  const {
    name,
    college,
    yearLevel,
    schoolYear,
    curriculum,
    scholarship,
    major,
    gender,
    age,
  } = currentStudent;

  function handleSignout() {
    OneSignal.logout();
    return void signout();
  }
  async function handleSectionSelect(
    section: StudentWithClassSection['section'],
  ) {
    try {
      await AsyncStorage.setItem(
        CURRENT_STUDENT_KEY,
        JSON.stringify({...currentStudent, section}),
      );
      await collectionRef('student').doc(currentStudent.studentNo).update({
        section,
      });
      setSection(section);
    } catch (err) {
      Alert.alert('Section selection error');
    }
  }

  const renderFacultyUI = () => (
    <>
      <TextRow title="name" value={currentUser?.displayName ?? ''} />
      <TextRow title="email" value={currentUser?.email ?? ''} />
      <TextRow title="phone number" value={currentUser?.phoneNumber ?? ''} />
      {/* {role === 'adviser' && (
        <TextRow title="Year Level" value={String(state?.yearLevel)} />
      )} */}
    </>
  );
  const renderStudentUI = () => {
    const splitName = name.split(',');
    const splitNameResult = splitName[1]?.trim().split('.');
    const lastName = splitName[0] ?? 'lastname';
    const splitNameResultFirstLength = splitNameResult?.[0]?.length ?? -1;
    const firstName =
      splitNameResult?.[0]
        ?.substring(0, splitNameResultFirstLength - 1)
        .trim() ?? 'firstname';
    const middleInitial =
      splitNameResult?.[0]?.substring(
        splitNameResultFirstLength - 1,
        splitNameResultFirstLength,
      ) ?? 'middleInitial';
    return (
      <>
        <TextRow title="first_name" value={firstName} />
        <TextRow title="middle_initial" value={middleInitial} />
        <TextRow title="last_name" value={lastName} />
        <TextRow title="college" value={college} />
        <TextRow title="year_level" value={yearLevel} />
        <TextRow title="school_year" value={schoolYear} />
        <TextRow title="curriculum" value={curriculum} />
        <TextRow title="scholarship" value={scholarship} />
        <TextRow title="major" value={major} />
        <TextRow title="sex" value={gender} />
        <TextRow title="age" value={age} />
        <View className="self-center">{renderSelectDropDown()}</View>
      </>
    );
  };
  const renderSelectDropDown = () => {
    return role === null ? (
      <></>
    ) : (
      <SelectDropdown
        disabled={
          currentStudent.section !== undefined ||
          currentStudent.email === 'null'
        }
        defaultValue={currentStudent.section}
        buttonTextStyle={{textTransform: 'capitalize'}}
        rowTextStyle={{textTransform: 'capitalize'}}
        defaultButtonText="Choose section"
        data={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
        onSelect={handleSectionSelect}
      />
    );
  };
  const renderLogoutModal = () => (
    <Modal
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View className="h-screen items-center justify-center bg-white text-center">
        <Text>Are you sure you want to logout?</Text>
        <TouchableOpacity
          className="mt-2 w-32 rounded-lg  bg-red-500  p-2 text-center shadow-sm"
          onPress={handleSignout}>
          <Text className="text-center text-white ">Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-2 w-32 rounded-lg bg-primary   p-2 text-center shadow-sm"
          onPress={() => setModalVisible(!modalVisible)}>
          <Text className="text-center text-white">No</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View className="my-auto bg-paper">
      <Hero />
      <Text className="mx-4 mt-7 text-xl font-semibold capitalize text-black">
        {`${role} details`}
      </Text>
      {role === 'faculty' || role === 'adviser'
        ? renderFacultyUI()
        : renderStudentUI()}
      <View className="mt-2 self-center">
        {renderLogoutModal()}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="rounded-xl bg-error p-4 px-10 shadow-sm">
          <Text className="text-center text-paper">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Hero = () => {
  const {currentUser} = useAuth();
  const {role, currentStudent} = useUser();

  const renderFacultyUI = () => (
    <View className="ml-2 justify-center">
      <Text className="text-xl capitalize text-paper">
        {currentUser?.displayName}
      </Text>
    </View>
  );

  const renderStudentUI = () => (
    <View className="ml-3 mt-2">
      <Text className="text-xl capitalize text-paper">{`${currentStudent.name}`}</Text>
      <Text className="text-sm text-paper">{`${currentStudent.studentNo}`}</Text>
      <Text className="text-sm text-paper">{`${currentStudent.email}`}</Text>
    </View>
  );

  return (
    <View className="mx-auto mt-9 w-11/12 flex-row rounded-xl bg-accent p-6">
      <ProfilePicture />
      {role === 'faculty' || role === 'adviser'
        ? renderFacultyUI()
        : renderStudentUI()}
    </View>
  );
};

const TextRow = (props: TextRowType) => {
  const cics = 'College of Information and Communications';
  const {title, value} = props;
  return (
    <View className="my-1 flex-row justify-between px-14">
      <Text className="capitalize">{title.replace(/_/, ' ')}</Text>
      <Text
        className={`${
          value.length < 12 ? 'capitalize' : ''
        } font-sembold w-3/5 text-right text-sm text-black`}>
        {value === cics ? `${cics} Technology` : value}
      </Text>
    </View>
  );
};

export default UserInfo;
