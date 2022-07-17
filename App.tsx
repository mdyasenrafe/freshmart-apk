import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function App() {
  // use fonts
  const [loaded] = useFonts({
    PoppinsRegular: require("./assets/Font/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/Font/Gilroy-Bold.ttf"),
    PoppinsSemiBold: require("./assets/Font/Gilroy-Medium.ttf"),
  });
  console.log(loaded);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground
        source={require("./assets/get-started.png")}
        // resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>Welcome {"\n"} To FreshMart</Text>
      </ImageBackground>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "PoppinsBold",
    paddingVertical: 16,
    fontSize: 32,
    textAlign: "center",
  },
});
