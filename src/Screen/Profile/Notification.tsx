import { View, Text } from "react-native";
import React from "react";
import OwnText from "../../Components/Text/OwnText";
import { HeaderComponent } from "../../Components/HeaderComponent";

export default function Notification() {
  return (
    <>
      <HeaderComponent routes="Notification" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {/* notification is working */}
        <OwnText>Coming soon</OwnText>
      </View>
    </>
  );
}
