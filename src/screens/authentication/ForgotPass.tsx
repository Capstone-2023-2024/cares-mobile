import React, {useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {Button} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {imageDimension} from 'cics-mobile-client/../../shared/images';

const ForgotPass = ({navigation}: {navigation: any}) => {
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
