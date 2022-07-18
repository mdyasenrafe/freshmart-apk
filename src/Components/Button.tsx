import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import OwnText from "./Text/OwnText";
import { Colors } from "./Theme/Color";

export default function Button(props: buttonProps) {
  const { title, style: customStyle, onPress } = props;
  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      <OwnText style={{ color: Colors.white }}>{title}</OwnText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: 165,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
});
