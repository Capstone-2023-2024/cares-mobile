import {TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {Text} from '~/components';
import {useNavigation} from '@react-navigation/native';

const ChatNav = () => {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View className="h-16 flex-row items-center bg-paper px-2">
      <TouchableOpacity onPress={handleGoBack}>
        <View>
          {/* <Image
            className="h-7 w-7 rotate-180 p-2"
            source={require('~/assets/right-arrow.png')}
            resizeMode="center"
          /> */}
        </View>
      </TouchableOpacity>
      <View className="flex-1 items-center justify-center">
        <Text className="-left-3 text-4xl text-tertiary">Chats</Text>
      </View>
    </View>
  );
};

export default ChatNav;
