import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Alert, Text, ToastAndroid, View} from 'react-native';
import {Link} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

const Login = () => {
  const {role} = useUser();
  const {onGoogleButtonPress} = useAuth();
  const {handleNavigation} = useNav();

  function handleRegisterPress() {
    handleNavigation('Register');
  }
  async function handleLogin() {
    try {
      const message = await onGoogleButtonPress();
      switch (message) {
        case 'COR_UNREGISTERED':
          return Alert.alert(
            message,
            'Please register your email together with your COR',
          );
        case 'FACULTY_PERMISSION_NULL':
          return Alert.alert(
            message,
            "You don't have the necessary permission",
          );
        case 'SUCCESS':
          return ToastAndroid.show(message, ToastAndroid.SHORT);
        case null:
          return;
        default:
          return ToastAndroid.show(
            'Google sign-in cancelled',
            ToastAndroid.SHORT,
          );
      }
    } catch (err) {
      Alert.alert('ERROR_CATCHED', 'Error in handling Google Signin');
    }
  }

  return (
    <View className="h-2/3 justify-center">
      <Heading>Login</Heading>
      <View className="self-center">
        <GoogleSigninButton onPress={() => handleLogin()} />
      </View>
      {role === 'student' && (
        <View className="flex-row gap-2 self-center">
          <Text>Didn't upload your COR yet?</Text>
          <Link textStyle="text-primary/60" onPress={handleRegisterPress}>
            Register here
          </Link>
        </View>
      )}
    </View>
  );
};

export default Login;
