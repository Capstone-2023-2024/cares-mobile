import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';

const Debug = () => {
  const usersCollection = firestore().collection('Users');

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          usersCollection.add({
            name: 'Andrei',
          })
        }
        className="bg-yellow-400 hover:bg-green-400">
        <Text>Debug</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Debug;
