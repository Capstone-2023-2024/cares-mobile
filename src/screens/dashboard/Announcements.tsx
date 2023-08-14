import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {useContent} from '~/contexts/ContentContext';
import {announcementPreview1} from '~/utils/imagePaths';
import {AnnouncementType} from '../../../../shared/types';
import {useNavigation} from '@react-navigation/native';

interface ContainerType extends AnnouncementType {
  single?: boolean;
}

const Announcements = () => {
  const {announcements} = useContent();
  const {getState} = useNavigation();
  const routes = getState().routes;
  const params: string | undefined = routes[routes.length - 1]?.params;
  const paramsExist = typeof params === 'string';

  return (
    <View className="h-5/6 bg-yellow-300">
      <Text className="text-center text-4xl text-black">Announcements</Text>
      <ScrollView className="h-full" scrollEnabled={!paramsExist}>
        {[
          ...(paramsExist
            ? announcements.filter(({docId}) => docId === params)
            : announcements),
        ].map(({docId, ...rest}) => {
          return <Container key={docId} {...rest} />;
        })}
      </ScrollView>
    </View>
  );
};

const Container = (props: ContainerType) => {
  const {department, message, photoUrl, single} = props;

  const viewStyle = single ? 'h-full justify-center ' : 'h-[70vh]';

  return (
    <View className={`${viewStyle} bg-green-300 shadow-sm`}>
      {!photoUrl ? (
        <View className="h-32 w-full bg-primary"></View>
      ) : (
        <Image className="h-2/3" source={announcementPreview1} src={photoUrl} />
      )}
      <View className="mx-auto w-11/12 bg-blue-400">
        <Text className="mb-2 text-xl font-black capitalize text-primary">{`${department} department`}</Text>
        <Text className="text-black">{message}</Text>
      </View>
    </View>
  );
};

export default Announcements;
