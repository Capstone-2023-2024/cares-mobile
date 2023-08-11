import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CreatePass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAllSetPress = () => {
    if (password === confirmPassword) {
      if (validatePassword(password)) {
        console.log('first');
      } else {
        Alert.alert(
          'Invalid Password',
          'Password must be 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.',
        );
      }
    } else {
      Alert.alert(
        'Password Mismatch',
        'Passwords do not match. Please enter the same password in both fields.',
      );
    }
  };

  const validatePassword = (enteredPassword: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(enteredPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Password</Text>
      {/* <Image
        source={require('/create_password_picture.png')}

      /> */}
      <View style={styles.picture}>
        <Text>Image</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Text style={styles.passwordInfoText}>
        Create an 8-character long password with at least one combination of
        lowercase, uppercase, and a special character.
      </Text>
      <TouchableOpacity style={styles.allSetButton} onPress={handleAllSetPress}>
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

export default CreatePass;
