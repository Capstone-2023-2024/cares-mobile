import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useContext, useEffect, useState} from 'react';
import Loading from '~/components/SplashScreen';
// import {STUDENT_KEY} from '~/utils/config';
import {Role} from '~/screens/authentication/Landing/types';
import {CURRENT_STUDENT_KEY} from '~/utils/config';
import {collectionRef} from '~/utils/firebase';
import type {
  AuthContextType,
  AuthProviderProps,
  InitialState,
  InitialStateProps,
  LoginMessagePrompt,
} from './types';
import {OneSignal} from 'react-native-onesignal';

const initialState: InitialStateProps = {
  currentUser: null,
  isLoading: true,
};
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signout: async () => {},
  onGoogleButtonPress: async () => null,
});

const config = {
  webClientId:
    '786929223549-qpbb1jebv0gqk6641tcj57k154bjhauu.apps.googleusercontent.com',
  // '622310668633-i7mpvf5v83051snfvqj96vkhd6iverlr.apps.googleusercontent.com',
};

const AuthProvider = ({children}: AuthProviderProps) => {
  GoogleSignin.configure({...config});
  const [state, setState] = useState(initialState);

  function handleState(key: keyof InitialStateProps, value: InitialState) {
    setState(prevState => ({...prevState, [key]: value}));
  }
  async function signout() {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await AsyncStorage.removeItem(CURRENT_STUDENT_KEY);
      const cachedRole = (await AsyncStorage.getItem('role')) as Role;
      if (cachedRole === 'adviser') {
        AsyncStorage.setItem('role', 'faculty');
      } else if (cachedRole === 'mayor') {
        AsyncStorage.setItem('role', 'student');
      }
    } catch (err) {
      // console.log(err)
      return;
    }
  }
  async function onGoogleButtonPress(): Promise<LoginMessagePrompt> {
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
      const collectionReference = student
        ? collectionRef('student').where('email', '==', profile?.email)
        : collectionRef('permission')
            .where('email', '==', profile?.email)
            .where('roleInString', '==', 'faculty');
      const snapshotCount = await collectionReference.count().get();
      const count = snapshotCount.data().count;
      if (count === 0) {
        await signout();
        // await AsyncStorage.removeItem(STUDENT_KEY);
        return student ? 'COR_UNREGISTERED' : 'FACULTY_PERMISSION_NULL';
      }
      const src = additionalUserInfo?.profile?.picture;
      const snapshot = await collectionReference.get();
      const result = snapshot.docs[0];
      collectionRef(student ? 'student' : 'permission')
        .doc(result?.id)
        .update({src});
      return 'SUCCESS';
    } catch (err) {
      // console.log(err);
      return 'ERROR';
    }
  }

  useEffect(
    () =>
      auth().onAuthStateChanged(user => {
        handleState('currentUser', user);
        if (user !== null && user.email !== null) {
          OneSignal.login(user.email);
        }
        setState(prevState => ({...prevState, isLoading: false}));
      }),
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signout,
        onGoogleButtonPress,
      }}>
      {state.isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
