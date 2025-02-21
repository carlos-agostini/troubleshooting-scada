import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://sbqitdlvvaexnikrczdy.supabase.co"; // Reemplázalo con tu URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicWl0ZGx2dmFleG5pa3JjemR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTUwMzcsImV4cCI6MjA1NTQ3MTAzN30.zquPjpfNj75gnCW8VR-prpMGBYFNfkDxrw_LFecteVA"; // Reemplázalo con tu clave anónima

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
