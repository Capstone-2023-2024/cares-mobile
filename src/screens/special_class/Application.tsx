import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';

const remove = require('~/assets/remove.png');
const file = require('~/assets/file.png');

const SpecialClassApplication = () => {
  const {navigateTo} = useNav();
  const [fileUri, setFileUri] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  function handleFileUpload() {
    // Logic to handle file upload
    console.log('File uploaded');
  }

  function handleFileRemove() {
    // Logic to remove the uploaded file
    setFileUri(null);
  }

  const handleSubjectSelection = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
    } else {
      if (selectedSubjects.length < 3) {
        setSelectedSubjects([...selectedSubjects, subject]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedSubjects.length === 0) {
      // Show a pop-up to notify the user to select at least 1 subject
      Alert.alert('Error', 'Please select at least 1 subject');
    } else {
      // Logic to handle form submission
      console.log('Form submitted');
      navigateTo('Special Class Request Page');
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="mt-7 p-4">
        <Text className="mb-4 text-2xl font-bold">
          Special Class Application
        </Text>

        <Text className="mb-2 text-lg font-bold">
          Choose the subject you want to apply (Maximum of three)
        </Text>

        <View className="mb-4">
          {['IT302', 'CAP301', 'IT308', 'IT309', 'IT310', 'IT311', 'IT312'].map(
            subject => (
              <TouchableOpacity
                key={subject}
                className={`mb-2 p-2 ${
                  selectedSubjects.includes(subject)
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-black'
                } items-center rounded-md`}
                onPress={() => handleSubjectSelection(subject)}>
                <Text
                  className={
                    selectedSubjects.includes(subject)
                      ? 'text-white'
                      : 'text-black'
                  }>
                  {subject}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <Text className="mb-2 text-lg font-bold">Upload E-Signature</Text>

        <View className="mb-4">
          <TouchableOpacity
            className="flex-row items-center rounded-md border border-black p-4"
            onPress={handleFileUpload}>
            {fileUri ? (
              <>
                <Text className="mr-2 flex-1">{fileUri}</Text>
                <TouchableOpacity className="p-2" onPress={handleFileRemove}>
                  <Image source={remove} className="h-6 w-6" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image source={file} className="mr-2 h-6 w-6" />
                <Text className="text-base">Upload a File</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-4 self-center rounded-md bg-gray-600 px-4 py-2"
          onPress={handleSubmit}>
          <Text className="font-bold text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SpecialClassApplication;
