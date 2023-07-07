import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }: { navigation: any }) => {
  const handleProfilePress = () => {
    navigation.navigate('AccountSetting');
  };

  const handleChatsPress = () => {
    navigation.navigate('Chats');
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require('../assets/bsu_logo.png')}
          style={styles.logo}
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={require('../assets/profile_logo1.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChatsPress}>
            <Image
              source={require('../assets/mail_logo.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileBar}>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.nameText}>John Doe</Text>
        <Image
          source={require('../assets/three_dot_icon.png')}
          style={styles.dotIcon}
        />
      </View>
      <View style={styles.scheduleBar}>
        <Text style={styles.headerText}>University Schedule</Text>
        {/* Image for upcoming schedule */}
      </View>
      <View style={styles.announcementBar}>
        <Text style={styles.headerText}>Announcements</Text>
        {/* Image for pinned announcement */}
      </View>
      <View style={styles.notificationBar}>
        <Text style={styles.headerText}>Notifications</Text>
        <View style={styles.notificationContainer}>
          <Image
            source={require('../assets/notification_image1.png')}
            style={[styles.notificationImage, { width: '30%' }]}
          />
          <Image
            source={require('../assets/notification_image1.png')}
            style={[styles.notificationImage, { width: '30%' }]}
          />
          <Image
            source={require('../assets/notification_image1.png')}
            style={[styles.notificationImage, { width: '30%' }]}
          />
        </View>
      </View>
      <View style={styles.navigationBar}>
        <TouchableOpacity>
          <Image
            source={require('../assets/icon1.png')}
            style={styles.navigationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icon1.png')}
            style={styles.navigationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icon1.png')}
            style={styles.navigationIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background color
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#757575', // Medium gray banner color
    height: 50,
    paddingHorizontal: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  profileBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#616161', // Medium gray text color
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#424242', // Dark gray text color
  },
  dotIcon: {
    width: 25,
    height: 25,
    marginLeft: 'auto',
  },
  scheduleBar: {
    // Styles for University Schedule bar
    padding: 10,
  },
  announcementBar: {
    // Styles for Announcement bar
    padding: 10,
  },
  notificationBar: {
    backgroundColor: '#E0E0E0', // Light gray notification bar color
    padding: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  notificationImage: {
    width: '30%',
    height: 100,
    borderRadius: 25,
    marginBottom: 10,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#757575', // Medium gray navigation bar color
    height: 60,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navigationIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#424242', // Dark gray text color
  },
});

export default Dashboard;
