import React from "react";
import DashboardScreen from "../Screens/DashboardScreen";
import NotificationScreen from "../Screens/NotificationScreen";
import AccountScreen from "../Screens/AccountScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import baseColors from "../common/baseColors";

const TabNavigator = () => {
  const BottomTabNavigator = createMaterialBottomTabNavigator();

  return (
    <BottomTabNavigator.Navigator
      shifting={false}
      labeled={true}
      activeColor={baseColors.primaryColor}
      inactiveColor="#6b7280"
      barStyle={{ backgroundColor: "#fff" }}
    >
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name={focused ? "home" : "home"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "view-dashboard" : "view-dashboard-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Notice"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notice",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name={focused ? "bell" : "bell-o"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default TabNavigator;
