import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {type ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Text} from '~/components';
import SvgContainer from '~/components/SVGContainer';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import type {PathListType} from '~/utils/navPaths/types';
import {arrowUri, menuDots} from '~/utils/svgIcons';
import type {HeadingTemplateProps, UsertabProps} from './types';
import {UserSvg} from '~/utils/image';
import ProfilePicture from '~/components/ProfilePicture';

const Usertab = ({name}: UsertabProps) => {
  const {handleNavigation} = useNav();
  const {currentUser} = useAuth();

  function handlePressUserInfo() {
    handleNavigation('UserInfo');
  }

  return (
    <View className=" border-b-2 border-primary p-12">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <ProfilePicture />
          <View className="ml-2">
            <Text className="text-sm font-bold">Welcome back</Text>
            <Text className="text-lg font-bold capitalize text-black">
              {currentUser?.displayName ?? ''}!
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handlePressUserInfo}
          className="h-10 w-10 overflow-hidden rounded-full">
          <SvgUri width="100%" height="100%" uri={menuDots} />
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
