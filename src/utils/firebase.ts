import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import type {CollectionPathType} from '@cares/common/types/firebase';
import type {StudentNameResultProps} from '@cares/common/types/user';

const app = firebase.app();
const arrayUnion = (data: any) =>
  firebase.firestore.FieldValue.arrayUnion(data);
const increment = (data: number) =>
  firebase.firestore.FieldValue.increment(data);

const firestoreApp = firestore(app);
const collectionRef = (path: CollectionPathType) =>
  firestoreApp.collection(path);

const validateEmail = (email: string) => {
  const bulsuRegex = /^[a-z]+(\.[a-z]+)*@bulsu\.edu\.ph$/;
  return bulsuRegex.test(email);
};

function validateEmailWithCOR(result: StudentNameResultProps) {
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

export {
  arrayUnion,
  increment,
  firestoreApp,
  collectionRef,
  validateEmail,
  validateEmailWithCOR,
};
