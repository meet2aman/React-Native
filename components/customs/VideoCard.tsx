import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import WebView from "react-native-webview";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { ActionData } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalProvider";
interface Creator {
  username: string | "";
  avatar: string;
}

interface VideoData {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator | null; // Allow creator to be null
}
interface VideoCardProps {
  videos: VideoData;
  profileFlag?: "profile" | "bookmark" | "home" | null;
  fn: (data: ActionData) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ videos, profileFlag, fn }) => {
  const [play, setPlay] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { $id, title, thumbnail, video: videoUrl, creator } = videos;
  const isVimeoUrl = (url: string) => {
    return url.includes("vimeo.com");
  };
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setPlay(false);
    }
  };

  const renderMenuOptions = () => {
    switch (profileFlag) {
      case "home":
        return (
          <TouchableOpacity
            onPress={() =>
              fn({ action: "like", postId: $id, userId: user.$id })
            }
            className="flex flex-row justify-start items-center gap-4 "
          >
            <Image
              source={icons.bookmark}
              className="h-5 w-5 fill-green-500 "
              resizeMode="contain"
            />
            <Text className="text-gray-100 text-lg font-pregular ">Save</Text>
          </TouchableOpacity>
        );
      case "profile":
        return (
          <TouchableOpacity
            className="flex flex-row justify-start items-center gap-4"
            onPress={() => fn({ action: "delete", postId: $id })}
          >
            <Image
              source={icons.trash}
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text className="text-gray-100 text-lg font-pregular">Delete</Text>
          </TouchableOpacity>
        );
      case "bookmark":
        return (
          <TouchableOpacity
            className="flex flex-row justify-start items-center gap-4"
            onPress={() =>
              fn({ action: "dislike", postId: $id, userId: user.$id })
            }
          >
            <Image
              source={icons.unsave}
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text className="text-gray-100 text-lg font-pregular">Remove</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-col items-center mb-14 px-4">
      <View className="flex-row gap-3 items-center">
        <View className="justify-center flex-row flex-1 items-center">
          <View className="w-[46px] h-[46px] rounded-full justify-center items-center border-2 border-secondary  p-0.5">
            <Image
              source={{
                uri: creator?.avatar || "https://github.com/shadcn.png",
              }}
              resizeMode="cover"
              className="w-full h-full rounded-full"
            />
          </View>
          <View className="flex-1 justify-center ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="font-pregular text-xs text-gray-100 "
              numberOfLines={1}
            >
              {creator?.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="items-center"
          onPress={() => setToggle((prev) => !prev)}
        >
          <Image
            source={icons.menu}
            className="h-5 w-5 "
            resizeMode="contain"
          />
        </TouchableOpacity>
        {toggle && (
          <View
            style={{ zIndex: 999 }}
            className="bg-[#1E1E2D] border border-[#232533] rounded-2xl flex gap-2 px-6 py-4 absolute right-0 top-14 z-50"
          >
            {renderMenuOptions()}
          </View>
        )}
      </View>
      {play ? (
        isVimeoUrl(videoUrl) ? (
          <WebView
            style={styles.videoContainer}
            source={{ uri: videoUrl }}
            javaScriptEnabled
            domStorageEnabled
          />
        ) : (
          <Video
            style={styles.videoContainer}
            source={{ uri: videoUrl }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        )
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center -z-50"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 -z-30"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  videoContainer: {
    width: 400,
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    zIndex: -999,
  },
});
