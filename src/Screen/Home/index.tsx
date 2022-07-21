import { Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import ExclusiveOffer from "./ExclusiveOffer";
import BestProduct from "./BestProduct";
import Banner from "./Banner";

export default function Home({ navigation }: any) {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <ScrollView>
        <Banner />
        <Category button={true} />
        <ExclusiveOffer />
        <BestProduct />
      </ScrollView>
    </SafeAreaView>
  );
}
