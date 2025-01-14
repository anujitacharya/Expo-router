import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://rpbhzumcmqizdudctxsj.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwYmh6dW1jbXFpemR1ZGN0eHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTQ0MzEsImV4cCI6MjA1MjQzMDQzMX0.tWsnG423ogMKCSr2pOjAVa624zkD57s6kMToKTHBo74'; // Replace with your Supabase project's public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage for secure session storage
    autoRefreshToken: true, // Enable automatic session refresh
    persistSession: true, // Persist the session across app restarts
  },
});