import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'

// Replace with your Supabase project details
const SUPABASE_URL = "https://cjjmaqidqdxbauupfixm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqam1hcWlkcWR4YmF1dXBmaXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzMzMjgsImV4cCI6MjA1MzY0OTMyOH0.sU4EUGMupIRvl30qhTDzKeQoMW2YlKNuAwGKLPfLw7U";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
export default supabase;