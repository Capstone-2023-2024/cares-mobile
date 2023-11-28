import React from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import type {IconButtonProps} from './types';

const IconButton = (props: IconButtonProps) => {
  const {uri, ...rest} = props;

  return (
    <TouchableOpacity className="h-6 w-6" {...rest}>
      <Image source={uri} className="h-full w-full" />
    </TouchableOpacity>
  );
};

export default IconButton;
