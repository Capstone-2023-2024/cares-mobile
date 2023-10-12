import React, {useState} from 'react';
import {Alert, TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import BackHeader from '~/components/BackHeader';
import Background from '~/components/Background';
import {useNav} from '~/contexts/NavigationContext';

const WriteSuggestions = () => {
  const {handleNavigation} = useNav();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    // Limit the input to 150 characters
    if (text.length <= 150) {
      setInputValue(text);
    }
  };

  const handleSubmission = () => {
    if (inputValue.trim().length < 70) {
      Alert.alert(
        'Input Error',
        'Please enter a suggestion with at least 70 characters.',
      );
    } else {
      // Add your submission logic here
      // For this example, we'll just show an alert message
      Alert.alert('Suggestion submitted', 'Thank you for your suggestion!');
      handleNavigation('ProjectSuggestions'); // Assuming 'ProjectSuggestions' is the destination route after submission
    }
  };

  return (
    <View className="flex-1">
      <Background>
        <BackHeader />
        <View className="mt-4 p-2">
          <View className="w-5/6 flex-row self-center rounded-md bg-white p-2">
            {/* <Image
            style={{ width: 40, height: 40, alignSelf: 'center' }}
            source={write}
          /> */}
            <Text className="text-center text-xl font-semibold text-red-300">
              Write your suggestion
            </Text>
          </View>
          <View className="mt-4 w-5/6 self-center">
            <TextInput
              className="h-64 w-full rounded-sm border bg-white p-2 text-lg text-black"
              placeholder="What's on your mind?"
              textAlignVertical="top"
              multiline={true}
              value={inputValue}
              onChangeText={handleInputChange}
              maxLength={150} // Set the maximum character limit to 150
            />
            <View className="absolute bottom-6 right-6">
              <Text className="text-lg font-semibold text-black opacity-50">
                {inputValue.length}/150
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="boder mt-4 h-24 w-1/4 self-center rounded-sm bg-red-300"
            onPress={handleSubmission}>
            <Text className="p-2 text-center font-semibold text-white">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Background>
    </View>
  );
};

export default WriteSuggestions;
