-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create is_admin helper (security definer runs as postgres, avoiding RLS recursion)
create or replace function public.is_admin(p_user_id uuid)
returns boolean
language plpgsql
security definer
stable
as $
begin
  return exists (
    select 1 from public.profiles
    where id = p_user_id and role = 'admin'
  );
end;
$;

-- Helper function to check if user email exists without exposing RLS
create or replace function public.check_email_exists(p_email text)
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1 from public.profiles
    where lower(email) = lower(p_email)
  );
end;
$$;

grant execute on function public.check_email_exists(text) to anon, authenticated;

-- ==========================================
-- 1. Profiles Table
-- ==========================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text,
  email text,
  balance numeric default 0,
  role text default 'user',
  status text default 'Active',
  referral_code text,
  total_referrals integer default 0,
  total_earned_referrals numeric default 0,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins have full access to profiles"
  on public.profiles for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 2. Investment Plans Table
-- ==========================================
create table if not exists public.investment_plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  daily_roi numeric not null,
  duration_days integer not null,
  min_amount numeric not null,
  max_amount numeric,
  is_active boolean default true,
  image_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for investment_plans
alter table public.investment_plans enable row level security;

-- Policies for investment_plans
create policy "Anyone can view active investment plans"
  on public.investment_plans for select
  to authenticated, anon
  using (is_active = true);

create policy "Admins have full access to investment plans"
  on public.investment_plans for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 3. Investments Table
-- ==========================================
create table if not exists public.investments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan_name text not null,
  amount numeric not null,
  daily_roi numeric not null,
  duration_days integer not null,
  status text default 'active' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for investments
alter table public.investments enable row level security;

-- Policies for investments
create policy "Users can view their own investments"
  on public.investments for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own investments"
  on public.investments for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Admins have full access to investments"
  on public.investments for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 4. Transactions Table
-- ==========================================
create table if not exists public.transactions (
  id text primary key, -- generated via client js logic or text identifier
  user_id uuid references public.profiles(id) on delete cascade not null,
  user_email text not null,
  type text not null check (type in ('deposit', 'withdrawal')),
  amount numeric not null,
  asset text not null,
  txid text,
  status text default 'pending' not null check (status in ('pending', 'approved', 'rejected')),
  timestamp bigint not null,
  screenshot_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for transactions
alter table public.transactions enable row level security;

-- Policies for transactions
create policy "Users can view their own transactions"
  on public.transactions for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.transactions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Admins have full access to transactions"
  on public.transactions for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 5. Master Traders Table
-- ==========================================
create table if not exists public.master_traders (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  avatar_url text,
  win_rate numeric not null,
  total_pnl numeric not null,
  roi numeric not null,
  followers_count integer default 0,
  is_active boolean default true,
  daily_trades_min integer default 1,
  daily_trades_max integer default 3,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for master_traders
alter table public.master_traders enable row level security;

-- Policies for master_traders
create policy "Anyone can view active master traders"
  on public.master_traders for select
  to authenticated, anon
  using (is_active = true);

create policy "Admins have full access to master traders"
  on public.master_traders for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 6. Copy Trading Subscriptions Table
-- ==========================================
create table if not exists public.copy_trading_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  master_trader_id uuid references public.master_traders(id) on delete cascade not null,
  amount numeric not null,
  status text default 'active' not null,
  total_pnl numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for copy_trading_subscriptions
alter table public.copy_trading_subscriptions enable row level security;

-- Policies for copy_trading_subscriptions
create policy "Users can view their own copy trading subscriptions"
  on public.copy_trading_subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own copy trading subscriptions"
  on public.copy_trading_subscriptions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Admins have full access to copy trading subscriptions"
  on public.copy_trading_subscriptions for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 7. Crypto Assets Table
-- ==========================================
create table if not exists public.crypto_assets (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  symbol text not null,
  color text not null,
  address text not null,
  network text not null,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for crypto_assets
alter table public.crypto_assets enable row level security;

-- Policies for crypto_assets
create policy "Anyone can view active crypto assets"
  on public.crypto_assets for select
  to authenticated, anon
  using (active = true);

create policy "Admins have full access to crypto assets"
  on public.crypto_assets for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 8. Notifications Table
-- ==========================================
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for notifications
alter table public.notifications enable row level security;

-- Policies for notifications
create policy "Users can view their own notifications"
  on public.notifications for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on public.notifications for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admins and service can insert notifications"
  on public.notifications for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 9. Push Subscriptions Table
-- ==========================================
create table if not exists public.push_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  endpoint text not null,
  subscription jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_user_endpoint unique (user_id, endpoint)
);

-- Enable RLS for push_subscriptions
alter table public.push_subscriptions enable row level security;

-- Policies for push_subscriptions
create policy "Users can view their own push subscriptions"
  on public.push_subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can modify their own push subscriptions"
  on public.push_subscriptions for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ==========================================
-- 10. Platform Settings Table
-- ==========================================
create table if not exists public.platform_settings (
  id bigint primary key default 1,
  maintenance_mode boolean default false,
  withdrawals_halted boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for platform_settings
alter table public.platform_settings enable row level security;

-- Policies for platform_settings
create policy "Anyone can view platform settings"
  on public.platform_settings for select
  to authenticated, anon
  using (true);

create policy "Admins can modify platform settings"
  on public.platform_settings for all
  to authenticated
  using (
    public.is_admin(auth.uid())
  );

-- ==========================================
-- 11. RPC Database Functions
-- ==========================================

-- A. increment_balance
create or replace function public.increment_balance(p_user_id uuid, p_amount numeric)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles
  set balance = coalesce(balance, 0) + p_amount
  where id = p_user_id;
end;
$$;

-- B. create_investment
create or replace function public.create_investment(
  p_plan_name text,
  p_amount numeric,
  p_daily_roi numeric,
  p_duration integer
)
returns void
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_balance numeric;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select balance into v_balance from public.profiles where id = v_user_id;
  if v_balance is null or v_balance < p_amount then
    raise exception 'Insufficient balance';
  end if;

  -- Deduct balance
  update public.profiles
  set balance = balance - p_amount
  where id = v_user_id;

  -- Insert investment
  insert into public.investments (
    user_id,
    plan_name,
    amount,
    daily_roi,
    duration_days,
    status
  ) values (
    v_user_id,
    p_plan_name,
    p_amount,
    p_daily_roi,
    p_duration,
    'active'
  );
end;
$$;

-- C. create_copy_trade
create or replace function public.create_copy_trade(
  p_master_trader_id uuid,
  p_amount numeric
)
returns void
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_balance numeric;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select balance into v_balance from public.profiles where id = v_user_id;
  if v_balance is null or v_balance < p_amount then
    raise exception 'Insufficient balance';
  end if;

  -- Deduct balance
  update public.profiles
  set balance = balance - p_amount
  where id = v_user_id;

  -- Insert subscription
  insert into public.copy_trading_subscriptions (
    user_id,
    master_trader_id,
    amount,
    status
  ) values (
    v_user_id,
    p_master_trader_id,
    p_amount,
    'active'
  );

  -- Update followers count
  update public.master_traders
  set followers_count = followers_count + 1
  where id = p_master_trader_id;
end;
$$;

-- D. wipe_database
create or replace function public.wipe_database()
returns void
language plpgsql
security definer
as $$
begin
  delete from public.copy_trading_subscriptions;
  delete from public.investments;
  delete from public.transactions;
  delete from public.notifications;
  delete from public.push_subscriptions;
  delete from public.support_messages;
  update public.profiles set balance = 0;
end;
$$;

-- ==========================================
-- 12. Triggers for Auto-Profile Creation
-- ==========================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, role, status, balance, total_referrals, total_earned_referrals, is_verified)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'user',
    'Active',
    0,
    0,
    0,
    false
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- 13. Seed Data Insertion
-- ==========================================

-- A. Platform Settings
insert into public.platform_settings (id, maintenance_mode, withdrawals_halted)
values (1, false, false)
on conflict (id) do nothing;

-- B. Master Traders
insert into public.master_traders (id, name, description, avatar_url, win_rate, total_pnl, roi, followers_count, is_active, daily_trades_min, daily_trades_max) values
('84dd60ca-6665-43cb-ab3e-18c148fb1a13', 'Alpha Signals', 'Long-term swing trading, strictly fundamental. Trades only top 10 altcoins.', null, 80.1980198019802, 15405.5756767637, 193.855756767637, 89, true, 1, 3),
('5c17d303-3081-4665-a8e6-03a364712a5b', 'Bear Trapper', 'Counter-trend strategy focused on shorting overextended rallies in mid-cap coins.', null, 67.83486783486784, 146113.7089543974, 1504.029589543974, 45, true, 2, 8),
('611cd955-6b48-4336-9054-3737c9e40510', 'Whale Rider', 'Trend following strategy tracking institutional flows. Low frequency, high conviction.', null, 77.17761557177616, 69645.92976776492, 873.9592976776491, 312, true, 0, 2),
('870b923d-78f3-4f30-9bd7-3c7731640c1d', 'Satoshi Ninja', 'High frequency scalping on majors. Focuses on BTC/USD and ETH/USD with tight stop losses.', null, 93.39622641509435, 15593.783956221025, 342.1328395622102, 124, true, 5, 15)
on conflict (id) do nothing;

-- C. Investment Plans
insert into public.investment_plans (id, name, daily_roi, duration_days, min_amount, is_active, image_url, description, max_amount) values
('732616a6-b139-4f44-b433-7a238486ba5c', 'SPACEXIPO', 4.0, 20, 1000, true, null, 'KDDSHVUSD', 10000000),
('403298c5-7d4f-4f2c-bafd-93a9ae203e3f', 'Growth Plan', 0.032, 60, 50, true, null, null, null)
on conflict (id) do nothing;

-- ==========================================
-- 14. Support Messages Table
-- ==========================================
create table if not exists public.support_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  attachment_url text,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for support_messages
alter table public.support_messages enable row level security;

-- Policies for support_messages
create policy "Users can view their own support messages"
  on public.support_messages for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert support messages for themselves"
  on public.support_messages for insert
  to authenticated
  with check ((select auth.uid()) = user_id and (select auth.uid()) = sender_id);

create policy "Users can update their own support messages"
  on public.support_messages for update
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Admins have full access to support messages"
  on public.support_messages for all
  to authenticated
  using (public.is_admin((select auth.uid())));

