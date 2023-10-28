import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useAuth} from '~/contexts/AuthContext';

const Loading = () => {
  const {currentUser} = useAuth();

  useEffect(() => {
    // if (message === 'SUCCESS') {
    //   setTimeout(() => {
    //     handleNavigation('Home');
    //   });
    //   return ToastAndroid.show('Success', ToastAndroid.LONG);
    // } else if (message === 'INVALID_USER') {
    //   setTimeout(() => {
    //     handleNavigation('Login');
    //   });
    //   return ToastAndroid.show(
    //     'You need to use proper BulSU Email account',
    //     ToastAndroid.LONG,
    //   );
    // } else if (message === 'NOT_EXIST') {
    //   setTimeout(() => {
    //     handleNavigation('Login');
    //   });
    //   return ToastAndroid.show(
    //     'You need to register your COR',
    //     ToastAndroid.LONG,
    //   );
    // }
    // console.log({initialRouteName});
    // return ToastAndroid.show('Please contact your IT Admin', ToastAndroid.LONG);
  }, [currentUser]);

  return (
    <View className="absolute z-50 h-screen w-screen items-center justify-center bg-white opacity-95">
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
