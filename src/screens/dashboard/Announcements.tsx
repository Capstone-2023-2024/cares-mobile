import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {useContent} from '~/contexts/ContentContext';
import {announcementPreview1} from '~/utils/imagePaths';
import type {AnnouncementType} from 'cics-mobile-client/../shared/types';
import {useNavigation} from '@react-navigation/native';
import {Text} from '~/components';
import {retrieveImageFBStorage} from '../../../../shared/images';

interface ContainerType extends AnnouncementType {
  single?: boolean;
}

const Announcements = () => {
  const {announcement} = useContent();
  const {getState} = useNavigation();
  const routes = getState().routes;
  const params: string | undefined = routes[routes.length - 1]?.params;
  const paramsExist = typeof params === 'string';

  return (
    <View className="my-auto h-full">
      <Text className="text-center text-4xl text-black">Announcements</Text>
      <ScrollView className="h-full" scrollEnabled={!paramsExist}>
        {[
          ...(paramsExist
            ? announcement.filter(({docId}) => docId === params)
            : announcement),
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
    <View className={`${viewStyle} shadow-sm`}>
      {!photoUrl ? (
        <View className="h-32 w-full bg-primary" />
      ) : (
        <Image
          className="h-2/3"
          resizeMode="contain"
          source={announcementPreview1}
          src={retrieveImageFBStorage(photoUrl)}
        />
      )}
      <View className="mx-auto w-11/12 p-2 shadow-sm">
        <Text className="mb-2 text-xl font-black capitalize text-primary">{`${department} department`}</Text>
        <Text className="text-black">{message}</Text>
      </View>
    </View>
  );
};

export default Announcements;
