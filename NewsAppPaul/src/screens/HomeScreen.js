import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";


import TrendingNews from "../components/TrendingNews";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";

import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [breakingNews, SetBreakingNews] = useState([]);
  const [recommendedNews, SetRecommendedNews] = useState([]);

  const loadMoreData = async () => {
    // Fetch more data and append it to the existing newsMain array
    const moreData = await fetchMoreNewsData(); 
    
    SetRecommendedNews((prevData) => [...prevData, ...moreData]);
  };

  // Breaking News
  const { isLoading: isTrendingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      SetBreakingNews(data.articles);
    },
    onError: (error) => {
      console.log("Erreur breaking news", error);
    },
  });

  const { isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommededNewss"],
    queryFn: fetchRecommendedNews,
    onSuccess: (data) => {
      SetRecommendedNews(data.articles);
    },
    onError: (error) => {
      console.log("Erreur pour les recommander", error);
    },
  });

  // console.log("breakingNews", breakingNews);

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header />

        {/* Trending News */}

        {isTrendingLoading ? (
          <Loading />
        ) : (
          <View className="">
            <MiniHeader label="Les actualités" />
            <TrendingNews label="Breaking News" data={breakingNews} />
          </View>
        )}

        {/* News */}
        <View className="">
          <MiniHeader label="Mes recommendations" />

          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}
          >
            <NewsSection
              label="Recommendation"
              newsMain={recommendedNews}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
