import React, {type ReactNode} from 'react';
import AnnouncementProvider from './AnnouncementContext';
import AuthProvider from './AuthContext';
import ContentManipulationProvider from './ContentManipulationContext';
import ModalProvider from './ModalContext';
import UniversalProvider from './UniversalContext';
import UserContext from './UserContext';

interface BaseProvidersProps {
  children: ReactNode;
}

interface GeneralProvidersProps extends BaseProvidersProps {}
interface ComplaintProvidersProps extends BaseProvidersProps {}

const GeneralProviders = ({children}: GeneralProvidersProps) => {
  return (
    <AuthProvider>
      <UserContext>
        <UniversalProvider>
          <AnnouncementProvider>{children}</AnnouncementProvider>
        </UniversalProvider>
      </UserContext>
    </AuthProvider>
  );
};

const ComplaintProviders = ({children}: ComplaintProvidersProps) => {
  return (
    <ModalProvider>
      <ContentManipulationProvider>
        <ComplaintProviders>{children}</ComplaintProviders>
      </ContentManipulationProvider>
    </ModalProvider>
  );
};

export {ComplaintProviders, GeneralProviders};
