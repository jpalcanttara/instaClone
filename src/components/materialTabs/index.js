import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

import Grid from "./Tabs/Grid";
import Marked from "./Tabs/Marked";

const Materiatabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Grid" component={Grid} />
      <Tab.Screen name="Marked" component={Marked} />
    </Tab.Navigator>
  );
};

export default Materiatabs;

const styles = StyleSheet.create({});
