import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View} from 'react-native';
import {Text} from '~/components';
import {Button} from '~/components/Button';
import {useNav} from '~/contexts/NavigationContext';
import type {RoleType} from './types';
import {useContent} from '~/contexts/ContentContext';

const Landing = () => {
  const roles: RoleType[] = ['student', 'faculty'];
  const {navigateTo} = useNav();
  const {handleRole} = useContent();

  async function handleUserRole(role: RoleType) {
    await AsyncStorage.setItem('role', role);
    handleRole(role);
    navigateTo('Login');
  }

  return (
    <View className="h-screen items-center justify-center">
      <Text className="mb-2 text-center text-xl">I am a</Text>
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
