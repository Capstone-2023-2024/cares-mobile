import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Pin} from '~/utils/svgIcons';

const UniSched = () => {
  return (
    <ScrollView>
      <View className="items-center">
        <Text className="text-4xl text-black">University Schedule</Text>
      </View>
      <View className="mx-5 mt-5 border-2">
        <Calendar />
      </View>
      <View>
        <Text className="text-maroon mx-6 mb-5 mt-5 text-xl font-bold">
          <Pin />
          Examination (Non-graduating Students)
        </Text>
        <Text className="mx-6 mb-5 text-base text-black">
          Attention IT Students{'\n'}
          {'\n'}
          We want to remind you that your departmental exams are approaching
          (May 8 - 10, 2023) and it is essential to start preparing. Please take
          note of your assigned proctor per section, as they will be responsible
          for overseeing your exam and ensuring its fairness. In line with this,
          the exact date and time of every subject are also provided.{'\n'}
          {'\n'}
          If you have any inquiries or concerns, please do not hesitate to reach
          out to your student leaders, adviser, or professors.{'\n'}
          {'\n'}
          We wish you the best of luck on your upcoming exams and encourage you
          to give it your best effort.{'\n'}
          {'\n'}
          Caption: BSIT Vice Chairperson Pub: CITE Bulsu Bustos Campus
        </Text>
      </View>
    </ScrollView>
  );
};

export default UniSched;
