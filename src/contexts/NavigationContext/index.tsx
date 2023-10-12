import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useContext, createContext} from 'react';
import type {PathListType} from '~/utils/navPaths/types';
import type {NavigationContextProps, NavigationProviderProps} from './types';

const NavigationContext = createContext<NavigationContextProps>({
  handleNavigation: () => null,
});

const NavigationProvider = ({children}: NavigationProviderProps) => {
  const navigation = useNavigation();

  function handleNavigation(name: PathListType, params?: any) {
    navigation.dispatch(CommonActions.navigate({name, params}));
  }

  return (
    <NavigationContext.Provider value={{handleNavigation}}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => useContext(NavigationContext);
export default NavigationProvider;
