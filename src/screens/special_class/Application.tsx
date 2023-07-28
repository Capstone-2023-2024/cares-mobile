import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';

const bsu = '~/assets/bsu.png';
const user = '~/assets/user.png';
const messages = '~/assets/messages.png';
const remove = '~/assets/remove.png';
const file = '~/assets/file.png';

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
      <View className="p-4">
        <Text className="mb-4 text-2xl font-bold">
          Special Class Application
        </Text>

        <Text className="mb-2 text-xl font-bold">
          Choose the subject you want to apply (Maximum of three)
        </Text>

        <View className="mb-4">
          <TouchableOpacity
            className={`mb-2 rounded bg-gray-300 px-4 py-2 ${
              selectedSubjects.includes('IT302') && 'bg-gray-700 text-white'
            }`}
            onPress={() => handleSubjectSelection('IT302')}>
            <Text
              className={`text-base ${
                selectedSubjects.includes('IT302') && 'text-white'
              }`}>
              IT302
            </Text>
          </TouchableOpacity>
          {/* Add more subject buttons similarly */}
        </View>

        <Text className="mb-2 text-xl font-bold">Upload E-Signature</Text>

        <View className="mb-4">
          <TouchableOpacity
            className="flex-row items-center rounded border border-black p-4"
            onPress={handleFileUpload}>
            {fileUri ? (
              <>
                <Text className="mr-2 flex-1">{fileUri}</Text>
                <TouchableOpacity className="p-2" onPress={handleFileRemove}>
                  <Image source={require(remove)} className="h-6 w-6" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image source={require(file)} className="mr-2 h-6 w-6" />
                <Text className="text-base">Upload a File</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="self-center rounded bg-gray-500 px-4 py-2"
          onPress={handleSubmit}>
          <Text className="font-bold text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SpecialClassApplication;
