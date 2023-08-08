import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

const Forgot = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');

  const handleSendCodePress = () => {
    if (!email) {
      showAlert('Empty Email', 'Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const verificationCode = generateVerificationCode();

    // Navigate to VerificationCode screen with email and verification code
    navigation.navigate('VerificationCode', {email, verificationCode});
  };

  const validateEmail = (enteredEmail: string) => {
    // Email validation with domain check
    const emailRegex = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@bulsu\.edu\.ph$/;
    return emailRegex.test(enteredEmail);
  };

  const generateVerificationCode = () => {
    // Generate a random 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Image
        source={require('../assets/forgot_picture.png')}
        style={styles.picture}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={styles.sendCodeButton}
        onPress={handleSendCodePress}>
        <Text style={styles.sendCodeButtonText}>Send Code</Text>
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
  sendCodeButton: {
    backgroundColor: '#757575', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sendCodeButtonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Forgot;
