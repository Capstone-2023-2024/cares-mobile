import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, ToastAndroid, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Text} from '~/components';
import ProfilePicture from '~/components/ProfilePicture';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import type {ResultType, StudentWithClassSection} from '~/types/student';
import {collectionRef, validateEmailWithCOR} from '~/utils/firebase';
import type {TextRowType} from './types';

const UserInfo = () => {
  const {currentUser, signout} = useAuth();
  const [state, setState] = useState<StudentWithClassSection>();
  const [modalVisible, setModalVisible] = useState(false);
  const {role, handleUsersCache} = useContent();
  const props = (type: ResultType['type']) =>
    state?.name ? {name: state?.name, type} : {name: ''};
  const firstName = validateEmailWithCOR(props('first') as ResultType);
  const lastName = validateEmailWithCOR(props('last') as ResultType);
  const middleInitial = validateEmailWithCOR(props('initial') as ResultType);

  function handleSignout() {
    void signout();
  }
  async function handleSectionSelect(
    section: StudentWithClassSection['section'],
  ) {
    if (state !== undefined) {
      try {
        const userCacheArray = await handleUsersCache();
        const indexInArray = userCacheArray.findIndex(
          ({email}) => currentUser?.email === email,
        );
        const restOfTheArray = userCacheArray.filter(
          ({email}) => currentUser?.email !== email,
        );
        const selectedArray = userCacheArray[indexInArray];
        if (selectedArray !== undefined) {
          const studentSectionToCache = {...selectedArray, section};
          const newArray = [...restOfTheArray];
          newArray.push(studentSectionToCache);
          await AsyncStorage.setItem('usersCache', JSON.stringify(newArray));
          await collectionRef('student').doc(state.studentNo).update({
            section,
          });
        }
      } catch (err) {
        ToastAndroid.show('Handle section selection error', ToastAndroid.SHORT);
      }
    }
  }

  const renderFacultyUI = () => (
    <>
      <TextRow title="name" value={currentUser?.displayName ?? ''} />
      <TextRow title="email" value={currentUser?.email ?? ''} />
      <TextRow title="phone number" value={currentUser?.phoneNumber ?? ''} />
    </>
  );
  const renderStudentUI = () => (
    <>
      <TextRow title="first_name" value={state ? firstName : ''} />
      <TextRow title="middle_initial" value={state ? middleInitial : ''} />
      <TextRow title="last_name" value={state ? lastName : ''} />
      <TextRow title="college" value={state ? state?.college : ''} />
      <TextRow title="year_level" value={state ? state?.yearLevel : ''} />
      <TextRow title="school_year" value={state ? state?.schoolYear : ''} />
      <TextRow title="curriculum" value={state ? state?.curriculum : ''} />
      <TextRow
        title="scholarship"
        value={
          state ? state?.scholarship?.replace(/Official Receipt:/y, '') : ''
        }
      />
      <TextRow title="major" value={state ? state?.major : ''} />
      <TextRow title="sex" value={state ? state?.gender : ''} />
      <TextRow title="age" value={state ? state?.age : ''} />
    </>
  );
  const renderSelectDropDown = () => {
    return (
      <SelectDropdown
        disabled={state?.section !== undefined}
        defaultValue={state?.section ? state.section : null}
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
          className="w-32 rounded-lg bg-primary  p-2 text-center shadow-sm"
          onPress={() => void handleSignout()}>
          <Text className="text-white">Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-32 rounded-lg bg-red-500  p-2 text-center shadow-sm"
          onPress={() => setModalVisible(!modalVisible)}>
          <Text className="text-white">No</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  useEffect(() => {
    async function setupForStudents() {
      try {
        const array = await AsyncStorage.getItem('usersCache');
        if (array !== null) {
          const parsedArray = JSON.parse(array) as StudentWithClassSection[];
          const filteredArray = parsedArray.filter(
            ({email}) => currentUser?.email === email,
          );
          if (filteredArray.length > 0) {
            const result = filteredArray[0] as StudentWithClassSection;
            setState({...result});
          }
        }
      } catch (err) {
        ToastAndroid.show(
          'Error in setting up students in User Info',
          ToastAndroid.SHORT,
        );
      }
    }
    return void setupForStudents();
  }, [currentUser]);

  return (
    <View className="my-auto bg-paper">
      <Hero name={state?.name} studentNo={state?.studentNo ?? ''} />
      <Text className="mx-4 my-2 text-xl font-semibold capitalize text-black">
        {`${role} details`}
      </Text>
      {role === 'faculty' ? renderFacultyUI() : renderStudentUI()}
      <View className="mt-2 self-center">
        {role !== 'faculty' && renderSelectDropDown()}
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

interface HeroProps {
  studentNo: string;
  name?: string;
}

const Hero = ({studentNo, name}: HeroProps) => {
  const {role} = useContent();
  const {currentUser} = useAuth();
  const handleNameProps = (type: ResultType['type']) => {
    if (role === 'adviser' || role === 'faculty') {
      return {name: currentUser?.displayName ?? '', type};
    }
    return {name: name ?? '', type};
  };
  const firstName = validateEmailWithCOR(
    handleNameProps('first') as ResultType,
  );
  const lastName = validateEmailWithCOR(handleNameProps('last') as ResultType);

  const renderFacultyUI = () => (
    <View className="ml-2 justify-center">
      <Text className="text-xl capitalize text-paper">
        {currentUser?.displayName}
      </Text>
    </View>
  );
  const renderStudentUI = () => (
    <View className="ml-2">
      <Text className="text-xl capitalize text-paper">{`${lastName}, ${firstName}`}</Text>
      <Text className="text-xs text-paper">{`${studentNo}`}</Text>
      <Text className="text-xs text-paper">{`${currentUser?.email}`}</Text>
    </View>
  );

  return (
    <View className="mx-auto w-11/12 flex-row rounded-xl bg-accent p-6">
      <ProfilePicture />
      {role === 'faculty' ? renderFacultyUI() : renderStudentUI()}
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
