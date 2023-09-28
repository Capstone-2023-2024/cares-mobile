import type {ReactNode} from 'react';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';
import type {FirestoreCollectionPath} from '~/utils/firebase';

export interface InitialStateType {
  initialRouteName: 'Landing' | 'Home' | 'Loading';
  loading: boolean;
  currentUser: FirebaseAuthTypes.User | null;
}

export type InitialStatePropType =
  | InitialStateType['initialRouteName']
  | InitialStateType['currentUser']
  | InitialStateType['loading'];

export interface AuthContextType extends InitialStateType {
  signout: () => Promise<void>;
  onGoogleButtonPress: (
    p: FirestoreCollectionPath,
  ) => Promise<MessagePromptType>;
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

export type MessagePromptType =
  | 'SUCCESS'
  | 'NOT_EXIST'
  | 'ERROR'
  | 'INVALID_USER'
  | null;
