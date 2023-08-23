import React from 'react';
import {type ImageSourcePropType, TouchableOpacity, Image} from 'react-native';

interface IconButtonType {
  uri: ImageSourcePropType;
  onPress?: () => void;
}

const IconButton = (props: IconButtonType) => {
  const {uri, ...rest} = props;

  return (
    <TouchableOpacity className="h-6 w-6" {...rest}>
      <Image source={uri} className="h-full w-full" />
    </TouchableOpacity>
  );
};

export default IconButton;
