import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }: { initialQuery: any }) => {
  const pathname = usePathname();
  const [query, setQuery] = React.useState(initialQuery || "");

  return (
    <View
      className="!w-full h-16 px-4 bg-black-100 border-2 border-black-100 focus:border-secondary-200 rounded-2xl items-center flex-row space-x-4"
      // style={{ borderColor: "#FF9C01" }}
    >
      <TextInput
        className="text-base border-black-100 focus:border-secondary-200 mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              `Missing Query `,
              "Please input something to search result across database"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
