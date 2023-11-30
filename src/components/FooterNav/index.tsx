import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, View, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';
import {useUniversal} from '~/contexts/UniversalContext';

const FooterNav = () => {
  const {handleNavigation} = useNav();
  const {currentStudentInfo} = useUniversal();
  const {role} = useUser();
  const route = useRoute();
  const complaintRenderCondition =
    role !== 'faculty' &&
    route.name !== 'Complaints' &&
    currentStudentInfo !== undefined;

  function handlePressChats() {
    role === 'adviser' || currentStudentInfo?.section !== undefined
      ? handleNavigation('Complaints')
      : Alert.alert('No section', 'Please set up your section first');
  }

  return (
    <View className="bottom-2 w-full">
      <View className="flex-row items-center justify-around border-t-2 border-primary bg-white">
        <TouchableOpacity
          disabled={currentStudentInfo?.email === undefined}
          onPress={() => handleNavigation('ProjectSuggestions')}
          className="relative p-6">
          <View className="h-8 w-8 items-center">
            <Image
              className="h-full w-full"
              source={require('~/assets/project_suggestion_icon.png')}
            />
            <Text className="absolute -bottom-5 w-48 text-center text-sm font-bold text-black">
              Project Suggestions
            </Text>
          </View>
        </TouchableOpacity>
        {complaintRenderCondition && (
          <TouchableOpacity
            disabled={currentStudentInfo?.email === undefined}
            className="h-8 w-8 items-center"
            onPress={handlePressChats}>
            <Image
              className="h-full w-full"
              source={require('~/assets/chat.png')}
            />
            <Text className="absolute -bottom-5 w-48 text-center text-sm font-bold text-black">
              Complaints
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FooterNav;
