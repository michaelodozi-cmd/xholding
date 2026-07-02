import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const supabaseUrl = "https://flqpewlpcclwpcdqrwcl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscXBld2xwY2Nsd3BjZHFyd2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzU1MjgsImV4cCI6MjA5ODUxMTUyOH0.B1eG_3z_PXIizWlOj3xzIVnfBTBaW74xwCxOFPWUUMU";
const supabase = createClient(supabaseUrl, supabaseKey);
export {
  supabase as s
};
