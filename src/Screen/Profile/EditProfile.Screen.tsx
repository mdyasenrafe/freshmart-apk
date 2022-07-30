import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "../../Components/Input";
import OwnText from "../../Components/Text/OwnText";
import { Colors } from "../../Components/Theme/Color";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getProfileApi } from "../../Api";
import EditProfileComponent from "../../Components/EditProfile.Components";
import { LoadingSpinner } from "../../Navigation/Index";
import { useIsFocused } from "@react-navigation/native";

const InfoArea = ({ name, value }: { name: string; value: string }) => {
  return (
    <View style={styles.info_area}>
      <OwnText style={{ color: Colors.gray }}>{name} :</OwnText>
      <OwnText>{value}</OwnText>
    </View>
  );
};

export default function EditProfile({ navigation }: { navigation: any }) {
  const { email } = useSelector((state: any) => state);

  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (email?.user?.email || isFocused) {
      setLoading(true);
      fetchData();
    }
  }, [email, isFocused]);

  const bodyData = {
    email: email?.user?.email,
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await getProfileApi(bodyData);
    setProfile(res.data);
    setLoading(false);
  };

  return loading ? (
    <LoadingSpinner />
  ) : !profile?.country ? (
    <EditProfileComponent />
  ) : (
    <>
      <HeaderComponent routes="Profile Information" />

      <ScrollView>
        <View style={{ margin: 16 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Feather name={"edit"} size={24} color="black" />
            <OwnText> Edit Profile</OwnText>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: Colors.gray,
              borderBottomWidth: 1,
              marginBottom: 16,
              marginTop: 7,
            }}
          ></View>
          <InfoArea name={"Full Name"} value={profile?.name} />
          <InfoArea name={"Email"} value={profile?.email} />
          <InfoArea name={"Phone Number"} value={profile?.phoneNumber} />
          <InfoArea name={"Country"} value={profile?.country} />
          <InfoArea name={"City"} value={profile?.city} />
          <InfoArea name={"Street Address"} value={profile?.address} />
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
