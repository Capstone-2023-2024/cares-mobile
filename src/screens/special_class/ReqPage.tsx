import React from 'react';
import {View, Image, Text} from 'react-native';

import {fileSent} from '~/utils/imagePaths';

const ReqPage = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-6 text-xl font-bold">File Sent</Text>
      <Image
        source={fileSent}
        className="mb-6 h-48 w-48"
        resizeMode="contain"
      />
      <Text className="text-center text-2xl font-bold text-black">
        Special Class request submitted
      </Text>
    </View>
  );
};

export default ReqPage;
