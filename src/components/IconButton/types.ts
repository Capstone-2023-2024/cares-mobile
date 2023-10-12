import type {ImageSourcePropType} from 'react-native';

export interface IconButtonProps {
  uri: ImageSourcePropType;
  onPress?: () => void;
}
