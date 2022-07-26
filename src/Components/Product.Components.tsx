import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { Colors } from "./Theme/Color";
import OwnText from "./Text/OwnText";
import { useNavigation } from "@react-navigation/native";
import { addCartApi } from "../Api";
import { useSelector } from "react-redux";

export const ProductRender = ({ item, index }: any) => {
  const handleFavorite = (item: ProductsTypes) => {
    Toast.show({
      type: "success",
      text1: "Added to favorite",
    });
  };

  const { email } = useSelector((state: any) => state);

  const handleAddCart = async (item: ProductsTypes) => {
    let addCartBodyData = {
      userName: email?.user?.name,
      userEmail: email?.user?.email,
      userId: email?.user?._id,
      productId: item._id,
      productName: item.name,
      productPrice: item.price,
      productPhoto: item.photo,
      productQuantity: 1,
    };

    const res = await addCartApi(addCartBodyData);
    if (res.error) {
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
  };

  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
      key={index}
      style={styles.best_seller}
    >
      <TouchableOpacity
        onPress={() => handleFavorite(item)}
        style={styles.up_area}
      >
        <MaterialIcons
          name="favorite-outline"
          size={18}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <Image
        source={{
          uri: item.photo,
        }}
        style={styles.best_seller_img}
      />
      <OwnText preset="h5" style={{ paddingLeft: 14 }}>
        {item.name}
      </OwnText>
      <View style={styles.price_area}>
        <OwnText preset="h5" style={{ paddingLeft: 14 }}>
          $ {item.price}
        </OwnText>
        <TouchableOpacity
          onPress={() => handleAddCart(item)}
          style={styles.plus_area}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

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
