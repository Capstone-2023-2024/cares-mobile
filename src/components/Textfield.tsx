import React from 'react';
import {TextInput} from 'react-native';

interface TextfieldType {
  placeholder?: string;
  value?: any;
  keyboardType?: 'email-address';
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export const Textfield = (props: TextfieldType) => {
  return (
    <TextInput
      className="rounded-full bg-primary/20 px-4 shadow-sm"
      {...props}
    />
  );
};
