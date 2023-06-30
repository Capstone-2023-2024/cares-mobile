import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from 'react-native';

const SpecialClassRequestPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./bsu.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.BSU}>HITES</Text>
        <TouchableOpacity style={styles.userIcon}>
          <Image source={require('./user.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.messagesIcon}>
          <Image source={require('./messages.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
      <Image source={require('./filesent.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.message}>Special Class request submitted</Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 10,
  },
  logo: {
    width: 75,
    height: '75%',
  },
  BSU: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 10,
  },
  userIcon: {
    top: -5,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
    width: 35,
    height: 35,
  },
  messagesIcon: {
    top: -5,
    alignItems: 'center',
    marginRight: 10,
    width: 35,
    height: 35,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SpecialClassRequestPage;