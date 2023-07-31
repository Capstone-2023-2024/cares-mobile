import {View, Text} from 'react-native';
import React from 'react';
import {SvgUri} from 'react-native-svg';

interface SvgContainerType {
  uri: string;
  size: 'sm' | 'base' | 'lg';
}

const SvgContainer = (props: SvgContainerType) => {
  const {uri, size} = props;
  const style = () => {
    if (size === 'sm') return 'w-8 h-8';
    if (size === 'base') return 'w-12 h-12';
    return 'w-20 h-20';
  };

  return (
    <View className={style()}>
      <SvgUri uri={uri} width="100%" height="100%" />
    </View>
  );
};

export default SvgContainer;
