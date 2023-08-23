import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useContext, createContext} from 'react';
import type {PathListType} from '~/types/navigation';

interface NavigationContextType {
  navigateTo: (name: PathListType, params?: any) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  navigateTo: () => null,
});

const NavigationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const navigation = useNavigation();

  function navigateTo(name: PathListType, params?: any) {
    navigation.dispatch(CommonActions.navigate({name, params}));
  }

  const values = {navigateTo};

  return (
    <NavigationContext.Provider value={values}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => useContext(NavigationContext);
export default NavigationProvider;
