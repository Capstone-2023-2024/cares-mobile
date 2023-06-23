import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Announcement from './screens/dashboard/Announcement';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Announcement"
          component={Announcement}
          options={{
            headerShown: false,
            // headerBackButtonMenuEnabled: true,
            // headerBackVisible: true,
            // headerTitle: 's',
            // headerShadowVisible: false,
            // headerStyle: {backgroundColor: 'transparent'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
