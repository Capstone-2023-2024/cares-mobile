import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginForm = ({ navigation }: { navigation: any }) => {
  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('Forgot');
  };

  const handleLoginPress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bsu_logo.png')} style={styles.logo} />
      <Text style={styles.title}>C  I   C   S</Text>
      <Text style={styles.subTitle}>LOGIN</Text>
      <TextInput style={styles.input} placeholder="Email Address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.registerLink}>Don't have an account? Register here</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>
        For assistance, please contact the BSU - Bustos Campus IT Department.
      </Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#424242', // Dark gray text color
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#616161', // Medium gray text color
    textAlign: 'center',
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
  buttonContainer: {
    backgroundColor: '#757575', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerLink: {
    color: '#388E3C', // Dark green text color
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  forgotPasswordLink: {
    color: '#388E3C', // Dark green text color
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  infoText: {
    marginTop: 20,
    color: '#616161', // Medium gray text color
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginForm;
