import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNav} from '~/contexts/NavigationContext';
import {Text} from '~/components';

const FooterNav = () => {
  const {navigateTo} = useNav();

  return (
    <View className=" bottom-0 left-0 right-0">
      <View className="flex-row items-center justify-between border-t border-gray-400 bg-white px-12 pt-2">
        <TouchableOpacity
          className="mb-2"
          onPress={() => navigateTo('Special Class Takers')}>
          <View className="items-center">
            <Image
              source={require('~/assets/contract.png')}
              className="h-10 w-10"
            />
            <Text className="font-bold text-black">Apply Special Class</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-2"
          onPress={() => navigateTo('ProjectSuggestions')}>
          <View className="items-center">
            <Image
              source={require('~/assets/project.png')} // Assuming you have a different image for project suggestions
              className="h-10 w-10"
            />
            <Text className="font-bold text-black">Project Suggestions</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
