import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import type {ButtonProps, LinkProps} from './types';

export const Button = (props: ButtonProps) => {
  const {children, type, ...rest} = props;

  function style() {
    let base = 'px-4 p-2 rounded-lg shadow-md active:scale-115';
    return rest.disabled ? `${base} bg-slate-300` : typeBasedStyle(type);

    function typeBasedStyle(props: ButtonProps['type']) {
      switch (props) {
        case 'error':
          return `${base} bg-red-500`;
        case 'success':
          return `${base} bg-green-500`;
        default:
          return `${base} bg-primary`;
      }
    }
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
