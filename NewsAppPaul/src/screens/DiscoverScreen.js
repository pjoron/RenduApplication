import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";

import TrendingNews from "../components/TrendingNews";
import Header from "../components/Header/Header";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { fetchDiscoverNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function DiscoverScreen() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState("Architecture");
  const [newsMain, setNewsMain] = useState([]);
  const [discoverNews, setDiscoverNews] = useState([]);

  const categories = [
    { id: 1, title: "business" },
    { id: 2, title: "entertainment" },
    { id: 3, title: "general" },
    { id: 4, title: "health" },
    { id: 5, title: "science" },
    { id: 6, title: "sports" },
    { id: 7, title: "technology" },
  ];

  const trad = [
    { id: 1, title: "Affaires" },
    { id: 2, title: "Divertissement" },
    { id: 3, title: "Général" },
    { id: 4, title: "Santé" },
    { id: 5, title: "Science" },
    { id: 6, title: "Sports" },
    { id: 7, title: "Technologie" },

  ];

  useEffect(() => {
    console.log("active category", activeCategory);
  }, [activeCategory]);

  const handleChangeCategory = (category) => {
    // getRecipes(category);
    setActiveCategory(category);
    setDiscoverNews([]);
    console.log("category", category);
  };

  const { isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory], // Include the category as part of the key
    queryFn: () => fetchDiscoverNews(activeCategory), // You can skip the query if the category is "business"
    onSuccess: (data) => {
      // Filter out articles with title "[Removed]"
      const filteredNews = data.articles.filter(  
        (article) => article.title !== "[Removed]"
      );
      setDiscoverNews(filteredNews);
    },
    onError: (error) => {
      console.log("Error fetching discover news", error);
    },
  });

  return (
    <SafeAreaView className="pt-8 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-blue-800 dark:text-white"
            style={{
              fontFamily: "WorkSansBold",
              textAlign:"center",
            }}
          >
            Découvrez par catégories 
          </Text>


        </View>


        {/* Categories */}
        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View className="h-full">

          {isDiscoverLoading ? (
            <View className="mt-8 flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
                paddingTop:hp(5),
              }}
            >
              <NewsSection
  //J'aimerai afficher les titres en français

                trad={trad}
                categories={categories}
                newsMain={discoverNews}
                label="Discovery"
              />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
