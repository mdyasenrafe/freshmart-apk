import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import OwnText from "../../Components/Text/OwnText";
import { BestSellerData } from "../../Data/BestSellerData";
import { Colors } from "../../Components/Theme/Color";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderComponent } from "../../Components/HeaderComponent";

export default function Products({ navigation }: any) {
  return (
    <>
      <HeaderComponent routes={"Best Seller"} />
      <ScrollView>
        <View style={{ flex: 1, marginVertical: 24 }}>
          <View>
            {BestSellerData.map((item, index) => (
              <View key={index} style={styles.best_seller}>
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
                  <TouchableOpacity style={styles.plus_area}>
                    <AntDesign name="plus" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  best_seller_area: {
    marginTop: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
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
