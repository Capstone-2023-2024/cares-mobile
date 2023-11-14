import type {ReactNode} from 'react';
import {ConcernProps} from '~/types/complaints';

export interface ChatConfigProps {
  id: string;
  theme: string;
  dateModified: number;
  participants: string[];
}

export interface MessageProps {
  id: string;
  type: 'text' | 'photo' | 'document' | 'video' | 'audio';
  content: string;
  dateCreated: number;
  email: string;
}

export interface ClientMessageProps extends ChatConfigProps {
  inbox: MessageProps[];
}

export interface ChatProviderProps {
  children: ReactNode;
}

export interface InitialProps {
  otherConcerns: ConcernProps[];
  chatModalVisible: boolean;
  selectedChat: string | null;
}
export type InitialPropsType =
  | InitialProps['otherConcerns']
  | InitialProps['chatModalVisible']
  | InitialProps['selectedChat'];

export interface ChatContextProps extends InitialProps {
  handleOtherConcerns: (value: InitialProps['otherConcerns']) => void;
  handleChatModalVisible: (value: boolean) => void;
  handleSelectedChat: (value: InitialProps['selectedChat']) => void;
}
