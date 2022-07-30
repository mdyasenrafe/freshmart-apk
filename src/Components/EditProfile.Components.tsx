import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HeaderComponent } from "./HeaderComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "./Theme/Color";
import Button from "./Button";
import { getProfileApi, updateProfileApi } from "../Api";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { LoadingSpinner } from "../Navigation/Index";

export default function EditProfileComponent() {
  const { email } = useSelector((state: any) => state);
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (email?.user?.email) {
      setLoading(true);
      fetchData();
    }
  }, [email]);

  const bodyData = {
    email: email?.user?.email,
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await getProfileApi(bodyData);
    setProfile(res.data);
    setLoading(false);
  };
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [country, setCountry] = useState<string | any>();
  const [name, setName] = useState<string | any>();
  const [city, setCity] = useState<string>();
  const [address, setAddress] = useState<string>();
  const phoneInput = useRef(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const navigation: any = useNavigation();

  const handlePress = async () => {
    setButtonLoading(true);
    let bodyData = {
      email: email?.user?.email,
      name: name,
      city: city,
      address: address,
      phoneNumber: phoneNumber,
      country: country,
    };
    const res = await updateProfileApi(bodyData);
    if (res.error == false) {
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
      navigation.navigate("EditProfile");
    } else {
      Toast.show({
        type: "error",
        text1: res.message,
      });
    }
    setButtonLoading(false);
  };
  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HeaderComponent routes="Edit profile" />

      <View style={styles.container}>
        <Input
          placeholder="Email"
          style={styles.input}
          value={email?.user?.email}
          editable={false}
        />
        <Input
          placeholder="Name"
          style={styles.input}
          value={profile?.name || ""}
          onChangeText={(text) => setName(text)}
        />

        <Input
          placeholder="Phone Number"
          style={styles.input}
          value={profile?.phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            placeholder="Country"
            style={[styles.input, { width: "45%" }]}
            value={profile?.country}
            onChangeText={(text) => setCountry(text)}
          />
          <Input
            placeholder="City"
            style={[styles.input, { width: "45%" }]}
            value={profile?.city}
            onChangeText={(text) => setCity(text)}
          />
        </View>
        <Input
          placeholder="Street Address"
          style={[styles.input]}
          value={profile?.address}
          onChangeText={(text) => setAddress(text)}
        />
        {buttonLoading ? (
          <LoadingSpinner />
        ) : (
          <Button title="Update" style={styles.button} onPress={handlePress} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    padding: 10,
    color: Colors.black,
    width: "100%",
    borderWidth: 1,
    borderColor: "#efefef",
  },
  button: {
    marginVertical: 16,
    borderRadius: 8,
    width: "95%",
    alignSelf: "center",
  },
});
