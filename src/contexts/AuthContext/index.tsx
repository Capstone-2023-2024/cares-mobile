import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useContext, useEffect, useState} from 'react';
import type {
  AuthContextType,
  AuthProviderProps,
  FirebaseAuthProfileProps,
  InitialStatePropType,
  InitialStateType,
  MessagePromptType,
} from './types';
import {FirestoreCollectionPath, collectionRef} from '~/utils/firebase';

const initialState: InitialStateType = {
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
  GoogleSignin.configure({
    webClientId:
      '786929223549-eqsm6uf50jsriqcs1oncc4lmp80tluj6.apps.googleusercontent.com',
  });
  const [state, setState] = useState(initialState);

  function handleState(
    key: keyof InitialStateType,
    value: InitialStatePropType,
  ) {
    setState(prevState => ({...prevState, [key]: value}));
  }

  async function signout() {
    try {
      await auth().signOut();
      handleState('initialRouteName', 'Landing');
    } catch (err) {
      console.log(err);
    }
  }

  async function onGoogleButtonPress(
    path: FirestoreCollectionPath,
  ): Promise<MessagePromptType> {
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
      const res = await collectionRef(path)
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
