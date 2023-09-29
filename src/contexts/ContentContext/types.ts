import type {
  AnnouncementType,
  StudInfoSortedType,
} from 'shared/types';
import type {RoleType} from '~/screens/authentication/Landing/types';
import {MessagePromptType} from '../AuthContext/types';

export interface InitialStateType {
  message: MessagePromptType;
  role: RoleType | null;
  announcement: AnnouncementType[];
}

export interface ContentContextType extends InitialStateType {
  handleMessage: (props: MessagePromptType) => void;
  handleRole: (props: RoleType) => void;
}
