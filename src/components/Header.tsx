import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';
import {projectName} from '~/utils/config';

function Header({}: {withBack?: boolean}) {
  const {handleNavigation} = useNav();
  const {role} = useContent();
  const {currentUser} = useAuth();
  const route = useRoute();

  function handlePressRoute() {
    handleNavigation('Home');
  }
  function handlePressChats() {
    handleNavigation('Chats');
  }
  const renderChatIcon = () =>
    role !== 'faculty' &&
    route.name !== 'Chats' &&
    currentUser !== null && (
      <>
        <TouchableOpacity
          disabled={role === null}
          className="mr-2 h-8 w-8 items-center"
          onPress={handlePressChats}>
          <Image
            source={require('~/assets/chat.png')}
            className="h-full w-full"
          />
        </TouchableOpacity>
      </>
    );

  return (
    <View className="h-16 flex-row items-center justify-between bg-paper px-2 shadow-lg">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={handlePressRoute}>
        <View className="h-8 w-8 bg-paper">
          <Image
            source={require('~/assets/cares_icon.png')}
            className="h-full w-full"
            resizeMode="center"
          />
        </View>
        <Text className="ml-2 text-base font-bold uppercase text-primary">
          {projectName}
        </Text>
      </TouchableOpacity>
      {renderChatIcon()}
    </View>
  );
}

export default Header;
