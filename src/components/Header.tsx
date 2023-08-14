import {useNavigation} from '@react-navigation/native';
import {projectName} from 'cics-mobile-client/../../shared/names';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {cics} from '~/utils/imagePaths';
import {arrowUri} from '~/utils/svgIcons';
import SvgContainer from './SvgContainer';

function Header({withBack}: {withBack?: boolean}) {
  const {navigateTo} = useNav();
  const {initialRouteName, currentUser} = useAuth();

  return (
    <View className="h-16 flex-row items-center justify-between bg-primary px-2">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => navigateTo(initialRouteName)}>
        <View className="h-12 w-12">
          <Image source={cics} className="h-full w-full" resizeMode="center" />
        </View>
        <Text className="ml-2 text-base text-white">{projectName}</Text>
      </TouchableOpacity>
      {currentUser !== null && (
        <>
          <TouchableOpacity className="-top-1 ml-auto mr-2 h-8 w-8 items-center">
            <Image
              className="h-full w-full"
              source={require('~/assets/user.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="-top-1 mr-2 h-8 w-8 items-center"
            onPress={() => navigateTo('Chats')}>
            <Image
              className="h-full w-full"
              source={require('~/assets/messages.png')}
            />
          </TouchableOpacity>
        </>
      )}
      {withBack && <BackHeader />}
    </View>
  );
}

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="absolute top-16 h-16 flex-row items-center bg-transparent px-2">
      <TouchableOpacity className="rotate-180" onPress={handleGoBack}>
        <SvgContainer uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
