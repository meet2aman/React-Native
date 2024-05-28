import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
const HomeScreen = () => {
  return (
    <SafeAreaView
      className="!bg-primary"
      style={{ backgroundColor: "#161622" }}
    >
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-blue-600">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="px-4 my-6 space-y-6">
            <View className="justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">One</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
