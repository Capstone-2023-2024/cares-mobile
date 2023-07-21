import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Special Class Application</Text>

        <Text style={styles.subTitle}>
          Choose the subject you want to apply (Maximum of three)
        </Text>

        <View style={styles.formItem}>
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubjects.includes('IT302') &&
                styles.selectedSubjectButton,
            ]}
            onPress={() => handleSubjectSelection('IT302')}>
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubjects.includes('IT302') && {color: 'white'},
              ]}>
              IT302
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubjects.includes('CAP301') &&
                styles.selectedSubjectButton,
            ]}
            onPress={() => handleSubjectSelection('CAP301')}>
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubjects.includes('CAP301') && {color: 'white'},
              ]}>
              CAP301
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubjects.includes('IT308') &&
                styles.selectedSubjectButton,
            ]}
            onPress={() => handleSubjectSelection('IT308')}>
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubjects.includes('IT308') && {color: 'white'},
              ]}>
              IT308
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubjects.includes('IT309') &&
                styles.selectedSubjectButton,
            ]}
            onPress={() => handleSubjectSelection('IT309')}>
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubjects.includes('IT309') && {color: 'white'},
              ]}>
              IT309
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubjects.includes('IT310') &&
                styles.selectedSubjectButton,
            ]}
            onPress={() => handleSubjectSelection('IT310')}>
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubjects.includes('IT310') && {color: 'white'},
              ]}>
              IT310
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubjects.includes('IT311') &&
                styles.selectedSubjectButton,
            ]}
            onPress={() => handleSubjectSelection('IT311')}>
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubjects.includes('IT311') && {color: 'white'},
              ]}>
              IT311
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubjects.includes('IT312') &&
                styles.selectedSubjectButton,
            ]}
            onPress={() => handleSubjectSelection('IT312')}>
            <Text
              style={[
                styles.subjectButtonText,
                selectedSubjects.includes('IT312') && {color: 'white'},
              ]}>
              IT312
            </Text>
          </TouchableOpacity>

          <Text style={styles.subTitle}>Upload E-Signature</Text>
        </View>

        <View style={styles.formItem}>
          <TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload}>
            {fileUri ? (
              <>
                <Text style={styles.uploadedFileName}>{fileUri}</Text>
                <TouchableOpacity
                  style={styles.removeFileButton}
                  onPress={handleFileRemove}>
                  <Image
                    source={require(remove)}
                    style={styles.removeFileIcon}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image source={require(file)} style={styles.fileIcon} />
                <Text style={styles.uploadText}>Upload a File</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 10,
  },
  logo: {
    width: 75,
    height: '75%',
  },
  BSU: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 10,
  },
  userIcon: {
    top: -5,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
    width: 35,
    height: 35,
  },
  messagesIcon: {
    top: -5,
    alignItems: 'center',
    marginRight: 10,
    width: 35,
    height: 35,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formItem: {
    marginBottom: 16,
  },
  subjectButton: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: 'black', // Original text color
  },
  subjectButtonText: {
    fontSize: 16,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadedFileName: {
    flex: 1,
    marginRight: 8,
  },
  removeFileButton: {
    padding: 8,
  },
  removeFileIcon: {
    width: 24,
    height: 24,
  },
  fileIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  uploadText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedSubjectButton: {
    backgroundColor: 'gray',
    color: 'white', // Text color when selected
  },
});

export default SpecialClassApplication;