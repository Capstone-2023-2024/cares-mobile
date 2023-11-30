import React from 'react';
import {Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

const FooterNav = () => {
  const {handleNavigation} = useNav();
  const {currentStudent} = useUser();

  return (
    <View className="w-full">
      <View className="flex-row items-center justify-around border-t-2 border-primary bg-white">
        <TouchableOpacity
          disabled={currentStudent.email === 'null'}
          onPress={() => handleNavigation('ProjectSuggestions')}
          className="">
          <View className="mt-2 h-20 items-center">
            <Image
              className="mb-1 h-12 w-12"
              source={require('~/assets/project_suggestion_icon.png')}
            />
            <Text className=" w-48 text-center text-sm font-bold text-black">
              Project Suggestions
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
