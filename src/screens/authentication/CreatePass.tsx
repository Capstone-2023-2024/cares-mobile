import React, {useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {Button} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';
import {Error} from '~/utils/error';
import {authApp, firestoreApp, validateEmailWithCOR} from '~/utils/firebase';
import {Text} from '~/components';

const CreatePass = () => {
  const {studentInfo} = useContent();
  const {navigateTo} = useNav();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSet() {
    try {
      if (password === confirmPassword) {
        if (validatePassword(password)) {
          const {name, studentNo, scholarship, ...rest} = studentInfo;
          const email = validateEmailWithCOR(!name ? {name: ''} : {name});
          const tweakedScolarship = scholarship
            ?.replace(/Official Receipt:/, '')
            .trim();

          if (studentNo !== undefined) {
            const studDocRef = firestoreApp
              .collection('students')
              .doc(studentNo);
            const docSnap = await studDocRef.get();

            function handleExistingUser() {
              Alert.alert('You need to login as you are already registered');
              navigateTo('Login');
            }

            async function handleNewUser() {
              await studDocRef.set({
                ...rest,
                name,
                email,
                scholarship: tweakedScolarship,
              });
              await firestoreApp.collection('chattables').add({email});
              await authApp.createUserWithEmailAndPassword(email, password);
            }

            return docSnap.exists ? handleExistingUser() : handleNewUser();
          }
        } else {
          Alert.alert(
            'Invalid Password',
            'Password must be atleast 6 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.',
          );
        }
      } else {
        Alert.alert(
          'Password Mismatch',
          'Passwords do not match. Please enter the same password in both fields.',
        );
      }
    } catch (err) {
      const {code} = err as Error;
      Alert.alert(code);
    }
  }

  const validatePassword = (enteredPassword: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/;
    return passwordRegex.test(enteredPassword);
  };

  return (
    <View className="h-2/3 justify-center">
      <Heading>Create Password</Heading>
      <View className="mb-2 h-40 w-40 self-center">
        <Image
          className="h-full w-full"
          source={require('~/assets/create_password.png')}
          alt=""
        />
      </View>
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          placeholder="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <Text className="mx-auto mb-2 w-64 text-center text-xs">
        Create an 8-character long password with at least one combination of
        lowercase, uppercase, and a special character.
      </Text>
      <View className="mx-auto w-1/3">
        <Button onPress={handleSet}>All Set</Button>
      </View>
    </View>
  );
};

export default CreatePass;
