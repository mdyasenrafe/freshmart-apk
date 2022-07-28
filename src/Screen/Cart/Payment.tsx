import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { useSelector } from "react-redux";
import {
  CardField,
  createPaymentMethod,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { Input } from "../../Components/Input";
import { Colors } from "../../Components/Theme/Color";
import Button from "../../Components/Button";
import Toast from "react-native-toast-message";
import { createPaymentIntentApi, paymentAddApi } from "../../Api";
import { LoadingSpinner } from "../../Navigation/Index";
import PhoneInput from "react-native-phone-number-input";

interface CardDetailsType {
  brand: string;
  complete: boolean;
  expiryMonth: number;
  expiryYear: number;
  last4: string;
  postalCode?: string;
  validCVC: string;
  validExpiryDate?: string;
  validNumber?: string;
}

export default function Payment({ navigation, route }: any) {
  const totalAmount = route.params.totalAmount;
  const [cardDetails, setCardDetails] = useState<CardDetailsType>();

  // const [email, setEmail] = useState();
  const { email, cart } = useSelector((state: any) => state);
  const { confirmPayment, loading } = useConfirmPayment();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const phoneInput = useRef(null);
  let productBodyData = [];

  const fetchPaymentIntentClientSecret = async () => {
    let bodyData = {
      totalAmount: totalAmount,
      email: email?.user?.email,
      name: email?.user?.name,
    };

    const response = await createPaymentIntentApi(bodyData);
    return response.clientSecret;
  };

  let status: string = "payment success";

  for (const product of cart) {
    productBodyData.push({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
      productPhoto: product.productPhoto,
    });
  }

  let paymentBodyData = {
    userName: email?.user?.name,
    userEmail: email?.user?.email,
    userId: email?.user?._id,
    totalAmount: totalAmount.toFixed(4),
    products: productBodyData,
    paymentId: "",
  };

  const handlePay = async () => {
    if (phoneNumber != "" && country !== "" && city !== "" && address !== "") {
      if (cardDetails) {
        if (!cardDetails?.complete) {
          Toast.show({
            type: "error",
            text1: "Please fill all the card details correctly",
          });
          return;
        } else if (cardDetails?.validNumber === "Invalid") {
          Toast.show({
            type: "error",
            text1: "Please enter valid card number",
          });
        } else if (cardDetails?.validExpiryDate === "Invalid") {
          Toast.show({
            type: "error",
            text1: "Please enter valid expiry date",
          });
        } else if (cardDetails?.validCVC === "Invalid") {
          Toast.show({
            type: "error",
            text1: "Please enter valid cvc",
          });
        } else {
          const key: string = await fetchPaymentIntentClientSecret();
          const { paymentIntent, error } = await confirmPayment(key, {
            type: "Card",
            billingDetails: {
              email: email?.user?.email,
              name: email?.user?.name,
            },
          });
          if (error) {
            Toast.show({
              type: "error",
              text1: error.message,
            });
          } else if (paymentIntent?.status === "Succeeded") {
            paymentBodyData.paymentId = paymentIntent.id;
            const res = await paymentAddApi(paymentBodyData);
            if (res.error === true) {
            } else {
              Toast.show({
                type: "success",
                text1: "Payment Successful",
              });
              navigation.navigate("Receipt", { title: "Succeeded" });
            }
          } else if (paymentIntent?.status === "Processing") {
            const res = await paymentAddApi(paymentBodyData);
            if (res.error === false) {
              Toast.show({
                type: "success",
                text1: "Payment Processing",
              });
              navigation.navigate("Receipt", { title: "Processing" });
            }
          } else {
            const res = await paymentAddApi(paymentBodyData);
            if (res.error === false) {
              Toast.show({
                type: "error",
                text1: "Payment Failed",
              });
              navigation.navigate("Receipt", { title: "Failure" });
            }
          }
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Please fill all the card details",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Please fill all the details",
      });
    }
  };

  return (
    <>
      <HeaderComponent routes="Payment" />
      <ScrollView>
        <View style={styles.container}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            value={email?.user?.email}
            style={styles.input}
            editable={false}
          />
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="BD"
            layout="first"
            autoFocus
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.textInput}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Input
              placeholder="Country"
              style={[styles.input, { width: "45%" }]}
              onChangeText={(text: string) => setCountry(text)}
            />
            <Input
              onChangeText={(text: string) => setCity(text)}
              placeholder="City"
              style={[styles.input, { width: "45%" }]}
            />
          </View>

          <Input
            onChangeText={(text: string) => setAddress(text)}
            placeholder="Street Address"
            style={styles.input}
          />
          <CardField
            postalCodeEnabled={true}
            placeholder={{ number: "4242 4242 4242 4242" }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(cardDetails: any) => {
              setCardDetails(cardDetails);
            }}
          />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Button
              disable={loading}
              title={"Pay Now"}
              style={styles.button}
              onPress={handlePay}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  cardContainer: {
    height: 50,
  },
  button: {
    marginVertical: 24,
    borderRadius: 8,
    width: "95%",
  },
  phoneContainer: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    padding: 10,
    color: Colors.black,
    width: "100%",
    marginBottom: 16,
    height: 54,
  },
  textInput: {
    paddingVertical: 0,
    backgroundColor: "#efefef",
  },
});
