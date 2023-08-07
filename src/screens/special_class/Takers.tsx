import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { useNav } from '~/contexts/NavigationContext';
import BackHeader from '~/components/headers/BackHeader';

const bsu = '~/assets/bsu.png';
const user = '~/assets/user.png';
const messages = '~/assets/messages.png';
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

export default Takers;
