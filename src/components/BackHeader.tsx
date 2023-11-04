import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity} from 'react-native';
import {NextSvg} from '~/utils/image';
import SvgContainer from './SVGContainer';
import {arrowUri} from '~/utils/svgIcons';

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
