import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BackHeader from '~/components/headers/BackHeader';
import DefaultHeader from '~/components/headers/DefaultHeader';
import HeaderNoChat from '~/components/headers/HeaderNoChat';
import {
  Announcements,
  Application,
  Home,
  ReqPage,
  Takers,
  UniversitySchedule,
  Chats,
  ProjectSuggestions,
  WriteSuggestion,
} from '~/screens';
import NavigationProvider from './contexts/NavigationContext';
import UserInfo from './screens/dashboard/UserInfo';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NavigationProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard Home"
            component={Home}
            options={{
              header: MHeader,
            }}
          />
          <Stack.Screen
            name="Dashboard User Info"
            component={UserInfo}
            options={{
              header: BHeader,
            }}
          />
          <Stack.Screen
            name="Dashboard University Schedule"
            component={UniversitySchedule}
            options={{
              header: BHeader,
            }}
          />

          <Stack.Screen
            name="Dashboard Announcements"
            component={Announcements}
            options={{
              header: BHeader,
            }}
          />
          <Stack.Screen
            name="Special Class Application"
            component={Application}
            options={{
              header: MHeader,
            }}
          />
          <Stack.Screen
            name="Special Class Request Page"
            component={ReqPage}
            options={{
              header: MHeader,
            }}
          />
          <Stack.Screen
            name="Special Class Takers"
            component={Takers}
            options={{
              header: MHeader,
            }}
          />
          <Stack.Screen
            name="Chats"
            component={Chats}
            options={{
              header: NoChatHeader,
            }}
          />
          <Stack.Screen
            name="ProjectSuggestions"
            component={ProjectSuggestions}
            options={{
              header: MHeader,
            }}
          />
          <Stack.Screen
            name="WriteSuggestion"
            component={WriteSuggestion}
            options={{
              header: MHeader,
            }}
          />
        </Stack.Navigator>
      </NavigationProvider>
    </NavigationContainer>
  );
};

const BHeader = () => {
  return <BackHeader />;
};

const MHeader = () => {
  return <DefaultHeader />;
};

const NoChatHeader = () => {
  return <HeaderNoChat />;
};

export default App;
