import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {projectName} from '~/utils/config';

function Header({}: {withBack?: boolean}) {
  const {handleNavigation} = useNav();
  const {initialRouteName, currentUser} = useAuth();

  function handlePressRoute() {
    handleNavigation(initialRouteName);
  }

  function handlePressChats() {
    handleNavigation('Chats');
  }

  return (
    <View className="h-16 flex-row items-center justify-between bg-primary px-2">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={handlePressRoute}>
        <View className="h-12 w-12">
          {/* <Image source={cics} className="h-full w-full" resizeMode="center" /> */}
        </View>
        <Text className="ml-2 text-base font-bold uppercase text-white">
          {projectName}
        </Text>
      </TouchableOpacity>
      {currentUser !== null && (
        <>
          <TouchableOpacity
            className="-top-0 mr-2 h-12 w-12 items-center"
            onPress={handlePressChats}>
            {/* <Image
              className="h-full w-full"
              source={require('~/assets/messages.png')}
            /> */}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Header;
