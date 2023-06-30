import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

import Home from './HomeScreen';
import Schedule from './University Schedule';
import Announcements from './Announcements';


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <Image
                source={require('./Pics/CICS.png')}
                style={styles.logoright}
                resizeMode="contain"
              />
            ),
            header: () => <CustomHeaderHome />,
          }}
        />

        <Stack.Screen name="UniversitySchedule" component={Schedule} 
        options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <Image
                source={require('./Pics/right-arrow.png')}
                style={styles.logoleft}
                resizeMode="contain"
              />
            ),
            header: () => <CustomHeaderUniv />,
          }}/>

<Stack.Screen name="Announcements" component={Announcements} 
        options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <Image
                source={require('./Pics/right-arrow.png')}
                style={styles.logoleft}
                resizeMode="contain"
              />
            ),
            header: () => <CustomHeaderUniv />,
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function CustomHeaderHome() {
  return (
    <View style={styles.header}>
      <Image
        source={require('./Pics/CICS.png')}
        style={styles.logoright}
        resizeMode="contain" />
      <Text style={styles.BSU}>CICS</Text>
      <TouchableOpacity style={styles.userIcon}>
        <Image source={require('./Pics/user.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.messagesIcon}>
        <Image source={require('./Pics/messages.png')} />
      </TouchableOpacity>
    </View>
  );
}

function CustomHeaderUniv() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Perform the navigation action to go back to the HomeScreen
  };

  return (
    <View style={styles.headerU}>
      <TouchableOpacity onPress={handleGoBack}>
        <Image
          source={require('./Pics/right-arrow.png')}
          style={styles.logoleft}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 10,
  },
  headerU: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  logoright: {
    width: 100,
    height: '75%',
    borderColor:'black',
    left:'-30%',
  },
  logoleft: {
    transform: [{ rotate: '180deg' }],
    width: 35,
    marginRight:'2%',
    marginLeft:'2%',
    height: '75%',
  },
  BSU: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    left:'-45%',
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
    position:'relative',
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
    marginTop:'5%',
  },
  iconBG: { 
    width:100,
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
    marginTop:'-18%',
    color: 'black',
  },
  ellipsisButton: {
    marginLeft: '85%',
    marginTop:'-8%',
    marginBottom:'10%',
    width: 35,
    height: 35,
  },
  ellipsisIcon: {
    width: '100%',
    height: '100%',
  },
  containerUS: {
    marginTop:'5%',
    borderBottomWidth: 3,
    marginBottom: 10,
    borderBottomColor: 'gray',
  },
  UniversitySchedule: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    color: 'black',
  },
  arrowImage: {
    position: 'absolute',
    right: 10,
    width: 25,
    height: 25,
  },
  oval: {
    width: 300,
    height: 75,
    marginLeft: 20,
    marginTop: '3%',
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
    
    marginTop:'5%',
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
  ovalAnnc: {
    width: 320,
    height: 'auto',
    marginLeft: 20,
    marginTop: '3%',
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
    textAlign:'center',
    color: 'black',
    fontSize: 15,
    fontWeight:'bold',
  },

  containerNotif: {
    width: '95%',
    height:'auto',
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
    marginBottom:'5%',
    right:'-88%',
  },
  ovalNotif: {
    width: '95%',
    marginLeft: '2%',
    marginTop: '3%',
    marginBottom: '3%',
    marginEnd:'10%',
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

export default App;
