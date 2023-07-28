import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import FooterNav from '~/components/FooterNav';
import {useNav} from '~/contexts/NavigationContext';

const Home = () => {
  const {navigateTo} = useNav();

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="containerWelcome">
          <Image
            source={require('path/to/your/user-image.jpg')}
            className="iconBG w-100 h-100 rounded-full border-2 border-black"
          />
          <Text className="Welcome">Welcome,{'\n'}Andrei!</Text>
          <TouchableOpacity className="ellipsisButton mb-10 ml-auto mt-2 h-10 w-10">
            <Image
              source={require('path/to/your/ellipsis-icon.png')}
              className="h-full w-full"
            />
          </TouchableOpacity>
        </View>

        {/* UNIVERSITY SCHEDULE */}
        <View className="containerUS">
          <Text className="UniversitySchedule1">University Schedule</Text>

          <TouchableOpacity
            className="arrowButton"
            onPress={() => navigateTo('Dashboard University Schedule')}>
            <Image
              source={require('path/to/your/right-arrow-icon.png')}
              className="h-6 w-6"
            />
          </TouchableOpacity>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <UniSchedContainer />
            <UniSchedContainer />
            <UniSchedContainer />
          </ScrollView>
        </View>

        {/* ANNOUNCEMENTS */}
        <View className="containerAnnc">
          <Text className="Announcements">Announcements</Text>
          <TouchableOpacity
            className="arrowButtonAnnc"
            onPress={() => navigateTo('Dashboard Announcements')}>
            <Image
              source={require('path/to/your/right-arrow-icon.png')}
              className="h-6 w-6"
            />
          </TouchableOpacity>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <AnnouncementContainer />
            <AnnouncementContainer />
            <AnnouncementContainer />
          </ScrollView>
        </View>

        {/* NOTIFICATIONS */}
        <View className="containerNotif">
          <Text className="Notifications">Notifications</Text>

          <NotifContainer />
          <NotifContainer />
          <NotifContainer />
          <TouchableOpacity>
            <Image
              source={require('path/to/your/right-arrow-icon.png')}
              className="h-6 w-6"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};

// Rest of the components remain the same

const UniSchedContainer = () => {
  const navigation = useNavigation();

  function navigateTo(name: string) {
    navigation.dispatch(CommonActions.navigate({name}));
  }
  return (
    <TouchableOpacity
      style={styles.oval}
      // className='h-16 w-64 '
      onPress={() => navigateTo('Dashboard University Schedule')}>
      <View style={styles.ovalContent}>
        <Text>Pin Icon</Text>
        {/* <Image source={require(pin)} style={styles.pinImage} /> */}
        <Text style={styles.ovalText}>
          Final Examination (Non-graduating Students) in 7 days
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AnnouncementContainer = () => {
  const navigation = useNavigation();

  function navigateTo(name: string) {
    navigation.dispatch(CommonActions.navigate({name}));
  }
  return (
    <TouchableOpacity
      style={styles.ovalAnnc}
      onPress={() => navigateTo('Dashboard Announcements')}>
      <View style={styles.ovalContent}>
        <Text style={styles.ovalTextAnnc}>
          <Text>Pin Icon</Text>
          {/* <Image source={require(pin)} style={styles.pinImage} /> */}
          CITE DEPARTMENT {'\n'}
          {'\n'}
          Heads up, future engineers!As per Office Memorandum from the Office of
          the Director for Administrative and Management Services Division...{' '}
          {'\n'}
          {'\n'}(Read More)
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NotifContainer = () => {
  return (
    <TouchableOpacity style={styles.ovalNotif}>
      <View style={styles.ovalContent}>
        <Text>Idea Icon</Text>
        {/* <Image source={require(idea)} style={styles.NotifBulb} /> */}
        <Text style={styles.ovalTextNotif}>
          Final Examination (Non-graduating Students) in 7 days Final
          Examination (Non-graduating Students) in 7 days
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(118, 52, 53, 1)',
    paddingHorizontal: 10,
  },
  logo: {
    width: 75,
    height: '75%',
  },
  BSU: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 10,
  },
  userIcon: {
    top: -5,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
    width: 35,
    height: 35,
  },
  messagesIcon: {
    top: -5,
    alignItems: 'center',
    marginRight: 10,
    width: 35,
    height: 35,
  },
  containerWelcome: {
    position: 'relative',
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
    marginTop: '5%',
  },
  iconBG: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 2,
    marginLeft: '5%',
  },
  Welcome: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: '32%',
    marginTop: '-18%',
    color: 'black',
  },
  ellipsisButton: {
    marginLeft: '85%',
    marginTop: '-8%',
    marginBottom: '10%',
    width: 35,
    height: 35,
  },
  ellipsisIcon: {
    width: '100%',
    height: '100%',
  },
  containerUS: {
    marginTop: '5%',
    borderBottomWidth: 3,
    marginBottom: 10,
    borderBottomColor: 'gray',
  },
  UniversitySchedule1: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    color: 'black',
  },
  arrowButton: {
    right: '-85%',
    top: '-20%',
  },
  arrowImage: {
    width: 25,
    height: 25,
  },
  oval: {
    width: 300,
    height: 75,
    marginLeft: 20,
    marginBottom: '5%',
    borderRadius: 75,
    borderWidth: 1,
    backgroundColor: 'rgba(118, 52, 53, 1)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ovalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  ovalText: {
    color: 'white',
    fontSize: 15,
  },
  containerAnnc: {
    marginTop: '5%',
    borderBottomWidth: 3,
    marginBottom: 10,
    borderBottomColor: 'gray',
  },
  Announcements: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    color: 'black',
  },
  arrowButtonAnnc: {
    right: '-85%',
    top: '-13%',
  },
  ovalAnnc: {
    width: 320,
    height: 'auto',
    marginLeft: 20,
    marginBottom: '5%',
    borderRadius: 55,
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 4,
    },
    shadowOpacity: 1, // Changed to 1 for a hard black shadow
    shadowRadius: 4,
    elevation: 10, // Needed for Android shadow
  },
  ovalTextAnnc: {
    marginTop: '3%',
    marginBottom: '3%',
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },

  containerNotif: {
    width: '95%',
    height: 'auto',
    marginLeft: '3%',
    marginTop: '5%',
    backgroundColor: 'rgb(211, 211, 211)',
    borderRadius: 50,
    marginBottom: '10%',
  },
  Notifications: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 10,
    color: 'black',
  },
  arrowImageNotif: {
    width: 25,
    height: 25,
    marginTop: '5%',
    marginBottom: '5%',
    right: '-88%',
  },
  ovalNotif: {
    width: '95%',
    marginLeft: '2%',
    marginTop: '3%',
    marginBottom: '3%',
    marginEnd: '10%',
    borderRadius: 55,
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ovalTextNotif: {
    marginTop: '3%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '3%',
    textAlign: 'left',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    maxWidth: '80%', // Add this property to limit the text width within the oval
  },
  ovalContentNotif: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  NotifBulb: {
    width: 35,
    height: 35,
    marginLeft: '2%',
  },
});

export default Home;
