import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://rmsgzeazokbjkelvqtxx.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtc2d6ZWF6b2tiamtlbHZxdHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMTk4NDIsImV4cCI6MjAzNjY5NTg0Mn0.xaJCRtxym92std4WCipB73CZfD65t8nHv56EsR4BIQc'; // Replace with your Supabase project's public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage for secure session storage
    autoRefreshToken: true, // Enable automatic session refresh
    persistSession: true, // Persist the session across app restarts
  },
});