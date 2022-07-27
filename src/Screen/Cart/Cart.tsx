import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartApi, updateCartApi } from "../../Api";
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
    const [quantity, setQuantity] = useState(item?.productQuantity);
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

    const [modalVisible, setModalVisible] = useState(false);

    const handleUpdate = async (item: any) => {
      let updateCartData: UpdateCartType = {
        userId: item?.userId,
        productId: item?.productId,
        productQuantity: quantity,
      };
      // console.log(updateCartData);
      const res = await updateCartApi(updateCartData);
      if (res.error === true) {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
        setTimeout(() => {
          Toast.hide();
        }, 2000);
      } else {
        if (res.data.modifiedCount > 0) {
          fetchData();
          setShow(false);
          Toast.show({
            type: "success",
            text1: "Cart Updated",
          });
          setTimeout(() => {
            Toast.hide();
          }, 2000);
        }
      }
    };

    const handleDelete = (id: string) => {
      const newCart = cart.filter((item: any) => item._id !== id);
      setCart(newCart);
      setModalVisible(false);
    };

    return (
      <View style={styles.cart_area}>
        <View style={styles.cart}>
          <Image
            source={{ uri: item?.productPhoto }}
            style={{ width: 90, height: 90, borderRadius: 8 }}
          />
          <View>
            <OwnText style={{ fontWeight: "bold" }} preset="h6">
              {item.productName}
            </OwnText>
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AntDesign name="delete" size={24} color={Colors.primary} />
            </TouchableOpacity>

            {show ? (
              <OwnText style={{ fontSize: 18, marginTop: 8 }}>
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
              onPress={() => handleUpdate(item)}
              disable={quantity === item?.productQuantity ? true : false}
              style={{
                width: 90,
                height: 36,
                backgroundColor: Colors.primary,
                borderRadius: 8,
                marginHorizontal: 8,
              }}
              title={"Update"}
            />
          </View>
        )}

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <OwnText preset="bold">Do you want delete this item?</OwnText>

              <View style={{ flexDirection: "row", marginTop: 24 }}>
                <Button
                  style={{ borderRadius: 8, width: 78, marginHorizontal: 16 }}
                  title="Yes"
                  onPress={() => {
                    handleDelete(item._id);
                  }}
                />
                <Button
                  style={{
                    borderRadius: 8,
                    width: 78,
                    backgroundColor: Colors.black,
                  }}
                  onPress={() => setModalVisible(false)}
                  title="No"
                />
              </View>
            </View>
          </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
