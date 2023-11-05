import React, {type ReactNode} from 'react';
import AuthProvider from './AuthContext';
import UserContext from './UserContext';
import AnnouncementProvider from './AnnouncementContext';

interface CtxProviderProps {
  children: ReactNode;
}

const CtxProviders = ({children}: CtxProviderProps) => {
  return (
    <AuthProvider>
      <UserContext>
        <AnnouncementProvider>{children}</AnnouncementProvider>
      </UserContext>
    </AuthProvider>
  );
};

export default CtxProviders;
