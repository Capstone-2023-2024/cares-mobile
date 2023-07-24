import React from 'react';
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
    </View>
  );
};

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

export default ReqPage;
