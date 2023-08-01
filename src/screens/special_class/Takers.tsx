import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

const Takers = () => {
  const subjects = [
    'IT302',
    'CAP301',
    'IT308',
    'IT309',
    'IT310',
    'IT311',
    'IT312',
  ];

  const [students, setStudents] = useState<string[][]>([
    // Student data rows here
  ]);

  const Header = () => {
    return (
      <View className="mt-10 flex flex-row justify-between bg-white px-10">
        {subjects.map((subject, index) => (
          <View key={index} className="flex-1">
            <Text className="text-center text-base font-bold">{subject}</Text>
          </View>
        ))}
      </View>
    );
  };

  const Table = () => {
    return (
      <View className="mx-10 mt-10 border-2 border-black">
        {students.map((row, rowIndex) => (
          <View
            key={rowIndex}
            className="flex flex-row border-b border-gray-300">
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

  function navigateTo(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <Text className="mb-10 mt-20 text-center text-4xl font-bold">
        List of Students for Special Class
      </Text>
      <Header />
      <Table />

      <TouchableOpacity
        className="mt-20 self-center rounded-md bg-gray-600 px-8 py-4"
        onPress={() => navigateTo('Special Class Application')}>
        <Text className="font-bold text-white">Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Takers;
