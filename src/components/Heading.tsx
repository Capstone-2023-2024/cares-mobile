import React, {type ReactNode} from 'react';
import {Text} from '~/components';

export const Heading = ({children}: {children: ReactNode}) => {
  return (
    <Text className="mb-2 text-center text-3xl font-semibold capitalize text-black">
      {children}
    </Text>
  );
};
