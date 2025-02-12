import { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ScreenCapture from "expo-screen-capture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../supabase"; // Ensure correct import path
import LoginScreen from "./Login"; // Ensure correct import path
import "./global.css";

export default function RootLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // 
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    // Prevent screen capture
    ScreenCapture.preventScreenCaptureAsync();

    const checkLoginStatus = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData");
  
        if (storedData) {
          const parsedData = JSON.parse(storedData); // ✅ Convert back to object
          console.log("User session data:", parsedData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
      }
    };
  
    checkLoginStatus();

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    return () => {
      ScreenCapture.allowScreenCaptureAsync(); // Allow capture when exiting
    };
  }, [fontsLoaded]);

  const handleLogin = async () => {
    console.log(email,password + " email password");
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        console.error("Login Error:", error);
        Alert.alert("Login Failed", error.message);
        return;
      }
  
      if (data) {
        console.log("Storing full data:", data);
        await AsyncStorage.setItem("userData", JSON.stringify(data)); // ✅ Store full login data as JSON
        setIsAuthenticated(true);
        Alert.alert("Login Successful", "Welcome back!");
      } else {
        console.error("No valid session data received.");
        Alert.alert("Login Error", "Invalid login credentials. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      Alert.alert("Login Error", "Something went wrong. Please try again.");
    }
  };

  if (!fontsLoaded || isAuthenticated === null) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* ✅ Ensures navigation works */}
    </Stack>
  ) : (
    <LoginScreen email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} />
  );
}