import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const app = firebase.app();

export const firestoreApp = firestore(app);
export const authApp = auth(app);

export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@bulsu\.edu\.ph$/;
  return emailRegex.test(email);
};
