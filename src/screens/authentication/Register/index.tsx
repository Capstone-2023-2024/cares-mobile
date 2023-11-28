import React, {useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Extractor} from 'react-native-pdf-extractor';
import type {Transient} from 'react-native-pdf-extractor/src/types';
import {Text} from '~/components';
import {Button, Link} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {useNav} from '~/contexts/NavigationContext';
import type {Error} from '~/types/error';
import type {StudentCORProps} from '~/types/student';
import {collectionRef} from '~/utils/firebase';
import type {CORPatternsProps, FileType} from './types';

const Register = () => {
  const milToKB = 1000;
  const {handleNavigation} = useNav();
  const [studentInfo, setStudentInfo] = useState<StudentCORProps | null>(null);
  const [email, setEmail] = useState('');
  const emailValidation = email.trim() === '';
  const [file, setFile] = useState<FileType | null>(null);
  const CORPatterns: CORPatternsProps[] = [
    {name: 'studentNo', regex: /^[0-9]{10}$/},
    {
      name: 'college',
      regex:
        /College of ["Information and Communications Technology"-"Industrial Technology"-"Education"-"Engineering"]+/,
    },
    {name: 'schoolYear', regex: /^[A-Za-z0-9]+[^\d]+[\d]+-[\d]+$/},
    {name: 'name', regex: /^[A-Z]*([A-Z]+)*, [^0-9]*[A-Z]/},
    {
      name: 'course',
      regex: /Bachelor of Science in ["Information Technology"]+$/,
    },
    {name: 'gender', regex: /^["M"-"F"]$/},
    {name: 'major', regex: /^["N/A"-"Web and Mobile"]*$/},
    {name: 'curriculum', regex: /[A-Z]* \([^A-Za-z]*\)$/},
    {name: 'age', regex: /^[0-9]{2}$/},
    {name: 'yearLevel', regex: /^[0-9a-z]* Year$/},
    {name: 'scholarship', regex: /^Official Receipt: [^/d]*$/},
  ];

  async function handleCORUpload() {
    try {
      const {uri, size, name, type} = await DocumentPicker.pickSingle();
      // TODO: convert octet-stream to pdf in Android API 24
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
  async function handlePDFResult(data: Transient | null) {
    if (data !== null) {
      let idHolder: Partial<StudentCORProps> = {};
      const bsuPortal = 'https://bulsu.priisms.online';
      const uniqueTextArray = Array.from(new Set(data.text));

      uniqueTextArray.forEach(text => {
        if (typeof text === 'string') {
          CORPatterns.forEach(({regex, name}) => {
            if (regex.test(text)) {
              return (idHolder = {...idHolder, [name ?? '']: text});
            }
          });
        }
      });

      const result =
        Object.keys(idHolder).length >= CORPatterns.length &&
        (idHolder as Required<StudentCORProps>);
      if (result === false) {
        return Alert.alert(`Invalid COR data. Acquire here: ${bsuPortal}`);
      }
      console.log(result)
      const corWithEmail = {...result, email};
      setStudentInfo(corWithEmail);
    }
  }
  async function handleRegisterPress() {
    function reset() {
      setStudentInfo(null);
      handleNavigation('Login');
    }
    if (studentInfo !== null) {
      const result = await collectionRef('student')
        .where('studentNo', '==', studentInfo.studentNo)
        .count()
        .get();
      const count = result.data().count;
      const stringYear = new Date().getFullYear().toString();
      const currentSchoolyear = studentInfo.schoolYear.match(stringYear);
      if (!currentSchoolyear) {
        return Alert.alert('Outdated COR', `Please use your ${stringYear} COR`);
      }
      if (count === 0) {
        await collectionRef('student')
          .doc(studentInfo.studentNo)
          .set({...studentInfo, email, recipient: 'class_section'});
        Alert.alert(
          'Registration succesful!',
          'You may now use your Google BulSU Email to login',
        );
        return reset();
      }
      Alert.alert('Registered!', "You're already registered");
      reset();
    }
  }

  return (
    <View className="h-2/3 justify-center">
      <Heading>COR Registration</Heading>
      <Extractor
        onResult={handlePDFResult}
        patterns={CORPatterns.map(({regex}) => regex)}
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
        disabled={emailValidation}
        className={`${
          emailValidation
            ? 'border-slate-300 bg-slate-200'
            : 'border-dashed border-black bg-transparent'
        } mx-auto mb-2 w-2/3 items-center rounded-xl border-2 py-12 duration-300 ease-in-out`}
        onPress={handleCORUpload}>
        {file && <Text className="mb-2 text-xs">Change COR</Text>}
        <View className="flex-row gap-2">
          <View className="h-8 w-8">
            <Image
              source={require('~/assets/pdfFilled.png')}
              className="h-full w-full"
            />
          </View>
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
        {!file && (
          <Text
            className={`${
              emailValidation ? 'text-slate-300' : 'text-black'
            } text-xs duration-300 ease-in-out`}>
            Upload your COR here
          </Text>
        )}
      </TouchableOpacity>
      <View className="mb-2 w-1/3 self-center">
        <Button
          onPress={() => handleRegisterPress()}
          disabled={Object.keys(studentInfo ?? {}).length === 0}>
          Register
        </Button>
      </View>
      <View className="flex-row justify-center gap-2">
        <Text className="text-center text-xs">Already registered? </Text>
        <Link
          textStyle="text-primary/60 text-center"
          onPress={() => handleNavigation('Login')}>
          Login here
        </Link>
      </View>
    </View>
  );
};

export default Register;
