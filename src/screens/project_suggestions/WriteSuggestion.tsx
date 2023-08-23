import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';
import BackHeader from '~/components/BackHeader';
import {useNav} from '~/contexts/NavigationContext';
import {Text} from '~/components';

const write = require('~/assets/icons/writing.png');
const bsu = require('~/assets/BSUBACKGROUND.png');

const SuggestionPage = () => {
  const {navigateTo} = useNav();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = text => {
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
      navigateTo('ProjectSuggestions'); // Assuming 'ProjectSuggestions' is the destination route after submission
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={bsu} // Replace with your background image path
        style={styles.backgroundImage}
        imageStyle={{opacity: 0.7}} // Set the opacity of the background image
      >
        <BackHeader />
        <View style={styles.suggestionContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 25,
              width: '90%',
              padding: 10,
            }}>
            <Image
              style={{width: 40, height: 40, alignSelf: 'center'}}
              source={write}
            />
            <Text
              style={{
                textAlign: 'center',
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
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmission}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                padding: 7,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: windowWidth,
    height: windowHeight,
  },
  suggestionContainer: {
    marginTop: '3%',
    padding: 10,
  },
  input: {
    width: '100%',
    height: 200,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginTop: '5%',
    alignSelf: 'center',
    width: '95%', // Adjust the width as needed
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
  },
});

export default SuggestionPage;
