import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/customs/CustomButton";
import { StatusBar } from "expo-status-bar";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "@/context/GlobalProvider";

const RootLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;
  return (
    <SafeAreaView
      className="!bg-primary h-full"
      style={{ backgroundColor: "#161622" }}
    >
      <ScrollView contentContainerStyle={{ height: `100%` }}>
        <View className="w-full min-h-[85vh] items-center justify-center px-[1.2rem]">
          <Image
            source={images.logo}
            className="w-[130px] h-[48px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="capatalize text-3xl text-white font-bold text-center">
              Discover Endless Possibilities With {""}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 text-sm font-pregular  text-center mt-7">
            Where Creativity Meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={"w-full mt-7"}
            textStyles={""}
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default RootLayout;
