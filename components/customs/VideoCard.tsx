import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import WebView from "react-native-webview";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";

interface Creator {
  username: string;
  avatar: string;
}

interface VideoData {
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
}

interface VideoCardProps {
  videos: VideoData;
}

const VideoCard: React.FC<VideoCardProps> = ({ videos }) => {
  const [play, setPlay] = useState(false);
  const {
    title,
    thumbnail,
    video: videoUrl,
    creator: { username, avatar },
  } = videos;
  const isVimeoUrl = (url: string) => {
    return url.includes("vimeo.com");
  };
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setPlay(false);
    }
  };
  return (
    <View className="flex-col items-center mb-14 px-4">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center flex-row flex-1 items-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center  p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
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
              {username}
            </Text>
          </View>
        </View>
        <View className="">
          <Image
            source={icons.menu}
            className="h-5 w-5 "
            resizeMode="contain"
          />
        </View>
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
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
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
    // backgroundColor: "rgba(255, 255, 255, 0.1)",
    zIndex: -999,
  },
});
