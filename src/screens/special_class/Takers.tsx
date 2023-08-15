import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';

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
    <ScrollView>
      <Text className="mb-10 mt-0 text-center text-2xl font-bold">
        List of Students for Special Class
      </Text>
      <Header />
      <Table />

      <View className="mt-4 px-4">
        <TouchableOpacity
          className="self-center rounded-md bg-gray-500 px-4 py-2"
          onPress={() => navigateTo('Special Class Application')}>
          <Text className="font-bold text-white">Apply Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Header = () => {
  return (
    <View className="mt-10 flex flex-row justify-between bg-white px-4">
      {subjects.map((subject, index) => (
        <View key={index} className="flex-1">
          <Text className="text-center font-bold">{subject}</Text>
        </View>
      ))}
    </View>
  );
};

const Table = () => {
  const [students] = useState([
    [
      'Jolly Bee',
      'Pogi Ko',
      '',
      '',
      'Quack Frog',
      'Kroak Goose',
      'Johnny Shawty',
    ], // Row 1
    ['Joy Yang', 'Kuala Express', '', '', '', '', ''], // Row 2
    ['', 'Meow Dog', '', '', '', '', ''], // Row 3
    ['', '', '', '', '', '', ''], // Row 4
    ['', '', '', '', '', '', ''], // Row 5
    ['', '', '', '', '', '', ''], // Row 6
    ['', '', '', '', '', '', ''], // Row 7
  ]);

  return (
    <View className="mx-4 mt-10 border border-black">
      {students.map((row, rowIndex) => (
        <View key={rowIndex} className="flex flex-row border-b border-gray-400">
          {row.map((student, columnIndex) => (
            <View
              key={columnIndex}
              className="flex-1 items-center justify-center border border-black px-2 py-2">
              <Text className="break-words text-center">{student}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Takers;
