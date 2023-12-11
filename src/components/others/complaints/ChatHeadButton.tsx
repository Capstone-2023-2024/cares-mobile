import React from 'react';
import {
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native-gesture-handler';
import Text from '~/components/Text';

interface ChatHeadButtonProps extends TouchableOpacityProps {
  name: string;
  disabled?: boolean;
  condition: boolean;
  replaceTrueButtonStyle?: string;
  replaceFalseButtonStyle?: string;
  replaceButtonBaseStyle?: string;
  replaceTrueTextStyle?: string;
  replaceFalseTextStyle?: string;
  replaceTextBaseStyle?: string;
}

const ChatHeadButton = ({
  name,
  condition,
  replaceTrueButtonStyle,
  replaceFalseButtonStyle,
  replaceButtonBaseStyle,
  replaceTrueTextStyle,
  replaceFalseTextStyle,
  replaceTextBaseStyle,
  ...rest
}: ChatHeadButtonProps) => {
  const buttonBaseStyle = 'rounded-xl p-2 duration-300 ease-in-out w-32';
  const trueButtonBaseStyle = 'bg-secondary';
  const falseButtonBaseStyle = 'bg-primary';
  const textBaseStyle = 'text-white capitalize text-center';
  const trueTextBaseStyle = '';
  const falseTextBaseStyle = '';

  const trueButtonStyle = replaceTrueButtonStyle ?? trueButtonBaseStyle;
  const falseButtonStyle = replaceFalseButtonStyle ?? falseButtonBaseStyle;
  const getBaseButtonStyle = replaceButtonBaseStyle ?? buttonBaseStyle;
  const conditionalButtonStyle = condition ? trueButtonStyle : falseButtonStyle;

  const trueTextStyle = replaceTrueTextStyle ?? trueTextBaseStyle;
  const falseTextStyle = replaceFalseTextStyle ?? falseTextBaseStyle;
  const getBaseTextStyle = replaceTextBaseStyle ?? textBaseStyle;
  const conditionalTextStyle = condition ? trueTextStyle : falseTextStyle;

  return (
    <TouchableOpacity
      {...rest}
      className={`${getBaseButtonStyle} ${conditionalButtonStyle}`}>
      <Text className={`${getBaseTextStyle} ${conditionalTextStyle}`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatHeadButton;
