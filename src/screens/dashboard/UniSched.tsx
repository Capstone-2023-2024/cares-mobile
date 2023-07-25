import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {Pin} from '~/utils/svgIcons';
// const pin = '~/assets/pin.png';

const UniSched = () => {
  return (
    <ScrollView>
      <View style={styles.containerInfo}>
        <Text style={styles.Text}>University Schedule</Text>
      </View>
      <View style={styles.containerCalendar}>
        <Calendar />
      </View>
      <View>
        <Text style={styles.TextTitle}>
          <Pin />
          {/* <Image style={styles.pinImage} source={require(pin)} /> Final */}
          Examination (Non-graduating Students)
        </Text>
        <Text style={styles.TextParagraph}>
          Attention IT Students{'\n'}
          {'\n'}
          We want to remind you that your departmental exams are approaching
          (May 8 - 10, 2023) and it is essential to start preparing. Please take
          note of your assigned proctor per section, as they will be responsible
          for overseeing your exam and ensuring its fairness. In line with this,
          exact date and time of every subject is also provided.{'\n'}
          {'\n'}
          If you have any inquiries or concerns, please do not hesitate to reach
          out to your student leaders, adviser or professors.{'\n'}
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

const styles = StyleSheet.create({
  containerInfo: {
    alignItems: 'center',
  },
  Text: {
    fontSize: 40,
    color: 'black',
    textAlign: 'justify',
  },
  pinImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  containerCalendar: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    borderWidth: 1,
  },
  TextTitle: {
    fontSize: 20,
    color: 'maroon',
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '6%',
    marginRight: '5%',
  },
  TextParagraph: {
    fontSize: 15,
    color: 'black',
    marginTop: '5%',
    marginLeft: '6%',
    marginRight: '5%',
    marginBottom: '5%',
  },
});

export default UniSched;
