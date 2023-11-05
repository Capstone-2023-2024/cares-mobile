import type {ReactNode} from 'react';
import {Role} from '~/screens/authentication/Landing/types';
import {StudentWithClassSection} from '~/types/student';

export interface UserStateProps {
  role: Role | null;
  currentStudent: StudentWithClassSection;
}
export interface UserContextProps extends UserStateProps {
  handleRole: (props: UserStateProps['role']) => void;
  setSection: (section: UserStateProps['currentStudent']['section']) => void;
}
export interface UserProviderProps {
  children: ReactNode;
}
