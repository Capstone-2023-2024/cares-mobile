import type {
  AnnouncementType,
  ClientChatType,
  StudInfoSortedType,
} from 'shared/types';
import type { RoleType } from '~/screens/authentication/Landing/types';

export interface InitialStateType {
  role: RoleType | null
  chat: ClientChatType[];
  announcement: AnnouncementType[];
  selectedChat: string | null;
}

export interface ContentContextType extends InitialStateType {
  handleSelectedChat: (props: string) => void;
  handleRole: (props: RoleType) => void
}

export interface ChattableType extends Pick<StudInfoSortedType, 'email'> {
  type: 'student' | 'faculty';
}
