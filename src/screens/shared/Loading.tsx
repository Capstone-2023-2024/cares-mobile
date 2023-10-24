import React, {useEffect} from 'react';
import {Text, View, ToastAndroid} from 'react-native';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';

const Loading = () => {
  const {message} = useContent();
  const {handleNavigation} = useNav();

  useEffect(() => {
    if (message === 'SUCCESS') {
      handleNavigation('Home');
      return ToastAndroid.show('Success', ToastAndroid.LONG);
    } else if (message === 'INVALID_USER') {
      setTimeout(() => {
        handleNavigation('Login');
      }, 1000);
      return ToastAndroid.show(
        'You need to use proper BulSU Email account',
        ToastAndroid.LONG,
      );
    } else if (message === 'NOT_EXIST') {
      setTimeout(() => {
        handleNavigation('Login');
      }, 1000);
      return ToastAndroid.show(
        'You need to register your COR',
        ToastAndroid.LONG,
      );
    }
    handleNavigation('Landing');
    return ToastAndroid.show('Please contact your IT Admin', ToastAndroid.LONG);
  }, [message, handleNavigation]);

  return (
    <View className="absolute z-50 h-screen w-screen items-center justify-center bg-white opacity-95">
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
