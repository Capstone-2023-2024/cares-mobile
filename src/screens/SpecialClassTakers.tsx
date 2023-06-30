import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const SpecialClassTakers = ({ navigation }) => {
  const subjects = ['IT302', 'CAP301', 'IT308', 'IT309', 'IT310', 'IT311', 'IT312'];

  const [students, setStudents] = useState([
    ['Jolly Bee', 'Pogi Ko', '', '', 'Quack Frog', 'Kroak Goose', 'Johnny Shawty'], // Row 1
    ['Joy Yang', 'Kuala Express', '', '', '', '', ''], // Row 2
    ['', 'Meow Dog', '', '', '', '', ''], // Row 3
    ['', '', '', '', '', '', ''], // Row 4
    ['', '', '', '', '', '', ''], // Row 5
    ['', '', '', '', '', '', ''], // Row 6
    ['', '', '', '', '', '', ''], // Row 7
  ]);

  const renderHeader = () => (
   
      <View style={styles.subjectHeader}>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.subjectCell}>
            <Text style={styles.subjectHeaderText}>{subject}</Text>
          </View>
        ))}
      </View>
    
  );

  const renderTable = () => (
    <View style={styles.table}>
      {students.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((student, columnIndex) => (
            <View key={columnIndex} style={styles.cell}>
              <Text style={styles.cellText}>{student}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const handleApplyNow = () => {
    navigation.navigate('SpecialClassApplication');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
         <Image
          source={require('./bsu.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.BSU}>HITES</Text>
        <TouchableOpacity style={styles.userIcon}>
          <Image
            source={require('./user.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.messagesIcon}>
          <Image
            source={require('./messages.png')}
          />
        </TouchableOpacity>
      </View>
  
      {renderHeader()}
      {renderTable()}

      <TouchableOpacity style={styles.applyNowButton} onPress={handleApplyNow}>
        <Text style={styles.applyNowButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    zIndex: 1,
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
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  subjectCell: {
    flex: 1,
  },
  subjectHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  cellText: {
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  applyNowButton: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  applyNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SpecialClassTakers;