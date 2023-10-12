import React, {type ReactNode} from 'react';
import AuthProvider from './AuthContext';
import ContentProvider from './ContentContext';

interface CtxProviderProps {
  children: ReactNode;
}

const CtxProviders = ({children}: CtxProviderProps) => {
  return (
    <AuthProvider>
      <ContentProvider>{children}</ContentProvider>
    </AuthProvider>
  );
};

export default CtxProviders;
