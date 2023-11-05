import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {type ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Text} from '~/components';
import ProfilePicture from '~/components/ProfilePicture';
import SvgContainer from '~/components/SVGContainer';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';
import type {PathListType} from '~/utils/navPaths/types';
import {arrowUri, menuDots} from '~/utils/svgIcons';
import type {HeadingTemplateProps, UsertabProps} from './types';

const Usertab = ({name}: UsertabProps) => {
  const {handleNavigation} = useNav();
  const {currentUser} = useAuth();
  const {currentStudent} = useUser();
  const {role} = useUser();

  function handlePressUserInfo() {
    handleNavigation('UserInfo');
  }
  const renderNameAndGreeting = () => (
    <View className="ml-2">
      <Text className="text-sm font-bold">
        {currentStudent.email === 'null' ? '......' : 'Welcome back'}
      </Text>
      {currentStudent.email === 'null' ? (
        <View className="h-6 w-24 bg-primary" />
      ) : (
        <Text className="text-lg font-bold capitalize text-black">
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
          onPress={handlePressUserInfo}
          className="h-10 w-10 overflow-hidden rounded-full">
          {renderDotsIcon()}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const HeadingTemplate = (props: HeadingTemplateProps) => {
  const navigate = useNavigation();
  const {navigation, title, disabled} = props;

  function handleNavigation(path: PathListType) {
    navigate.dispatch(CommonActions.navigate({name: path}));
  }

  function handlePressNavigation() {
    handleNavigation(navigation);
  }

  return (
    <View className="flex-row justify-between px-8 py-6">
      <Text className="text-xl font-bold capitalize text-black">{title}</Text>
      <TouchableOpacity
        className={disabled ? 'opacity-25' : 'opacity-100'}
        disabled={disabled}
        onPress={handlePressNavigation}>
        <SvgContainer disabled={disabled} uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
};

export const TabContainer = ({children}: {children: ReactNode}) => {
  return <View className="border-b-2 border-primary py-6">{children}</View>;
};

export default Usertab;
