import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const VerificationCode = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Code</Text>
      {/* <Image source={require('/picture.png')} style={styles.image} /> */}
      <View style={styles.image}>
        <Text>Image</Text>
      </View>
      <Text style={styles.timer}>4:59</Text>
      <Text style={styles.infoText}>
        We have sent a verification code to your email address.
      </Text>
      <TextInput style={styles.input} placeholder="Verification Code" />
      <TouchableOpacity style={styles.resendLink}>
        <Text style={styles.resendText}>
          Didn't receive the code? Resend the code
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#616161', // Medium gray text color
  },
  infoText: {
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
    marginBottom: 20,
  },
  resendLink: {
    marginBottom: 20,
  },
  resendText: {
    color: '#388E3C', // Dark green text color
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#757575', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VerificationCode;
