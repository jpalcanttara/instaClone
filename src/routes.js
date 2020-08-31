import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Userinfo from "./pages/Userinfo";
import logo from "./assets/instagram.png";

const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: <Image source={logo} />,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HomeStack.Screen name="Feed" component={Feed} />
      <HomeStack.Screen name="Userinfo" component={Userinfo} />
    </HomeStack.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeStackScreen") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
