import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../supabase"; // Ensure this is your Supabase client

// Define Zustand store for authentication and logs
interface AuthState {
  user: any | null;
  logs: string[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => any;
  logout: () => any;
  addLog: (message: string) => any;
  setIsAuthenticated: (status: boolean, user: any | null) => any;
}

// Zustand Store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  logs: [],
  isAuthenticated: false,

  // ✅ Login Function
  login: async (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Please enter email and password" };
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);

      if (data?.session?.access_token) {
        await AsyncStorage.setItem("userData", JSON.stringify(data)); // Save session
        set({ user: data.user, isAuthenticated: true }); // Update state
        return { success: true, message: "Login successful" };
      }
    } catch (error) {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  },

  // ✅ Logout Function
  logout: async () => {
    try {
      await supabase.auth.signOut();
      await AsyncStorage.removeItem("userData"); // Remove session
      set({ user: null, isAuthenticated: false }); // Reset state
      return { success: true, message: "Logout successful" };
    } catch (error) {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  },

  // ✅ Log Activity
  addLog: (message) => {
    set((state) => ({ logs: [...state.logs, message] }));
  },

  // ✅ Separate `setIsAuthenticated` Function
  setIsAuthenticated: (status, user) => {
    set({
      isAuthenticated: status,
      user: user
    });
  },
}));