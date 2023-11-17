import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {arrowUri} from '~/utils/svgIcons';
import SvgContainer from './SVGContainer';

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="-mt-5 h-16 flex-row items-center bg-blue-500">
      <TouchableOpacity className="ml-5 mt-1 rotate-180" onPress={handleGoBack}>
        <SvgContainer uri={arrowUri} size="sm" />
      </TouchableOpacity>
      <View className="flex-1 justify-center ">
        <Text className="color-white mr-14 mt-0.5 text-center text-xl">
          Student Info
        </Text>
      </View>
    </View>
  );
}

export default BackHeader;
