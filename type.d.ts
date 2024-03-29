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
  textGray?: string;
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

interface cartStateType {
  _id: string;
  userId: string;
  productId: string;
  userName: string;
  productName: number;
  productPrice: string;
  productPhoto: string;
  productQuantity: number;
  userEmail: string;
}

interface profileStateType {
  __v: number;
  _id: string;
  address: string;
  city: string;
  country: string;
  createAt: string;
  email: string;
  name: string;
  phoneNumber: string;
  photoUrl: string;
}

interface ProfileIntialSTate {
  isLoading: boolean;
  user: profileStateType | null;
  erorr: string | null;
}

interface IState {
  email: emailState;
  cart: cartStateType[];
  profile: ProfileIntialSTate;
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
  color?: string;
  borderColor?: string;
}

interface ProductsTypes {
  _id: string;
  categroy: string;
  createAt: string;
  description: string;
  discount?: number;
  filter?: string;
  name?: string;
  photo?: string;
  price?: number;
  weight?: number;
}

interface BannerDataType {
  title: string;
  photo?: any;
  slug: string;
  btnColor?: string;
  btnTextColor?: string;
  bannerTitle?: string;
}
interface GetCartTypes {
  userId: string;
}
interface emailSigninTypes {
  email: string;
  password: string;
}

interface FilterProductType {
  categroy?: string;
  slug?: string;
}

interface UpdateCartType {
  userId: string;
  productId: string;
  productQuantity: number;
}

interface deleteCartDataType {
  userId: string;
  productId: string;
}

interface linkDataType {
  id: number;
  link: string;
  name: string;
  iconName:
    | "edit"
    | "shoppingcart"
    | "favorite"
    | "notifications-sharp"
    | string;
  iconType: string;
}

interface getProfileType {
  email: string;
}
