import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import "@/global.css";
import { useFonts } from "expo-font";
import { GlobalProvider } from "@/context/GlobalProvider";
import { Toaster } from "burnt/web";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  React.useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  if (!fontsLoaded && !error) return null;

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: "black",
          borderRadius: "100%",
          borderLeftWidth: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          color: "white",
          fontSize: 17,
          fontWeight: "500",
        }}
        text2Style={{
          fontSize: 18,
          fontWeight: "600",
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    tomatoToast: ({ text1, props }: { text1: string; props: any }) => (
      <View className="flex justify-center items-center px-6 py-4 border border-green-500 max-w-[80%]  rounded-full bg-black">
        <Text className="text-gray-100 text-md font-pregular">{text1}</Text>
      </View>
    ),
    errorToast: ({ text1, props }: { text1: string; props: any }) => (
      <View className="flex justify-center items-center px-6 py-4 border border-red-500 max-w-[80%]  rounded-full bg-black">
        <Text className="text-gray-100 text-md font-pregular">{text1}</Text>
      </View>
    ),
  };

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>

      <Toast
        //@ts-ignore
        config={toastConfig}
      />
    </GlobalProvider>
  );
};

export default RootLayout;
