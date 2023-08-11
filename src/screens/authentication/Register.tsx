import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Button, Link} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {useNav} from '~/contexts/NavigationContext';
import {validateEmail} from '~/utils/firebase';

const Register = () => {
  const {navigateTo} = useNav();
  const [email, setEmail] = useState('');

  const handleRegisterPress = async () => {
    // try {
    //   console.log(path);
    //   RNFS.writeFile(path, 'asdasdasdasdasd', 'utf8').then(val =>
    //     console.log(val),
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
    if (!email) {
      Alert.alert('Empty Email', 'Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      return Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.',
      );
    }
    navigateTo('CreatePass');
  };

  return (
    <View className="h-2/3 justify-center">
      <Heading>Sign Up</Heading>
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="mb-2 flex-row justify-center gap-2">
        <Text className="text-xs text-black">Use your BULSU Email</Text>
        <Text className="text-xs text-black">
          (e.g. juan.delacruz.xyz@bulsu.edu.ph)
        </Text>
      </View>
      <TouchableOpacity className="mx-auto mb-2 w-2/3 rounded-xl border-2 border-dashed py-12">
        <Text className="text-center">Upload your COR here</Text>
      </TouchableOpacity>
      <View className="mb-2 w-1/3 self-center">
        <Button onPress={handleRegisterPress}>Register</Button>
      </View>
      <View className="flex-row justify-center gap-2">
        <Text className="text-center text-xs">Already have an account? </Text>
        <Link
          textStyle="text-primary/60 text-center"
          onPress={() => navigateTo('Login')}>
          Login here
        </Link>
      </View>
    </View>
  );
};

export default Register;
