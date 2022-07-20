import { View, Text } from "react-native";
import React from "react";
import { CategoryData } from "../../Data/CategoryData";
import { FlatList } from "react-native-gesture-handler";
import OwnText from "../../Components/Text/OwnText";

export default function Category() {
  const handleRender = ({ item }: any) => {
    const { title } = item;
    return (
      <View>
        <OwnText>{title}</OwnText>
      </View>
    );
  };

  return (
    <View>
      <Text>Category</Text>
      <FlatList
        data={CategoryData}
        renderItem={handleRender}
        keyExtractor={(item: any) => item.title}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
      />
    </View>
  );
}
