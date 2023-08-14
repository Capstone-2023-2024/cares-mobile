import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';
import {specialClass} from '~/utils/svgIcons';
import SvgContainer from './SvgContainer';

const FooterNav = () => {
  const {navigateTo} = useNav();
  return (
    <View className="h-12">
      <View className="flex-row items-center justify-evenly p-3">
        <TouchableOpacity onPress={() => navigateTo('Special Class Takers')}>
          <SvgContainer uri={specialClass} size="sm" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('ProjectSuggestions')}>
          <View className="h-8 w-8">
            <Image
              className="h-full w-full"
              source={require('~/assets/contract.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
