import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type {PathListType} from '~/utils/navPaths/types';
import type {
  InitialStateProps,
  InitialStateValues,
  NavigationContextProps,
  NavigationProviderProps,
} from './types';
import {useAuth} from '../AuthContext';

const initialState: InitialStateProps = {
  initialRouteName: 'Landing',
};

const NavigationContext = createContext<NavigationContextProps>({
  ...initialState,
  handleInitialRoute: () => null,
  handleNavigation: () => null,
});

const NavigationProvider = ({children}: NavigationProviderProps) => {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  const {currentUser} = useAuth();

  function handleState(
    key: keyof InitialStateProps,
    value: InitialStateValues,
  ) {
    setState(prevState => ({...prevState, [key]: value}));
  }
  function handleNavigation(name: PathListType, params?: any) {
    navigation.dispatch(CommonActions.navigate({name, params}));
  }
  const handleInitialRoute = useCallback(
    (path: InitialStateProps['initialRouteName']) => {
      handleState('initialRouteName', path);
    },
    [],
  );

  useEffect(() => {
    return handleInitialRoute(currentUser === null ? 'Landing' : 'Home');
  }, [currentUser, handleInitialRoute]);

  return (
    <NavigationContext.Provider
      value={{...state, handleInitialRoute, handleNavigation}}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => useContext(NavigationContext);
export default NavigationProvider;
