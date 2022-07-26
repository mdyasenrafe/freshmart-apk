import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";
import OwnText from "../../Components/Text/OwnText";
import { Colors } from "../../Components/Theme/Color";
import Button from "../../Components/Button";
import CommonProducts from "../Home/CommonProducts";

export default function ProductDetails({ navigation, route }: any) {
  const productDetails = route?.params?.item;

  console.log(productDetails);

  return (
    <>
      <HeaderComponent routes="Product Details" />
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Image
              source={{
                uri: productDetails.photo,
              }}
              style={styles.image}
            />
            <View style={styles.price_area}>
              <View style={{ width: "80%" }}>
                <OwnText preset="h3">{productDetails.name}</OwnText>
              </View>
              <OwnText preset="h4">${productDetails.price}</OwnText>
            </View>
            <OwnText style={{ color: Colors.gray, fontSize: 14 }}>
              Available in stock
            </OwnText>

            <View style={{ marginTop: 24 }}>
              <OwnText preset="h4">Details</OwnText>
              <OwnText
                style={{ color: Colors.textGray, fontSize: 14, marginTop: 12 }}
              >
                {productDetails.description.replace("<br />", `\n`)}
              </OwnText>
            </View>
          </View>

          <View>
            <CommonProducts
              title={"Related Products"}
              slug={productDetails.filter}
            />
          </View>
        </View>
      </ScrollView>
      <Button style={styles.button} title="Add To Cart" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  image: {
    height: 400,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  price_area: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "95%",
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
  },
});
