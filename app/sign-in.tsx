import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { Link } from 'expo-router';

const Auth = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.onboarding}
          className="w-full h-4/4"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To Learning Path
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Ideal Future</Text>
          </Text>
          <Link href="/" asChild>
            <TouchableOpacity
              onPress={()=> {}}
              className="bg-white shadow-md shadow-zinc-500 rounded-full w-full py-4 mt-4"
            >
              <View className="flex flex-row items-center justify-center">
                <Image
                  source={icons.google}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            onPress={()=> {}}
            className="bg-white shadow-md shadow-zinc-500 rounded-full w-full py-4 mt-6"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.linkedin}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with linkedin
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;