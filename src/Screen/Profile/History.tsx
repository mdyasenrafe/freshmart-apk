import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { paymentGetApi } from "../../Api";
import Toast from "react-native-toast-message";
import OwnText from "../../Components/Text/OwnText";
import { LoadingSpinner } from "../../Navigation/Index";
import moment from "moment";
import { Colors } from "../../Components/Theme/Color";
// import moment from "moment;

export default function History() {
  const { email } = useSelector((state: any) => state);

  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [noHistory, setNoHistory] = useState(false);

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
    const res = await paymentGetApi(bodyData);
    if (res?.error == true) {
      Toast.show({
        type: "error",
        text1: res.error,
      });
    } else {
      if (res?.data?.length == 0) {
        setNoHistory(true);
      } else {
        setProduct(res.data);
      }
    }
    setLoading(false);
  };

  const RenderItem = ({ data }: any) => {
    return (
      <View style={[styles.area]}>
        <Image
          source={{ uri: "https://i.ibb.co/bJ4VjR2/image.png" }}
          style={styles.image}
        />
        <View>
          <OwnText preset="bold" style={{ fontSize: 16 }}>
            Order #{data._id}
          </OwnText>
          {data.status == "payment sucess" ? (
            <OwnText style={{ color: "orange" }}>Delivery start</OwnText>
          ) : data.status == "payment failed" ? (
            <OwnText style={{ color: Colors.primary }}>Faliure</OwnText>
          ) : (
            <OwnText style={{ color: "green" }}>Deliverd</OwnText>
          )}
          <OwnText>
            {moment(data.createdAt).startOf("minute").fromNow()}
          </OwnText>
        </View>
      </View>
    );
  };

  const HelpingRender = ({ item }: any) => {
    return <RenderItem data={item} />;
  };

  return (
    <>
      <HeaderComponent routes="History" />
      {loading ? (
        <LoadingSpinner />
      ) : noHistory ? (
        <View>
          <OwnText preset="h5" style={{ textAlign: "center", marginTop: 24 }}>
            No Product Found
          </OwnText>
        </View>
      ) : (
        <View style={{ margin: 16 }}>
          <FlatList
            data={product}
            renderItem={HelpingRender}
            keyExtractor={(data: any) => data?._id}
            extraData={fetchData}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  area: {
    borderRadius: 16,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  image: {
    width: 40,
    height: 40,
  },
});
