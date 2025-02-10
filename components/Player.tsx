import React, { useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoScreen() {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play/pause
  const handlePlayPause = async () => {
    if (videoRef.current) {
      const status:any = await videoRef.current.getStatusAsync();
      if (status.isPlaying) {
        videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  // Change screen to full width landscape mode
  const enterFullscreen = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    videoRef.current?.presentFullscreenPlayer();
  };

  return (
    <View className="flex-1 bg-black h-64">
      {/* Video Component - Full Width */}
      <Video
        ref={videoRef}
        source={{ uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
        className="w-full h-full"
        // resizeMode="contain"
        shouldPlay={false}
        useNativeControls
      />

      {/* Play & Fullscreen Buttons */}
      <View className="flex-row justify-center space-x-4 mt-4">
        <TouchableOpacity onPress={handlePlayPause} className="bg-gray-800 p-3 rounded-lg">
          <FontAwesome name={isPlaying ? "pause" : "play"} size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={enterFullscreen} className="bg-gray-800 p-3 rounded-lg">
          <FontAwesome name="expand" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}