import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import BackHeader from '~/components/headers/BackHeader';
import DefaultHeader from '~/components/headers/DefaultHeader';
import HeaderNoChat from '~/components/headers/HeaderNoChat';
import {
  Announcements,
  Application,
  Chats,
  Home,
  ProjectSuggestions,
  ReqPage,
  Takers,
  UniversitySchedule,
  WriteSuggestion,
} from '~/screens';
import AuthProvider, {useAuth} from './contexts/AuthContext';
import NavigationProvider from './contexts/NavigationContext';
import CreatePass from './screens/authentication/CreatePass';
import ForgotPass from './screens/authentication/ForgotPass';
import Login from './screens/authentication/Login';
import Register from './screens/authentication/Register';
import Registered from './screens/authentication/Registered';
import VerificationCode from './screens/authentication/VerificationCode';
import UserInfo from './screens/dashboard/UserInfo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <Navigations />
    </AuthProvider>
  );
};

const Navigations = () => {
  const {loading, currentUser} = useAuth();
  const routeName = currentUser === null ? 'Login' : 'Dashboard Home';

  if (loading) {
    return <Text className="animate-spin">C</Text>;
  }

  return (
    <NavigationContainer>
      <NavigationProvider>
        <Stack.Navigator initialRouteName={routeName}>
          {currentUser === null ? (
            <>
              <Stack.Screen name="CreatePass" component={CreatePass} />
              <Stack.Screen name="ForgotPass" component={ForgotPass} />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  header: NoChatHeader,
                  animationTypeForReplace: loading ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  header: NoChatHeader,
                }}
              />
              <Stack.Screen name="Registered" component={Registered} />
              <Stack.Screen
                name="VerificationCode"
                component={VerificationCode}
              />
            </>
          ) : (
            <>
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
            </>
          )}
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
