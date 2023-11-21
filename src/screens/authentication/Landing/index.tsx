import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Text} from '~/components';
import {Button} from '~/components/Button';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';
import type {Role} from './types';

const Landing = () => {
  const roles: Role[] = ['student', 'faculty'];
  const {handleNavigation} = useNav();
  const {handleRole} = useUser();

  async function handleUserRole(role: Role) {
    await AsyncStorage.setItem('role', role);
    handleRole(role);
    handleNavigation('Login');
  }

  return (
    <View className="h-screen items-center justify-center">
      <View className="absolute -bottom-12 right-0">
        <ImageBackground
          className="h-96 w-64"
          source={require('~/assets/smarttechline.png')}
          alt="https://pngtree.com/freepng/cool-dynamic-smart-technology-line-ray-background_3589532.html_image_from_pngtree.com"
        />
      </View>
      <Text className="mb-2 text-center font-serif text-xl font-thin hover:font-sans">
        I'm a
      </Text>
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
