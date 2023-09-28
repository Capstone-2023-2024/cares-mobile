import type {
  AnnouncementType,
  ClientChatType,
  StudInfoSortedType,
} from 'shared/types';

export interface InitialStateType {
  chat: ClientChatType[];
  announcement: AnnouncementType[];
  selectedChat: string | null;
}

export interface ContentContextType extends InitialStateType {
  handleSelectedChat: (props: string) => void;
}

export interface ChattableType extends Pick<StudInfoSortedType, 'email'> {
  type: 'student' | 'faculty';
}
