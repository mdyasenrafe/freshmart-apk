import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Navigation from "./src/Navigation/Index";
import { Provider } from "react-redux";
import AuthStore from "./store";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";

export default function App() {
  // how to resolve this error ViewPropTypes will be removed from React Native

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
    <Provider store={AuthStore}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}
