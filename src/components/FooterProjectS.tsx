import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNav} from '~/contexts/NavigationContext';

const FooterNav = () => {
  const {navigateTo} = useNav();
  return (
    <View>
      <View />
      <View>
        <TouchableOpacity onPress={() => navigateTo('WriteSuggestion')}>
          <View>
            <Image
              source={require('~/assets/contract.png')} // Assuming you have a different image for project suggestions
            />
            <Text>Write a suggestion</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
