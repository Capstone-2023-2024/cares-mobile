import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {ResultType} from 'cics-mobile-client/../../shared/types';

export type FirestoreCollectionPath =
  | 'chat'
  | 'announcement'
  | 'about'
  | 'student'
  | 'faculty';

const app = firebase.app();

export const firestoreApp = firestore(app);
export const collectionRef = (path: FirestoreCollectionPath) =>
  firestoreApp.collection(path);

export const validateEmail = (email: string) => {
  const bulsuRegex = /^[a-z]+(\.[a-z]+)*@bulsu\.edu\.ph$/;
  return bulsuRegex.test(email);
};

export function validateEmailWithCOR(result: ResultType) {
  const {name, type} = result;
  const lastNameEndex = name.indexOf(',') ?? NaN;
  const initialDotStart = name.indexOf('.') ?? NaN;
  let middleInitial = name
    .substring(initialDotStart - 1, initialDotStart)
    .trim()
    .toLowerCase();
  const firstName = name
    .substring(lastNameEndex + 1, initialDotStart - 1)
    .trim()
    .toLowerCase();
  const lastName = name.substring(0, lastNameEndex).trim().toLowerCase();
  const initialDotEnd = name.lastIndexOf('.') ?? NaN;
  if (initialDotEnd !== initialDotStart) {
    middleInitial = name.substring(initialDotStart - 1, initialDotEnd);
  }

  if (type === 'first') {
    return firstName;
  } else if (type === 'last') {
    return lastName;
  } else if (type === 'initial') {
    return middleInitial;
  }
  return `${firstName.replace(
    / /g,
    '',
  )}.${lastName}.${middleInitial}@bulsu.edu.ph`;
}
