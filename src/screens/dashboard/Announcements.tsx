import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';

const Announcements = () => {
  const renderAnnouncements = () => {
    const ovalsAnnc = [];

    for (let l = 0; l < 3; l++) {
      ovalsAnnc.push(
        <View className="mb-[5%] border-b-2" key={l}>
          <Image
            className="top-[2%] h-64 w-full"
            source={require('~/assets/Image.png')}
          />
          <Text className="mx-[5%] mt-[10%] text-xl font-bold text-red-900">
            {' '}
            Faculty Evaluation{'\n'}
          </Text>
          <Text className="-mt-[3%] mb-[5%] ml-[6%] mr-[5%] text-sm text-black">
            Heads up, future engineers!As per Office Memorandum from the Office
            of the Director for Administrative and Management Services Division.
            {'\n'}
            {'\n'}
            As the semester draws to a close, we would like to remind you that
            your feedback is invaluable to us. Your opinions and perspectives
            are crucial in helping us evaluate our faculty and improve the
            quality of education we provide. We would like to invite you to
            participate in our faculty evaluation process. This process involves
            completing an anonymous survey that will be used to evaluate each
            faculty member's performance over the course of the semester. Your
            feedback will be used to identify strengths and areas for
            improvement, and to help us make informed decisions about our
            faculty.{'\n'}
            {'\n'}
            The survey will cover a range of toassets, including the faculty
            member's communication skills, course content, availability and
            responsiveness, and overall effectiveness in teaching. Your
            responses will be confidential, and will not be shared with the
            faculty member in question. Please take the time to provide honest
            and thoughtful feedback. Your feedback is critical in helping us to
            maintain high standards of education and to continuously improve the
            quality of our programs. The survey will be available from May 15,
            2023 to May 18, 2023 through the student portal.{'\n'}
            {'\n'}
            Thank you for your participation in this important process.
          </Text>
        </View>,
      );
    }

    return ovalsAnnc;
  };

  return (
    <ScrollView>
      <Text className="mt-3 items-center text-center text-4xl text-black">
        Announcements
      </Text>
      {renderAnnouncements()}
    </ScrollView>
  );
};

export default Announcements;
