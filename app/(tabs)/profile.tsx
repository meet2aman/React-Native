import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/customs/SearchInput";
import Trending from "@/components/customs/Trending";
import EmptyState from "@/components/customs/EmptyState";
import { getUserPosts, searchPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/customs/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/customs/InfoBox";
import Toast from "react-native-toast-message";

const Search = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const handleLogout = async () => {
    await signOut();
    Toast.show({
      type: "success",
      text1: "Logged Out Successfully",
      topOffset: 50,
    });
    setUser(null);
    setIsLoggedIn(false);
    router.replace("sign-in");
  };

  // useEffect(() => {
  //   refetch();
  // }, [query]);

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard videos={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="flex flex-row gap-4 w-full justify-end items-center mb-10 px-2"
              onPress={handleLogout}
            >
              <Text className="text-gray-100 font-psemibold text-lg">
                Logout
              </Text>
              <Image
                resizeMode="contain"
                source={icons.logout}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-full justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex-row mt-5">
              <InfoBox
                title={posts.length || 0}
                subTitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title={"1.3k"}
                subTitle="Followers"
                containerStyles=""
                titleStyles="text-lg"
              />
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
