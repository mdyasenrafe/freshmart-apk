import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../../Components/Theme/Color";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { useState } from "react";
import { useEffect } from "react";
import { filterProductAPi } from "../../Api";
import { LoadingSpinner } from "../../Navigation/Index";
import { ProductRender } from "../../Components/Product.Components";
import OwnText from "../../Components/Text/OwnText";

export default function Products({ navigation, route }: any) {
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [noProduct, setNoProduct] = useState(false);
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
      if (response.count === 0) {
        setNoProduct(true);
        setIsLoading(false);
      } else {
        setProducts(response.data);
        setNoProduct(false);
        setIsLoading(false);
      }
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
              {noProduct ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 100,
                  }}
                >
                  <AntDesign name="frowno" size={50} color={Colors.primary} />
                  <OwnText
                    preset="h3"
                    style={{ marginTop: 20, color: Colors.primary }}
                  >
                    No Product Found
                  </OwnText>
                </View>
              ) : (
                products.map((data, index) => (
                  <ProductRender key={index} item={data} />
                ))
              )}
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
