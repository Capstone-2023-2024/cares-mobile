import type {ReactNode} from 'react';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface InitialStateProps {
  currentUser: FirebaseAuthTypes.User | null;
}

export type InitialState = InitialStateProps['currentUser'];

export interface AuthContextType extends InitialStateProps {
  signout: () => Promise<void>;
  onGoogleButtonPress: () => Promise<void>;
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
