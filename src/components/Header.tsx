import {projectName} from 'cics-mobile-client/../../shared/names';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {cics} from '~/utils/imagePaths';
import {Text} from '~/components';

function Header({}: {withBack?: boolean}) {
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
        <Text className="ml-2 text-base font-bold uppercase text-white">
          {projectName}
        </Text>
      </TouchableOpacity>
      {currentUser !== null && (
        <>
          <TouchableOpacity
            className="-top-0 mr-2 h-12 w-12 items-center"
            onPress={() => navigateTo('Chats')}>
            <Image
              className="h-full w-full"
              source={require('~/assets/messages.png')}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Header;
