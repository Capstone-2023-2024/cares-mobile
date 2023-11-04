import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {arrowUri} from '~/utils/svgIcons';
import SvgContainer from './SVGContainer';

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="h-16 rotate-180 flex-row items-center px-2">
      <TouchableOpacity onPress={handleGoBack}>
        <SvgContainer uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
}

export default BackHeader;
