import type {ReactNode} from 'react';
import type {PathListType} from '~/utils/navPaths/types';

interface NavigationProviderProps {
  children: ReactNode;
}
interface InitialStateProps {
  initialRouteName: 'Landing' | 'Home' | 'Loading';
}
type InitialStateValues = InitialStateProps['initialRouteName'];
interface NavigationContextProps extends InitialStateProps {
  handleInitialRoute: (path: InitialStateProps['initialRouteName']) => void;
  handleNavigation: (name: PathListType, params?: any) => void;
}

export type {
  NavigationProviderProps,
  InitialStateProps,
  InitialStateValues,
  NavigationContextProps,
};
