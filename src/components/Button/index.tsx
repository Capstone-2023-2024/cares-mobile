import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '~/components';
import type {ButtonProps, LinkProps} from './types';

export const Button = (props: ButtonProps) => {
  const {children, type, ...rest} = props;

  function style() {
    let base = 'px-4 p-2 rounded-full shadow-sm';
    if (rest.disabled) {
      return `${base} bg-slate-300`;
    }
    if (type === 'error') {
      return `${base} bg-red-500`;
    } else if (type === 'success') {
      return `${base} bg-green-500`;
    }
    return `${base} bg-primary`;
  }

  return (
    <TouchableOpacity className={style()} {...rest}>
      <Text className="text-center capitalize text-white">{children}</Text>
    </TouchableOpacity>
  );
};

export const Link = (props: LinkProps) => {
  const {children, textStyle, ...rest} = props;
  function style() {
    let base = 'text-xs underline';

    return textStyle ? `${base} ${textStyle}` : `${base} text-black`;
  }
  return (
    <TouchableOpacity {...rest}>
      <Text className={style()}>{children}</Text>
    </TouchableOpacity>
  );
};
