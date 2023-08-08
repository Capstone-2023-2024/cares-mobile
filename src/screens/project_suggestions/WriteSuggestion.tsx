import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackHeader from '~/components/headers/BackHeader';
import {useNav} from '~/contexts/NavigationContext';
import {bsuBg} from '~/utils/imagePaths';

const write = require('~/assets/icons/writing.png');

const SuggestionPage = () => {
  const {navigateTo} = useNav();
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(text: string) {
    const limit = 75;
    if (text.length <= limit) {
      setInputValue(text);
    }
  }

  function handleSubmission() {
    const limit = 75;
    if (inputValue.trim().length < limit) {
      Alert.alert(
        'Input Error',
        'Please enter a suggestion with at least 70 characters.',
      );
    } else {
      Alert.alert('Suggestion submitted', 'Thank you for your suggestion!');
      navigateTo('ProjectSuggestions');
    }
  }

  return (
    <View>
      <ImageBackground source={bsuBg}>
        <BackHeader />
        <View>
          <View>
            <Image source={write} />
            <Text>Write your suggestion</Text>
          </View>
          <View>
            <TextInput
              placeholder="What's on your mind?"
              textAlignVertical="top"
              multiline={true}
              value={inputValue}
              onChangeText={handleInputChange}
              maxLength={150}
            />
            <View>
              <Text>{inputValue.length}/150</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmission}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SuggestionPage;
