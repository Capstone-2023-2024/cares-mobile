import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import Background from '~/components/Background';
import FooterNav from '~/components/FooterNav';
import {Announcements, CalendarOfActivities, Usertab} from '~/components/Home';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

const Home = () => {
  const {handleNavigation} = useNav();
  const {role} = useUser();
  const {currentStudent} = useUser();

  function setUpSection() {
    handleNavigation('UserInfo');
  }
  const renderSectionBannerSetup = () => {
    const CONDITION =
      role !== 'faculty' &&
      role !== 'adviser' &&
      currentStudent.section === undefined;
    return CONDITION ? (
      <View className="flex-row justify-center bg-yellow-100 p-2">
        <Text className="mr-2 text-xs text-yellow-600">
          Looks like you didn't have your class section set-up.
        </Text>
        <TouchableOpacity
          disabled={currentStudent.email === 'null'}
          onPress={setUpSection}>
          <Text className="text-xs text-yellow-600 underline">Tap here</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View />
    );
  };

  return (
    <View className="flex-1">
      <Background>
        {renderSectionBannerSetup()}
        <ScrollView>
          <Usertab name={currentStudent.name} />
          <CalendarOfActivities />
          <Announcements />
        </ScrollView>
      </Background>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};

export default Home;
