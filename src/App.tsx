import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import CustomHeaderHome from '~/components/headers/CustomHeaderHome';
import CustomHeaderUniv from '~/components/headers/CustomHeaderUniv';
import Home from '~/screens/Home';
import UniversitySchedule from '~/screens/UniversitySchedule';
import { styles } from '~/styles/headerStyle';
import Announcements from './screens/Announcements';
import {View, Text} from 'react-native'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View><Text className='text-green-300'>asd</Text></View>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            // headerStyle: styles.header,
            // headerTitleStyle: styles.headerTitle,
            // headerLeft: () => (
            //   <Image
            //     source={require('~/assets/CICS.png')}
            //     className='w-24 h-3/4 border border-black -left-1/4'
            //     resizeMode="contain"
            //   />
            // ),
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
                className='rotate-180 w-9 mx-[2%] h-3/4'
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
                className='rotate-180 w-9 mx-[2%] h-3/4'
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
