import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { presets, TextPresets } from "./Text.preset";

interface TextProps {
  children: React.ReactNode;
  preset?: TextPresets;
  style?: any;
}

export default function OwnText(props: TextProps) {
  const { children, preset = "default", style: styleOveride } = props;
  const styles = StyleSheet.compose(presets[preset], styleOveride);
  return (
    <View>
      <Text style={[styles]}>{children}</Text>
    </View>
  );
}
