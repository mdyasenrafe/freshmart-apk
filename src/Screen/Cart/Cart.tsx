import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartApi, getCartApi, updateCartApi } from "../../Api";
import { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";
import OwnText from "../../Components/Text/OwnText";
import { LoadingSpinner } from "../../Navigation/Index";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Colors } from "../../Components/Theme/Color";
import Button, { Prices } from "../../Components/Button";
import { CartActionData } from "../../Redux/Action";
import { useStripe } from "@stripe/stripe-react-native";

export default function Cart() {
  const { email } = useSelector((state: any) => state);
  const [cart, setCart] = useState<cartStateType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const [noCart, setNoCart] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (isFocused) {
      if (email?.user?._id) {
        fetchData();
      }
    }
  }, [email?.user?._id, isFocused]);

  const dispatch: any = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    const response = await getCartApi({ userId: email?.user?._id });
    if (response?.error == false) {
      if (response.data.length == 0) {
        setNoCart(true);
      } else {
        setCart(response?.data);
        dispatch(CartActionData(response?.data));
        setNoCart(false);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: response?.message,
      });
      setNoCart(true);
    }
    setLoading(false);
  };

  let sub_total: number = 0;
  let delivery_fee: number = 0;
  let total: number = 0;
  let item: any;
  for (item of cart) {
    const result = parseFloat(item?.productPrice) * item?.productQuantity;
    sub_total += result;
    delivery_fee += result * 0.1;
  }
  total = sub_total + delivery_fee;

  const HandleRender = ({ item }: { item: cartStateType }) => {
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

    const handleUpdate = async (item: cartStateType) => {
      let updateCartData: UpdateCartType = {
        userId: item?.userId,
        productId: item?.productId,
        productQuantity: quantity,
      };
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

    const handleDelete = async (id: string) => {
      let deleteCartData: deleteCartDataType = {
        userId: email?.user?._id,
        productId: id,
      };
      const res: any = await deleteCartApi(deleteCartData);
      if (res.error === true) {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
        setTimeout(() => {
          Toast.hide();
        }, 2000);
      } else {
        if (res.data.deletedCount > 0) {
          fetchData();
          Toast.show({
            type: "success",
            text1: "Item Deleted",
          });
          const newCart = cart.filter((item: any) => item._id !== id);
          setCart(newCart);
          setModalVisible(false);
        }
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
                    handleDelete(item?.productId);
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

  const navigation: any = useNavigation();

  console.log(noCart);

  return (
    <>
      <HeaderComponent routes={"Cart"} />
      {email?.isLoading || loading ? (
        <LoadingSpinner />
      ) : (
        <View style={{ marginBottom: 18 }}>
          {noCart === true ? (
            <View
              style={{
                height: "90%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OwnText preset="h2" style={{ fontSize: 18 }}>
                No Item in Cart
              </OwnText>
            </View>
          ) : (
            <>
              <FlatList
                data={cart}
                renderItem={helpingRender}
                keyExtractor={(item: any) => item._id}
                contentContainerStyle={{
                  paddingVertical: 16,
                }}
                extraData={fetchData}
              />
              <View style={styles.price_area}>
                <Prices title={"Sub Total"} price={sub_total.toFixed(4)} />
                <Prices
                  title={"Delivery Fee"}
                  price={delivery_fee.toFixed(4)}
                />
                <View style={{ borderTopWidth: 0.5, marginBottom: 4 }}></View>
                <Prices title={"Sub Total"} price={total.toFixed(4)} />
              </View>
              <Button
                title="Pay"
                onPress={() =>
                  navigation.navigate("Payment", { totalAmount: total })
                }
                // onPress={handlePayment}
                style={{
                  width: "95%",
                  height: 48,
                  borderRadius: 8,
                  alignSelf: "center",
                }}
              />
            </>
          )}
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
  price_area: {
    borderTopWidth: 0.5,
    paddingTop: 16,
    marginVertical: 20,
  },
});
