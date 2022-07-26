import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { CategoryData } from "../../Data/CategoryData";
import OwnText from "../../Components/Text/OwnText";
import { useNavigation } from "@react-navigation/native";
import Button from "../../Components/Button";
import { HeaderComponent } from "../../Components/HeaderComponent";

export default function Category({ button }: { button: boolean }) {
  let count: number;
  if (button) {
    count = 4;
  } else {
    count = 6;
  }

  const navigation: any = useNavigation();
  return (
    <>
      {!button && (
        <HeaderComponent navigation={navigation} routes={"Categroy"} />
      )}
      <View style={{ flex: 1, marginVertical: 18 }}>
        <OwnText preset="h2" style={{ paddingLeft: 14 }}>
          Explore by category
        </OwnText>
        <View style={styles.category_area}>
          {CategoryData.slice(0, count).map(
            (data: CategroyDataTypes, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Products", {
                    slug: data.slug,
                    title: data.title,
                    category: true,
                  })
                }
                key={index}
                style={[
                  styles.category,
                  {
                    backgroundColor: data.color,
                    borderColor: data.borderColor,
                  },
                ]}
              >
                <Image style={styles.category_img} source={data.photo} />
                <OwnText preset="h4" style={styles.categroy_text}>
                  {data.title}
                </OwnText>
              </TouchableOpacity>
            )
          )}
          {button && (
            <Button
              onPress={() => navigation.navigate("Category")}
              title="See More"
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  category_area: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 16,
  },
  category: {
    textAlign: "center",
    width: 170,
    height: 170,
    paddingVertical: 20,
    margin: "auto",
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 16,
  },
  category_img: {
    width: 110,
    height: 75,
    paddingBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  categroy_text: {
    marginTop: 8,
    textAlign: "center",
    lineHeight: 26,
  },
});
