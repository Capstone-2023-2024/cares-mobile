import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';

const Loading = () => {
  const {message} = useContent();
  const {handleNavigation} = useNav();

  useEffect(() => {
    if (message === 'SUCCESS') {
      handleNavigation('Home');
      return console.log('Success');
    } else if (message === 'INVALID_USER') {
      setTimeout(() => {
        handleNavigation('Login');
      }, 1000);
      return console.log('You need to use proper BulSU Email account');
    } else if (message === 'NOT_EXIST') {
      setTimeout(() => {
        handleNavigation('Login');
      }, 1000);
      return console.log('You need to register your COR');
    }
    handleNavigation('Landing');
    return console.log('Please contact your IT Admin');
  }, [message, handleNavigation]);

  return (
    <View className="absolute z-50 h-screen w-screen items-center justify-center bg-white opacity-95">
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
