import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Text} from '~/components';
import {useContent} from '~/contexts/ContentContext';
import {retrieveImageFBStorage} from '~/utils/image';
import type {ContainerProps} from './types';

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
            ? announcement.filter(({id}) => id === params)
            : announcement),
        ].map(({id, ...rest}) => {
          return <Container key={id} {...rest} />;
        })}
      </ScrollView>
    </View>
  );
};

const Container = (props: ContainerProps) => {
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
          source={require('~/assets/error.svg')}
          src={
            photoUrl !== undefined ? retrieveImageFBStorage(photoUrl ?? '') : ''
          }
        />
      )}
      <View className="mx-auto w-11/12 p-2 shadow-sm">
        <View className="scale-150 flex-row items-center justify-center">
          <Image
            source={require('~/assets/cics_icon.png')}
            className="mr-2 h-8 w-8"
            resizeMode="center"
          />
          <Text className="mb-2 text-xl font-black capitalize text-primary">{`${department} department`}</Text>
        </View>
        <Text className="text-center font-semibold text-black">{message}</Text>
      </View>
    </View>
  );
};

export default Announcements;
