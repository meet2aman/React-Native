import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/customs/SearchInput";
import Trending from "@/components/customs/Trending";
import EmptyState from "@/components/customs/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/customs/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard videos={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 my-6">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mb-8 mt-6">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No video found !" subTitle="No video found!" />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
