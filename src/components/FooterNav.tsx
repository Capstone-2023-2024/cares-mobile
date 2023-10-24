import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';

const FooterNav = () => {
  const {role} = useContent();
  const {handleNavigation} = useNav();

  function handlePressProject() {
    handleNavigation('ProjectSuggestions');
  }

  return (
    <View className=" bottom-0 left-0 right-0">
      <View className="flex-row items-center justify-center border-t border-gray-400 bg-white px-12 pt-2">
        {role === 'student' && (
          <TouchableOpacity className="mb-2" onPress={handlePressProject}>
            <View className="items-center">
              <Text className="font-bold text-black">Icon</Text>
              <Text className="font-bold text-black">Project Suggestions</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FooterNav;
