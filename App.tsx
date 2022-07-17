import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Navigation from "./src/Navigation/Index";

export default function App() {
  // use fonts
  const [loaded] = useFonts({
    PoppinsRegular: require("./assets/Fonts/Poppins-Regular.ttf"),
    GilroyBold: require("./assets/Fonts/Gilroy-Bold.ttf"),
    GilroyMedium: require("./assets/Fonts/Gilroy-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </>
  );
}
