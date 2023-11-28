import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgUri} from 'react-native-svg';
import ProfilePicture from '~/components/ProfilePicture';
import Text from '~/components/Text';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';
import {menuDots} from '~/utils/svgIcons';
import type {UsertabProps} from './types';

const HomeUsertab = ({name}: UsertabProps) => {
  const {handleNavigation} = useNav();
  const {currentUser} = useAuth();
  const {currentStudent} = useUser();
  const {role} = useUser();

  function handlePressUserInfo() {
    handleNavigation('UserInfo');
  }
  const renderNameAndGreeting = () => (
    <View className="ml-1">
      <Text className="ml-2 text-sm font-bold">
        {currentStudent.email === 'null' ? '......' : 'Welcome back'}
      </Text>
      {currentStudent.email === 'null' ? (
        <View className="h-6 w-24 bg-primary" />
      ) : (
        <Text className="ml-2 text-lg font-bold capitalize text-black">
          {name === 'null' && role !== 'mayor' && role !== 'student'
            ? currentUser?.displayName
            : name}
        </Text>
      )}
    </View>
  );
  const renderProfilePicture = () =>
    currentStudent.email === 'null' ? (
      <View className="h-8 w-8 rounded-full bg-secondary" />
    ) : (
      <ProfilePicture />
    );
  const renderDotsIcon = () => (
    // name === 'null' ? (
    // <View>
    //   <Text className="text-xl">...</Text>
    // </View>
    // ) : (
    <SvgUri width="100%" height="100%" uri={menuDots} />
  );
  // );

  return (
    <View className=" border-b-2 border-primary p-12">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {renderProfilePicture()}
          {renderNameAndGreeting()}
        </View>
        <TouchableOpacity
          disabled={currentStudent.email === 'null'}
          onPress={handlePressUserInfo}
          className="h-10 w-10 overflow-hidden rounded-full">
          {renderDotsIcon()}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeUsertab;
