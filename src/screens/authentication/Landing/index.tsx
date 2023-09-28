import React from 'react';
import {View} from 'react-native';
import {Text} from '~/components';
import {Button} from '~/components/Button';
import {useNav} from '~/contexts/NavigationContext';
import type {RoleType} from './types';

const Landing = () => {
  const roles: RoleType[] = ['student', 'faculty'];
  const {navigateTo} = useNav();

  function handleUserRole(role: RoleType) {
    navigateTo('Login', {role});
  }

  return (
    <View className="my-auto h-5/6">
      <Text className="text-center">I am a</Text>
      <View className="gap-2">
        {roles.map(value => {
          return (
            <Button key={value} onPress={() => handleUserRole(value)}>
              {value}
            </Button>
          );
        })}
      </View>
    </View>
  );
};

export default Landing;
