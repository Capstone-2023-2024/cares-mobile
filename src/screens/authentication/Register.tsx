import AsyncStorage from '@react-native-async-storage/async-storage';
import {icon, imageDimension} from 'cics-mobile-client/../../shared/images';
import {type StudInfoSortedType} from 'cics-mobile-client/../../shared/types';
import React, {useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Extractor} from 'react-native-pdf-extractor';
import {type Transient} from 'react-native-pdf-extractor/src/types';
import {Text} from '~/components';
import {Button, Link} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {useContent} from '~/contexts/ContentContext';
import {useNav} from '~/contexts/NavigationContext';
import {Error} from '~/utils/error';
import {
  collectionRef,
  validateEmail,
  validateEmailWithCOR,
} from '~/utils/firebase';

interface FileType {
  uri: string;
  name: string | null;
  size: number | null;
}

const Register = () => {
  const milToKB = 1000;
  const {navigateTo} = useNav();
  const {handleStudentInfo, studentInfo} = useContent();
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<FileType | null>(null);
  const CORPatterns = [
    /^[0-9]{10}$/,
    /College of [\"Information and Communications Technology\"-\"Industrial Technology\"-\"Education\"-\"Engineering\"]+/,
    /^[A-Za-z0-9]+[^\d]+[\d]+-[\d]+$/,
    /^[A-Z]*, [^0-9]*\.$/,
    /Bachelor of Science in [\"Information Technology\"]+$/,
    /^[\"M\"-\"F\"]$/,
    /^[\"N/A\"-\"Web and Mobile\"]*$/,
    /[A-Z]* \([^A-Za-z]*\)$/,
    /^[0-9]{2}$/,
    /^[0-9a-z]* Year$/,
    /^Official Receipt: [^/d]*$/,
  ];
  const CORPatternsId = [
    'studentNo',
    'college',
    'schoolYear',
    'name',
    'course',
    'gender',
    'major',
    'curriculum',
    'age',
    'yearLevel',
    'scholarship',
  ];

  async function handleCORUpload() {
    try {
      const {uri, size, name, type} = await DocumentPicker.pickSingle();
      // TODO: convert octet-stream to pdf in Android API 24
      // const file = await RNFS.readFile(uri);
      // Alert.alert(file);
      if (type === 'application/pdf') {
        return setFile({uri, size, name});
      }
      Alert.alert('File is not a PDF file');
    } catch (err) {
      const {code} = err as Error;
      if (code !== 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert(`File is not a valid PDF file: ${code}`);
        return setFile(null);
      }
    }
  }

  async function handleRegisterPress() {
    const doc = await collectionRef('student')
      .where('email', '==', email)
      .count()
      .get();
    const {count} = doc.data();
    const condition = count > 0;

    if (!email) {
      Alert.alert('Empty Email', 'Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      return Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.',
      );
    }
    condition && Alert.alert("You're already registered!\nPlease login");
    navigateTo(condition ? 'Login' : 'CreatePass');
  }

  async function handlePDFResult(data: Transient | null) {
    if (data !== null) {
      let idHolder: Partial<StudInfoSortedType> = {};
      const bsuPortal = 'https://bulsu.priisms.online';
      const uniqueTextArray = Array.from(new Set(data.text));

      uniqueTextArray.forEach(text => {
        if (typeof text === 'string') {
          CORPatterns.forEach((regex, regexIndex) => {
            const propName = CORPatternsId[regexIndex];
            if (regex.test(text)) {
              return (idHolder = {...idHolder, [propName ?? '']: text});
            }
          });
        }
      });

      const result =
        Object.keys(idHolder).length >= CORPatternsId.length &&
        (idHolder as Required<StudInfoSortedType>);
      if (!result) {
        return Alert.alert(`Invalid COR data. Acquire here: ${bsuPortal}`);
      }

      const {name} = result;
      const emailFromCOR = validateEmailWithCOR(!name ? {name: ''} : {name});
      if (email !== emailFromCOR) {
        setFile(null);
        return Alert.alert('Unauthorized access of email');
      }
      await AsyncStorage.setItem(email, JSON.stringify(result));
      handleStudentInfo(result);
    }
  }

  return (
    <View className="h-2/3 justify-center">
      <Heading>Sign Up</Heading>
      <Extractor
        onResult={handlePDFResult}
        patterns={CORPatterns}
        uri={file?.uri}
      />
      <View className="mb-2 w-2/3 self-center">
        <Textfield
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="mb-2 flex-row justify-center gap-2">
        <Text className="text-xs text-black">Use your BULSU Email</Text>
        <Text className="text-xs text-black">
          (e.g. juan.delacruz.xyz@bulsu.edu.ph)
        </Text>
      </View>
      <TouchableOpacity
        className="mx-auto mb-2 w-2/3 items-center rounded-xl border-2 border-dashed py-12"
        onPress={handleCORUpload}>
        {file && <Text className="mb-2 text-xs">Change COR</Text>}
        <View className="flex-row gap-2">
          <Image
            source={require('~/assets/icons/pdfFilled.png')}
            {...imageDimension(icon)}
          />
          {file && (
            <View>
              <Text className="font-semibold">{`${file.name?.substring(
                0,
                8,
              )}...`}</Text>
              <Text>{`${Math.floor(
                file.size ? file.size / milToKB : NaN,
              )} KB`}</Text>
            </View>
          )}
        </View>
        {!file && <Text className="text-xs">Upload your COR here</Text>}
      </TouchableOpacity>
      <View className="mb-2 w-1/3 self-center">
        <Button
          onPress={handleRegisterPress}
          disabled={Object.keys(studentInfo).length === 0}>
          Register
        </Button>
      </View>
      <View className="flex-row justify-center gap-2">
        <Text className="text-center text-xs">Already have an account? </Text>
        <Link
          textStyle="text-primary/60 text-center"
          onPress={() => navigateTo('Login')}>
          Login here
        </Link>
      </View>
    </View>
  );
};

export default Register;
