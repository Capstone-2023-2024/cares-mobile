import type {ReactNode} from 'react';
import type {GestureResponderEvent} from 'react-native';

export interface ButtonBase {
  children: ReactNode;
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

export interface ButtonProps extends ButtonBase {
  type?: 'error' | 'success';
}

export interface LinkProps extends ButtonBase {
  textStyle?: string;
}
