import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNav} from '~/contexts/NavigationContext';
import {Text} from '~/components';

const FooterNav = () => {
  const {navigateTo} = useNav();
  return (
    <View style={{bottom: 0, left: 0, right: 0}}>
      <View
        style={{
          backgroundColor: 'black',
          height: 1,
        }}
      />
      <View className="items-center">
        <TouchableOpacity
          className="mb-2"
          onPress={() => navigateTo('WriteSuggestion')}>
          <View className="h-8 w-8 items-center">
            <Image
              source={require('~/assets/contract.png')} // Assuming you have a different image for project suggestions
              className="h-full w-full"
            />
            <Text>Write a suggestion</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
