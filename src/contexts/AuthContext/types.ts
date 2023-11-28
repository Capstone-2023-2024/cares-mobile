import type {ReactNode} from 'react';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface InitialStateProps {
  isLoading: boolean;
  currentUser: FirebaseAuthTypes.User | null;
}
export interface AuthContextType extends InitialStateProps {
  signout: () => Promise<void>;
  onGoogleButtonPress: () => Promise<LoginMessagePrompt | null>;
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
export type LoginMessagePrompt =
  | 'COR_UNREGISTERED'
  | 'FACULTY_PERMISSION_NULL'
  | 'SUCCESS'
  | 'ERROR';
