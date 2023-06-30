import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';

import CustomHeaderHome from '~/components/headers/CustomHeaderHome';
import Home from '~/screens/Home';
import UniversitySchedule from '~/screens/UniversitySchedule';
import {styles} from '~/styles/headerStyle';
import Announcements from './screens/Announcements';
import CustomHeaderUniv from '~/components/headers/CustomHeaderUniv';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <Image
                source={require('~/assets/CICS.png')}
                style={styles.logoright}
                resizeMode="contain"
              />
            ),
            header: () => <CustomHeaderHome />,
          }}
        />

        <Stack.Screen
          name="UniversitySchedule"
          component={UniversitySchedule}
          options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <Image
                source={require('~/assets/right-arrow.png')}
                style={styles.logoleft}
                resizeMode="contain"
              />
            ),
            header: () => <CustomHeaderUniv />,
          }}
        />

        <Stack.Screen
          name="Announcements"
          component={Announcements}
          options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <Image
                source={require('~/assets/right-arrow.png')}
                style={styles.logoleft}
                resizeMode="contain"
              />
            ),
            header: () => <CustomHeaderUniv />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
