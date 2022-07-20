interface TyprographyType {
  regular: string;
  medium: string;
  bold: string;
}

interface ColorType {
  primary: string;
  black: string;
  white: string;
  gray?: string;
  borderColor?: string;
  error: string;
}

interface PasswordInputProps {
  onChangeText?: (text: string) => void;
  passwordEye?: boolean;
  setPassowrdEye?: any;
}

interface emailState {
  isLoading: boolean;
  user: string | null;
  erorr: string | null;
}

interface IState {
  email: emailState;
}
interface EmailSignUPBodyData {
  name: string;
  email: string;
  password_repeat: string;
  device: string;
  password: string;
  method: string;
}

interface CategroyDataTypes {
  title: string;
  photo?: any;
  slug: string;
}
