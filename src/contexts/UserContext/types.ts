import type {CurrentUserRoleType} from '@cares/types/user';
import type {ReactNode} from 'react';

export interface UserStateProps {
  role: CurrentUserRoleType | null;
}
export interface UserContextProps extends UserStateProps {
  handleRole: (props: UserStateProps['role']) => void;
}
export interface UserProviderProps {
  children: ReactNode;
}
