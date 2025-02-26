import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import { lessons } from "@/constants/data";
import { LessonCard } from "@/components/Cards";
import { SafeAreaView } from "react-native-safe-area-context";

const CourseScreen = () => {

  const { id } = useLocalSearchParams();

  const handleCardPress = () => { };
  return (
    <View className="bg-white flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-2 h-12 bg-white">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} className="text-black" />
        </TouchableOpacity>
        {/* Centered Title */}
        <Text className="text-lg font-rubik-medium text-black absolute left-1/2 -translate-x-1/2">
          &nbsp;&nbsp;&nbsp;Lessons
        </Text>
      </View>
      <ScrollView className="bg-white flex-1 px-4">
        <TouchableOpacity onPress={()=> {router.push("/Videoscreen")}}>
          <View className="h-64 w-full bg-black rounded-md" />
        </TouchableOpacity>
        {/* Course Image Section */}
        {/* <VideoPlayer /> */}
        {/* <FontAwesomeIcon icon="fa-duotone fa-regular fa-eyes" /> */}

        {/* Badge + Stats */}
        <View className="flex-row mt-4 justify-evenly">
          {/* Course Stats */}
          <View className="flex-row">
            <FontAwesome name="heart" size={22} color="#9CA3AF" />
            <Text className="#6B7280 ml-2">5.7k</Text>
          </View>
          <View className="flex-row">
            <FontAwesome name="comments" size={22} color="#9CA3AF" />
            <Text className="#6B7280 ml-2">4.9</Text>
          </View>
        </View>
        <Text className="text-2xl font-rubik-bold text-black mt-4 mb-2">All Video</Text>
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} {...lesson} />
        ))}
        <View className="pb-8" />
      </ScrollView>
    </View>

  );
};

export default CourseScreen;