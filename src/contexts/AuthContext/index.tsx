import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {collectionRef} from '~/utils/firebase';
import type {
  AuthContextType,
  AuthProviderProps,
  FirebaseAuthProfileProps,
  InitialState,
  InitialStateProps,
  MessagePrompt,
} from './types';
import type {CollectionPath} from '~/types/firebase';

const initialState: InitialStateProps = {
  loading: false,
  initialRouteName: 'Landing',
  currentUser: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signout: async () => {},
  onGoogleButtonPress: async () => null,
});

const AuthProvider = ({children}: AuthProviderProps) => {
  const config = {
    webClientId:
      '786929223549-qpbb1jebv0gqk6641tcj57k154bjhauu.apps.googleusercontent.com',
  };

  GoogleSignin.configure({...config});

  const [state, setState] = useState(initialState);

  function handleState(key: keyof InitialStateProps, value: InitialState) {
    setState(prevState => ({...prevState, [key]: value}));
  }

  async function signout() {
    try {
      await auth().signOut();
      GoogleSignin.revokeAccess();
      handleState('initialRouteName', 'Landing');
    } catch (err) {
      console.log(err);
    }
  }

  async function onGoogleButtonPress(
    path: CollectionPath,
  ): Promise<MessagePrompt> {
    handleState('initialRouteName', 'Loading');
    handleState('loading', true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const {additionalUserInfo, user} = await auth().signInWithCredential(
        googleCredential,
      );
      const profile: Partial<FirebaseAuthProfileProps> | undefined =
        additionalUserInfo?.profile as Partial<FirebaseAuthProfileProps>;
      const res = await collectionRef(path === 'faculty' ? 'permission' : path)
        .where('email', '==', user.email)
        .count()
        .get();

      if (profile.hd === 'bulsu.edu.ph') {
        if (res.data().count <= 0) {
          await auth()
            .signOut()
            .finally(() => {
              handleState('loading', false);
            });
          GoogleSignin.revokeAccess();
          return 'NOT_EXIST';
        }
        handleState('loading', false);
        handleState('initialRouteName', 'Home');
        return 'SUCCESS';
      }
      await auth()
        .signOut()
        .finally(() => {
          handleState('loading', false);
        });
      GoogleSignin.revokeAccess();
      return 'INVALID_USER';
    } catch (err) {
      console.log(err);
      return 'ERROR';
    }
  }

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(user => {
      handleState('currentUser', user);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signout,
        onGoogleButtonPress,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
