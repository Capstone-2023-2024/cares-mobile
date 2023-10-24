import {TouchableOpacity, View, ToastAndroid} from 'react-native';
import React from 'react';
import {Text} from '~/components';
import {useNavigation} from '@react-navigation/native';
import {NextSvg} from '~/utils/image';

const ChatNav = () => {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleTicket() {
    ToastAndroid.show(
      'Ticketing concernsm for escalation process',
      ToastAndroid.LONG,
    );
  }

  return (
    <View className="h-16 flex-row items-center bg-paper px-2">
      <TouchableOpacity className="w-10 rotate-180" onPress={handleGoBack}>
        <NextSvg />
      </TouchableOpacity>
      <View className="flex-1 flex-row items-center justify-center">
        <Text className="text-xl text-tertiary">Complaints/Concerns</Text>
        <TouchableOpacity
          onPress={handleTicket}
          className="ml-2 rounded-lg bg-primary/10 p-2 shadow-sm">
          <Text className="text-tertiary">Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatNav;
