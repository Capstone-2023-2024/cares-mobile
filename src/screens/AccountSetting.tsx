import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const AccountSetting = ({ navigation }: { navigation: any }) => {
  const handleEditPress = () => {
    // Handle edit button press
  };

  const handleLogoutPress = () => {
    // Handle logout button press
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image
          source={require('../assets/profile_picture.png')}
          style={styles.profilePicture}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>Esguerra,               Jao Hendrick M.</Text>
          <Text style={styles.studentNumber}>Student Number: 2020200930</Text>
        </View>
      </View>
      <View style={styles.detailsSection}>
        <Text style={styles.sectionHeader}>Student Details</Text>
        <View style={styles.tableRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>Jao Hendrick</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>Esguerra</Text>
        </View>
        <View style={styles.tableRow}>
            <Text style={styles.label}>Middle Name:</Text>
            <Text style={styles.value}>Magat</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>College:</Text>
            <Text style={styles.value}>CICS</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Year Level:</Text>
            <Text style={styles.value}>4th Year</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>School Year:</Text>
            <Text style={styles.value}>2023-2024</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Curriculum:</Text>
            <Text style={styles.value}>BSIT</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Scholarship/Discount:</Text>
            <Text style={styles.value}>-</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Program</Text>
            <Text style={styles.value}>Information Technology</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Major</Text>
            <Text style={styles.value}>Web and Mobile Development</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Sex</Text>
            <Text style={styles.value}>Male</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>21</Text>
          </View>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background color
    padding: 20,
  },
  profileBox: {
    backgroundColor: '#757575', // Medium gray box color
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row', // Add flexDirection property
    alignItems: 'center', // Add alignItems property
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1, // Take remaining width
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    marginBottom: 10,
  },
  studentNumber: {
    fontSize: 16,
    color: '#FFFFFF', // White text color
  },
  detailsSection: {
    backgroundColor: '#FFFFFF', // White background color
    borderRadius: 10,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {},
  editButton: {
    backgroundColor: '#757575', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#F44646', // Medium gray button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AccountSetting;
