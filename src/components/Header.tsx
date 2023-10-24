import {useRoute} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {projectName} from '~/utils/config';
import {MessageSvg} from '~/utils/image';

function Header({}: {withBack?: boolean}) {
  const {handleNavigation} = useNav();
  const {initialRouteName, currentUser} = useAuth();
  const route = useRoute();

  function handlePressRoute() {
    handleNavigation('Home');
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
          <Text>cics_icon</Text>
          {/* <Image source={cics} className="h-full w-full" resizeMode="center" /> */}
        </View>
        <Text className="ml-2 text-base font-bold uppercase text-white">
          {projectName}
        </Text>
      </TouchableOpacity>
      {currentUser !== null && route.name !== 'Chats' && (
        <>
          <TouchableOpacity
            className="-top-0 mr-2 h-12 w-12 items-center"
            onPress={handlePressChats}>
            <MessageSvg />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Header;
