import React, {type ReactNode} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import SvgContainer from '~/components/SvgContainer';
import {useNav} from '~/contexts/NavigationContext';
import {user} from '~/utils/imagePaths';
import {arrowUri, menuDots, userSvg} from '~/utils/svgIcons';

interface HeadingTemplateType {
  navigation: string;
  title: string;
  disabled?: boolean;
}

const Usertab = () => {
  const {navigateTo} = useNav();
  return (
    <View className="border-b-2 border-primary p-12">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="h-12 w-12 overflow-hidden rounded-full border border-black">
            <SvgUri width="100%" height="100%" uri={userSvg} />
            <Image
              source={user}
              resizeMode="center"
              className="h-full w-full"
            />
          </View>
          <View className="ml-2">
            <Text className="text-sm font-bold">Welcome back</Text>
            <Text className="text-lg font-bold text-black">{`${'Juan'}!`}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigateTo('Dashboard User Info')}
          className="h-10 w-10 overflow-hidden rounded-full">
          <SvgUri width="100%" height="100%" uri={menuDots} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const HeadingTemplate = (props: HeadingTemplateType) => {
  const {navigateTo} = useNav();
  const {navigation, title, disabled} = props;

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

export const TabContainer = ({children}: {children: ReactNode}) => {
  return <View className="border-b border-primary py-6">{children}</View>;
};

export default Usertab;
