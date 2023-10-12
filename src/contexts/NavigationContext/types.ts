import type {ReactNode} from 'react';
import type {PathListType} from '~/utils/navPaths/types';

export interface NavigationContextProps {
  handleNavigation: (name: PathListType, params?: any) => void;
}

export interface NavigationProviderProps {
  children: ReactNode;
}
