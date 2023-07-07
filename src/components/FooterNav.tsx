import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNav} from '~/contexts/NavigationContext';

const FooterNav = () => {
  const {navigateTo} = useNav();
  return (
    <View className="fixed inset-x-0 bottom-0 py-4 ">
      {/* <View className="mr-2 h-12 w-12">
        <Image
          source={require('~/assets/class.svg')}
          className="h-full w-full"
          resizeMode="center"
        />
      </View> */}
      <TouchableOpacity onPress={() => navigateTo('Special Class Application')}>
        <Text className="text-center text-xs">Special Class Icon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterNav;
