import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "../../Components/Input";
import OwnText from "../../Components/Text/OwnText";
import { Colors } from "../../Components/Theme/Color";
import { Feather } from "@expo/vector-icons";

const InfoArea = ({ name, value }: { name: string; value: string }) => {
  return (
    <View style={styles.info_area}>
      <OwnText style={{ color: Colors.gray }}>{name} :</OwnText>
      <OwnText>{value}</OwnText>
    </View>
  );
};

export default function EditProfile() {
  return (
    <>
      <HeaderComponent routes="Profile Information" />

      <ScrollView>
        <View style={{ margin: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Feather name={"edit"} size={24} color="black" />
            <OwnText> Edit Profile</OwnText>
          </View>
          <View
            style={{
              borderBottomColor: Colors.gray,
              borderBottomWidth: 1,
              marginBottom: 16,
              marginTop: 7,
            }}
          ></View>
          <InfoArea name={"Full Name"} value={"Muhammad Ali"} />
          <InfoArea name={"Email"} value={"mdyasenrafe@gmail.com"} />
          <InfoArea name={"Phone Number"} value={"+8801925162902"} />
          <InfoArea name={"Country"} value={"Bangladesh"} />
          <InfoArea name={"City"} value={"Chattogram"} />
          <InfoArea name={"Street Address"} value={"Pahartoli Chattogram"} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  info_area: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
