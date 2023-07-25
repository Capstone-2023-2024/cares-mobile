import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

// const fileSent = require('~/assets/filesent.png');

const ReqPage = () => {
  return (
    <View style={styles.container}>
      <Text>File Sent</Text>
      {/* <Image
        source={fileSent}
        style={styles.image}
        resizeMode="contain"
      /> */}
      <Text style={styles.text}>Special Class request submitted</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
