import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartApi } from "../../Api";
import { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";
import OwnText from "../../Components/Text/OwnText";
import { LoadingSpinner } from "../../Navigation/Index";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Colors } from "../../Components/Theme/Color";
import Button from "../../Components/Button";

export default function Cart() {
  const { email } = useSelector((state: any) => state);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    if (isFocused) {
      if (email?.user?._id) {
        fetchData();
      }
    }
  }, [email?.user?._id, isFocused]);

  const fetchData = async () => {
    setLoading(true);
    const response = await getCartApi({ userId: email?.user?._id });
    setCart(response.data);
    setLoading(false);
  };

  const HandleRender = ({ item }: any) => {
    const [quantity, setQuantity] = React.useState(item?.productQuantity);
    const [show, setShow] = useState(false);
    const price = parseFloat(item?.productPrice) * quantity;
    const handleAdd = () => {
      setQuantity(quantity + 1);
    };
    const handleMinus = () => {
      setQuantity(quantity - 1);
      if (quantity === 1) {
        Toast.show({
          type: "error",
          text1: "Quantity must be greater than 1",
        });
        setTimeout(() => {
          Toast.hide();
        }, 2000);
        setQuantity(1);
        return;
      }
    };
    return (
      <View style={styles.cart_area}>
        <View style={styles.cart}>
          <Image
            source={{ uri: item?.productPhoto }}
            style={{ width: 90, height: 90, borderRadius: 8 }}
          />

          <View>
            <OwnText preset="h5">{item.productName}</OwnText>
            {show ? (
              <View style={styles.quantity_area}>
                <TouchableOpacity onPress={handleMinus}>
                  <OwnText style={{ marginRight: 16 }}>
                    <AntDesign name="minussquare" size={32} color="black" />
                  </OwnText>
                </TouchableOpacity>
                <OwnText preset="h5">{quantity}</OwnText>
                <TouchableOpacity onPress={handleAdd}>
                  <OwnText style={{ marginLeft: 16 }}>
                    <AntDesign
                      name="plussquare"
                      size={32}
                      color={Colors.primary}
                    />
                  </OwnText>
                </TouchableOpacity>
              </View>
            ) : (
              <OwnText preset="bold" style={{ fontSize: 18, marginTop: 8 }}>
                ${parseFloat(price.toFixed(4))}
              </OwnText>
            )}
          </View>

          <View>
            <AntDesign name="delete" size={24} color={Colors.primary} />
            {show ? (
              <OwnText preset="bold" style={{ fontSize: 18, marginTop: 8 }}>
                ${parseFloat(price.toFixed(4))}
              </OwnText>
            ) : (
              <TouchableOpacity onPress={() => setShow(true)}>
                <Feather
                  style={{ marginTop: 16 }}
                  name="edit"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {show && (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              style={{
                width: 90,
                height: 36,
                backgroundColor: Colors.black,
                borderRadius: 8,
                marginHorizontal: 8,
              }}
              onPress={() => {
                setShow(false);
                setQuantity(item?.productQuantity);
              }}
              title={"Cancel"}
            />
            <Button
              style={{
                width: 90,
                height: 36,
                backgroundColor: Colors.primary,
                borderRadius: 8,
                marginHorizontal: 8,
              }}
              title={"Updated"}
            />
          </View>
        )}
      </View>
    );
  };

  const helpingRender = ({ item }: any) => {
    return <HandleRender item={item} />;
  };

  return (
    <>
      <HeaderComponent routes={"Cart"} />
      {email?.isLoading || loading ? (
        <LoadingSpinner />
      ) : (
        <View style={{ flex: 1, marginBottom: 18 }}>
          <FlatList
            data={cart}
            renderItem={helpingRender}
            keyExtractor={(item: any) => item._id}
            contentContainerStyle={{
              paddingVertical: 16,
            }}
            extraData={fetchData}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cart_area: {
    marginBottom: 24,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e6e6e6",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantity_area: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});
