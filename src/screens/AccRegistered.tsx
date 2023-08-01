import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AccRegistered = ({ navigation }: { navigation: any }) => {
  const handleLoginPress = () => {
    navigation.navigate('LoginForm');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/check_icon.png')} style={styles.icon} />
      <Text style={styles.title}>Account is Successfully Registered</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Continue to Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5', // Light gray background color
    paddingHorizontal: 20,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#424242', // Dark gray text color
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#757575', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AccRegistered;
