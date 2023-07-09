import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNav } from '~/contexts/NavigationContext';

const FooterNav = () => {
  const { navigateTo } = useNav();
  return (
    <View style={{ bottom: 0, left: 0, right: 0 }}>
      <View
        style={{
          backgroundColor: 'black',
          height: 1,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 4,
        }}
      >
        <TouchableOpacity onPress={() => navigateTo('Special Class Takers')}>
          <Image
            source={require('~/assets/class.png')}
            style={{ height: 50, width: 50 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;