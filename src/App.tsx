import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CustomHeaderHome from '~/components/headers/CustomHeaderHome';
import CustomHeaderUniv from '~/components/headers/CustomHeaderUniv';
import Home from '~/screens/Home';
import UniversitySchedule from '~/screens/UniversitySchedule';
import Announcements from './screens/Announcements';
import Debug from './screens/Debug';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <CustomHeaderHome />,
          }}
        />

        <Stack.Screen
          name="UniversitySchedule"
          component={UniversitySchedule}
          options={{
            header: () => <CustomHeaderUniv />,
          }}
        />

        <Stack.Screen
          name="Announcements"
          component={Announcements}
          options={{
            header: () => <CustomHeaderUniv />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
