import images from "@/constants/images";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function LoginScreen({email, setEmail, password, setPassword, handleLogin}:any) {

  return (
    <SafeAreaView className="flex bg-white px-6 justify-center">
      <KeyboardAvoidingView behavior={"padding"} className="bg-white">
        {/* Image */}
        <View className="items-center">
          <Image
            source={images.onboarding} // Replace with your actual image
            className="w-80 h-auto"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-center text-black">Login</Text>

        {/* Email Input */}
        <Text className="text-black font-semibold">Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-md p-3 my-2"
          keyboardType="email-address"
          textContentType="emailAddress" 
          autoComplete="email"
          importantForAutofill="yes"
          onFocus={() => setEmail(email)}
        />

        {/* Password Input */}
        <Text className="text-black font-semibold mt-4">Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword} // ✅ Works with autofill
          className="w-full border border-gray-300 rounded-md p-3 my-2"
          keyboardType="visible-password"
          textContentType="password" // ✅ Ensures proper autofill behavior
          autoComplete="password"
          importantForAutofill="yes"
        />
        {/* Continue Button */}
        <TouchableOpacity onPress={()=> handleLogin()} className="w-full bg-blue-600 py-3 rounded-lg mt-4">
          <Text className="text-white text-center font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}