import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { BannerData } from "../../Data/BannerData";
import OwnText from "../../Components/Text/OwnText";
import Button from "../../Components/Button";
import Swiper from "react-native-swiper";
import { Colors } from "../../Components/Theme/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Banner() {
  const navigation: any = useNavigation();
  return (
    <View>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        activeDot={
          <View style={[styles.dot, { backgroundColor: "#3848EC" }]} />
        }
        dot={<View style={[styles.dot, { backgroundColor: Colors.black }]} />}
      >
        {BannerData.map((item: BannerDataType, index: number) => (
          <ImageBackground
            source={item.photo}
            resizeMode="cover"
            style={styles.image}
            key={index}
          >
            <View style={{ paddingLeft: 5 }}>
              <OwnText preset="h4">{item.title}</OwnText>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Products", {
                    slug: item.slug,
                    title: item.bannerTitle,
                    category: true,
                  })
                }
              >
                <Button
                  title="Order Now"
                  color={item.btnTextColor}
                  style={{
                    backgroundColor: item.btnColor,
                    borderRadius: 14,
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: 225,
  },
});
