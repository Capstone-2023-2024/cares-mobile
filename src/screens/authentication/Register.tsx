import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  PermissionsAndroid,
  type Permission,
} from 'react-native';
import {Button, Link} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {Textfield} from '~/components/Textfield';
import {useNav} from '~/contexts/NavigationContext';
import {validateEmail} from '~/utils/firebase';
import RNFS, {type ReadDirItem} from 'react-native-fs';
import {Error} from '~/utils/error';
import {FlatList} from 'react-native-gesture-handler';
import {Extractor} from 'react-native-pdf-extractor';
import DocumentPicker from 'react-native-document-picker';
import {Transient} from 'react-native-pdf-extractor/src/types';

interface ItemType {
  name: string;
  isFile: boolean;
}

interface RequestPermissionType {
  title: string;
  message: string;
  permission: Permission | null;
}

const Register = () => {
  const {navigateTo} = useNav();
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [fileData, setFileData] = useState('');
  const CORPatterns = [
    /Student No: [0-9]+/,
    /College: College of [\"Information and Communications Technology\"-\"Industrial Technology\"-\"Education\"]+/,
    /School Year: [A-Za-z0-9]+[^\d]+[\d]+-[\d]/,
    /Name:+[^/d]+\./,
    /Program: Bachelor of Science in [\"Information Technology\"]+/,
    /Gender: [\'M\'-\'F\']/,
    /Major: [\"N/A\"-\"Web and Mobile Technology\"]*/,
    /Curriculum:[^/d]*\([^A-Za-z]*\)/,
    /Age:[^A-Za-z]*/,
    /Year Level: [A-Za-z0-9]* Year/,
    /Scholarship Discount:[\"uniFast Scholar\"]*/,
  ];
  const read = PermissionsAndroid.PERMISSIONS
    .READ_EXTERNAL_STORAGE as RequestPermissionType['permission'];
  const write = PermissionsAndroid.PERMISSIONS
    .WRITE_EXTERNAL_STORAGE as RequestPermissionType['permission'];

  async function requestPermission(props: RequestPermissionType) {
    try {
      const {permission, ...rest} = props;
      if (permission) {
        const granted = await PermissionsAndroid.request(permission, {
          ...rest,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
        } else {
          console.log('Permission denied');
        }
      }
    } catch (err) {
      const {code} = err as Error;
      console.log(code);
    }
  }

  async function handleCORUpload() {
    const path = RNFS.DownloadDirectoryPath;
    const fileName = 'test.txt';
    const requests: RequestPermissionType[] = [
      {
        permission: read,
        message: 'Read External',
        title: 'Storage Request',
      },
      {
        permission: write,
        message: 'Write External',
        title: 'Storage Request',
      },
    ];
    try {
      requests.forEach(async request => {
        await requestPermission(request);
      });
      const response = await DocumentPicker.pickSingle();
      setFiles([response.uri]);
    } catch (err) {
      const {code} = err as Error;
      Alert.alert(code);
    }
  }

  function handleRegisterPress() {
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
    navigateTo('CreatePass');
  }

  function renderItem({item, index}: {item: any; index: number}) {
    return (
      <View>
        <Text className="text-lg font-bold">{index}</Text>
        <Item name={item.name} isFile={item.isFile()} />
      </View>
    );
  }

  const Item = ({name, isFile}: ItemType) => {
    const PATH = `${RNFS.DownloadDirectoryPath}/${name}`;
    Alert.alert(PATH);
    return (
      <View>
        <Button
          onPress={async () => {
            try {
              console.log(PATH);
            } catch (err) {
              const {code} = err as Error;
              Alert.alert(code);
            }
          }}>
          Name: {name}
        </Button>
        <Text> {isFile ? 'It is a file' : "It's a folder"}</Text>
      </View>
    );
  };

  return (
    <View className="h-2/3 justify-center">
      {/* <Extractor */}
      <Button
        onPress={() => ToastAndroid.showWithGravity(`${files}`, 4000, 1000)}>
        SHOW
      </Button>
      <Extractor
        onResult={(data: Transient | null) => {
          if (data !== null) {
            data.text?.forEach(text => console.log(text));
          }
        }}
        patterns={CORPatterns}
        uri={files[0]}
      />
      <TouchableOpacity
        className="mx-auto mb-2 w-2/3 rounded-xl border-2 border-dashed py-12"
        onPress={handleCORUpload}>
        <Text className="text-center">Upload your COR here</Text>
      </TouchableOpacity>
      {/* <Heading>Sign Up</Heading>
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
        className="mx-auto mb-2 w-2/3 rounded-xl border-2 border-dashed py-12"
        onPress={handleCORUpload}>
        <Text className="text-center">Upload your COR here</Text>
      </TouchableOpacity>
      <View className="mb-2 w-1/3 self-center">
        <Button onPress={handleRegisterPress}>Register</Button>
      </View>
      <View className="flex-row justify-center gap-2">
        <Text className="text-center text-xs">Already have an account? </Text>
        <Link
          textStyle="text-primary/60 text-center"
          onPress={() => navigateTo('Login')}>
          Login here
        </Link>
      </View> */}
    </View>
  );
};

export default Register;
