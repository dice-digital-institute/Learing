import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ScreenCapture from "expo-screen-capture";
import LoginScreen from "./Login"; // Ensure correct import path
import { useAuthStore } from '../stores/authStore'
import "./global.css";
import { checkSession } from "@/helper";
import StatusBarComponent from "@/components/StatusBarComponent"; // ✅ Import StatusBar wrapper
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetComponent from "@/components/BottomSheet";
import Loader from "@/components/Loader";
import ToastModal from "@/components/TostModal";


export default function RootLayout() {
  const { isAuthenticated, setIsAuthenticated, logout, user } = useAuthStore();
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
        const userData:any = await checkSession();
        if(userData?.user_role === "user"){
          setIsAuthenticated(true, userData);
        }else{
          logout();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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

  if (!fontsLoaded || isAuthenticated === null) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <StatusBarComponent />
      <Loader overlay />
      <ToastModal />
      <GestureHandlerRootView>
        {isAuthenticated ? (
          <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(root)" />
          </Stack>
          </>
        ) : (
          <LoginScreen />
        )}
        <BottomSheetComponent />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}