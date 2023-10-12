import {View, Image} from 'react-native';
import React from 'react';
import {useAuth} from '~/contexts/AuthContext';
import {UserSvg} from '~/utils/image';

const ProfilePicture = () => {
  const DIMENSION = 80;
  const {currentUser} = useAuth();
  const initialUserLink = '~/assets/error.svg';

  return (
    <View className="h-12 w-12 overflow-hidden rounded-full border-2 border-black">
      {currentUser === null ? (
        <UserSvg />
      ) : (
        <Image
          alt=""
          className="h-full w-full"
          source={require(initialUserLink)}
          src={currentUser.photoURL ?? ''}
          width={DIMENSION}
          height={DIMENSION}
        />
      )}
    </View>
  );
};

export default ProfilePicture;
