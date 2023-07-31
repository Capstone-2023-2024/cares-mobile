import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {user} from '~/utils/imagePaths';

const Usertab = () => {
  const userSvg = 'https://www.svgrepo.com/show/507442/user-circle.svg';
  const menuDots = 'https://www.svgrepo.com/show/525438/menu-dots.svg';

  return (
    <View className="p-12 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="h-12 w-12 overflow-hidden rounded-full border border-black">
            <SvgUri width="100%" height="100%" uri={userSvg} />
            <Image
              source={user}
              resizeMode="center"
              className="h-full w-full"
            />
          </View>
          <View className="ml-2">
            <Text className="text-sm font-bold">Welcome back</Text>
            <Text className="text-lg font-bold text-black">{`currentUser.displayName!`}</Text>
          </View>
        </View>
        <TouchableOpacity className="h-10 w-10 overflow-hidden rounded-full">
          <SvgUri width="100%" height="100%" uri={menuDots} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Usertab;
