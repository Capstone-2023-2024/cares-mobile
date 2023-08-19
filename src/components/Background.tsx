import {ImageBackground} from 'react-native';
import React, {type ReactNode} from 'react';
import {bsuBg} from '~/utils/imagePaths';

interface BackgroundType {
  children: ReactNode;
}

const Background = ({children}: BackgroundType) => {
  return (
    <ImageBackground
      className="h-screen"
      source={bsuBg}
      imageStyle={{opacity: 0.7}}>
      {children}
    </ImageBackground>
  );
};

export default Background;
