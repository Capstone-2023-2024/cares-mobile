import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, View, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

const FooterNav = () => {
  const {handleNavigation} = useNav();
  const {currentStudent, role} = useUser();
  const route = useRoute();
  const complaintRenderCondition =
    role !== 'faculty' && route.name !== 'Chats' && currentStudent !== null;

  function handlePressChats() {
    if (currentStudent.section === undefined) {
      return Alert.alert('No section', 'Please set up your section first');
    }
    handleNavigation('Complaints');
  }

  return (
    <View className="bottom-2 w-full">
      <View className="flex-row items-center justify-around border-t-2 border-primary bg-white">
        <TouchableOpacity
          disabled={currentStudent.email === 'null'}
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
            disabled={currentStudent.email === 'null'}
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
