import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {arrowUri} from '~/utils/svgIcons';
import SvgContainer from '../SvgContainer';

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Perform the navigation action to go back to the HomeScreen
  };

  return (
    <View className="h-16 flex-row items-center bg-paper px-2">
      <TouchableOpacity className="rotate-180" onPress={handleGoBack}>
        <SvgContainer uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
}

export default BackHeader;
