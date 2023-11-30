import React from 'react';
import {ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Background from '~/components/Background';
import FooterNav from '~/components/FooterNav';
import Loading from '~/components/SplashScreen';
import Text from '~/components/Text';
import {default as Announcements} from '~/components/others/home/Announcements';
import {default as CalendarOfActivities} from '~/components/others/home/CalendarOfActivities';
import {default as Usertab} from '~/components/others/home/Usertab';
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

  if (currentStudent.name === undefined && role === null) {
    return <Loading />;
  }

  return (
    <View className="flex-1">
      <Background>
        {renderSectionBannerSetup()}
        <ScrollView>
          <Usertab />
          <CalendarOfActivities />
          <Announcements />
        </ScrollView>
      </Background>
      <FooterNav />
    </View>
  );
};

export default Home;
