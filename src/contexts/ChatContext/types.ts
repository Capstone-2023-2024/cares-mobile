import type {ReactNode} from 'react';

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
  chat: ClientMessageProps[];
  chattables: ChattableProps[];
}
export type InitialPropsType =
  | InitialProps['chat']
  | InitialProps['chattables'];

export interface ChatContextProps extends InitialProps {}

export interface ChattableProps {
  id: string;
  email: string;
}
