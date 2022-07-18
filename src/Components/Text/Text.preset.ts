import { TextStyle } from "react-native";
import { Typrography } from "../Theme/Typrography";

const BASE: TextStyle = {
  fontFamily: Typrography.regular,
  fontSize: 16,
};
const BOLD: TextStyle = {
  fontFamily: Typrography.bold,
};
const MEDIUM: TextStyle = {
  fontFamily: Typrography.regular,
};

export const presets = {
  default: BASE,
  bold: BOLD,
  h1: {
    ...BOLD,
    fontSize: 48,
  },
  h6: {
    ...MEDIUM,
    fontSize: 18,
  },
};

export type TextPresets = keyof typeof presets;
