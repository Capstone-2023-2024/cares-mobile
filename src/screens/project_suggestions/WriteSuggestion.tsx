import React, {useState} from 'react';
import {Alert, Image, Text, TextInput, View} from 'react-native';
import Background from '~/components/Background';
import {Button} from '~/components/Button';
import {Heading} from '~/components/Heading';
import {useNav} from '~/contexts/NavigationContext';

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
      <Background>
        <View>
          <View className="mb-2">
            <Image className="h-8 w-8" source={write} />
            <Heading>Write your suggestion</Heading>
          </View>
          <View className="mb-2">
            <TextInput
              className="rounded-full bg-white"
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
          <View className="w-1/3 self-center">
            <Button onPress={handleSubmission}>Submit</Button>
          </View>
        </View>
      </Background>
    </View>
  );
};

export default SuggestionPage;
