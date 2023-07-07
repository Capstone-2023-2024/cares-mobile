import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CreatePassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Password</Text>
      <Image
        source={require('../assets/create_password_picture.png')}
        style={styles.picture}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Text style={styles.passwordInfoText}>
        Create an 8-character long password with at least one combination of lowercase, uppercase, and a special character.
      </Text>
      <TouchableOpacity style={styles.allSetButton}>
        <Text style={styles.allSetText}>All Set</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#424242', // Dark gray text color
  },
  picture: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#757575', // Medium gray border color
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInfoText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#616161', // Medium gray text color
  },
  allSetButton: {
    backgroundColor: '#757575', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  allSetText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreatePassword;
