import React, {useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {Button} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {useNav} from '~/contexts/NavigationContext';
import {authApp} from '~/utils/firebase';

const ForgotPass = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const {navigateTo} = useNav();

  async function handleSendCodePress() {
    if (!email) {
      showAlert('Empty Email', 'Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    try {
      await authApp.sendPasswordResetEmail(email);
      showAlert('Email Sent', 'Password reset email has been sent.');
      navigateTo('Login');
    } catch (error) {
      showAlert(
        'Error',
        'An error occurred while sending the password reset email.',
      );
    }
  }

  function validateEmail(enteredEmail: string) {
    const emailRegex = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@bulsu\.edu\.ph$/;
    return emailRegex.test(enteredEmail);
  }

  function showAlert(title: string, message: string) {
    Alert.alert(title, message);
  }

  return (
    <View className="h-2/3 justify-center">
      <Heading>Forgot Password</Heading>
      <View className="mb-2 h-40 w-40 self-center">
        <Image
          className="h-full w-full"
          source={require('~/assets/forgot_picture.png')}
          alt=""
        />
      </View>
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="mb-2 w-1/3 self-center">
        <Button onPress={handleSendCodePress}>Send Code</Button>
      </View>
    </View>
  );
};

export default ForgotPass;
