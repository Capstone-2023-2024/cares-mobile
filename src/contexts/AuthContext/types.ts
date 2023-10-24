import type {ReactNode} from 'react';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';
import type {CollectionPath} from '~/types/firebase';

export interface InitialStateProps {
  initialRouteName: 'Landing' | 'Home' | 'Loading';
  loading: boolean;
  currentUser: FirebaseAuthTypes.User | null;
}

export type InitialState =
  | InitialStateProps['initialRouteName']
  | InitialStateProps['currentUser']
  | InitialStateProps['loading'];

export interface AuthContextType extends InitialStateProps {
  signout: () => Promise<void>;
  onGoogleButtonPress: (path: CollectionPath) => Promise<MessagePrompt>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
export interface FirebaseAuthProfileProps {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  hd: 'bulsu.edu.ph';
  iat: number;
  iss: 'https://accounts.google.com';
  locale: 'en';
  name: string;
  picture: string;
  sub: string;
}

export type MessagePrompt =
  | 'SUCCESS'
  | 'NOT_EXIST'
  | 'ERROR'
  | 'INVALID_USER'
  | null;
