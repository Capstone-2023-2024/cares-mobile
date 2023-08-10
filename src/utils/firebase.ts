import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const app = firebase.app();

export const firestoreApp = firestore(app);
export const authApp = auth(app);
