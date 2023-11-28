import type {
  CurrentUserRoleType,
  ReadStudentInfoProps,
  SectionType,
} from '@cares/types/user';
import type {ReactNode} from 'react';

export interface UserStateProps {
  role: CurrentUserRoleType | null;
  currentStudent: Partial<ReadStudentInfoProps>;
}
export interface UserContextProps extends UserStateProps {
  handleRole: (props: UserStateProps['role']) => void;
  setSection: (section?: SectionType) => void;
}
export interface UserProviderProps {
  children: ReactNode;
}
