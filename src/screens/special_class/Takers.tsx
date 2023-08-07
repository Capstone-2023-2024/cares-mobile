import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { useNav } from '~/contexts/NavigationContext';
import BackHeader from '~/components/headers/BackHeader';

const bsu1 = '~/assets/BSUBACKGROUND.png';
const subjects = [
  'IT302',
  'CAP301',
  'IT308',
  'IT309',
  'IT310',
  'IT311',
  'IT312',
];

const Takers = () => {
  const {navigateTo} = useNav();

  return (

    <ImageBackground
      source={require(bsu1)}
      // style={styles.backgroundImage}
      imageStyle={{ opacity: 0.5 }}
    >
      <BackHeader />
      <ScrollView className="flex-1 bg-white">
      <Text className="mb-10 mt-20 text-center text-4xl font-bold">
          List of Students for Special Class</Text>
        <Header />
        <Table />

        <TouchableOpacity
          className="mt-20 self-center rounded-md bg-gray-600 px-8 py-4"
          onPress={() => navigateTo('Special Class Application')}
        >
          <Text className="font-bold text-white">Apply Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const Header = () => {
  return (
    <View className="mt-10 flex flex-row justify-between bg-white px-10">
      {subjects.map((subject, index) => (
        <View key={index} className="flex-1">
          <Text className="text-center text-base font-bold">{subject}</Text>
        </View>
      ))}
    </View>
  )
}

const Table = () => {
  const [students] = useState<string[][]>([
    // Student data rows here
  ]);
  return (
    <View className="mx-10 mt-10 border-2 border-black">
      {students.map((row, rowIndex) => (
        <View key={rowIndex} className="flex flex-row border-b border-gray-300">
          {row.map((student, columnIndex) => (
            <View
              key={columnIndex}
              className="flex-1 items-center justify-center border border-black py-4">
              <Text className="text-center">{student}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Takers;
