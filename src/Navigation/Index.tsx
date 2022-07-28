import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home";
import Products from "../Screen/Products/Products";
import Cart from "../Screen/Cart/Cart";
import Profile from "../Screen/Profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Typrography } from "../Components/Theme/Typrography";
import { Colors } from "../Components/Theme/Color";
import OwnText from "../Components/Text/OwnText";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import Button from "../Components/Button";
import Login from "../Screen/Login/Login";
import SignUp from "../Screen/Login/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { OnAuthChange } from "../Redux/Action";
import Category from "../Screen/Home/Category";
import ProductDetails from "../Screen/Products/ProductDetails";
import Payment from "../Screen/Cart/Payment";
import Receipt from "../Screen/Cart/Receipt";
import EditProfile from "../Screen/Profile/EditProfile.Screen";
import History from "../Screen/Profile/History";
import Favourites from "../Screen/Profile/Favourites";
import Notification from "../Screen/Profile/Notification";

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Category" component={Category} />
      <HomeStack.Screen name="Products" component={Products} />
      <HomeStack.Screen name="ProductDetails" component={ProductDetails} />
      <HomeStack.Screen name="Products/best_seller" component={Products} />
      <HomeStack.Screen name="Products/new_products" component={Products} />
      <HomeStack.Screen
        name="Products/trending_products"
        component={Products}
      />
      <HomeStack.Screen name="Cart" component={Cart} />
      <HomeStack.Screen name="Payment" component={Payment} />
      <HomeStack.Screen name="Receipt" component={Receipt} />
    </HomeStack.Navigator>
  );
};

const ProductStack = createStackNavigator();
const ProductStackScreen = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProductStack.Screen
        name="Products"
        initialParams={{ title: "Products", slug: "", category: false }}
        component={Products}
      />
      <ProductStack.Screen name="ProductDetails" component={ProductDetails} />
      <ProductStack.Screen name="Cart" component={Cart} />
      <ProductStack.Screen name="Payment" component={Payment} />
      <ProductStack.Screen name="Receipt" component={Receipt} />
    </ProductStack.Navigator>
  );
};

const CartStack = createStackNavigator();
const CartStackScreen = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CartStack.Screen name="Cart" component={Cart} />
      <CartStack.Screen name="Payment" component={Payment} />
      <CartStack.Screen name="Receipt" component={Receipt} />
    </CartStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="ProfileInformation" component={EditProfile} />
      <ProfileStack.Screen name="History" component={History} />
      <ProfileStack.Screen name="Favourites" component={Favourites} />
      <ProfileStack.Screen name="Notification" component={Notification} />
    </ProductStack.Navigator>
  );
};

const StartScreen = ({ navigation }: any) => {
  const handleStarted = (): any => {
    navigation.navigate("Signup");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/get-started.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <OwnText preset="h1" style={styles.text}>
          Welcome {"\n"} To FreshMart
        </OwnText>
        <OwnText style={styles.startText}>
          Buy your daily groccery easily. the easiest way to share your family's
          groccery shopping
        </OwnText>
        <Button
          style={{
            marginVertical: 36,
            width: "95%",
            borderRadius: 14,
          }}
          title="Get started"
          onPress={handleStarted}
        />
      </ImageBackground>
    </View>
  );
};

const TabBarIcon = ({
  fontFamily,
  name,
  color,
}: {
  fontFamily?: string;
  name?: any;
  color?: string;
}): any => {
  if (fontFamily === "Ionicons") {
    return <Ionicons name="home" size={24} color={color} />;
  } else if (fontFamily === "Feather") {
    return <Feather name={name} size={24} color={color} />;
  } else if ((fontFamily = "FontAwesome")) {
    return <FontAwesome name={name} size={24} color={color} />;
  }
};

export const LoadingSpinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default function Navigation() {
  const stack = createStackNavigator();

  const AppTheme: any = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };
  const dispatch: any = useDispatch();

  const { email } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(OnAuthChange());
  }, []);

  if (email?.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <NavigationContainer theme={AppTheme}>
        {email?.user ? (
          <>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.black,
                tabBarLabelStyle: {
                  fontSize: 14,
                  fontFamily: Typrography.regular,
                },
                tabBarStyle: { height: 60 },
              }}
            >
              <Tab.Screen
                options={{
                  title: "Home",

                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      fontFamily="Ionicons"
                      name={"home"}
                      color={color}
                    />
                  ),
                }}
                name="HomeTab"
                component={HomeStackScreen}
              />
              <Tab.Screen
                // go back to home screen
                options={{
                  title: "Products",

                  tabBarIcon: ({ color }: any) => (
                    <TabBarIcon
                      fontFamily="FontAwesome"
                      name={"shopping-basket"}
                      color={color}
                    />
                  ),
                }}
                name="ProductsTab"
                component={ProductStackScreen}
              />
              <Tab.Screen
                options={{
                  title: "Cart",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      fontFamily="Feather"
                      name={"shopping-cart"}
                      color={color}
                    />
                  ),
                }}
                name="CartTab"
                component={CartStackScreen}
              />
              <Tab.Screen
                options={{
                  title: "Profile",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      fontFamily="Feather"
                      name={"user"}
                      color={color}
                    />
                  ),
                }}
                name="ProfileTab"
                component={ProfileStackScreen}
              />
            </Tab.Navigator>
          </>
        ) : (
          <>
            <stack.Navigator screenOptions={{ headerShown: false }}>
              <stack.Screen name="start" component={StartScreen} />
              <stack.Screen name="Login" component={Login} />
              <stack.Screen name="Signup" component={SignUp} />
            </stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </>
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
    color: Colors.white,
    paddingVertical: 16,
    textAlign: "center",
  },
  startText: {
    color: Colors.black,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
