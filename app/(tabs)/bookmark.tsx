import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/customs/SearchInput";
import { useLocalSearchParams } from "expo-router";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import CustomButton from "@/components/customs/CustomButton";
import Toast from "react-native-toast-message";
const BookmarkScreen = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Saved Videos</Text>
        <View className="mb-8 mt-6">
          <SearchInput initialQuery={query} />
        </View>
        <CustomButton
          title={"Show Toast"}
          handlePress={function (): void {
            Toast.show({
              type: "tomatoToast",
              text1: "This is some something 👋",
              topOffset: 50,
            });
          }}
          containerStyles={""}
          textStyles={""}
          isLoading={false}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookmarkScreen;
