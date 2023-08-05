import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';
import {cics} from '~/utils/imagePaths';
import {inbox} from '~/utils/svgIcons';
import SvgContainer from '../SvgContainer';

function DefaultHeader() {
  const {navigateTo} = useNav();

  return (
    <View className="h-16 flex-row items-center justify-between bg-primary px-2">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => navigateTo('Dashboard Home')}>
        <View className="h-12 w-12">
          <Image source={cics} className="h-full w-full" resizeMode="center" />
        </View>
        <Text className="ml-2 text-xs text-white">CICS</Text>
      </TouchableOpacity>
      <TouchableOpacity className="-top-1 mr-2 h-9 w-9 items-center">
        <SvgContainer uri={inbox} size="sm" />
      </TouchableOpacity>
    </View>
  );
}

export default DefaultHeader;
