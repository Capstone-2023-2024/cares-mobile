import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Chats = () => {
  const handleChatPress = () => {
    // Handle chat item press
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.inboxItem} onPress={handleChatPress}>
          <Text style={styles.inboxText}>Chat 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inboxItem} onPress={handleChatPress}>
          <Text style={styles.inboxText}>Chat 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inboxItem} onPress={handleChatPress}>
          <Text style={styles.inboxText}>Chat 3</Text>
        </TouchableOpacity>
        {/* Add more chat items as needed */}
      </View>
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Chat Title</Text>
        {/* Main chat content */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background color
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inboxItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0', // Light gray inbox item color
  },
  inboxText: {
    fontSize: 16,
    color: '#424242', // Dark gray text color
  },
  chatContainer: {
    flex: 3,
    backgroundColor: '#FFFFFF', // White background color
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#424242', // Dark gray text color
  },
});

export default Chats;
