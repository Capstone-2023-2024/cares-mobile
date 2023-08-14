import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  type StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import Header from '~/components/Header';
import {
  Announcements,
  Application,
  Chats,
  CreatePass,
  ForgotPass,
  Home,
  Login,
  ProjectSuggestions,
  Register,
  ReqPage,
  Takers,
  UniversitySchedule,
  VerificationCode,
  WriteSuggestion,
} from '~/screens';
import Loading from './components/Loading';
import CtxProviders from './contexts';
import {useAuth} from './contexts/AuthContext';
import NavigationProvider from './contexts/NavigationContext';
import UserInfo from './screens/dashboard/UserInfo';

const Stack = createStackNavigator();

interface StackType {
  name: string;
  component: any;
  options?: StackNavigationOptions;
}

const App = () => {
  return (
    <CtxProviders>
      <Navigations />
    </CtxProviders>
  );
};

const Navigations = () => {
  const {initialRouteName, loading, currentUser} = useAuth();
  const withAuth: StackType[] = [
    {
      name: 'Dashboard Home',
      component: Home,
      options: {header: HeaderDefault},
    },
    {
      name: 'Dashboard User Info',
      component: UserInfo,
      options: {headerShown: false},
    },
    {
      name: 'Dashboard University Schedule',
      component: UniversitySchedule,
      options: {header: HeaderDefault},
    },
    {
      name: 'Dashboard Announcements',
      component: Announcements,
      options: {header: HeaderDefault},
    },
    {
      name: 'Special Class Application',
      component: Application,
      options: {header: HeaderDefault},
    },
    {
      name: 'Special Class Request Page',
      component: ReqPage,
      options: {header: HeaderDefault},
    },
    {
      name: 'Special Class Takers',
      component: Takers,
      options: {header: HeaderWithBack},
    },
    {
      name: 'Chats',
      component: Chats,
      options: {header: HeaderDefault},
    },
    {
      name: 'ProjectSuggestions',
      component: ProjectSuggestions,
      options: {header: HeaderWithBack},
    },
    {
      name: 'WriteSuggestions',
      component: WriteSuggestion,
      options: {header: HeaderWithBack},
    },
  ];

  const withoutAuth: StackType[] = [
    {
      name: 'CreatePass',
      component: CreatePass,
      options: {header: HeaderDefault},
    },
    {
      name: 'Login',
      component: Login,
      options: {
        header: HeaderDefault,
        animationTypeForReplace: loading ? 'pop' : 'push',
      },
    },
    {
      name: 'ForgotPass',
      component: ForgotPass,
      options: {header: HeaderDefault},
    },
    {name: 'Register', component: Register, options: {header: HeaderDefault}},
    {
      name: 'VerificationCode',
      component: VerificationCode,
      options: {header: HeaderDefault},
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <NavigationProvider>
        <Stack.Navigator initialRouteName={initialRouteName}>
          {[...(currentUser === null ? withoutAuth : withAuth)].map(
            (props, i) => {
              return <Stack.Screen key={i} {...props} />;
            },
          )}
        </Stack.Navigator>
      </NavigationProvider>
    </NavigationContainer>
  );
};

const HeaderDefault = () => {
  return <Header />;
};
const HeaderWithBack = () => {
  return <Header withBack />;
};

export default App;
