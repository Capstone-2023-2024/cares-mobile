import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {type ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Text} from '~/components';
import ProfilePicture from '~/components/ProfilePicture';
import SvgContainer from '~/components/SVGContainer';
import {useNav} from '~/contexts/NavigationContext';
import type {PathListType} from '~/utils/navPaths/types';
import {arrowUri, menuDots} from '~/utils/svgIcons';
import type {HeadingTemplateProps, UsertabProps} from './types';
import {useContent} from '~/contexts/ContentContext';
import {useAuth} from '~/contexts/AuthContext';

const Usertab = ({name}: UsertabProps) => {
  const {handleNavigation} = useNav();
  const {currentUser} = useAuth();
  const {role} = useContent();

  function handlePressUserInfo() {
    handleNavigation('UserInfo');
  }
  const renderNameAndGreeting = () => (
    <View className="ml-2">
      {/* {name === 'null' ? (
        <>
          <Text className="text-sm font-bold">Loading</Text>
          <Text className="text-lg font-bold capitalize text-black">...</Text>
        </>
      ) : ( */}
      <>
        <Text className="text-sm font-bold">Welcome back</Text>
        <Text className="text-lg font-bold capitalize text-black">
          {name === 'null' && role !== 'mayor' && role !== 'student'
            ? currentUser?.displayName
            : name}
        </Text>
      </>
      {/* )} */}
    </View>
  );
  const renderProfilePicture = () => (
    // name === 'null' ? (
    // <View className="rounded-full border-2 border-primary bg-primary p-5" />
    // ) : (
    <ProfilePicture />
  );
  // );
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
    <View className="flex-row justify-between px-8">
      <Text className="text-lg capitalize text-black">{title}</Text>
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
