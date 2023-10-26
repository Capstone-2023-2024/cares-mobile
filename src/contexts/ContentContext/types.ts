import type {AnnouncementProps} from '~/types/announcement';
import type {Role} from '~/screens/authentication/Landing/types';
import {MessagePrompt} from '../AuthContext/types';

export interface InitialStateProps {
  privilege: boolean;
  message: MessagePrompt;
  role: Role | null;
  announcement: AnnouncementProps[];
}

export interface ContentContextType extends InitialStateProps {
  handlePrivilege: (props: boolean) => void;
  handleMessage: (props: MessagePrompt) => void;
  handleRole: (props: Role) => void;
}
