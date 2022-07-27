import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import OwnText from "./Text/OwnText";
import { Colors } from "./Theme/Color";

interface buttonProps {
  title: string;
  style?: TextStyle;
  onPress?: () => void;
  color?: string;
  disable?: boolean;
}

export default function Button(props: buttonProps) {
  const { title, style: customStyle, onPress, color, disable } = props;
  return (
    <TouchableOpacity
      style={[styles.button, customStyle]}
      onPress={onPress}
      disabled={disable}
    >
      <OwnText style={{ color: color || Colors.white }}>{title}</OwnText>
    </TouchableOpacity>
  );
}

export function Prices({ title, price }: { title: string; price: any }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginBottom: 8,
      }}
    >
      <OwnText preset="bold" style={{ fontSize: 18 }}>
        {title}
      </OwnText>
      <OwnText preset="bold" style={{ fontSize: 18 }}>
        ${price}
      </OwnText>
    </View>
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
