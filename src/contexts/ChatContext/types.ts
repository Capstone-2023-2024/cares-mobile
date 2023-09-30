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
  selectedChat: string | null;
}
export type InitialPropsType =
  | InitialProps['chat']
  | InitialProps['chattables']
  | InitialProps['selectedChat'];

export interface ChatContextProps extends InitialProps {
  handleSelectedChat: (props: string | null) => void;
}

export interface ChattableProps {
  id: string;
  email: string;
}
