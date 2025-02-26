import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "./supabase";
import { jwtDecode } from "jwt-decode";
export const checkSession = async () => {
  try {
    const {
      data: { session: supaSession },
    } = await supabase.auth.getSession();
    if (supaSession) {
      await AsyncStorage.setItem("userData", JSON.stringify(supaSession?.access_token));
      return jwtDecode(supaSession?.access_token);
    } else {
      return 
    }
  } catch (error) {
    console.error("Error checking session:", error);
    
  }
};

export const  getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
