import { View, Text } from "react-native";
import React from "react";
import { HeaderComponent } from "../../Components/HeaderComponent";

export default function Favourites() {
  return (
    <>
      <HeaderComponent routes="Favourites" />
      <Text>Favourites</Text>
    </>
  );
}
