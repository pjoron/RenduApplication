import { View, Text } from "react-native";
import React from "react";

export default function MiniHeader({ label }) {
  return (
    <View className="px-4 my-4 justify-between flex-row items-center">
      <Text
        className="text-xl text-blue-800 dark:text-white "
        style={{
          fontFamily: "WorkSansBold",
        }}
      >
        {label}
      </Text>

    </View>
  );
}
