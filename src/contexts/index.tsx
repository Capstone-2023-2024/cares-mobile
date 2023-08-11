import React, {type ReactNode} from 'react';
import AuthProvider from './AuthContext';
import NavigationContainer from './NavigationContext';

const CtxProviders = ({children}: {children: ReactNode}) => {
  return (
    <NavigationContainer>
      <AuthProvider>{children}</AuthProvider>
    </NavigationContainer>
  );
};

export default CtxProviders;
