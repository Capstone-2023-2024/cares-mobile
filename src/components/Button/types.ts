import type {ReactNode} from 'react';
import type {TouchableOpacityProps} from 'react-native-gesture-handler';

export interface ButtonBase extends TouchableOpacityProps {
  children: ReactNode;
  disabled?: boolean;
}

export interface ButtonProps extends ButtonBase {
  type?: 'error' | 'success';
}

export interface LinkProps extends ButtonBase {
  textStyle?: string;
}
