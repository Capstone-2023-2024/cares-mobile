import React from 'react';
import {ImageBackground} from 'react-native';
import type {BackgroundProps} from './types';

const Background = ({children}: BackgroundProps) => {
  const backgroudImageLink = '~/assets/error.svg';
  return (
    <ImageBackground
      className="flex-1 object-cover"
      source={require(backgroudImageLink)}
      imageStyle={{opacity: 0.7}}>
      {children}
    </ImageBackground>
  );
};

export default Background;
