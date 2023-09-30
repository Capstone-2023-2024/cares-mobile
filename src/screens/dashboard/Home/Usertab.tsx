import React, { type ReactNode } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Text } from '~/components';
import SvgContainer from '~/components/SvgContainer';
import { useAuth } from '~/contexts/AuthContext';
import { useNav } from '~/contexts/NavigationContext';
import type { PathListType } from '~/types/navigation';
import { user } from '~/utils/imagePaths';
import { arrowUri, menuDots } from '~/utils/svgIcons';

interface HeadingTemplateType {
  navigation: PathListType;
  title: string;
  disabled?: boolean;
}

const Usertab = ({ name }: { name: string }) => {
  const { navigateTo } = useNav();
  const { currentUser } = useAuth();

  return (
    <View className=" border-b-2 p-12">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="h-12 w-12 overflow-hidden rounded-full border border-black">
            <Image
              source={user}
              src={currentUser?.photoURL ?? ''}
              className="h-full w-full"
            />
          </View>
          <View className="ml-2">
            <Text className="text-sm font-bold">Welcome back</Text>
            <Text className="text-lg font-bold capitalize text-black">{currentUser?.displayName ?? ""}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigateTo('UserInfo')}
          className="h-10 w-10 overflow-hidden rounded-full">
          <SvgUri width="100%" height="100%" uri={menuDots} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const HeadingTemplate = (props: HeadingTemplateType) => {
  const { navigateTo } = useNav();
  const { navigation, title, disabled } = props;

  return (
    <View className="flex-row justify-between px-8">
      <Text className="text-lg capitalize text-black">{title}</Text>
      <TouchableOpacity
        className={disabled ? 'text-gray-400' : ''}
        disabled={disabled}
        onPress={() => navigateTo(navigation)}>
        <SvgContainer disabled={disabled} uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
};

export const TabContainer = ({ children }: { children: ReactNode }) => {
  return <View className="border-b-2 py-6">{children}</View>;
};

export default Usertab;
