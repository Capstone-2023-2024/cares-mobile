import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {RoleType} from '../authentication/Landing/types';
import {MessagePromptType} from '~/contexts/AuthContext/types';
import {useNav} from '~/contexts/NavigationContext';

const Loading = () => {
  const route = useRoute();
  const {navigateTo} = useNav();
  const {role, message} = route.params as {
    role: RoleType;
    message: MessagePromptType;
  };

  useEffect(() => {
    if (message === 'SUCCESS') {
      navigateTo('Home', {role});
      return console.log('Success');
    } else if (message === 'INVALID_USER') {
      setTimeout(() => {
        navigateTo('Login', {role});
      }, 1000);
      return console.log('You need to use proper BulSU Email account');
    } else if (message === 'NOT_EXIST') {
      setTimeout(() => {
        navigateTo('Login', {role});
      }, 1000);
      return console.log('You need to register your COR');
    }
    navigateTo('Landing');
    return console.log('Please contact your IT Admin');
  }, []);

  return (
    <View className="absolute z-50 h-screen w-screen items-center justify-center bg-white opacity-95">
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
