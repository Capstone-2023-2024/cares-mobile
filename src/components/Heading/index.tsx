import React from 'react';
import {Text} from '~/components';
import type {HeadingProps} from './types';

export const Heading = ({children}: HeadingProps) => {
  return (
    <Text className="mb-2 text-center text-3xl font-semibold text-black">
      {children}
    </Text>
  );
};
