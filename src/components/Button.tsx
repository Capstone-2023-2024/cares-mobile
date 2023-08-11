import React, {type ReactNode} from 'react';
import {Text, TouchableOpacity, type GestureResponderEvent} from 'react-native';

interface ButtonBase {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

interface ButtonType extends ButtonBase {
  type?: 'error' | 'success';
}

interface LinkType extends ButtonBase {
  textStyle?: string;
}

export const Button = (props: ButtonType) => {
  const {children, type, ...rest} = props;

  function style() {
    let base = 'px-4 p-2 rounded-full shadow-sm';
    if (type === 'error') {
      return `${base} bg-red-500`;
    } else if (type === 'success') {
      return `${base} bg-green-500`;
    }
    return `${base} bg-primary`;
  }

  return (
    <TouchableOpacity className={style()} {...rest}>
      <Text className="text-center text-white">{children}</Text>
    </TouchableOpacity>
  );
};

export const Link = (props: LinkType) => {
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
