import { Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import Banner from "./Banner";
import CommonProducts from "./CommonProducts";
import { HeaderComponent } from "../../Components/HeaderComponent";

export default function Home({ navigation }: any) {
  return (
    <>
      <HeaderComponent navigatation={navigation} routes={"Home"} />
      <ScrollView>
        <Banner />
        <Category button={true} />
        <CommonProducts />
      </ScrollView>
    </>
  );
}
