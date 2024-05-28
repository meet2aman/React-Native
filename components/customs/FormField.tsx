import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { icons } from "@/constants";

const FormField = ({
  placeholder,
  value,
  title,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}: {
  placeholder: string;
  otherStyles: any;
  keyboardType: string;
  value: string;
  title: string;
  handleChangeText: (e: string) => void;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className={`space-y-2 ${otherStyles} w-full`}>
      <Text className="text-base text-gray-100 font-psemibold mb-2 ml-1">
        {title}
      </Text>
      <View className="!w-full h-16 px-4 bg-black-100 border-2 border-black-100 focus:border-secondary-200 rounded-2xl items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base w-full items-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
