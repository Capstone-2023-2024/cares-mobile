import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import FooterNav from '~/components/FooterNav';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';
import Usertab from './Usertab';
const bsu = require('~/assets/BSUBACKGROUND.png');

const Home = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={bsu} // Replace with your background image path
        style={styles.backgroundImage}
        imageStyle={{opacity: 0.7}} // Set the opacity of the background image
      >
        <ScrollView>
          <Usertab />
          <UniversitySchedule />
          <Announcements />
          <Notifications />
        </ScrollView>
      </ImageBackground>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Home;
