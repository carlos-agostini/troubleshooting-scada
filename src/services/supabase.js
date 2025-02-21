import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://sbqitdlvvaexnikrczdy.supabase.co"; // Reemplázalo con tu URL de Supabase
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicWl0ZGx2dmFleG5pa3JjemR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTUwMzcsImV4cCI6MjA1NTQ3MTAzN30.zquPjpfNj75gnCW8VR-prpMGBYFNfkDxrw_LFecteVA"; // Reemplázalo con tu API key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
