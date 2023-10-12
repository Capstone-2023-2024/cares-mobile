export interface TextfieldProps {
  value?: any;
  placeholder?: string;
  keyboardType?: 'email-address';
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
}
