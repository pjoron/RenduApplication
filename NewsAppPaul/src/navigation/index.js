import { Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import NewsDetails from "../screens/NewsDetails";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import { useColorScheme } from "nativewind";

const android = Platform.OS === "android";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Accueil") {
              iconName = "home";
            } else if (route.name === "Découvrir") {
              iconName = "compass-outline";
            } else if (route.name === "Sauvegarder") {
              iconName = "bookmark-outline";
            } else if (route.name === "Rechercher") {
              iconName = "search-outline";
            }

            const customizeSize = 25;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "blue" : "gray"}
              />
            );
          },

          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "WorkSansRegular",
          },
          tabBarStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
          },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Découvrir" component={DiscoverScreen} />
        <Tab.Screen name="Sauvegarder" component={SavedScreen} />
        <Tab.Screen name="Rechercher" component={SearchScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
