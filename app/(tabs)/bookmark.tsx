import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/customs/SearchInput";
import { useLocalSearchParams } from "expo-router";
import { fetchSavedVideos, searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import CustomButton from "@/components/customs/CustomButton";
import Toast from "react-native-toast-message";
import VideoCard from "@/components/customs/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import EmptyState from "@/components/customs/EmptyState";
import { ActionData } from "@/lib/functions";

const BookmarkScreen = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const [likedPosts, setLikedPosts] = useState([]);
  useEffect(() => {
    refetch();
  }, [query]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchSavedVideos(user.$id); // Replace with actual userId
        //@ts-ignore
        setLikedPosts(response);
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    };

    fetchPosts();
  }, [user.$id]);

  const handleUnsaved = async (data: ActionData) => {
    if (data.action === "dislike") {

    }
  };

  console.log("Response of likedPost::", likedPosts);

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Saved Videos</Text>
        <View className="mb-8 mt-6">
          <SearchInput initialQuery={query || ""} />
        </View>
        {/* <CustomButton
          title={"Show Toast"}
          handlePress={function (): void {
            Toast.show({
              type: "errorToast",
              text1: "This is some something 👋",
              topOffset: 60,
            });
          }}
          containerStyles={""}
          textStyles={""}
          isLoading={false}
        ></CustomButton> */}
        <FlatList
          data={likedPosts}
          keyExtractor={(item: any) => item.$id}
          renderItem={({ item }) => (
            <VideoCard videos={item} profileFlag={"bookmark"} fn={handleUnsaved} />
          )}
          ListEmptyComponent={() => (
            <EmptyState title="No Saved Video" subTitle="No video found!" />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookmarkScreen;
