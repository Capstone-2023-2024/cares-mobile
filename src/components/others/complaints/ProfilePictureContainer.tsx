import {imageDimension} from '@cares/common/utils/media';
import React, {type ReactNode} from 'react';
import {Image, View} from 'react-native';
import Text from '~/components/Text';

interface ProfilePictureProps {
  src: string;
}
interface ProfilePictureContainerProps extends ProfilePictureProps {
  renderCondition?: boolean;
  children: ReactNode;
}
const ProfilePicture = ({src}: ProfilePictureProps) => {
  const DIMENSION = 46;

  if (src.trim() === '') {
    return (
      <View className="h-16 w-16 self-center overflow-hidden rounded-full bg-primary">
        <Text className="text-primary">avatar</Text>
      </View>
    );
  }

  return (
    <View className="h-16 w-16 self-center px-1">
      <Image
        src={src}
        alt="avatar"
        source={require('~/assets/error.svg')}
        className="h-full w-full rounded-full"
        {...imageDimension(DIMENSION)}
      />
    </View>
  );
};
const ProfilePictureContainer = ({
  renderCondition,
  children,
  ...rest
}: ProfilePictureContainerProps) => {
  const additionalStyle = renderCondition ? 'flex-row-reverse' : 'flex-row';
  return (
    <View
      className={`${additionalStyle} flex items-start gap-2 rounded-lg p-2`}>
      <ProfilePicture {...rest} />
      {children}
    </View>
  );
};

export default ProfilePictureContainer;
