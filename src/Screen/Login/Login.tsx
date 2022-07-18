import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";
import { Typrography } from "../../Components/Theme/Typrography";
import { Colors } from "../../Components/Theme/Color";
import { Feather } from "@expo/vector-icons";
import Button from "../../Components/Button";
import { Input, InputPassword } from "../../Components/Input";

export default function Login({ navigation }: { navigation: any }) {
  const [passwordEye, setPassowrdEye] = useState<boolean>(false);

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={styles.image_area}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.image}
          />
        </View>
        <View>
          <OwnText preset="h1">Log in</OwnText>
          <OwnText style={{ paddingTop: 12 }}>
            Enter Your Email and Password
          </OwnText>
          <View style={styles.input_area}>
            <Input
              keyboardType="email-address"
              autoCapitalize={"none"}
              placeholder="Email"
              // onChangeText={(e) => console.log(e)}
            />
            <InputPassword
              onChangeText={(e: string) => console.log(e)}
              passwordEye={passwordEye}
              setPassowrdEye={setPassowrdEye}
            />
          </View>
          <View>
            <Button title="Log in" style={styles.button} />
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <View style={styles.already_acceount}>
                <OwnText style={{ fontFamily: Typrography.medium }}>
                  Don't have an account?{" "}
                </OwnText>
                <OwnText preset="h6" style={{ color: "green" }}>
                  Sign up
                </OwnText>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image_area: {
    height: 200,
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 60,
    height: 60,
  },
  input_area: {
    paddingTop: 25,
  },

  button: {
    borderRadius: 16,
    width: "100%",
    marginTop: 30,
    marginBottom: 16,
  },
  already_acceount: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
