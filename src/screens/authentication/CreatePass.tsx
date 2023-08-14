import React, {useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {Button} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';

const CreatePass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSet = () => {
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
    <View className="h-2/3 justify-center">
      <Heading>Create Password</Heading>
      <View className="mb-2 h-40 w-40 self-center">
        <Image
          className="h-full w-full"
          source={require('~/assets/create_password.png')}
          alt=""
        />
      </View>
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          placeholder="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <Text className="mx-auto mb-2 w-64 text-center text-xs">
        Create an 8-character long password with at least one combination of
        lowercase, uppercase, and a special character.
      </Text>
      <Button onPress={handleSet}>All Set</Button>
    </View>
  );
};

export default CreatePass;
