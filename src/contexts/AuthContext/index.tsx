import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {useNav} from '../NavigationContext';
import type {
  AuthContextType,
  AuthProviderProps,
  InitialState,
  InitialStateProps,
} from './types';
import {collectionRef} from '~/utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContent} from '../ContentContext';

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
    '622310668633-i7mpvf5v83051snfvqj96vkhd6iverlr.apps.googleusercontent.com',
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
      const {additionalUserInfo} = await auth().signInWithCredential(
        googleCredential,
      );
      const role = await AsyncStorage.getItem('role');
      const profile = additionalUserInfo?.profile;
      const student = role === 'mayor' || role === 'student';
      const result = await collectionRef(student ? 'student' : 'permission')
        .where('email', '==', profile?.email)
        .count()
        .get();
      if (result.data().count < 1) {
        await signout();
        await AsyncStorage.removeItem('usersCache');
        return Alert.alert(
          student
            ? 'Please register your Email along with your COR'
            : 'You do not have the permission to login as faculty member of cics',
        );
      }
    } catch (err) {
      console.log(err);
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
