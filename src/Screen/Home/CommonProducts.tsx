import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import OwnText from "../../Components/Text/OwnText";
import { Colors } from "../../Components/Theme/Color";
import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { filterProductAPi } from "../../Api";
import { useState } from "react";
import { ProductRender } from "../../Components/Product.Components";

export default function CommonProducts({
  title,
  slug,
}: {
  title?: string;
  slug?: string;
}) {
  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = sliderWidth / 2;
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  const navigation: any = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await filterProductAPi({ filter: slug });
    setProducts(response.data.slice(0, 4));
  };

  return (
    <View style={{ flex: 1, marginVertical: 24, marginHorizontal: 16 }}>
      <View style={styles.upperArea}>
        <OwnText preset="h3">{title}</OwnText>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(`Products/${slug}`, {
              title: title,
              slug: slug,
              category: false,
            })
          }
        >
          <OwnText style={{ color: Colors.primary }}>See All</OwnText>
        </TouchableOpacity>
      </View>
      <View>
        <Carousel
          data={products}
          renderItem={ProductRender}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          removeClippedSubviews={false}
          enableMomentum={true}
          activeSlideAlignment="start"
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  up_area: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 6,
    backgroundColor: "#f8ced0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  best_seller: {
    width: 170,
    height: 230,
    margin: "auto",
    paddingVertical: 16,
    borderRadius: 16,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    marginBottom: 12,
  },
  best_seller_img: {
    width: 70,
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 12,
  },
  price_area: {
    padding: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plus_area: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  upperArea: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
