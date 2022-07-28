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
import { StripeProvider } from "@stripe/stripe-react-native";

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
    <StripeProvider publishableKey="pk_test_51Jvkj6FkcxhOaq5HgaV9EVYBhC1EMZgKKEzjKBX61uJWQ3UJyDPQonWazo8pBE81bfhkTT8aRo0WnebbGfXxU2eB00yRxiw1NL">
      <Provider store={AuthStore}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
          <Toast />
        </SafeAreaProvider>
      </Provider>
    </StripeProvider>
  );
}
