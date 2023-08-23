import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  type StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import HeaderDefault from '~/components/Header';
import Screens, {optionsList} from '~/screens';
import Loading from './components/Loading';
import CtxProviders from './contexts';
import {useAuth} from './contexts/AuthContext';
import NavigationProvider from './contexts/NavigationContext';
import {
  pathWithoutUserList,
  pathWithUserList,
  type PathsWithoutUserListType,
  type PathsWithUserListType,
} from './utils/navPaths';

const Stack = createStackNavigator();

type PathListType = PathsWithUserListType | PathsWithoutUserListType;

interface StackType<T> {
  name: T;
  component: () => React.JSX.Element;
  options?: StackNavigationOptions;
}

interface IteratePathsType {
  pathList: readonly PathListType[];
}

const App = () => {
  return (
    <CtxProviders>
      <NavigationRouter />
    </CtxProviders>
  );
};

const NavigationRouter = () => {
  const {initialRouteName, loading, currentUser} = useAuth();

  function iteratePaths(props: IteratePathsType) {
    const {pathList} = props;
    const pathListHolder: StackType<(typeof pathList)[number]>[] = [];
    pathList.forEach(path => {
      const name = path;
      const Element = Screens.filter(cmp => name === cmp.name)[0];
      const options = optionsList.filter(cmp => name === cmp.name)[0]
        ?.options ?? {
        header: Header,
      };
      if (Element !== undefined) {
        const Component = () => Element();
        pathListHolder.push({name, component: Component, options});
      }
    });
    return pathListHolder;
  }

  const withUser = iteratePaths({
    pathList: pathWithUserList,
  });

  const withoutUser = iteratePaths({
    pathList: pathWithoutUserList,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <NavigationProvider>
        <Stack.Navigator initialRouteName={initialRouteName}>
          {[...(currentUser === null ? withoutUser : withUser)].map(
            (props, i) => {
              return <Stack.Screen key={i} {...props} />;
            },
          )}
        </Stack.Navigator>
      </NavigationProvider>
    </NavigationContainer>
  );
};

const Header = () => {
  return <HeaderDefault />;
};

export default App;
