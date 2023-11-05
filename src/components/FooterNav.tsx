import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

const FooterNav = () => {
  const {handleNavigation} = useNav();
  const {currentStudent} = useUser();

  function handlePressProject() {
    handleNavigation('ProjectSuggestions');
  }

  return (
    <View className=" bottom-0 left-0 right-0">
      <View className="flex-row items-center justify-center border-t border-gray-400 bg-white px-12 pt-2">
        <TouchableOpacity
          className="mb-2"
          disabled={currentStudent.email === 'null'}
          onPress={handlePressProject}>
          <View className="items-center">
            <Image
              className="h-8 w-8"
              source={require('~/assets/project_suggestion_icon.png')}
            />
            <Text className="text-sm text-black">Project Suggestions</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
