import type {AnnouncementProps} from 'mobile/../../shared/types/announcement';
import type {Role} from '~/screens/authentication/Landing/types';
import {MessagePrompt} from '../AuthContext/types';

export interface InitialStateProps {
  message: MessagePrompt;
  role: Role | null;
  announcement: AnnouncementProps[];
}

export interface ContentContextType extends InitialStateProps {
  handleMessage: (props: MessagePrompt) => void;
  handleRole: (props: Role) => void;
}
