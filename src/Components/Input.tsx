import { StyleSheet, TextInput, TextStyle, View } from "react-native";
import React from "react";
import { Typrography } from "./Theme/Typrography";
import { Colors } from "./Theme/Color";
import { Feather } from "@expo/vector-icons";
interface TextInputProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "visible-password";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  style?: TextStyle | any;
  value?: string;
  editable?: boolean;
}

export function Input(props: TextInputProps) {
  const {
    placeholder,
    autoCapitalize,
    onChangeText,
    keyboardType,
    style,
    value,
    editable,
  } = props;
  return (
    <TextInput
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="black"
      defaultValue={value}
      editable={editable}
    />
  );
}

export function InputPassword(props: PasswordInputProps) {
  const { onChangeText, passwordEye, setPassowrdEye } = props;
  return (
    <View style={styles.password_area}>
      <TextInput
        autoCapitalize={"none"}
        style={{ width: "90%" }}
        placeholder="Password"
        secureTextEntry={!passwordEye}
        onChangeText={onChangeText}
        placeholderTextColor="black"
      />
      {passwordEye ? (
        <Feather
          onPress={() => setPassowrdEye(false)}
          name="eye"
          size={24}
          color="black"
        />
      ) : (
        <Feather
          onPress={() => setPassowrdEye(true)}
          name="eye-off"
          size={24}
          color="black"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    height: 48,
    marginBottom: 24,
    fontFamily: Typrography.regular,
  },
  password_area: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    height: 48,
    borderBottomColor: Colors.borderColor,
  },
});
