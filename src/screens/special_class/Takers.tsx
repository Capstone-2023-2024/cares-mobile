<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { useNav } from '~/contexts/NavigationContext';
import BackHeader from '~/components/headers/BackHeader';

const bsu = '~/assets/bsu.png';
const user = '~/assets/user.png';
const messages = '~/assets/messages.png';
const bsu1 = '~/assets/BSUBACKGROUND.png';
=======
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
>>>>>>> main

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
<<<<<<< HEAD
    <ImageBackground
      source={require(bsu1)}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.5 }}
    >
      <BackHeader />
      <ScrollView>
        <Text style={styles.title}>List of Students for Special Class</Text>
        <Header />
        <Table />

        <TouchableOpacity
          style={styles.applyNowButton}
          onPress={() => navigateTo('Special Class Application')}
        >
          <Text style={styles.applyNowButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  subjectCell: {
    flex: 1,
  },
  subjectHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  cellText: {
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  applyNowButton: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  applyNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

=======
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

>>>>>>> main
export default Takers;
