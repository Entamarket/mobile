import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "../navigations/HomeStackNavigator";

const AppNavContainer = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavContainer;
