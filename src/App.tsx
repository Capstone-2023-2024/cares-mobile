import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DefaultHeader from '~/components/headers/DefaultHeader';
import BackHeader from '~/components/headers/BackHeader';
import HeaderNoChat from '~/components/headers/HeaderNoChat';
import {
  Home,
  UniSched,
  Announcements,
  Application,
  ReqPage,
  Takers,
  Chats,
  ProjectSuggestions,
  WriteSuggestion,
} from '~/screens';
import NavigationProvider from './contexts/NavigationContext';

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
              header: () => <DefaultHeader />,
            }}
          />
          <Stack.Screen
            name="Dashboard University Schedule"
            component={UniSched}
            options={{
              header: () => <BackHeader />,
            }}
          />

          <Stack.Screen
            name="Dashboard Announcements"
            component={Announcements}
            options={{
              header: () => <BackHeader />,
            }}
          />
          <Stack.Screen
            name="Special Class Application"
            component={Application}
            options={{
              header: () => <DefaultHeader />,
            }}
          />
          <Stack.Screen
            name="Special Class Request Page"
            component={ReqPage}
            options={{
              header: () => <DefaultHeader />,
            }}
          />
          <Stack.Screen
            name="Special Class Takers"
            component={Takers}
            options={{
              header: () => <DefaultHeader />,
            }}
          />
          <Stack.Screen
            name="Chats"
            component={Chats}
            options={{
              header: () => <HeaderNoChat />,
            }}
          />
          <Stack.Screen
            name="ProjectSuggestions"
            component={ProjectSuggestions}
            options={{
              header: () => <DefaultHeader />,
            }}
          />
          <Stack.Screen
            name="WriteSuggestion"
            component={WriteSuggestion}
            options={{
              header: () => <DefaultHeader />,
            }}
          />
        </Stack.Navigator>
      </NavigationProvider>
    </NavigationContainer>
  );
};

export default App;
