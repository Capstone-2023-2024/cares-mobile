import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {Button, Link} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {Text} from '~/components';

const VerificationCode = () => {
  const [code, setVerificationCode] = useState('');
  const time = new Date();
  const millisecond = 1000;
  const second = 60;
  time.setTime(second * millisecond * 5);

  function handleSubmit() {
    console.log('submit');
  }

  return (
    <View className="h-2/3 justify-center">
      <Heading>Verification Code</Heading>
      <View className="mb-2 h-40 w-40 self-center">
        <Image
          source={require('~/assets/verification-code.png')}
          alt=""
          className="h-full w-full"
        />
      </View>
      <Text className="text-center text-xl">{`${time.getMinutes()}:${time.getSeconds()}`}</Text>
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          value={code}
          onChangeText={setVerificationCode}
          placeholder="Verification Code"
        />
      </View>
      <Text className="mb-2 text-center text-xs">
        We have sent a verification code to your email address.
      </Text>
      <View className="flex-row items-center justify-center">
        <Text className="mb-2 mr-2 text-xs">Didn't receive the code?</Text>
        <Link onPress={() => console.log('code')}>Resend the code</Link>
      </View>
      <View className="mb-2 w-1/3 self-center">
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </View>
  );
};

export default VerificationCode;
