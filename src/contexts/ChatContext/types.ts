import type {ReactNode} from 'react';
import {StudInfoSortedType} from 'shared/types';

export interface ChatProviderProps {
  children: ReactNode;
}

export interface ChatConfigType {
  id: string;
  theme: string;
  dateModified: number;
  participants: string[];
}

export interface ChatType {
  id: string;
  type: 'text' | 'photo' | 'document' | 'video' | 'audio';
  content: string;
  dateCreated: number;
  email: string;
}

export interface ClientChatType extends ChatConfigType {
  inbox: ChatType[];
}

export interface InitialProps {
  chat: ClientChatType[];
  selectedChat: string | null;
}
export type InitialPropsType =
  | InitialProps['chat']
  | InitialProps['selectedChat'];
export interface ChatContextProps extends InitialProps {
  handleSelectedChat: (props: string | null) => void;
}

export interface ChattableProps extends Pick<StudInfoSortedType, 'email'> {
  type: 'student' | 'faculty';
}
