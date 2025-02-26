import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CourseScreen = () => {

  const { id } = useLocalSearchParams();

  return (
    <View className="bg-white flex-1">
      <ScrollView className="bg-white flex-1 px-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          {/* Back Button */}
          <TouchableOpacity onPress={()=> router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={24} className="text-black" />
          </TouchableOpacity>

          {/* Centered Title */}
          <Text className="text-lg font-rubik-medium text-black absolute left-1/2 -translate-x-1/2">
            Courses
          </Text>
        </View>

        <View className="flex items-center justify-between h-full">
          <View className="">
            {/* Course Details */}
            <Text className="text-2xl font-rubik-bold text-black">User Interface</Text>
            {/* Badge + Stats */}
            <View className="flex-row items-center mt-4">
              {/* Bestseller Badge */}
              <View className="bg-blue-700 px-4 py-2 rounded-lg mr-4">
                <Text className="text-white text-xs font-bold">BESTSELLER</Text>
              </View>
              {/* Course Stats */}
              <View className="flex-row items-center space-x-3 ml-4">
                <View className="flex-row items-center mr-10">
                  <FontAwesome name="user" size={22} color="#9CA3AF" />
                  <Text className="#6B7280 ml-2">5.7k</Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="star" size={22} color="#9CA3AF" />
                  <Text className="#6B7280 ml-2">4.9</Text>
                </View>
              </View>
            </View>
            <Text className="text-gray-600 text-base mt-2 leading-relaxed rubik-medium">
              The user interface (UI) is the point of human-computer interaction and communication in a device. This can include display screens, keyboards, a mouse, and the appearance of a desktop.
            </Text>

            {/* Course Includes Section */}
            <Text className="text-lg text-black mt-4 font-rubik-bold">The Course Includes</Text>
            <View className="space-y-3 mt-2">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-blue-500 rounded-lg flex justify-center items-center">
                  <MaterialCommunityIcons name="video" size={22} color="#FFF" />
                </View>
                <Text className="ml-2 text-gray-700 rubik-light">20 Hours Video</Text>
              </View>
              <View className="flex-row items-center mt-4">
                <View className="w-12 h-12 bg-blue-500 rounded-lg flex justify-center items-center">
                  <MaterialCommunityIcons name="book" size={22} color="#FFF" />
                </View>
                <Text className="ml-2 text-gray-700 rubik-light">Total 60+ Lessons</Text>
              </View>
            </View>
            <Text className="text-lg font-bold text-black mt-6 font-rubik-bold">Instructor</Text>
            <View className="flex-row items-center space-x-3 mt-3">
              {["https://randomuser.me/api/portraits/men/1.jpg",
                "https://randomuser.me/api/portraits/men/2.jpg",
                "https://randomuser.me/api/portraits/women/1.jpg",
                "https://randomuser.me/api/portraits/men/3.jpg"].map((uri, index) => (
                  <Image key={index} source={{ uri }} className="w-16 h-16 mr-[-6] rounded-full" />
                ))}
              {/* Add More Button */}
              <TouchableOpacity className="w-14 h-14 border rounded-full mr-[-20] flex items-center justify-center">
                <Text className="text-lg font-bold text-gray-600">+10</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Text className="text-lg font-bold text-black mt-6 font-rubik-bold mb-4">Reviews</Text>
      {ReviewsComments.map((item) => (
        <ReviewCard key={item.id} user={item.user} review={item.review} timeAgo={item.timeAgo} />
      ))} */}
      </ScrollView>
      <View className="w-auto mx-4">
        <TouchableOpacity onPress={() => router.push(`/details`)} className="w-full h-14 border-none rounded-md bg-blue-500 flex items-center justify-center">
          <Text className="text-lg font-bold text-white">Start Cource</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default CourseScreen;