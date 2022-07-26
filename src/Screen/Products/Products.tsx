import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import OwnText from "../../Components/Text/OwnText";
import { BestSellerData } from "../../Data/BestSellerData";
import { Colors } from "../../Components/Theme/Color";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { ProductRender } from "../Home/CommonProducts";
import { useState } from "react";
import { useEffect } from "react";
import { filterProductAPi } from "../../Api";

export default function Products({ navigation, route }: any) {
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  const slug: string = route.params.slug;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await filterProductAPi({ filter: slug });
    setProducts(response.data);
  };

  return (
    <>
      <HeaderComponent routes={route.params.title} />
      <ScrollView>
        <View style={{ flex: 1, marginBottom: 24 }}>
          <View style={styles.product_area}>
            {products.map((item, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                <ProductRender item={item} index={item._id} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  product_area: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
});
