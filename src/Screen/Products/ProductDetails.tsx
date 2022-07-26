import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";
import OwnText from "../../Components/Text/OwnText";
import { Colors } from "../../Components/Theme/Color";
import Button from "../../Components/Button";
import CommonProducts from "../Home/CommonProducts";
import { useSelector } from "react-redux";
import { addCartApi } from "../../Api";
import Toast from "react-native-toast-message";

export default function ProductDetails({ navigation, route }: any) {
  const productDetails = route?.params?.item;
  const [quantity, setQuantity] = React.useState(1);

  const { email } = useSelector((state: any) => state);

  const handleAddCart = () => {
    let addCartBodyData = {
      userName: email?.user?.name,
      userEmail: email?.user?.email,
      userId: email?.user?._id,
      productId: productDetails._id,
      productName: productDetails.name,
      productPrice: productDetails.price,
      productPhoto: productDetails.photo,
      productQuantity: quantity,
    };

    const res: any = addCartApi(addCartBodyData);
    if (res?.error) {
      Toast.show({
        type: "error",
        text1: res.error,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Added to cart",
      });
    }
    navigation.navigate("Cart");
  };

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
      <Button
        onPress={handleAddCart}
        style={styles.button}
        title="Add To Cart"
      />
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
