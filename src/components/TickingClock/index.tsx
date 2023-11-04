import React, {useState, useEffect} from 'react';
import Text from '../Text';
import {View} from 'react-native';
import type {TickingClockProps} from './types';

const TickingClock = ({expiration, title}: TickingClockProps) => {
  const currentDate = new Date();
  currentDate.setTime(0);
  const [time, setTime] = useState(currentDate);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dateNow = new Date();
      dateNow.setTime(expiration - dateNow.getTime());
      setTime(dateNow);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const date = time.getDate() - 1;
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <View className="w-1/3 border bg-paper p-2">
      <Text className="font-bold capitalize text-black">{title}</Text>
      <View className="flex-row">
        <Text>{date < 10 ? `0${date}` : date}:</Text>
        <Text>{hours < 10 ? `0${hours}` : hours}:</Text>
        <Text>{minutes < 10 ? `0${minutes}` : minutes}:</Text>
        <Text>{seconds < 10 ? `0${seconds}` : seconds}</Text>
      </View>
    </View>
  );
};

export default TickingClock;
