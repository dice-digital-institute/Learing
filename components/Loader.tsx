import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useLoading } from "@/stores/applicationStore";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
  overlay?: boolean; // ✅ If true, covers the whole screen
}

const Loader: React.FC<LoaderProps> = ({ size = "large", color = "#6200EE", overlay = false }) => {
  const {isLoading} = useLoading();
    if(isLoading){
        if (overlay) {
        return (
          <View style={styles.overlay}>
            <ActivityIndicator size={size} color={color} />
          </View>
        );
      }
    }
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // ✅ Semi-transparent background
    zIndex: 1
  },
});

export default Loader;