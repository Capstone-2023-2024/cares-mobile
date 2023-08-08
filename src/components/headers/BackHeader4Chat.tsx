import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Perform the navigation action to go back to the HomeScreen
  };

  return (
    <View className="h-16 flex-row items-center px-2">
      <TouchableOpacity onPress={handleGoBack}>
        <View>
          <Image
            className="h-7 w-7 rotate-180 p-2"
            source={require('~/assets/right-arrow.png')}
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
      <View className="flex-1 items-center justify-center">
        <Text className="text-customColor text-4xl">Chats</Text>
      </View>
    </View>
  );
}

export default BackHeader;
