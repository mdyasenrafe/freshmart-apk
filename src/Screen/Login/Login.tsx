import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";
import { Typrography } from "../../Components/Theme/Typrography";
import { Colors } from "../../Components/Theme/Color";
import { Feather } from "@expo/vector-icons";
import Button from "../../Components/Button";
import { Input, InputPassword } from "../../Components/Input";
import { useDispatch } from "react-redux";

import {
  EmailFailAction,
  EmailSignin,
  EmailSuccessAction,
} from "../../Redux/Action";
import Toast from "react-native-toast-message";
import { signInApi } from "../../Api";
const validator = require("validator");

export default function Login({ navigation }: { navigation: any }) {
  const [passwordEye, setPassowrdEye] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const handleLogin = (): void => {
    if (email !== "" && password !== "") {
      const check = validator.isEmail(email);
      if (check) {
        setEmailError(false);
        setLoading(true);
        dispatch(EmailSignin(email, password))
          .then(async (res: any) => {
            setLoading(true);
            let emailSignUpBodyData = {
              email: email,
              password: password,
            };
            const response = await signInApi(emailSignUpBodyData);

            if (response.error == false) {
              setLoading(false);
              dispatch(EmailSuccessAction(response?.data));
              Toast.show({
                type: "success",
                text1: "signin successfully",
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Something went wrong",
              });
            }
          })
          .catch((err: any) => {
            dispatch(EmailFailAction(err.message));
          });
      } else {
        setEmailError(true);
      }
    }
  };

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
              onChangeText={(e: string) => setEmail(e)}
              style={{ marginBottom: 16 }}
            />
            {emailError && (
              <OwnText style={{ color: Colors.error }}>
                Please Enter A Valid Email
              </OwnText>
            )}
            <InputPassword
              onChangeText={(e: string) => setPassword(e)}
              passwordEye={passwordEye}
              setPassowrdEye={setPassowrdEye}
            />
          </View>
          <View>
            {loading ? (
              <View style={{ marginVertical: 24 }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <Button
                onPress={handleLogin}
                title="Log in"
                style={styles.button}
              />
            )}
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
