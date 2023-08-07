import React from 'react';
<<<<<<< HEAD
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import BackHeader from '~/components/headers/BackHeader';

const bsu1 = '~/assets/BSUBACKGROUND.png';

const ReqPage = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(bsu1)}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }} // Set the opacity of the background image
        resizeMode="cover" // Fill the entire container without distortion
      >
        <BackHeader />
        <View style={styles.content}>
          <Image
            source={require('~/assets/filesent.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Special Class request submitted</Text>
        </View>
      </ImageBackground>
=======
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
>>>>>>> main
    </View>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%', // Center vertically
  },
  content: {
    top:'15%',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});

=======
>>>>>>> main
export default ReqPage;
