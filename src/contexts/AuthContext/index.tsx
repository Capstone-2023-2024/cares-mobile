import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNav} from '../NavigationContext';
import type {
  AuthContextType,
  AuthProviderProps,
  InitialState,
  InitialStateProps,
} from './types';
import {ToastAndroid} from 'react-native';
import {useContent} from '../ContentContext';
import {collectionRef} from '~/utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const {role, handleRole} = useContent();

  function handleState(key: keyof InitialStateProps, value: InitialState) {
    setState(prevState => ({...prevState, [key]: value}));
  }
  async function handleMayorAdvisers() {
    try {
      const COLLECTION_PATH = role === 'faculty' ? 'permission' : 'mayor';
      if (state.currentUser !== null) {
        const EMPTY_LENGTH = 0;
        const result = await collectionRef(COLLECTION_PATH)
          .where('email', '==', state.currentUser.email)
          .count()
          .get();
        if (result.data().count > EMPTY_LENGTH) {
          const newRole =
            COLLECTION_PATH === 'permission' ? 'adviser' : 'mayor';
          handleRole(newRole);
          await AsyncStorage.setItem('role', newRole);
        }
      }
    } catch (err) {
      return ToastAndroid.show(
        'Error in handling mayor and adviser state',
        ToastAndroid.SHORT,
      );
    }
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
      handleMayorAdvisers();
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
