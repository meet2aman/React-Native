import { useState } from "react";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import * as Animatable from "react-native-animatable";
import { WebView } from "react-native-webview";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "@/constants";

// Interface for the creator object
interface Creator {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $tenant: string;
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  password: string;
  username: string;
}

// Interface for the main item object
interface Item {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $tenant: string;
  $updatedAt: string;
  creator: Creator;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}
interface TrendingItemProps {
  activeItem: string;
  item: Item;
}

interface TrendingProps {
  posts: Item[];
}

interface ViewableItem {
  index: number;
  isViewable: boolean;
  item: Item;
  key: string;
}

// Define animations
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const isVimeoUrl = (url: string) => {
    return url.includes("vimeo.com");
  };
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setPlay(false);
    }
  };

  return (
    <>
      <Animatable.View
        className="mr-5"
        //@ts-ignore
        animation={activeItem === item.$id ? zoomIn : zoomOut}
        duration={500}
      >
        {play ? (
          isVimeoUrl(item.video) ? (
            <WebView
              style={styles.videoContainer}
              source={{ uri: item.video }}
              javaScriptEnabled
              domStorageEnabled
            />
          ) : (
            <Video
              style={styles.videoContainer}
              source={{ uri: item.video }}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              shouldPlay
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          )
        ) : (
          <TouchableOpacity
            className="relative flex justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{
                uri: item.thumbnail,
              }}
              className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />

            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Animatable.View>
    </>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  videoContainer: {
    width: 208,
    height: 288,
    borderRadius: 33,
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    zIndex: -999,
  },
});
