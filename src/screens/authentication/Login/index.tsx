import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { useAuth } from '~/contexts/AuthContext';
import { useNav } from '~/contexts/NavigationContext';
import { useContent } from '~/contexts/ContentContext';

const Login = () => {
  const DIMENSION = 20;
  const {onGoogleButtonPress} = useAuth();
  const {role} = useContent()
  const {navigateTo} = useNav();

  function handleRegisterPress() {
    navigateTo('Register');
  }

  async function handleLogin() {
    try {
      if (role !== null) {
        const message = await onGoogleButtonPress(role);
        navigateTo('Loading', {message});
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View className="h-2/3 justify-center">
      <Heading>Login</Heading>
      <View className="mb-2 w-1/3 self-center">
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-full border p-2 px-4 shadow-sm"
          onPress={handleLogin}>
          <View className="h-6 w-6">
            <Image
              alt="google"
              resizeMode="contain"
              className="mr-2 h-full w-full"
              source={require('~/assets/google.png')}
              width={DIMENSION}
              height={DIMENSION}
            />
          </View>
          <Text>Google</Text>
        </TouchableOpacity>
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
