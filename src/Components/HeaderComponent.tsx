import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OwnText from "./Text/OwnText";
import { Colors } from "./Theme/Color";
import { Ionicons } from "@expo/vector-icons";
import { Typrography } from "./Theme/Typrography";
import { useNavigation } from "@react-navigation/native";

export const HeaderComponent = ({ routes }: any) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingLeft: 8,
      }}
    >
      {routes === "Home" ? (
        <View></View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>
            <Ionicons name="ios-arrow-back" size={24} color={Colors.black} />
          </Text>
        </TouchableOpacity>
      )}
      <OwnText preset="h5">{routes}</OwnText>
      <View></View>
    </SafeAreaView>
  );
};
