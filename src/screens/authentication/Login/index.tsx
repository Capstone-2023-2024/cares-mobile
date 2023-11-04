import React from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Link} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {useAuth} from '~/contexts/AuthContext';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';
import {GoogleSvg} from '~/utils/image';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const Login = () => {
  const {role} = useContent();
  const {onGoogleButtonPress} = useAuth();
  const {handleNavigation} = useNav();

  function handleRegisterPress() {
    handleNavigation('Register');
  }
  async function handleLogin() {
    try {
      await onGoogleButtonPress();
      // handleNavigation('Loading');
    } catch (err) {
      ToastAndroid.show('Error in handling Google Signin', ToastAndroid.SHORT);
    }
  }

  return (
    <View className="h-2/3 justify-center">
      <Heading>Login</Heading>
      <View className="self-center">
        <GoogleSigninButton onPress={handleLogin} />
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
