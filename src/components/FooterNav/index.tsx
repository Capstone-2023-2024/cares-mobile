import React from 'react';
import {Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
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
      <View className="flex-row items-center justify-center border-t-2 bg-white px-12 pt-2">
        <TouchableOpacity
          className="mb-2"
          disabled={currentStudent.email === 'null'}
          onPress={handlePressProject}>
          <View className="items-center">
            <Image
              className="h-12 w-12"
              source={require('~/assets/project_suggestion_icon.png')}
            />
            <Text className="text-sm font-bold text-black">
              Project Suggestions
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
