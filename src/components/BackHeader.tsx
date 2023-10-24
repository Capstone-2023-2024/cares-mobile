import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity} from 'react-native';
import {NextSvg} from '~/utils/image';

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="h-16 flex-row items-center px-2">
      <TouchableOpacity onPress={handleGoBack}>
        <View className="w-10 rotate-180">
          <NextSvg />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default BackHeader;
