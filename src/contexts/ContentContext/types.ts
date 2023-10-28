import type {AnnouncementProps} from '~/types/announcement';
import type {Role} from '~/screens/authentication/Landing/types';
import type {MessagePrompt} from '../AuthContext/types';
import type {StudentWithClassSection} from '~/types/student';

export interface InitialStateProps {
  message: MessagePrompt;
  role: Role | null;
  announcement: AnnouncementProps[];
}

export type InitialStateValues =
  | InitialStateProps['announcement']
  | InitialStateProps['message']
  | InitialStateProps['role'];

export interface ContentContextType extends InitialStateProps {
  handleMessage: (props: InitialStateProps['message']) => void;
  handleRole: (props: InitialStateProps['role']) => void;
  handleUsersCache: (
    userCache?: StudentWithClassSection,
  ) => Promise<StudentWithClassSection[]>;
}
