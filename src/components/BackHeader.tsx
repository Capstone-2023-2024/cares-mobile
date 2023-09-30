import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image} from 'react-native';

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Perform the navigation action to go back to the HomeScreen
  };

  return (
    <View className="h-16 flex-row items-center px-2">
      <TouchableOpacity onPress={handleGoBack}>
        <View className="h-3/4 w-9 rotate-180 p-2">
          <Image
            source={require('~/assets/right-arrow.png')}
            className="h-full w-full"
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default BackHeader;
