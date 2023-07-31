import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  type ImageSourcePropType,
} from 'react-native';
import {announcementPreview1, announcementPreview2} from '~/utils/imagePaths';

interface ContainerType {
  title: string;
  message: string;
  source: ImageSourcePropType;
}

const Announcements = () => {
  const message = `Heads up, future engineers! As per Office Memorandum from the Office of the Director for Administrative and Management Services Division.\n\nAs the semester draws to a close, we would like to remind you that your feedback is invaluable to us. Your opinions and perspectives are crucial in helping us evaluate our faculty and improve the quality of education we provide. We would like to invite you to participate in our faculty evaluation process. This process involves completing an anonymous survey that will be used to evaluate each faculty member's performance over the course of the semester. Your feedback will be used to identify strengths and areas for improvement, and to help us make informed decisions about our faculty.\n\nThe survey will cover a range of toassets, including the facultymember's communication skills, course content, availability and responsiveness, and overall effectiveness in teaching. Your responses will be confidential, and will not be shared with the faculty member in question. Please take the time to provide honest and thoughtful feedback. Your feedback is critical in helping us to maintain high standards of education and to continuously improve the quality of our programs. The survey will be available from May 15, 2023 to May 18, 2023 through the student portal.\n\nThank you for your participation in this important process.`;

  const Container = (props: ContainerType) => {
    const {title, message, source} = props;
    return (
      <View className="h-screen shadow-sm">
        <Image className="h-64 w-full" source={source} />
        <View className="mx-auto w-11/12">
          <Text className="mb-2 text-xl font-black text-primary">{title}</Text>
          <Text className="text-black">{message}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <Text className="text-center text-4xl text-black">Announcements</Text>
      <Container
        title="Faculty Evaluation"
        message={message}
        source={announcementPreview1}
      />
      <Container
        title="Congratulations"
        message={message}
        source={announcementPreview2}
      />
      <Container
        title="Faculty Evaluation"
        message={message}
        source={announcementPreview1}
      />
    </ScrollView>
  );
};

export default Announcements;
