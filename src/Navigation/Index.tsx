import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
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
      <HomeStack.Screen name="Products" component={Products} />
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
    </ProductStack.Navigator>
  );
};

const StartScreen = () => {
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

export default function Navigation() {
  const user: boolean = true;
  const stack = createStackNavigator();

  const AppTheme: any = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  return (
    <>
      <NavigationContainer theme={AppTheme}>
        {!user ? (
          <>
            <stack.Navigator>
              <stack.Screen name="start" component={StartScreen} />
            </stack.Navigator>
          </>
        ) : (
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
                options={{
                  title: "Products",
                  tabBarIcon: ({ color }) => (
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
});
