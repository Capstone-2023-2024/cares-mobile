import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';

const Announcement = () => {
  const imgLink = '../../assets/BSUBACKGROUND.png';
  return (
    <View className="flex flex-1 items-center justify-center gap-12">
      <Image
        className="absolute inset-x-0 -z-10 w-full flex-1 justify-center"
        alt=""
        source={require(imgLink)}
      />
      <Text className="w-full bg-[#f5f5f5]/80 py-2 text-center text-4xl font-bold text-black">
        Title
      </Text>
      <Text className="rounded-xl bg-[#f5f5f5]/80 p-4 text-center text-black">
        it ad mollit mollit magna laborum. Consectetur nisi ex occaecat ea
        dolore aute cillum labore minim aliquip occaecat Lorem magna.
      </Text>
    </View>
  );
};

export default Announcement;
