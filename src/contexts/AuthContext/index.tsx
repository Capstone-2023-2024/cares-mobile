import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useNav} from '../NavigationContext';
import type {
  AuthContextType,
  AuthProviderProps,
  InitialState,
  InitialStateProps,
} from './types';

const initialState: InitialStateProps = {
  currentUser: null,
};
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signout: async () => {},
  onGoogleButtonPress: async () => {},
});

const config = {
  webClientId:
    '786929223549-qpbb1jebv0gqk6641tcj57k154bjhauu.apps.googleusercontent.com',
};

const AuthProvider = ({children}: AuthProviderProps) => {
  GoogleSignin.configure({...config});
  const [state, setState] = useState(initialState);
  const {handleNavigation} = useNav();

  function handleState(key: keyof InitialStateProps, value: InitialState) {
    setState(prevState => ({...prevState, [key]: value}));
  }
  async function signout() {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      handleNavigation('Login');
    } catch (err) {
      ToastAndroid.show('Error in logging out', ToastAndroid.SHORT);
    }
  }
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (err) {
      ToastAndroid.show('Sign in action cancelled', ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(user => {
      handleState('currentUser', user);
    });
    return unsub;
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
