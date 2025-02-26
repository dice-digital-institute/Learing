import React from "react";
import { StatusBar, Platform, View } from "react-native";

const StatusBarComponent = () => {
  return (
    <View>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} // ✅ Different styles for iOS & Android
        backgroundColor={Platform.OS === "android" ? "#6200EE" : "transparent"} // ✅ Background for Android only
        translucent
      />
    </View>
  );
};

export default StatusBarComponent;