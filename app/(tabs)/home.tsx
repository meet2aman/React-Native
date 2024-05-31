import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/customs/SearchInput";
import Trending from "@/components/customs/Trending";
import EmptyState from "@/components/customs/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/customs/VideoCard";

const HomeScreen = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard videos={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 my-6 space-y-6">
            <View className="justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">One</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>
            <SearchInput
              value={""}
              handleChangeText={function (e: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <View className="w-full flex-1 pt-5 pb-8 mt-5">
              <Text className="text-gray-100 font-pregular text-lg mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No video found !"
            subTitle="Be the First one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
