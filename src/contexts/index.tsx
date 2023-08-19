import React, {type ReactNode} from 'react';
import AuthProvider from './AuthContext';
import ContentProvider from './ContentContext';

const CtxProviders = ({children}: {children: ReactNode}) => {
  return (
    <AuthProvider>
      <ContentProvider>{children}</ContentProvider>
    </AuthProvider>
  );
};

export default CtxProviders;
