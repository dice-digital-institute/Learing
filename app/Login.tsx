import React, { useState } from "react";
import images from "@/constants/images";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from '../stores/authStore'
import TostModal from "@/components/TostModal";
import { useTostModal } from "@/stores/applicationStore";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false); 
  const { setTostModal } = useTostModal();
  const { login } = useAuthStore();

  const LoginFun = async () => {
    setLoading(true);
    const response = await login(email, password);
    if (response?.success) {
      setTostModal(response.message, "success", true);
      setLoading(false);
    } else {
      setTostModal(response.message, "error", true);
      setLoading(false);
    }
  }
  return (
    <SafeAreaView className="flex bg-white px-6 justify-center">
      <TostModal />
      <KeyboardAvoidingView behavior={"padding"} className="bg-white">
        {/* Image */}
        <View className="items-center">
          <Image
            source={images.onboarding} // Replace with your actual image
            className="w-80 h-96"
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
        <TouchableOpacity disabled={loading} onPress={() => LoginFun()} className="w-full bg-blue-600 py-3 rounded-lg mt-4">
          {loading ? (
            <ActivityIndicator size="small" color="#fff" /> // ✅ Show spinner
          ) : (
            <Text className="text-white text-center font-semibold text-lg">Continue</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}