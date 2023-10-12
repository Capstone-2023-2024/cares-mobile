import React from 'react';
import {TextInput} from 'react-native';
import type {TextfieldProps} from './types';

export const Textfield = (props: TextfieldProps) => {
  return (
    <TextInput
      className="rounded-full bg-primary/20 px-4 shadow-sm"
      {...props}
    />
  );
};
