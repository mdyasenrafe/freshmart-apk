import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";
import { Typrography } from "../../Components/Theme/Typrography";
import { Colors } from "../../Components/Theme/Color";

import Button from "../../Components/Button";
import { Input, InputPassword } from "../../Components/Input";
import { useDispatch } from "react-redux";
import { EmailSignUp, EmiallFailAction } from "../../Redux/Action";

export default function SignUp({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordEye, setPassowrdEye] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  const handleSignup = () => {
    dispatch(EmailSignUp(email, password))
      .then(async (res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(EmiallFailAction(err.message));
      });
  };
  return (
    <>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
          <View style={styles.image_area}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.image}
            />
          </View>
          <View>
            <OwnText preset="h1">Sign up</OwnText>
            <OwnText style={{ paddingTop: 12 }}>
              Enter your credentials for signup
            </OwnText>
            <View style={styles.input_area}>
              <TextInput />
              <Input
                autoCapitalize={"words"}
                placeholder="Full Name"
                onChangeText={(e: string) => setName(e)}
              />
              <Input
                keyboardType="email-address"
                autoCapitalize={"none"}
                placeholder="Email"
                onChangeText={(e: string) => setEmail(e)}
              />
              <InputPassword
                onChangeText={(e: string) => setPassword(e)}
                passwordEye={passwordEye}
                setPassowrdEye={(e: boolean) => setPassowrdEye(e)}
              />
            </View>
            <View>
              <Button
                onPress={handleSignup}
                title="Sign up"
                style={styles.button}
              />
              <Pressable onPress={() => navigation.navigate("Login")}>
                <View style={styles.already_acceount}>
                  <OwnText style={{ fontFamily: Typrography.medium }}>
                    Alredy have an account?{" "}
                  </OwnText>
                  <OwnText preset="h6" style={{ color: "green" }}>
                    Login
                  </OwnText>
                </View>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
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
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    height: 48,
    marginBottom: 24,
    fontFamily: Typrography.regular,
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
