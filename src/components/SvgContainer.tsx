import React from 'react';
import {View} from 'react-native';
import {SvgUri} from 'react-native-svg';

interface SvgContainerType {
  uri: string;
  size: 'sm' | 'base' | 'lg';
  isCircle?: boolean;
  disabled?: boolean;
}

const SvgContainer = (props: SvgContainerType) => {
  const {uri, size, isCircle, disabled} = props;
  const style = () => {
    let baseStyle = '';
    if (isCircle) {
      baseStyle += ' rounded-full overflow-hidden';
    }
    if (size === 'sm') {
      baseStyle += ' w-8 h-8';
    } else if (size === 'base') {
      baseStyle += ' w-12 h-12';
    } else {
      baseStyle += ' w-20 h-20';
    }
    return baseStyle;
  };

  return (
    <View className={style()}>
      <SvgUri
        className={disabled ? 'opacity-0.5' : 'fill-black'}
        uri={uri}
        width="100%"
        height="100%"
      />
    </View>
  );
};

export default SvgContainer;
