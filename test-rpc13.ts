import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://benlhtyzfbavwuzgrrsz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbmxodHl6ZmJhdnd1emdycnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjE5NTgsImV4cCI6MjA5NjU5Nzk1OH0.YgpCev0rHqSYfGcplFWF5RHE77v7WevFsih_Sw9bZus';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function test() {
  const { data, error } = await supabase.rpc('create_copy_trade', {
    p_master_trader_id: 'dummy',
    p_amount: 50
  });
  console.log("RPC Error:", error);
}
test();
