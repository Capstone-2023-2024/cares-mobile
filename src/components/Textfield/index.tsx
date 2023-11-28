import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import type {TextfieldProps} from './types';

const Textfield = (props: TextfieldProps) => {
  return (
    <TextInput
      className="rounded-full bg-primary/20 px-4 shadow-sm"
      {...props}
    />
  );
};

export default Textfield;
