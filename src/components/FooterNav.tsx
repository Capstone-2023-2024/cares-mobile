import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNav} from '~/contexts/NavigationContext';

const FooterNav = () => {
  const {navigateTo} = useNav();
  return (
    <View>
      <View style={{ bottom: 0, left: 0, right: 0 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 50,
          paddingTop:10,
          borderTopWidth:1, // Add some horizontal padding
        }}
      >
        <TouchableOpacity style={{marginBottom:8}} onPress={() => navigateTo('Special Class Takers')}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('~/assets/contract.png')}
              style={{ height: 40, width: 40 }}
            />
            <Text style={{ fontWeight: '700', color: 'black' }}>
              Apply Special Class
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:8}} onPress={() => navigateTo('ProjectSuggestions')}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('~/assets/project.png')} // Assuming you have a different image for project suggestions
              style={{ height: 40, width: 40 }}
            />
            <Text style={{ fontWeight: '700', color: 'black' }}>
              Project Suggestions
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default FooterNav;
