import React from 'react';
import {View} from 'react-native';
import {Text} from '~/components';
import {Button} from '~/components/Button';
import {useNav} from '~/contexts/NavigationContext';
import type {RoleType} from './types';
import { useContent } from '~/contexts/ContentContext';

const Landing = () => {
  const roles: RoleType[] = ['student', 'faculty'];
  const {handleRole} = useContent()
  const {navigateTo} = useNav();

  function handleUserRole(role: RoleType) {
    handleRole(role)
    navigateTo('Login');
  }

  return (
    <View className="h-screen items-center justify-center">
      <Text className="text-center text-xl mb-2">I am a</Text>
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
