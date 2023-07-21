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
          alignContent: 'center',
          paddingTop:10,
          borderTopWidth:0.5, // Add some horizontal padding
        }}
      >
        <TouchableOpacity style={{marginBottom:8}} onPress={() => navigateTo('WriteSuggestion')}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('~/assets/contract.png')} // Assuming you have a different image for project suggestions
              style={{ height: 40, width: 40 }}
            />
            <Text style={{ fontWeight: '700', color: 'black' }}>
              Write a suggestion
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
