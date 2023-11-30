import React from 'react';
import {ImageBackground} from 'react-native';
import type {BackgroundProps} from './types';

const Background = ({children}: BackgroundProps) => {
  const imageStyle = {opacity: 0.3};
  return (
    <ImageBackground
      className="flex-1 object-cover"
      source={require('~/assets/BustosImage.jpg')}
      imageStyle={imageStyle}>
      {children}
    </ImageBackground>
  );
};

export default Background;
