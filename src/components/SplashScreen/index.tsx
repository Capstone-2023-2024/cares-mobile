import {projectName} from '~/utils/config';
import React from 'react';
import {View, Modal} from 'react-native';
import Text from '~/components/Text';

const Loading = () => {
  return (
    <Modal>
      <View className="h-screen items-center justify-center">
        <View className="relative  h-1/2 w-full bg-primary">
          <View className="absolute inset-x-0 -bottom-[36px]">
            <Text className="font-block text-center text-6xl uppercase text-secondary">
              {projectName}
            </Text>
          </View>
        </View>
        <View className="relative h-1/2 w-full overflow-hidden bg-secondary">
          <View className="absolute inset-x-0 -top-6">
            <Text className="font-block text-center text-6xl uppercase text-paper">
              {projectName}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
