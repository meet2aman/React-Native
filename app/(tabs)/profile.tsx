import { SafeAreaView, Text, TextInput, View } from "react-native";
import React from "react";

const profile = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  return (
    <View className="flex justify-center items-center rounded-full">
      <Text className="text-3xl bg-orange-500 text-center py-2 px-8 inline rounded font-bold capitalize mt-10">
        profile
      </Text>
      <Text className="text-3xl bg-orange-500 text-center py-2 px-8 inline rounded font-bold capitalize mt-10">
        Aman Kushwaha
      </Text>
      <Text className="text-3xl bg-orange-500 text-center py-2 px-8 inline rounded font-bold capitalize mt-10">
        profile
      </Text>
      <SafeAreaView>
        <TextInput
          className="border border-red-500 p-3 mt-5 rounded-full w-[20rem]"
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter your Email"
        />
      </SafeAreaView>
      <Text>{text}</Text>
    </View>
  );
};

export default profile;
