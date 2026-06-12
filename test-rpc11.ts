import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://benlhtyzfbavwuzgrrsz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbmxodHl6ZmJhdnd1emdycnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjE5NTgsImV4cCI6MjA5NjU5Nzk1OH0.YgpCev0rHqSYfGcplFWF5RHE77v7WevFsih_Sw9bZus';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function test() {
  const email = `testuser_${Date.now()}@example.com`;
  const { data: authData } = await supabase.auth.signUp({
    email,
    password: 'password123'
  });
  const user = authData.user;
  if (!user) {
    console.log("Failed to create user");
    return;
  }
  
  await supabase.rpc('increment_balance', { p_user_id: user.id, p_amount: 1000 });
  
  const { data: traders } = await supabase.from('master_traders').select('id').limit(1);
  if (!traders || traders.length === 0) {
    console.log("No master traders found");
    return;
  }
  const traderId = traders[0].id;
  
  const { error: insertError } = await supabase.from('copy_trading_subscriptions').insert({
    user_id: user.id,
    master_trader_id: traderId,
    amount: 50,
    status: 'active'
  });
  
  console.log("Insert Error:", insertError);
}
test();
