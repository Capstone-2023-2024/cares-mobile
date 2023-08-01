import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const Register = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');

  const handleRegisterPress = () => {
    if (!email) {
      Alert.alert('Empty Email', 'Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    navigation.navigate('CreatePass', { email });
  };

  const validateEmail = (email: string) => {
    // Email validation with domain check
    const emailRegex = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@bulsu\.edu\.ph$/
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Use your BULSU Email</Text>
      <Text style={styles.emailExample}>(e.g. juan.delacruz.xyz@bulsu.edu.ph)</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={require('../assets/upload_logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginLink}>
        <Text style={styles.loginText}>Already have an account? Login here</Text>
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
    marginBottom: 10,
    color: '#424242', // Dark gray text color
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 220,
    height: 150,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#616161', // Medium gray text color
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
  emailExample: {
    marginBottom: 20,
    color: '#616161', // Medium gray text color
  },
  registerButton: {
    backgroundColor: '#757575', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  registerButtonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#388E3C', // Dark green text color
    textDecorationLine: 'underline',
  },
});

export default Register;