import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { BestSellerData } from "../../Data/BestSellerData";
import { Colors } from "../../Components/Theme/Color";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { useState } from "react";
import { useEffect } from "react";
import { filterProductAPi } from "../../Api";
import { LoadingSpinner } from "../../Navigation/Index";
import { ProductRender } from "../../Components/Product.Components";

export default function Products({ navigation, route }: any) {
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  const slug: string = route.params.slug;
  const category: boolean = route.params.category;

  useEffect(() => {
    fetchData();
  }, []);

  let filterBodyData = {};
  if (category) {
    filterBodyData = {
      category: slug,
    };
  } else {
    filterBodyData = {
      filter: slug,
    };
  }

  const fetchData = async () => {
    const response = await filterProductAPi(filterBodyData);
    if (response.error) {
    } else {
      setProducts(response.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderComponent routes={route.params.title} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}
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
