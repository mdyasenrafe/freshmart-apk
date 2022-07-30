import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";
import { Typrography } from "../../Components/Theme/Typrography";
import { Colors } from "../../Components/Theme/Color";
import Toast from "react-native-toast-message";
import Button from "../../Components/Button";
import { Input, InputPassword } from "../../Components/Input";
import { useDispatch } from "react-redux";
const validator = require("validator");
import {
  EmailSignUp,
  EmailFailAction,
  EmailSuccessAction,
} from "../../Redux/Action";
import { SignupApi } from "../../Api";

export default function SignUp({ navigation }: any) {
  const [ownEmail, setOwnEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordEye, setPassowrdEye] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  const handleSignup = (): void => {
    const check = validator.isEmail(ownEmail);
    if (ownEmail !== "" && password !== "") {
      if (check) {
        setEmailError(false);
        setLoading(true);
        dispatch(EmailSignUp(ownEmail, password))
          .then(async (res: any) => {
            let emailSignUpBodyData: EmailSignUPBodyData = {
              email: ownEmail,
              password: password,
              password_repeat: password,
              name: name,
              method: "email",
              device: "app",
            };
            const response = await SignupApi(emailSignUpBodyData);
            if (response.error == false) {
              setLoading(false);
              dispatch(EmailSuccessAction(response?.data));
              Toast.show({
                type: "success",
                text1: "signup successfully",
              });
              navigation.navigate("EditProfile");
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
                onChangeText={(e: string) => setOwnEmail(e)}
                style={{ marginBottom: 16 }}
              />
              {emailError && (
                <OwnText style={{ color: Colors.error, marginBottom: 8 }}>
                  Please Enter A Valid Email
                </OwnText>
              )}
              <InputPassword
                onChangeText={(e: string) => setPassword(e)}
                passwordEye={passwordEye}
                setPassowrdEye={(e: boolean) => setPassowrdEye(e)}
              />
            </View>
            <View>
              {loading ? (
                <View style={{ marginVertical: 24 }}>
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <Button
                  onPress={handleSignup}
                  title="Sign up"
                  style={styles.button}
                />
              )}

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
