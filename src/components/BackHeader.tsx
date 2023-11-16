import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {arrowUri} from '~/utils/svgIcons';
import SvgContainer from './SVGContainer';

function BackHeader({whiteArrow}: {whiteArrow?: boolean}) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="h-16 rotate-180 flex-row items-center px-2">
      <TouchableOpacity onPress={handleGoBack}>
        {whiteArrow ? (
          <Image
            source={require('~/assets/arrow-sm-right-svgrepo-com.png')}
            className="h-10 w-10"
          />
        ) : (
          <SvgContainer uri={arrowUri} size="sm" />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default BackHeader;
