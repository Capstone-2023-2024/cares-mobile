import React from 'react';
import {Image, View} from 'react-native';

function BackHeader({}: {whiteArrow?: boolean}) {
  return (
<View className=" mb-5 h-16 w-full flex-row items-center justify-center bg-zinc-500">
      <Image
        source={require('~/assets/project-suggestion.png')}
        className="h-12 w-80 "
        resizeMode="contain"
      />
    </View>
  );
}

export default BackHeader;
