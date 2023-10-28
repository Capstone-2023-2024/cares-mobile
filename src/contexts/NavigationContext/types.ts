import type {ReactNode} from 'react';
import type {PathListType} from '~/utils/navPaths/types';

export interface NavigationProviderProps {
  children: ReactNode;
}
export interface InitialStateProps {
  initialRouteName: 'Landing' | 'Home' | 'Loading';
}
export type InitialStateValues = InitialStateProps['initialRouteName'];
export interface NavigationContextProps extends InitialStateProps {
  handleInitialRoute: (path: InitialStateProps['initialRouteName']) => void;
  handleNavigation: (name: PathListType, params?: any) => void;
}
