import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const Registered = ({navigation}: {navigation: any}) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginForm');
  };

  return (
    <View className="flex-1 items-center justify-center bg-paper px-2">
      {/* <Image
        source={require('~/assets/check_icon.png')}
      /> */}
      <View className="mb-2 h-12 w-12">
        <Text>Image</Text>
      </View>
      <Text className="mb-2 text-center text-xl font-bold text-primary">
        Account is Successfully Registered
      </Text>
      <TouchableOpacity
        className="rounded-xl bg-primary p-8 px-12"
        onPress={handleLoginPress}>
        <Text className="text-center font-bold text-paper">
          Continue to Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registered;
