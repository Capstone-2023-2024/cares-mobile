import React from 'react';
import Text from '~/components/Text';
import type {HeadingProps} from './types';

const Heading = ({children}: HeadingProps) => {
  return (
    <Text className="mb-2 text-center text-3xl font-semibold text-black">
      {children}
    </Text>
  );
};

export default Heading;
