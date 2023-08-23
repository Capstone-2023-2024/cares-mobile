import React from 'react';
import {View} from 'react-native';
import {Text} from '~/components';
import {Button} from '~/components/Button';
import {useNav} from '~/contexts/NavigationContext';

const student = 'student';
const teacher = 'teacher';

type Role = typeof student | typeof teacher;

const LandingScreen = () => {
  const roles: Role[] = [student, teacher];
  const {navigateTo} = useNav();

  function handleUserRole(role: Role) {
    console.log(role);
    navigateTo('Login');
  }

  return (
    <View className="my-auto h-5/6">
      <Text>I am a</Text>
      <View className="gap-2">
        {roles.map(value => {
          return <Button onPress={() => handleUserRole(value)}>{value}</Button>;
        })}
      </View>
    </View>
  );
};

export default LandingScreen;
