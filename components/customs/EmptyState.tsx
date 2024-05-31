import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
const EmptyState = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <View className="justify-center px-4 items-center">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="text-white font-psemibold text-center text-2xl mt-2">
        {title}
      </Text>
      <Text className="text-gray-100 font-pregular text-sm">{subTitle}</Text>
      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles={"w-full my-5"}
        textStyles={""}
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
