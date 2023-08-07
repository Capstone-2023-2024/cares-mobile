import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const AccRegistered = ({ navigation }: { navigation: any }) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginForm');
  };

  return (
    <View className='flex-1 items-center justify-center bg-paper px-2'>
      <Image source={require('../assets/check_icon.png')} className='h-12 w-12 mb-2' />
      <Text className='text-xl font-bold mb-2 text-primary text-center'>Account is Successfully Registered</Text>
      <TouchableOpacity className='bg-primary rounded-xl p-8 px-12' onPress={handleLoginPress}>
        <Text className='text-paper font-bold text-center'>Continue to Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccRegistered;
