import React from 'react';
import {Text as InputField} from 'react-native';
import type {TextProps} from './types';

const Text = (props: TextProps) => {
  const {className, children, ...rest} = props;
  return (
    <InputField
      className={className === undefined ? 'text-base text-black' : className}
      {...rest}>
      {children}
    </InputField>
  );
};

export default Text;
