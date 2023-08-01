import {View, Text} from 'react-native';
import React from 'react';
import {SvgUri} from 'react-native-svg';

interface SvgContainerType {
  uri: string;
  size: 'sm' | 'base' | 'lg';
  isCircle?: boolean;
}

const SvgContainer = (props: SvgContainerType) => {
  const {uri, size, isCircle} = props;
  const style = () => {
    let style = '';
    if (isCircle) style += ' rounded-full overflow-hidden';
    if (size === 'sm') style += ' w-8 h-8';
    else if (size === 'base') style += ' w-12 h-12';
    else style += ' w-20 h-20';
    return style;
  };

  return (
    <View className={style()}>
      <SvgUri uri={uri} width="100%" height="100%" />
    </View>
  );
};

export default SvgContainer;
