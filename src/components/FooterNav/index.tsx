import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, View, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

const FooterNav = () => {
  const {handleNavigation} = useNav();
  const route = useRoute();
  const {currentStudent, role} = useUser();
  const complaintRenderCondition =
    role !== 'faculty' && route.name !== 'Chats' && currentStudent !== null;

  function handlePressChats() {
    if (currentStudent.section === undefined) {
      return Alert.alert('No section', 'Please set up your section first');
    }
    handleNavigation('Complaints');
  }

  return (
    <View className="w-full border-t-2 border-primary bg-paper p-2">
      <View className="flex-row items-center justify-around">
        <TouchableOpacity
          disabled={currentStudent.email === 'null'}
          onPress={() => handleNavigation('ProjectSuggestions')}>
          <View className="items-center">
            <Image
              className="h-12 w-12"
              source={require('~/assets/project_suggestion_icon.png')}
            />
            <Text className=" w-48 text-center text-sm font-bold text-black">
              Project Suggestions
            </Text>
          </View>
        </TouchableOpacity>
        {complaintRenderCondition && (
          <TouchableOpacity
            disabled={currentStudent.email === 'null'}
            onPress={handlePressChats}>
            <View className="items-center">
              <Image
                className="h-12 w-12"
                source={require('~/assets/chat.png')}
              />
              <Text className=" w-48 text-center text-sm font-bold text-black">
                Complaints
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FooterNav;
