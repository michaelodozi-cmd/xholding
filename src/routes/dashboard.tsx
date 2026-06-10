import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, Gift, User, Bell, Rocket, 
  Clock, CheckCircle2, Home, Copy, Shield, Smartphone, Monitor, ChevronRight,
  Activity, Coins, ArrowRight, ShieldCheck, Check, ImageIcon, Users, LogOut
} from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

import { useCryptoStore } from "../lib/crypto-store";
import { useTransactionStore } from "../lib/transaction-store";
import { useInvestmentStore } from "../lib/investment-store";
import { useNotificationStore } from "../lib/notification-store";
import {
  requestNotificationPermission,
  notifyDepositApproved,
  notifyDepositRejected,
  notifyWithdrawalApproved,
  notifyWithdrawalRejected,
} from "../lib/push-notifications";
import { registerPushSubscription } from "../lib/web-push-subscription";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
} from "../components/ui/dialog";

import { supabase } from "../lib/supabase";


export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        const { data: appSettings } = await supabase.from('platform_settings').select('*').eq('id', 1).single();
        
        if (data?.role !== 'admin' && appSettings?.maintenance_mode) {
          await supabase.auth.signOut();
          navigate({ to: "/login" });
          return;
        }

        if (data) setProfile(data);
        if (appSettings) setSettings(appSettings);

        // Register background push subscription after profile loads
        registerPushSubscription();
      }
    };
    fetchProfile();
  }, [navigate]);

  const { transactions } = useTransactionStore();
  // Track previous statuses so we only fire once per change
  const prevStatuses = useRef<Record<string, string>>({});

  // Request OS notification permission on first load
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Watch for transaction status changes and fire push notifications
  useEffect(() => {
    transactions.forEach(tx => {
      const prev = prevStatuses.current[tx.id];
      const curr = tx.status;
      if (prev && prev !== curr) {
        const amt = Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
        const asset = tx.asset || '';
        if (tx.type === 'deposit') {
          if (curr === 'approved') notifyDepositApproved(amt, asset);
          if (curr === 'rejected') notifyDepositRejected(amt, asset);
        } else if (tx.type === 'withdrawal') {
          if (curr === 'approved') notifyWithdrawalApproved(amt, asset);
          if (curr === 'rejected') notifyWithdrawalRejected(amt, asset);
        }
      }
      prevStatuses.current[tx.id] = curr;
    });
  }, [transactions]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] font-['Inter'] selection:bg-[#c9a84c]/30 pb-24 md:pb-0 md:pl-64">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 fixed top-0 left-0 h-screen bg-[#0a0f1c] border-r border-white/5 p-6 z-50">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-sm">X</div>
          <span className="font-light text-xl tracking-[0.15em] text-white font-['Outfit'] uppercase">XHoldings</span>
        </Link>
        <div className="flex flex-col gap-2 flex-grow">
          <button onClick={() => setActiveTab('home')} className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium transition-colors ${activeTab === 'home' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Home className="w-5 h-5"/> Home</button>
          <button onClick={() => setActiveTab('invest')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'invest' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><TrendingUp className="w-5 h-5"/> Invest</button>
          <button onClick={() => setActiveTab('copytrade')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'copytrade' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Users className="w-5 h-5"/> Copy Trading</button>
          <button onClick={() => setActiveTab('wallet')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'wallet' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Wallet className="w-5 h-5"/> Wallet</button>
          <button onClick={() => setActiveTab('rewards')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'rewards' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Gift className="w-5 h-5"/> Rewards</button>
          <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'profile' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><User className="w-5 h-5"/> Profile</button>
          {profile?.role === 'admin' && (
            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-sm transition-colors mt-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20">
              <span className="font-bold uppercase tracking-widest text-[11px]">SuperAdmin</span>
            </Link>
          )}
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-sm transition-colors mt-auto text-gray-500 hover:text-white hover:bg-red-500/10 hover:text-red-400 group">
            <LogOut className="w-5 h-5 group-hover:text-red-400"/> Logout
          </button>
        </div>
      </aside>

      {/* Top Header Mobile */}
      <header className="sticky top-0 flex md:hidden items-center justify-between px-6 py-4 bg-[#0a0f1c]/95 backdrop-blur-md border-b border-white/5 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-sm">X</div>
          <span className="font-light text-lg tracking-[0.15em] text-white font-['Outfit'] uppercase">XHoldings</span>
        </div>
        <div className="flex items-center gap-3">
          <NotificationBell transactions={transactions} />
          {profile?.role === 'admin' && (
            <Link to="/admin" className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-400 border border-red-500/20 bg-red-500/10 rounded-sm">
              Admin
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 py-4 md:p-6 relative z-10 w-full">

        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} profile={profile} />}
        {activeTab === 'invest' && <InvestTab profile={profile} />}
        {activeTab === 'copytrade' && <CopyTradeTab />}
        {activeTab === 'wallet' && <WalletTab profile={profile} settings={settings} />}
        {activeTab === 'rewards' && <RewardsTab profile={profile} />}
        {activeTab === 'profile' && <ProfileTab profile={profile} />}
      </main>

      {/* Mobile Bottom Navigation Bar - 6 items */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0f1c]/95 backdrop-blur-lg border-t border-white/5 px-1 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 flex justify-around items-center z-50 shadow-lg shadow-black/40">
        <button onClick={() => setActiveTab('home')} className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 relative py-1 ${activeTab === 'home' ? 'text-[#c9a84c] scale-105' : 'text-gray-500'}`}>
          <Home className="w-[18px] h-[18px]" />
          <span className="text-[9px] font-medium tracking-wide">Home</span>
          {activeTab === 'home' && <span className="absolute -bottom-0.5 w-3 h-0.5 rounded-full bg-[#c9a84c]" />}
        </button>
        <button onClick={() => setActiveTab('invest')} className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 relative py-1 ${activeTab === 'invest' ? 'text-[#c9a84c] scale-105' : 'text-gray-500'}`}>
          <TrendingUp className="w-[18px] h-[18px]" />
          <span className="text-[9px] font-medium tracking-wide">Invest</span>
          {activeTab === 'invest' && <span className="absolute -bottom-0.5 w-3 h-0.5 rounded-full bg-[#c9a84c]" />}
        </button>
        <button onClick={() => setActiveTab('copytrade')} className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 relative py-1 ${activeTab === 'copytrade' ? 'text-[#c9a84c] scale-105' : 'text-gray-500'}`}>
          <Users className="w-[18px] h-[18px]" />
          <span className="text-[9px] font-medium tracking-wide">Copy</span>
          {activeTab === 'copytrade' && <span className="absolute -bottom-0.5 w-3 h-0.5 rounded-full bg-[#c9a84c]" />}
        </button>
        <button onClick={() => setActiveTab('wallet')} className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 relative py-1 ${activeTab === 'wallet' ? 'text-[#c9a84c] scale-105' : 'text-gray-500'}`}>
          <Wallet className="w-[18px] h-[18px]" />
          <span className="text-[9px] font-medium tracking-wide">Wallet</span>
          {activeTab === 'wallet' && <span className="absolute -bottom-0.5 w-3 h-0.5 rounded-full bg-[#c9a84c]" />}
        </button>
        <button onClick={() => setActiveTab('rewards')} className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 relative py-1 ${activeTab === 'rewards' ? 'text-[#c9a84c] scale-105' : 'text-gray-500'}`}>
          <Gift className="w-[18px] h-[18px]" />
          <span className="text-[9px] font-medium tracking-wide">Rewards</span>
          {activeTab === 'rewards' && <span className="absolute -bottom-0.5 w-3 h-0.5 rounded-full bg-[#c9a84c]" />}
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 relative py-1 ${activeTab === 'profile' ? 'text-[#c9a84c] scale-105' : 'text-gray-500'}`}>
          <User className="w-[18px] h-[18px]" />
          <span className="text-[9px] font-medium tracking-wide">Profile</span>
          {activeTab === 'profile' && <span className="absolute -bottom-0.5 w-3 h-0.5 rounded-full bg-[#c9a84c]" />}
        </button>
      </div>
    </div>
  );
}

function CopyTradeTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 border border-[#c9a84c]/20">
        <Users className="w-10 h-10 text-[#c9a84c]" />
      </div>
      <h1 className="text-3xl text-white font-['Outfit'] mb-4">Copy Trading</h1>
      <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
        Automatically mirror the trades of our top-performing algorithmic portfolios and expert traders.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-full text-[11px] text-[#00d4aa] font-bold uppercase tracking-widest">
        <Rocket className="w-3 h-3" /> Coming Soon
      </div>
    </div>
  );
}

// ---- TAB COMPONENTS ----

function HomeTab({ setActiveTab, profile }: { setActiveTab: (tab: string) => void, profile?: any }) {
  const { transactions } = useTransactionStore();
  const { investments } = useInvestmentStore();
  
  const userTransactions = [...transactions].sort((a,b) => b.timestamp - a.timestamp).slice(0, 5);
  
  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return acc + (inv.amount * inv.daily_roi * Math.max(0, daysPassed));
  }, 0);
  const activePlans = investments.filter(inv => inv.status === 'active').length;
  const totalDailyPayout = investments
    .filter(inv => inv.status === 'active')
    .reduce((acc, inv) => acc + (inv.amount * inv.daily_roi), 0);
  
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);
  const totalInvested = investments.reduce((acc, inv) => acc + Number(inv.amount), 0);
  const totalAssets = totalBalance + totalInvested;
  const investedPct = totalAssets > 0 ? Math.round((totalInvested / totalAssets) * 100) : 0;
  const availablePct = 100 - investedPct;

  const [marketData, setMarketData] = useState<any[]>([]);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,ripple')
      .then(res => res.json())
      .then(data => {
        setMarketData(data.map((coin: any) => ({
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          change: coin.price_change_percentage_24h,
          image: coin.image
        })));
      }).catch(console.error);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mt-4 md:mt-8 mb-6">
        <div>
          <div className="text-[13px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Good evening,</div>
          <h1 className="text-2xl text-white font-['Outfit'] font-light">{profile?.name || 'Investor'} 👋</h1>
        </div>
        <Bell className="hidden md:block w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
      </div>

      {/* DASHBOARD GRID - Mosaic Layout instead of vertical stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-8 items-stretch">
        
        {/* Balance Card: 8 Columns */}
        <div className="lg:col-span-8 bg-[#0a0f1c] border border-white/5 p-5 md:p-8 relative overflow-hidden rounded-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-[80px] pointer-events-none" />
          <div>
            <div className="flex justify-between items-start mb-2 relative z-10">
              <div>
                <div className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Total Assets</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-light text-white tracking-tight">${totalAssets.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-[#00d4aa] rounded-full text-[10px] uppercase tracking-widest font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse"></div>Live
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#00d4aa] mb-6 relative z-10">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-[13px] font-bold tracking-wider">+${totalDailyPayout.toLocaleString(undefined, {minimumFractionDigits: 2})} today</span>
            </div>

            {/* Asset breakdown bar */}
            <div className="relative z-10 mb-6">
              <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                <span>Asset Allocation</span>
                <span>{investedPct}% Invested · {availablePct}% Available</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] transition-all duration-700" style={{ width: `${investedPct}%` }} />
                <div className="h-full bg-[#00d4aa]/40 transition-all duration-700" style={{ width: `${availablePct}%` }} />
              </div>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><span className="w-2 h-2 rounded-full bg-[#c9a84c] inline-block"/>${totalInvested.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} Invested</span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><span className="w-2 h-2 rounded-full bg-[#00d4aa]/60 inline-block"/>${totalBalance.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} Available</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5 relative z-10">
            <div><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Portfolio</div><div className="text-lg text-white font-light font-['Outfit']">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            <div><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Invested</div><div className="text-lg text-[#c9a84c] font-light font-['Outfit']">${totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            <div><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">ROI Earned</div><div className="text-lg text-[#00d4aa] font-light font-['Outfit']">+${roiEarned.toLocaleString(undefined, {minimumFractionDigits: 2})}</div></div>
            <div><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Active Plans</div><div className="text-lg text-white font-light font-['Outfit']">{activePlans}</div></div>
          </div>
        </div>

        {/* Quick Actions: 4 Columns (2x2 grid inside) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <button onClick={() => setActiveTab('wallet')} className="flex flex-col items-center justify-center p-6 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><Wallet className="w-8 h-8 text-[#c9a84c] mb-3 group-hover:scale-110 transition-transform" /><span className="text-[12px] uppercase tracking-widest text-gray-400 font-semibold">Deposit</span></button>
          <button onClick={() => setActiveTab('wallet')} className="flex flex-col items-center justify-center p-6 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><ArrowDownLeft className="w-8 h-8 text-[#00d4aa] mb-3 group-hover:scale-110 transition-transform" /><span className="text-[12px] uppercase tracking-widest text-gray-400 font-semibold">Withdraw</span></button>
          <button onClick={() => setActiveTab('invest')} className="flex flex-col items-center justify-center p-6 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><TrendingUp className="w-8 h-8 text-[#e8c96a] mb-3 group-hover:scale-110 transition-transform" /><span className="text-[12px] uppercase tracking-widest text-gray-400 font-semibold">Invest</span></button>
          <button onClick={() => setActiveTab('rewards')} className="flex flex-col items-center justify-center p-6 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><Gift className="w-8 h-8 text-[#b088f5] mb-3 group-hover:scale-110 transition-transform" /><span className="text-[12px] uppercase tracking-widest text-gray-400 font-semibold">Rewards</span></button>
        </div>

        {/* Upcoming Payout: 12 Columns */}
        {totalDailyPayout > 0 && (
          <div className="lg:col-span-12 flex items-center justify-between p-4 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-sm">
            <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#c9a84c]" /><div><div className="text-[11px] text-[#c9a84c] uppercase tracking-widest font-bold mb-0.5">Upcoming Payout</div><div className="text-[13px] text-gray-300">Active Plans · Processing at midnight</div></div></div>
            <div className="text-lg text-[#e8c96a] font-['Outfit'] font-bold">+${totalDailyPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          </div>
        )}

        {/* ─── Financial Summary Strip ─── */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Invested */}
          <div className="relative overflow-hidden bg-[#0a0f1c] border border-white/5 rounded-sm p-6 flex flex-col gap-4 group hover:border-[#c9a84c]/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a84c]/8 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-sm bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                <Coins className="w-5 h-5 text-[#c9a84c]" />
              </div>
              <span className="text-[9px] text-[#c9a84c] uppercase tracking-[0.2em] font-bold bg-[#c9a84c]/10 px-2 py-1 rounded-full">
                {investments.filter(i => i.status === 'active').length} Active
              </span>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Total Invested</div>
              <div className="text-3xl text-white font-['Outfit'] font-light">
                ${investments.reduce((acc, inv) => acc + Number(inv.amount), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">Across all investment plans</div>
            </div>
            <div className="pt-3 border-t border-white/5">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Daily Return</div>
              <div className="text-[15px] text-[#c9a84c] font-['Outfit'] font-semibold">
                +${totalDailyPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}/day
              </div>
            </div>
          </div>

          {/* Profit Earned */}
          <div className="relative overflow-hidden bg-[#0a0f1c] border border-white/5 rounded-sm p-6 flex flex-col gap-4 group hover:border-[#00d4aa]/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d4aa]/8 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-sm bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#00d4aa]" />
              </div>
              <span className="text-[9px] text-[#00d4aa] uppercase tracking-[0.2em] font-bold bg-[#00d4aa]/10 px-2 py-1 rounded-full">
                3.2% Daily ROI
              </span>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Profit Earned</div>
              <div className="text-3xl text-[#00d4aa] font-['Outfit'] font-light">
                +${roiEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">Cumulative ROI from active plans</div>
            </div>
            <div className="pt-3 border-t border-white/5">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Referral Earnings</div>
              <div className="text-[15px] text-[#00d4aa] font-['Outfit'] font-semibold">
                +${Number(profile?.total_earned_referrals || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Withdrawable Balance */}
          <div className="relative overflow-hidden bg-[#0a0f1c] border border-white/5 rounded-sm p-6 flex flex-col gap-4 group hover:border-white/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-gray-300" />
              </div>
              <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold bg-white/5 px-2 py-1 rounded-full">
                Available Now
              </span>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Withdrawable Balance</div>
              <div className="text-3xl text-white font-['Outfit'] font-light">
                ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">Portfolio balance + ROI + referrals</div>
            </div>
            <div className="pt-3 border-t border-white/5">
              <button
                onClick={() => setActiveTab('wallet')}
                className="w-full py-2 text-[11px] uppercase tracking-widest font-bold bg-white/5 hover:bg-white/10 text-gray-300 rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" /> Withdraw Funds
              </button>
            </div>
          </div>
        </div>

        {/* Live Market Data: 5 Columns */}
        <div className="lg:col-span-5 bg-[#0a0f1c] border border-white/5 rounded-sm p-6 overflow-hidden relative flex flex-col justify-between min-h-[300px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="text-[10px] text-[#00d4aa] uppercase tracking-[0.2em] font-bold flex items-center gap-2"><Activity className="w-3 h-3" /> LIVE MARKET</div>
            </div>
            <div className="space-y-4 relative z-10">
              {marketData.length === 0 ? (
                <div className="text-[13px] text-gray-500">Fetching live rates...</div>
              ) : (
                marketData.map(coin => (
                  <div key={coin.symbol} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center font-bold text-[10px] text-white border border-white/10 overflow-hidden">
                        {coin.image ? <img src={coin.image} alt={coin.name} className="w-full h-full object-cover p-1.5" /> : coin.symbol.substring(0, 1)}
                      </div>
                      <div><div className="text-[13px] text-white font-medium">{coin.name}</div><div className="text-[10px] text-gray-400">{coin.symbol}</div></div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] text-white font-['Outfit']">${coin.price?.toLocaleString()}</div>
                      <div className={`text-[10px] font-bold ${coin.change >= 0 ? 'text-[#00d4aa]' : 'text-red-400'}`}>
                        {coin.change >= 0 ? '+' : ''}{coin.change?.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Active Investments: 4 Columns */}
        <div className="lg:col-span-4 bg-[#0a0f1c] border border-white/5 rounded-sm p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-white font-['Outfit']">Active Investments</h2>
              <span onClick={() => setActiveTab('invest')} className="text-[10px] text-[#c9a84c] uppercase tracking-widest cursor-pointer hover:underline">See all</span>
            </div>
            <div className="space-y-4">
              {investments.length === 0 ? (
                <div className="text-[13px] text-gray-500">No active investments.</div>
              ) : (
                investments.filter(i => i.status === 'active').slice(0, 3).map((inv: any) => {
                  const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24);
                  const progress = Math.min(100, (daysPassed / inv.duration_days) * 100);
                  return (
                    <div key={inv.id} className="p-4 bg-white/5 border border-white/5 rounded-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div><h3 className="text-md text-white font-light font-['Outfit'] mb-1">{inv.plan_name}</h3><div className="text-[11px] text-[#00d4aa] font-bold">+${(inv.amount * inv.daily_roi).toFixed(2)}/day</div></div>
                        <div className="text-right"><div className="text-[11px] text-gray-400">Day {daysPassed.toFixed(1)} of {inv.duration_days}</div></div>
                      </div>
                      <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden mb-2"><div className="bg-[#00d4aa] h-full" style={{ width: `${progress}%` }}></div></div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">{progress.toFixed(0)}% complete</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions: 3 Columns */}
        <div className="lg:col-span-3 bg-[#0a0f1c] border border-white/5 rounded-sm p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-white font-['Outfit']">History</h2>
              <span className="text-[10px] text-[#c9a84c] uppercase tracking-widest cursor-pointer hover:underline">See all</span>
            </div>
            <div className="divide-y divide-white/5">
              {userTransactions.length === 0 ? (
                 <div className="text-[13px] text-gray-500 py-4">No recent history.</div>
              ) : (
                userTransactions.map((tx: any) => (
                  <div key={tx.id} className="py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center"><Wallet className="w-4 h-4" style={{color: '#d1d5db'}} /></div>
                      <div className="text-[13px] text-white font-medium capitalize">{tx.type} {tx.status === 'pending' ? '(Pending)' : ''}</div>
                    </div>
                    <div className="text-[13px] font-bold" style={{color: tx.type === 'deposit' ? '#00d4aa' : 'white'}}>
                      {tx.type === 'deposit' ? '+' : '-'}${(tx.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}



function InvestTab({ profile }: { profile?: any }) {
  const { investments } = useInvestmentStore();
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({ open: false, title: '', message: '' });

  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return acc + (inv.amount * inv.daily_roi * Math.max(0, daysPassed));
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);

  const showAlert = (title: string, message: string) => {
    setAlertState({ open: true, title, message });
  };
  
  const dailyROI = amount ? (Number(amount) * 0.032).toFixed(2) : '0.00';
  const profit = amount ? (Number(amount) * 0.032 * 60).toFixed(2) : '0.00';
  const totalReturn = amount ? (Number(amount) * 0.032 * 60 + Number(amount)).toFixed(2) : '0.00';

  const handleInvest = async () => {
    if (!amount || amount <= 0) return;
    if (amount > totalBalance) {
      showAlert("Insufficient Balance", "You cannot invest more than your available total balance.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.rpc('create_investment', {
      p_plan_name: 'Growth Plan',
      p_amount: amount,
      p_daily_roi: 0.032,
      p_duration: 60
    });
    setLoading(false);
    if (error) {
      showAlert("Investment Failed", error.message);
    } else {
      showAlert("Investment Successful", "Your investment plan has been activated. You will start earning daily returns.");
      setAmount('');
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <AlertDialog open={alertState.open} onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}>
        <AlertDialogContent className="bg-[#0a0f1c] border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{alertState.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {alertState.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertState(prev => ({ ...prev, open: false }))} className="bg-[#c9a84c] text-[#070b14] hover:bg-[#b89945]">
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="mb-8 mt-4 md:mt-10">
        <h1 className="text-3xl text-white font-['Outfit'] font-light mb-2">Investment Plans</h1>
        <p className="text-gray-400 text-[13px]">Select a plan to start earning daily returns.</p>
      </div>

      <div className="p-6 md:p-8 bg-[#0a0f1c] border border-[#c9a84c]/30 rounded-sm relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl text-white font-['Outfit'] mb-3">Growth Plan</h2>
            <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px] text-[#c9a84c] uppercase tracking-widest font-semibold">
              <span className="bg-[#c9a84c]/10 border border-[#c9a84c]/20 px-2 py-1 rounded-sm">3.2% Daily ROI</span>
              <span className="bg-white/5 px-2 py-1 text-gray-400 rounded-sm">60 Days</span>
              <span className="bg-white/5 px-2 py-1 text-gray-400 flex items-center gap-1 rounded-sm"><ShieldCheck className="w-3 h-3"/> Verified</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Enter investment amount ($)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="0.00" 
              className="w-full bg-[#070b14] border border-white/10 text-white p-4 rounded-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors text-xl font-['Outfit']"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#070b14] border border-white/5 rounded-sm">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Daily ROI</div>
              <div className="text-lg text-[#00d4aa] font-['Outfit']">+${dailyROI}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Duration</div>
              <div className="text-lg text-white font-['Outfit']">60 Days</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total Profit</div>
              <div className="text-lg text-[#c9a84c] font-['Outfit']">${profit}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total Return</div>
              <div className="text-lg text-white font-['Outfit']">${totalReturn}</div>
            </div>
          </div>

          <button disabled={loading} onClick={handleInvest} className="w-full bg-[#c9a84c] hover:bg-[#b59640] text-[#070b14] py-4 font-bold text-[13px] tracking-widest uppercase transition-colors rounded-sm flex items-center justify-center gap-2">
            {loading ? 'Processing...' : 'Continue to Payment'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function CryptoSelector({ focusColor, value, onChange }: { focusColor: string, value?: string, onChange?: (v: string) => void }) {
  const { cryptos } = useCryptoStore();
  const activeCryptos = cryptos.filter(c => c.active);

  const getCryptoLogo = (id: string) => {
    const map: Record<string, string> = {
      btc: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
      eth: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
      usdt: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
      bnb: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
      sol: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
      usdc: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
      xrp: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg',
      doge: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg',
      ton: 'https://cryptologos.cc/logos/toncoin-ton-logo.svg',
      ada: 'https://cryptologos.cc/logos/cardano-ada-logo.svg'
    };
    return map[id.toLowerCase()] || null;
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-full bg-[#070b14] border-white/10 text-white p-3 h-auto rounded-sm focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-transparent ${focusColor} hover:bg-white/[0.02] transition-colors shadow-none`}>
        <SelectValue placeholder="Select Crypto" />
      </SelectTrigger>
      <SelectContent className="bg-[#0a0f1c] border-white/10 text-white max-h-[300px]">
        <SelectGroup>
          {activeCryptos.map(crypto => {
            const logo = getCryptoLogo(crypto.id);
            return (
            <SelectItem key={crypto.id} value={crypto.id} className="hover:bg-white/5 focus:bg-white/5 cursor-pointer py-2.5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold shrink-0 overflow-hidden" style={!logo ? { backgroundColor: `${crypto.color}15`, color: crypto.color } : {}}>
                  {logo ? <img src={logo} alt={crypto.name} className="w-full h-full object-cover p-0.5" /> : (crypto.symbol || '?').substring(0, 1)}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-medium leading-tight mb-0.5">{crypto.name}</span>
                  <span className="text-[10px] text-gray-500 font-semibold leading-tight">{crypto.symbol}</span>
                </div>
              </div>
            </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Map from our crypto symbol to CoinGecko ID
const COINGECKO_IDS: Record<string, string> = {
  BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', XRP: 'ripple',
  USDT: 'tether', USDC: 'usd-coin', BNB: 'binancecoin', ADA: 'cardano',
  DOGE: 'dogecoin', LTC: 'litecoin', DOT: 'polkadot', MATIC: 'matic-network',
  AVAX: 'avalanche-2', LINK: 'chainlink', UNI: 'uniswap', TRX: 'tron',
};

function WalletTab({ profile, settings }: { profile?: any, settings?: any }) {
  const [mode, setMode] = useState('deposit');
  const [copied, setCopied] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('btc');
  const [amount, setAmount] = useState('');
  const [txid, setTxid] = useState('');
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, number>>({});
  const [pricesLoading, setPricesLoading] = useState(true);

  const { addTransaction, transactions } = useTransactionStore();
  const { cryptos } = useCryptoStore();
  const { investments } = useInvestmentStore();
  
  const userTransactions = [...transactions].sort((a,b) => b.timestamp - a.timestamp);
  const selectedCryptoData = cryptos.find(c => c.id === selectedAsset) || cryptos[0];

  // Fetch live prices from CoinGecko
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setPricesLoading(true);
        const ids = Object.values(COINGECKO_IDS).join(',');
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        const data = await res.json();
        const prices: Record<string, number> = {};
        Object.entries(COINGECKO_IDS).forEach(([symbol, id]) => {
          if (data[id]?.usd) prices[symbol] = data[id].usd;
        });
        setCryptoPrices(prices);
      } catch (e) {
        console.error('Price fetch failed:', e);
      } finally {
        setPricesLoading(false);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const selectedSymbol = selectedCryptoData?.symbol?.toUpperCase() || '';
  const selectedPrice = cryptoPrices[selectedSymbol] || null;
  const amountNum = parseFloat(amount) || 0;
  const usdValue = selectedPrice ? amountNum * selectedPrice : null;

  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return acc + (inv.amount * inv.daily_roi * Math.max(0, daysPassed));
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);

  const handleCopy = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [alertState, setAlertState] = useState<{ open: boolean; title: string; message: string; type: 'deposit' | 'withdrawal' | 'error' | 'info' }>({
    open: false, title: '', message: '', type: 'info'
  });

  const showModal = (title: string, message: string, type: 'deposit' | 'withdrawal' | 'error' | 'info' = 'info') => {
    setAlertState({ open: true, title, message, type });
  };

  const handleDepositSubmit = async () => {
    if (!amount || !screenshotFile) {
      showModal("Missing Information", "Please enter the amount and upload a screenshot as proof of payment.", 'error');
      return;
    }
    setDepositLoading(true);
    let screenshotUrl = '';

    try {
      const fileExt = screenshotFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('deposit-proofs')
        .upload(fileName, screenshotFile);

      if (error) throw error;
      
      const { data: publicData } = supabase.storage
        .from('deposit-proofs')
        .getPublicUrl(fileName);
        
      screenshotUrl = publicData.publicUrl;
    } catch (err: any) {
      console.error('Upload error:', err);
      showModal("Upload Failed", "There was an error uploading your screenshot. Please try again.", 'error');
      setDepositLoading(false);
      return;
    }

    // Convert crypto amount to USD using live price
    const sym = selectedCryptoData?.symbol?.toUpperCase() || '';
    const livePrice = cryptoPrices[sym];
    const cryptoAmt = parseFloat(amount);
    const usdAmount = livePrice ? cryptoAmt * livePrice : cryptoAmt;

    await addTransaction({
      type: 'deposit',
      amount: usdAmount,
      asset: selectedCryptoData ? selectedCryptoData.symbol : selectedAsset.toUpperCase(),
      txid,
      screenshotUrl
    } as any);
    setDepositLoading(false);
    setAmount('');
    setTxid('');
    setScreenshotFile(null);
    const usdNote = livePrice ? ` (~$${usdAmount.toLocaleString(undefined, {maximumFractionDigits: 2})})` : '';
    showModal("Deposit Submitted!", `Your ${cryptoAmt} ${sym}${usdNote} deposit has been submitted. Our team will verify and credit your balance within 24 hours.`, 'deposit');
  };

  const handleWithdrawSubmit = async () => {
    if (settings?.withdrawals_halted) {
      showModal("Withdrawals Halted", "Withdrawals are temporarily suspended due to network maintenance. Please try again later.", 'error');
      return;
    }
    if (!amount || !withdrawAddress) {
      showModal("Missing Information", "Please enter both the amount and your receiving wallet address.", 'error');
      return;
    }
    const numAmount = parseFloat(amount);
    if (numAmount > totalBalance) {
      showModal("Insufficient Funds", "You do not have enough available balance for this withdrawal request.", 'error');
      return;
    }
    setWithdrawLoading(true);
    await addTransaction({
      type: 'withdrawal',
      amount: numAmount,
      asset: selectedCryptoData ? selectedCryptoData.symbol : selectedAsset.toUpperCase(),
      txid: withdrawAddress
    });
    setWithdrawLoading(false);
    setAmount('');
    setWithdrawAddress('');
    showModal("Withdrawal Requested!", `Your withdrawal of $${numAmount.toLocaleString()} in ${selectedCryptoData?.symbol || 'crypto'} has been submitted and is pending approval. You'll be notified once it's processed.`, 'withdrawal');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">

      {/* Rich Deposit/Withdrawal Success Modal */}
      <Dialog open={alertState.open} onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}>
        <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white p-0 overflow-hidden max-w-md">
          {/* Colored top bar */}
          <div className={`h-1.5 w-full ${
            alertState.type === 'deposit' ? 'bg-gradient-to-r from-[#c9a84c] to-[#f0d080]' :
            alertState.type === 'withdrawal' ? 'bg-gradient-to-r from-[#00d4aa] to-[#00f5c8]' :
            alertState.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-400' :
            'bg-gradient-to-r from-white/20 to-white/10'
          }`} />

          <div className="p-8">
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
              alertState.type === 'deposit' ? 'bg-[#c9a84c]/15' :
              alertState.type === 'withdrawal' ? 'bg-[#00d4aa]/15' :
              alertState.type === 'error' ? 'bg-red-500/15' :
              'bg-white/10'
            }`}>
              {alertState.type === 'deposit' && (
                <svg className="w-8 h-8 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
              {alertState.type === 'withdrawal' && (
                <svg className="w-8 h-8 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              )}
              {alertState.type === 'error' && (
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              )}
              {alertState.type === 'info' && (
                <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              )}
            </div>

            {/* Title */}
            <h2 className={`text-xl font-['Outfit'] font-semibold text-center mb-3 ${
              alertState.type === 'deposit' ? 'text-[#c9a84c]' :
              alertState.type === 'withdrawal' ? 'text-[#00d4aa]' :
              alertState.type === 'error' ? 'text-red-400' :
              'text-white'
            }`}>{alertState.title}</h2>

            {/* Message */}
            <p className="text-gray-400 text-[14px] text-center leading-relaxed mb-6">{alertState.message}</p>

            {/* Status badge for deposit */}
            {alertState.type === 'deposit' && (
              <div className="flex items-center justify-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-sm px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                <span className="text-[11px] text-[#c9a84c] uppercase tracking-widest font-bold">Pending Admin Review</span>
              </div>
            )}
            {alertState.type === 'withdrawal' && (
              <div className="flex items-center justify-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-sm px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                <span className="text-[11px] text-[#00d4aa] uppercase tracking-widest font-bold">Processing · 24–48 hrs</span>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setAlertState(prev => ({ ...prev, open: false }))}
              className={`w-full py-3 font-bold text-[13px] tracking-widest uppercase rounded-sm transition-colors ${
                alertState.type === 'deposit' ? 'bg-[#c9a84c] hover:bg-[#b89945] text-[#070b14]' :
                alertState.type === 'withdrawal' ? 'bg-[#00d4aa] hover:bg-[#00b38f] text-[#070b14]' :
                alertState.type === 'error' ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30' :
                'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {alertState.type === 'deposit' ? 'Got it, Thanks!' :
               alertState.type === 'withdrawal' ? 'Done' :
               'Dismiss'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mb-8 mt-4 md:mt-10">
        <h1 className="text-3xl text-white font-['Outfit'] font-light mb-6">Wallet</h1>
        
        <div className="flex border-b border-white/10 overflow-x-auto scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
          <button onClick={() => setMode('deposit')} className={`pb-4 px-6 text-[13px] uppercase tracking-widest font-semibold transition-all shrink-0 ${mode === 'deposit' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>Deposit</button>
          <button onClick={() => setMode('withdraw')} className={`pb-4 px-6 text-[13px] uppercase tracking-widest font-semibold transition-all shrink-0 ${mode === 'withdraw' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>Withdraw</button>
          <button onClick={() => setMode('history')} className={`pb-4 px-6 text-[13px] uppercase tracking-widest font-semibold transition-all shrink-0 ${mode === 'history' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>History</button>
        </div>
      </div>

      {mode === 'deposit' && (
        <div className="space-y-8">
          <div className="bg-[#0a0f1c] border border-white/5 p-6 md:p-8 rounded-sm">
            <h2 className="text-lg text-white font-['Outfit'] mb-6">Fund Your Account</h2>
            
            <div className="mb-6">
              <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-3 block">Choose Crypto Asset</label>
              <CryptoSelector focusColor="focus:border-[#c9a84c]/50 focus:ring-[#c9a84c]/50" value={selectedAsset} onChange={setSelectedAsset} />
            </div>

            <div className="p-6 bg-[#070b14] border border-[#c9a84c]/30 rounded-sm mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] text-gray-400 uppercase tracking-widest block">{selectedCryptoData?.symbol || 'BTC'} Wallet Address</label>
                <span className="text-[10px] text-[#c9a84c] font-semibold bg-[#c9a84c]/10 px-2 py-0.5 rounded-sm">Network: {selectedCryptoData?.network || 'N/A'}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input readOnly value={selectedCryptoData?.address || "Address not configured"} className="w-full bg-transparent border border-white/10 text-white p-3 rounded-sm text-sm font-mono focus:outline-none select-all overflow-hidden text-ellipsis" />
                <button onClick={() => handleCopy(selectedCryptoData?.address || '')} className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm flex items-center justify-center gap-2 text-[12px] uppercase tracking-widest font-semibold transition-colors shrink-0">
                  {copied ? <Check className="w-4 h-4 text-[#00d4aa]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">
                  Amount Sent ({selectedSymbol || 'Crypto'})
                </label>
                <div className="relative">
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 0.5" className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#c9a84c]/50 pr-16" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-500 font-bold">{selectedSymbol}</span>
                </div>
                {amountNum > 0 && (
                  <div className="mt-1.5 flex items-center gap-1">
                    {pricesLoading ? (
                      <span className="text-[11px] text-gray-600">Fetching price...</span>
                    ) : usdValue ? (
                      <span className="text-[12px] text-[#00d4aa] font-semibold">≈ ${usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</span>
                    ) : (
                      <span className="text-[11px] text-gray-500">Price unavailable</span>
                    )}
                    {selectedPrice && !pricesLoading && (
                      <span className="text-[10px] text-gray-600 ml-1">· 1 {selectedSymbol} = ${selectedPrice.toLocaleString()}</span>
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Transaction ID (TXID) <span className="text-gray-500 lowercase">(Optional)</span></label>
                <input type="text" value={txid} onChange={(e) => setTxid(e.target.value)} placeholder="0x1a2b3c..." className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#c9a84c]/50" />
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Upload Screenshot (Evidence of Payment)</label>
              <div className="relative w-full border-2 border-dashed border-white/10 hover:border-[#c9a84c]/50 rounded-sm p-6 text-center transition-colors cursor-pointer bg-[#070b14]">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  {screenshotFile ? (
                    <>
                      <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-2">
                        <Check className="w-5 h-5 text-[#c9a84c]" />
                      </div>
                      <span className="text-sm font-medium text-white">{screenshotFile.name}</span>
                      <span className="text-[11px] text-gray-500 uppercase tracking-widest">Click to change file</span>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-2">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-white">Select screenshot image</span>
                      <span className="text-[11px] text-gray-500 uppercase tracking-widest">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button disabled={depositLoading} onClick={handleDepositSubmit} className="w-full bg-white text-[#070b14] py-4 font-bold text-[13px] tracking-widest uppercase transition-colors rounded-sm hover:bg-gray-200 disabled:opacity-60 flex items-center justify-center gap-3">
              {depositLoading ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</>
              ) : 'Submit Deposit Proof'}
            </button>
          </div>
        </div>
      )}
      
      {mode === 'withdraw' && (
        <div className="space-y-8">
          <div className="bg-[#0a0f1c] border border-white/5 p-6 md:p-8 rounded-sm">
            <h2 className="text-lg text-white font-['Outfit'] mb-2">Withdraw Funds</h2>
            <p className="text-[12px] text-gray-400 mb-6">Processed within 24–48 hours after approval.</p>
            
            <div className="p-6 bg-gradient-to-r from-[#00d4aa]/10 to-transparent border border-[#00d4aa]/20 rounded-sm mb-8">
              <div className="text-[11px] text-[#00d4aa] uppercase tracking-widest font-bold mb-1">Available to Withdraw</div>
              <div className="text-3xl text-white font-light font-['Outfit']">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Amount ($)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#00d4aa]/50" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Withdrawal Method</label>
                <CryptoSelector focusColor="focus:border-[#00d4aa]/50 focus:ring-[#00d4aa]/50" value={selectedAsset} onChange={setSelectedAsset} />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Your Receiving Address</label>
                <input type="text" value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} placeholder="Paste address here" className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#00d4aa]/50" />
              </div>
            </div>

            <p className="text-[11px] text-gray-500 mb-6 flex gap-2"><span className="text-[#c9a84c]">⚠</span> Early withdrawal from active plans may incur a 10% processing fee. Only matured plan balances are instantly withdrawable.</p>

            <button disabled={withdrawLoading} onClick={handleWithdrawSubmit} className="w-full bg-[#00d4aa] text-[#070b14] py-4 font-bold text-[13px] tracking-widest uppercase hover:bg-[#00b38f] transition-colors rounded-sm disabled:opacity-60 flex items-center justify-center gap-3">
              {withdrawLoading ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</>
              ) : 'Submit Withdrawal Request'}
            </button>
          </div>
        </div>
      )}

      {mode === 'history' && (
        <div className="space-y-8">
          <div className="bg-[#0a0f1c] border border-white/5 p-6 md:p-8 rounded-sm">
            <h2 className="text-lg text-white font-['Outfit'] mb-6">Transaction History</h2>
            
            {userTransactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border border-white/5 bg-[#070b14] rounded-sm">No transactions found.</div>
            ) : (
              <div className="space-y-4">
                {userTransactions.map(tx => {
                  const timeAgo = Math.floor((Date.now() - tx.timestamp) / 60000);
                  const timeStr = timeAgo < 60 ? `${timeAgo} mins ago` : `${Math.floor(timeAgo/60)} hours ago`;
                  
                  return (
                    <div key={tx.id} className="bg-[#070b14] border border-white/5 p-5 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm ${
                            tx.status === 'pending' ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 
                            tx.status === 'approved' ? 'bg-[#00d4aa]/20 text-[#00d4aa]' : 
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {tx.status}
                          </span>
                          <span className="text-[12px] text-gray-400 uppercase tracking-widest">{tx.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xl text-white font-light">${(tx.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          <span className="text-[10px] font-bold tracking-widest bg-white/10 px-2 py-1 uppercase rounded-sm text-gray-300">{tx.asset || 'N/A'}</span>
                        </div>
                        <div className="text-[11px] text-gray-500 mt-2 flex items-center gap-2">
                          <Clock className="w-3 h-3" /> {timeStr}
                          <span className="mx-2">•</span>
                          TXID: <span className="font-mono">{tx.txid ? tx.txid.substring(0, 8) : 'N/A'}...</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileTab({ profile }: { profile?: any }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="mb-8 mt-4 md:mt-10">
        <h1 className="text-3xl text-white font-['Outfit'] font-light mb-2">Profile & Security</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <ShieldCheck className="w-6 h-6 text-[#00d4aa]" />
            <h2 className="text-lg text-white font-['Outfit']">Account Verification</h2>
          </div>
          <p className="text-[13px] text-gray-400">Complete email verification to secure your account. Full identity KYC is incoming soon.</p>
          <ul className="space-y-3 text-[13px] text-white">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4aa]" /> Email address verified</li>
            <li className="flex items-center gap-2 opacity-40"><CheckCircle2 className="w-4 h-4 text-gray-500" /> Identity verification (Coming Soon)</li>
          </ul>
        </div>

        <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Shield className="w-6 h-6 text-[#00d4aa]" />
            <h2 className="text-lg text-white font-['Outfit']">Security & 2FA</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><div className="text-[13px] text-white">Two-Factor Authentication</div><div className="text-[11px] text-gray-500">Authenticator app</div></div>
              <div className="w-10 h-5 bg-[#00d4aa] rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-[#070b14] rounded-full absolute top-1 right-1"></div></div>
            </div>
            <div className="flex items-center justify-between">
              <div><div className="text-[13px] text-white">Login Alerts</div><div className="text-[11px] text-gray-500">Email on new device</div></div>
              <div className="w-10 h-5 bg-[#00d4aa] rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-[#070b14] rounded-full absolute top-1 right-1"></div></div>
            </div>
            <div className="flex items-center justify-between">
              <div><div className="text-[13px] text-white">Withdrawal PIN</div><div className="text-[11px] text-gray-500">Require PIN for transfers</div></div>
              <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1"></div></div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-[#0a0f1c] border border-white/5 p-6 rounded-sm mb-8">
          <h2 className="text-lg text-white font-['Outfit'] border-b border-white/5 pb-4 mb-4">Trusted Devices</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-sm border border-white/10">
              <div className="flex items-center gap-4">
                <Monitor className="w-6 h-6 text-[#00d4aa]" />
                <div><div className="text-[13px] text-white font-semibold flex items-center gap-2">Chrome <span className="bg-[#00d4aa]/10 text-[#00d4aa] px-2 py-0.5 rounded-sm text-[10px] uppercase">Active Now</span></div><div className="text-[11px] text-gray-500">Windows · This device</div></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-transparent border border-white/5 rounded-sm">
              <div className="flex items-center gap-4">
                <Smartphone className="w-6 h-6 text-gray-500" />
                <div><div className="text-[13px] text-white">Safari</div><div className="text-[11px] text-gray-500">iPhone · Last seen 3 days ago</div></div>
              </div>
              <button className="text-[11px] text-red-400 uppercase tracking-widest font-semibold hover:underline">Revoke</button>
            </div>
          </div>
        </div>

        {/* Mobile-only Logout in Profile */}
        <div className="md:hidden col-span-1 mt-4">
          <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:text-red-400 font-bold uppercase tracking-widest text-[12px] transition-colors rounded-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

function RewardsTab({ profile }: { profile?: any }) {
  const [copied, setCopied] = useState(false);

  const referralCode = profile?.referral_code || 'N/A';
  const referralLink = `https://xholdings.com/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="mb-8 mt-4 md:mt-10 text-center py-10 border border-[#b088f5]/30 bg-gradient-to-b from-[#b088f5]/10 to-[#0a0f1c] rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 bg-[#b088f5]/20 rounded-full blur-[80px] pointer-events-none" />
        <Gift className="w-12 h-12 text-[#b088f5] mx-auto mb-4 relative z-10" />
        <h1 className="text-4xl text-white font-['Outfit'] font-light mb-2 relative z-10">Refer & Earn</h1>
        <p className="text-gray-400 text-[13px] max-w-md mx-auto relative z-10 px-4">Invite friends to join XHoldings and earn 5% of their initial deposit instantly to your withdrawable balance.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-[#0a0f1c] border border-white/5 rounded-sm text-center">
          <div className="text-[11px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Total Referrals</div>
          <div className="text-4xl text-white font-['Outfit']">{profile?.total_referrals || 0}</div>
        </div>
        <div className="p-6 bg-[#0a0f1c] border border-white/5 rounded-sm text-center">
          <div className="text-[11px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Total Earned</div>
          <div className="text-4xl text-[#00d4aa] font-['Outfit']">${Number(profile?.total_earned_referrals || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
      </div>

      <div className="bg-[#0a0f1c] border border-white/5 p-6 md:p-8 rounded-sm mb-8">
        <h2 className="text-lg text-white font-['Outfit'] mb-4">Your Referral Link</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input readOnly value={referralLink} className="w-full bg-[#070b14] border border-white/10 text-gray-300 p-4 rounded-sm text-sm focus:outline-none" />
          <button onClick={handleCopy} className="px-8 bg-[#b088f5] hover:bg-[#9a70e0] text-[#070b14] py-4 text-[13px] tracking-widest uppercase font-bold transition-colors rounded-sm whitespace-nowrap">
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Notification Bell Component ─────────────────────────────────────────────

type NotifItem = {
  id: string;
  title: string;
  body: string;
  time: number;
  read: boolean;
  type: 'deposit' | 'withdrawal' | 'info';
  status: 'approved' | 'rejected' | 'pending';
};

function NotificationBell({ transactions }: { transactions: any[] }) {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState<NotifItem[]>([]);
  const [permGranted, setPermGranted] = useState(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission === 'granted'
      : false
  );
  const prevStatuses = useRef<Record<string, string>>({});

  // Build notification list from transaction changes
  useEffect(() => {
    transactions.forEach(tx => {
      const prev = prevStatuses.current[tx.id];
      const curr = tx.status;
      if (prev !== undefined && prev !== curr) {
        const amt = `$${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${tx.asset || ''}`;
        let title = '';
        let body = '';
        if (tx.type === 'deposit' && curr === 'approved') {
          title = '✅ Deposit Approved';
          body = `Your deposit of ${amt} has been credited.`;
        } else if (tx.type === 'deposit' && curr === 'rejected') {
          title = '❌ Deposit Rejected';
          body = `Your deposit of ${amt} was not approved.`;
        } else if (tx.type === 'withdrawal' && curr === 'approved') {
          title = '💸 Withdrawal Sent';
          body = `Your withdrawal of ${amt} has been sent.`;
        } else if (tx.type === 'withdrawal' && curr === 'rejected') {
          title = '❌ Withdrawal Rejected';
          body = `Your withdrawal of ${amt} was rejected.`;
        }
        if (title) {
          setNotifs(prev => [{
            id: `${tx.id}-${curr}`,
            title,
            body,
            time: Date.now(),
            read: false,
            type: tx.type,
            status: curr,
          }, ...prev].slice(0, 20));
        }
      }
      prevStatuses.current[tx.id] = curr;
    });
  }, [transactions]);

  // Seed with most recent transactions on first load
  useEffect(() => {
    const initial: NotifItem[] = transactions
      .filter(tx => tx.status !== 'pending')
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
      .map(tx => {
        const amt = `$${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${tx.asset || ''}`;
        let title = '';
        let body = '';
        if (tx.type === 'deposit' && tx.status === 'approved') { title = '✅ Deposit Approved'; body = `Deposit of ${amt} credited.`; }
        else if (tx.type === 'deposit' && tx.status === 'rejected') { title = '❌ Deposit Rejected'; body = `Deposit of ${amt} rejected.`; }
        else if (tx.type === 'withdrawal' && tx.status === 'approved') { title = '💸 Withdrawal Sent'; body = `Withdrawal of ${amt} processed.`; }
        else if (tx.type === 'withdrawal' && tx.status === 'rejected') { title = '❌ Withdrawal Rejected'; body = `Withdrawal of ${amt} rejected.`; }
        return { id: tx.id, title, body, time: tx.timestamp, read: true, type: tx.type, status: tx.status };
      })
      .filter(n => n.title !== '');
    setNotifs(initial);
    initial.forEach(n => { prevStatuses.current[n.id.split('-')[0]] = n.status; });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unread = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const handleEnable = async () => {
    const granted = await requestNotificationPermission();
    setPermGranted(granted);
  };

  const formatTime = (ts: number) => {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    if (m < 1440) return `${Math.floor(m / 60)}h ago`;
    return `${Math.floor(m / 1440)}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(o => !o); if (!open) markAllRead(); }}
        className="relative p-1.5 hover:text-white text-gray-400 transition-colors rounded-sm hover:bg-white/5"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-[#c9a84c] text-[#070b14] text-[9px] font-bold px-0.5">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown Panel */}
          <div className="absolute right-0 top-10 z-50 w-[320px] max-w-[calc(100vw-2rem)] bg-[#0a0f1c] border border-white/10 rounded-sm shadow-2xl shadow-black/60 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-[13px] text-white font-semibold uppercase tracking-widest">Notifications</span>
              </div>
              {notifs.length > 0 && (
                <button onClick={markAllRead} className="text-[10px] text-gray-500 hover:text-[#c9a84c] uppercase tracking-widest transition-colors">
                  Mark all read
                </button>
              )}
            </div>

            {/* Enable push prompt */}
            {!permGranted && (
              <div className="px-4 py-3 bg-[#c9a84c]/10 border-b border-[#c9a84c]/20 flex items-center justify-between gap-3">
                <p className="text-[11px] text-[#c9a84c] leading-snug">Enable push notifications to get alerts even when the app is in the background.</p>
                <button onClick={handleEnable} className="shrink-0 px-3 py-1.5 bg-[#c9a84c] text-[#070b14] text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#b89945] transition-colors">
                  Enable
                </button>
              </div>
            )}

            {/* Notification list */}
            <div className="max-h-[340px] overflow-y-auto divide-y divide-white/5">
              {notifs.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-[13px]">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  No notifications yet
                </div>
              ) : (
                notifs.map(n => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 transition-colors ${n.read ? 'opacity-70' : 'bg-white/[0.02]'}`}>
                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${n.status === 'approved' ? 'bg-[#00d4aa]' : n.status === 'rejected' ? 'bg-red-500' : 'bg-[#c9a84c]'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-white font-medium">{n.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{n.body}</div>
                      <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-wide">{formatTime(n.time)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

