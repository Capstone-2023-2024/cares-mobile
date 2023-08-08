import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('Forgot');
  };

  const handleLoginPress = () => {
    if (!email || !password) {
      Alert.alert('Empty Fields', 'Please enter your email and password.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // User logged in successfully
        console.log('User logged in:', userCredential.user);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        // Handle login errors
        console.log('Login error:', error);
        Alert.alert('Login Failed', 'Invalid email or password.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bsu_logo.png')} style={styles.logo} />
      <Text style={styles.title}>C I C S</Text>
      <Text style={styles.subTitle}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.registerLink}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>hello guys</Text>
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

export default Login;
