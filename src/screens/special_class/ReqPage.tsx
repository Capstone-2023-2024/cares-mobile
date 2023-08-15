import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ReqPage = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('~/assets/file-sent.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text className="mb-4 text-2xl font-bold">
          Special Class request submitted
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 4,
  },
});

export default ReqPage;
