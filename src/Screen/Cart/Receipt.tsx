import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { HeaderComponent } from "../../Components/HeaderComponent";
import { ScrollView } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";
import Button from "../../Components/Button";

export default function Receipt({ navigation, route }: any) {
  const title: string = route.params.title;
  return (
    <>
      <HeaderComponent routes={"Payment Recipt"} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          {title === "Failure" ? (
            <Image
              source={require("../../../assets/images/fail.jpg")}
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../../../assets/images/success.png")}
              style={styles.image}
            />
          )}
          <View style={{ margin: 16 }}>
            {/* succfully order text */}
            <OwnText style={{ fontSize: 17 }}>
              {title === "Failure"
                ? "Your Payment was not successful. can you please try again. Thank you for your patience."
                : "Your Payment was sucessfully completed. You will get your order soon. Thank you for shopping with us."}
            </OwnText>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onPress={() => navigation.navigate("Home")}
                style={{ marginTop: 24 }}
                title="Go to Home"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
