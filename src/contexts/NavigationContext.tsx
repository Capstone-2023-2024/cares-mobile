import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useContext, createContext} from 'react';

type NavigationContextType = {
  navigateTo: (name: string, params?: any) => void;
};

const NavigationContext = createContext<NavigationContextType>({
  navigateTo: () => null,
});

const NavigationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const navigation = useNavigation();

  function navigateTo(name: string, params?: any) {
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
