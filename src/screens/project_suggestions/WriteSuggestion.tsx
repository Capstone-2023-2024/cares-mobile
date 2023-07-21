import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import BackHeader from '~/components/headers/BackHeader';
import { useNav } from '~/contexts/NavigationContext';

const write = require('~/assets/icons/writing.png');

const SuggestionPage = () => {
  const { navigateTo } = useNav();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    // Limit the input to 150 characters
    if (text.length <= 150) {
      setInputValue(text);
    }
  };

  const handleSubmission = () => {
    if (inputValue.trim().length < 70) {
      Alert.alert('Input Error', 'Please enter a suggestion with at least 70 characters.');
    } else {
      // Add your submission logic here
      // For this example, we'll just show an alert message
      Alert.alert('Suggestion submitted', 'Thank you for your suggestion!');
      navigateTo('ProjectSuggestions'); // Assuming 'ProjectSuggestions' is the destination route after submission
    }
  };

  return (
    <View>
      <BackHeader />
      <View style={styles.suggestionContainer}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Image style={{ width: 40, height: 40, alignSelf: 'center' }} source={write} />
          <Text style={{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: '800',
            color: 'rgb(118, 52, 53)',
          }}>
            Write your suggestion
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            textAlignVertical="top"
            multiline={true}
            value={inputValue}
            onChangeText={handleInputChange}
            maxLength={150} // Set the maximum character limit to 150
          />
          <View style={styles.characterCountContainer}>
            <Text style={styles.characterCountText}>
              {inputValue.length}/150
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', padding: 7 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionContainer: {
    marginTop: '3%',
  },
  input: {
    width: 400,
    height: 200,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    color: 'black',
  },
  inputContainer: {
    marginTop: '5%',
    alignSelf: 'center',
  },
  characterCountContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  characterCountText: {
    opacity: 0.5,
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: '5%',
    width: '20%',
    height: 40,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'rgb(118,52,53)',
  }
});

export default SuggestionPage;
