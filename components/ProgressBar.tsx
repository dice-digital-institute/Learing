import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

interface ProgressBarProps {
  progress: number; // Progress value (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 800 }); // Smooth animation
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }));

  return (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
      <Animated.View style={animatedStyle} className="h-full bg-blue-500 rounded-full" />
      <Text className="text-center text-xs text-gray-700 mt-1">{progress}%</Text>
    </View>
  );
};

export default ProgressBar;