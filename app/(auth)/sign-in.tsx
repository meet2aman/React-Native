import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "@/constants";
import FormField from "@/components/customs/FormField";
import CustomButton from "@/components/customs/CustomButton";
import { createUser, getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignInScreen = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const handleSignIn = async () => {
    if (!form.email || !form.password)
      return Alert.alert("Error", "Please fill all required fields");
    setIsSubmit(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);
      Alert.alert("Success", "Logged in successfully");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmit(false);
    }
  };
  return (
    <SafeAreaView
      className="!bg-primary h-full"
      style={{ backgroundColor: "#161622", height: "100%" }}
    >
      <ScrollView>
        <View className="w-full flex justify-center items-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <View className="relative mt-5">
            <Text className="capatalize text-2xl text-gray-100 font-psemibold">
              Log In to {""}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <FormField
            placeholder=""
            value={form.email}
            title="Email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            placeholder=""
            value={form.password}
            title="Password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <CustomButton
            isLoading={isSubmit}
            title="Sign In"
            handlePress={handleSignIn}
            containerStyles="mt-7"
            textStyles="px-4 py-1"
          />
          <View className="justify-center pt-5 flex-row gap-2 items-center">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account ?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-secondary font-psemibold underline"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
1;
