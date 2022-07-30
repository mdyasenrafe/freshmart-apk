import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  deleteFavorite,
  getFavoriteApi,
  getProfileApi,
  getSingleProductApi,
} from "../../Api";
import Toast from "react-native-toast-message";
import { FlatList } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";
import { LoadingSpinner } from "../../Navigation/Index";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Components/Theme/Color";
import Button from "../../Components/Button";

export default function Favourites() {
  const navigation: any = useNavigation();
  const { email } = useSelector((state: any) => state);

  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [noProduct, setNoProduct] = useState(false);

  useEffect(() => {
    if (email?.user?.email || isFocused) {
      setLoading(true);
      fetchData();
    }
  }, [email, isFocused]);

  let bodyData = {
    userId: email?.user?._id,
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await getFavoriteApi(bodyData);
    if (res?.error == true) {
      Toast.show({
        type: "error",
        text1: res.error,
      });
    } else {
      if (res?.data?.length == 0) {
        setNoProduct(true);
      } else {
        setProduct(res.data);
      }
    }
    setLoading(false);
  };

  const RenderItem = ({ data }: any) => {
    const handleDelete = async (uId: string, pId: string) => {
      let bodyData = { userId: uId, productId: pId };
      const res = await deleteFavorite(bodyData);
      if (res?.error == true) {
        Toast.show({
          type: "error",
          text1: res.error,
        });
      } else {
        console.log(res.data);
        if (res.data?.deletedCount == 1) {
          Toast.show({
            type: "success",
            text1: "Deleted Successfully",
          });
          fetchData();
        } else {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
        }
      }
      setModalVisible(false);
    };

    const [item, setItem] = useState<any>(data);

    const bodyData = {
      id: data?.productId,
    };

    useEffect(() => {
      if (data?.productId) {
        singleProductFetchData();
      }
    }, [data?.productId]);
    console.log(bodyData);

    const singleProductFetchData = async () => {
      const res = await getSingleProductApi(bodyData);
      console.log(res);
      setItem(res.data);
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetails", { item })}
        style={styles.best_seller}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: data?.productPhoto,
            }}
            style={styles.best_seller_img}
          />
          <View style={{ paddingLeft: 14 }}>
            <OwnText preset="h5">{data?.productName}</OwnText>
            <OwnText preset="h5" style={{ paddingTop: 8 }}>
              $ {data?.productPrice}
            </OwnText>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <AntDesign name="close" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetails", { item })}
          >
            <MaterialIcons
              style={{ paddingTop: 16 }}
              name="navigate-next"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <OwnText preset="bold">Do you want delete this item?</OwnText>

              <View style={{ flexDirection: "row", marginTop: 24 }}>
                <Button
                  style={{ borderRadius: 8, width: 78, marginHorizontal: 16 }}
                  title="Yes"
                  onPress={() => handleDelete(data?.userId, data?.productId)}
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
      </TouchableOpacity>
    );
  };

  const HelpingRender = ({ item }: any) => {
    return <RenderItem data={item} />;
  };

  return (
    <>
      <HeaderComponent routes="Favourites" />
      {loading ? (
        <LoadingSpinner />
      ) : noProduct ? (
        <View>
          <OwnText preset="h5" style={{ textAlign: "center", marginTop: 24 }}>
            No Product Found
          </OwnText>
        </View>
      ) : (
        <FlatList
          data={product}
          renderItem={HelpingRender}
          keyExtractor={(data: any) => data?._id}
          contentContainerStyle={{
            marginVertical: 16,
            marginHorizontal: 8,
          }}
          extraData={fetchData}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  best_seller: {
    width: "100%",
    alignItems: "center",
    height: 100,
    margin: "auto",
    borderRadius: 16,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  best_seller_img: {
    width: 70,
    height: 80,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 12,
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
