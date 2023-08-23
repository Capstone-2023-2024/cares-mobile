import {Text as InputField} from 'react-native';
import React from 'react';

interface TextType {
  className?: string;
  children: string;
}

const Text = (props: TextType) => {
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
