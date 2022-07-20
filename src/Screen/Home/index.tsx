import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import ExclusiveOffer from "./ExclusiveOffer";

export default function Home() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Category />
      <ExclusiveOffer />
    </SafeAreaView>
  );
}
