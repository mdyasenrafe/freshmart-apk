interface TyprographyType {
  regular: string;
  medium: string;
  bold: string;
}

interface buttonProps {
  title: string;
  style?: TextStyle;
  onPress?: () => void;
}

interface ColorType {
  primary: string;
  black: string;
  white: string;
  gray?: string;
  borderColor?: string;
}
interface TextInputProps {
  placeholder: string;
  style?: TextStyle;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}
interface PasswordInputProps {
  onChangeText?: (text: string) => void;
  passwordEye?: boolean;
  setPassowrdEye?: any;
}
