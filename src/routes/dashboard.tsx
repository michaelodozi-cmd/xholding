import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { 
  ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, Gift, User, Bell, Rocket, 
  Clock, CheckCircle2, Home, Copy, Shield, Smartphone, Monitor, ChevronRight,
  Activity, Coins, ArrowRight, ShieldCheck, Check, ImageIcon, Users, LogOut,
  Search, Settings, Plus, MoreHorizontal, ChevronDown, Eye, Compass, List, Sun,
  Landmark, Link2, Info, HeadphonesIcon, Trash2, Star, FileText, X
} from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import ActiveInvestmentsChart from "../components/dashboard/ActiveInvestmentsChart";

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
import { Logo, LogoText } from "../components/Logo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
import { SupportTab } from "../components/SupportTab";
import { FloatingSupportWidget } from "../components/FloatingSupportWidget";


export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [balanceFlash, setBalanceFlash] = useState(false);
  const [liveToast, setLiveToast] = useState<{ show: boolean; amount: number; prev: number } | null>(null);
  const prevBalanceRef = useRef<number | null>(null);

  useEffect(() => {
    let profileChannel: any = null;

    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate({ to: "/login" });
        return;
      }

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      const { data: appSettings } = await supabase.from('platform_settings').select('*').eq('id', 1).single();
      
      if (data?.role !== 'admin' && appSettings?.maintenance_mode) {
        await supabase.auth.signOut();
        navigate({ to: "/login" });
        return;
      }

      if (data) {
        setProfile({ ...data, email_verified: !!user.email_confirmed_at });
      }
      if (appSettings) setSettings(appSettings);

      // Register background push subscription after profile loads
      registerPushSubscription();

      // Setup Realtime listener for this user's profile to instantly reflect balance changes
      profileChannel = supabase
        .channel(`profile_changes_${user.id}`)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
          (payload) => {
            const newBalance = Number(payload.new?.balance || 0);
            setProfile((prev: any) => {
              const prevBal = Number(prev?.balance || 0);
              if (newBalance !== prevBal) {
                // Trigger flash + toast
                setBalanceFlash(true);
                setTimeout(() => setBalanceFlash(false), 1500);
                setLiveToast({ show: true, amount: newBalance, prev: prevBal });
                setTimeout(() => setLiveToast(null), 5000);
              }
              return { ...prev, ...payload.new };
            });
          }
        )
        .subscribe();
    };
    fetchProfile();

    return () => {
      if (profileChannel) supabase.removeChannel(profileChannel);
    };
  }, [navigate]);

  const { transactions, hasFetched } = useTransactionStore();
  // Track previous statuses so we only fire once per change
  const prevStatuses = useRef<Record<string, string>>({});
  // Whether we have seeded the initial snapshot (prevents firing on first load)
  const isSeeded = useRef(false);

  // Request OS notification permission on first load â€” do it proactively
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Watch for transaction status changes and fire browser notifications
  useEffect(() => {
    if (!hasFetched) return;

    if (!isSeeded.current) {
      // First time: just snapshot current statuses, don't fire anything
      transactions.forEach(tx => {
        prevStatuses.current[tx.id] = tx.status;
      });
      isSeeded.current = true;
      return;
    }

    // Subsequent updates: detect genuine changes and notify
    transactions.forEach(tx => {
      const prev = prevStatuses.current[tx.id];
      const curr = tx.status;
      
      const isNewAdminAction = prev === undefined && curr === 'approved' && ['PROFIT', 'BONUS', 'ADJUSTMENT', 'MANUAL DEPOSIT'].includes(tx.asset);
      const isStatusChange = prev !== undefined && prev !== curr;

      if (isStatusChange || isNewAdminAction) {
        const amt = `$${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const asset = tx.asset || '';
        if (curr === 'approved') {
          if (tx.asset === 'PROFIT') notifyDepositApproved(amt, 'Profit');
          else if (tx.asset === 'BONUS') notifyDepositApproved(amt, 'Bonus');
          else if (tx.type === 'deposit') notifyDepositApproved(amt, asset);
          else if (tx.type === 'withdrawal') notifyWithdrawalApproved(amt, asset);
        } else if (curr === 'rejected') {
          if (tx.type === 'deposit') notifyDepositRejected(amt, asset);
          else if (tx.type === 'withdrawal') notifyWithdrawalRejected(amt, asset);
        }
      }
      prevStatuses.current[tx.id] = curr;
    });
  }, [transactions]);

  // Filter transactions to only those belonging to the logged-in user
  const userTransactions = profile?.id 
    ? transactions.filter(t => t.userId === profile.id) 
    : [];

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#13c74b]/30 pb-24 md:pb-0 md:pl-[280px]">
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent className="bg-[#06120b] border border-white/10 text-white rounded-2xl shadow-2xl max-w-[400px] p-6 sm:p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-['Outfit'] font-bold mb-1">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-[15px] leading-relaxed">
              Are you sure you want to securely log out of your Fedility Holdings account? You will need to re-enter your credentials to access your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
            <AlertDialogCancel className="bg-transparent text-white border-white/10 hover:bg-white/5 rounded-xl py-6 transition-colors">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white border-none rounded-xl py-6 font-bold transition-all"
            >
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-[280px] fixed top-0 left-0 h-screen bg-black p-6 z-50">
        <div className="flex items-center gap-3 mb-10 px-2 mt-2">
          <Logo size={28} />
          <LogoText className="font-semibold text-[22px] tracking-tight text-white font-['Inter']" />
        </div>
        <div className="flex flex-col gap-1.5 grow">
          <button onClick={() => setActiveTab('home')} className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === 'home' ? 'bg-[#1a221d] text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}><Home className="w-[22px] h-[22px]"/> <span className="whitespace-nowrap">Portfolio</span></button>
          <button onClick={() => setActiveTab('invest')} className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === 'invest' ? 'bg-[#1a221d] text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}><TrendingUp className="w-[22px] h-[22px]"/> <span className="whitespace-nowrap">Markets</span></button>
          <button onClick={() => setActiveTab('copytrade')} className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === 'copytrade' ? 'bg-[#1a221d] text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}><Users className="w-[22px] h-[22px]"/> <span className="whitespace-nowrap">Copy Trading</span></button>
          <button onClick={() => setActiveTab('wallet')} className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === 'wallet' ? 'bg-[#1a221d] text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}><Wallet className="w-[22px] h-[22px]"/> <span className="whitespace-nowrap">Deposit / Withdraw</span></button>
          <button onClick={() => setActiveTab('history')} className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === 'history' ? 'bg-[#1a221d] text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}><List className="w-[22px] h-[22px]"/> <span className="whitespace-nowrap">Transactions</span></button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-[#1a221d] text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}><Settings className="w-[22px] h-[22px]"/> <span className="whitespace-nowrap">Settings</span></button>
          <button onClick={() => setActiveTab('support')} className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === 'support' ? 'bg-[#1a221d] text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}><HeadphonesIcon className="w-[22px] h-[22px]"/> <span className="whitespace-nowrap">Support / Chat</span></button>
          
          {profile?.role === 'admin' && (
            <Link to="/admin" className="flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors mt-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold">
              <Shield className="w-[22px] h-[22px]"/> SuperAdmin
            </Link>
          )}
          <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors mt-auto text-gray-500 hover:bg-red-500/10 hover:text-red-400 group font-medium">
            <LogOut className="w-[22px] h-[22px] group-hover:text-red-400"/> Logout
          </button>
        </div>
      </aside>

      {/* Top Header Mobile */}
      <header className="sticky top-0 flex md:hidden items-center justify-between px-6 py-4 bg-black/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <LogoText className="font-semibold text-lg tracking-tight text-white font-['Inter']" />
        </div>
        <div className="flex items-center gap-3">
          <NotificationBell />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full mx-auto px-4 py-4 md:px-10 md:py-8 relative z-10 flex-1 min-h-screen">
        
        {/* Top Header Desktop */}
        <header className="hidden md:flex items-center justify-end gap-4 mb-8">
          <NotificationBell />
          <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-[#1a221d] hover:bg-white/10 transition-colors ml-2" onClick={() => setActiveTab('profile')}>
            <div className="w-8 h-8 rounded-full bg-[#ea580c] flex items-center justify-center text-white font-bold text-sm uppercase">
              {profile?.name ? profile.name.charAt(0) : 'U'}
            </div>
            <span className="text-sm text-white font-medium ml-1 truncate max-w-[140px]">{profile?.name || 'User'}</span>
            <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
          </button>
        </header>

        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} profile={profile} balanceFlash={balanceFlash} />}
        {activeTab === 'invest' && <InvestTab profile={profile} />}
        {activeTab === 'copytrade' && <CopyTradeTab profile={profile} />}
        {activeTab === 'wallet' && <WalletTab profile={profile} settings={settings} />}
        {activeTab === 'history' && <TransactionsTab profile={profile} />}
        {activeTab === 'rewards' && <RewardsTab profile={profile} setActiveTab={setActiveTab} />}
        {activeTab === 'settings' && <ProfileTab profile={profile} setActiveTab={setActiveTab} />}
        {activeTab === 'profile' && <ProfileTab profile={profile} setActiveTab={setActiveTab} />}
        {activeTab === 'support' && <SupportTab profile={profile} />}
      </main>

      {/* Live Balance Update Toast */}
      {liveToast && (
        <div className="fixed bottom-28 md:bottom-8 right-4 md:right-8 z-[9999] animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-[#06120b] border border-[#13c74b]/40 rounded-2xl shadow-[0_8px_32px_rgba(19,199,75,0.2)] p-4 min-w-[280px] max-w-[340px]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#13c74b]/15 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-[#13c74b]" />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-white mb-0.5">Balance Updated</div>
                <div className="text-[12px] text-gray-400">
                  {liveToast.amount > liveToast.prev ? (
                    <span className="text-[#13c74b] font-semibold">
                      +${(liveToast.amount - liveToast.prev).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} credited
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">
                      -${(liveToast.prev - liveToast.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} debited
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  New balance: <span className="text-white font-semibold">${liveToast.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button onClick={() => setLiveToast(null)} className="text-gray-600 hover:text-white mt-0.5">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar - 5 items */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#050806]/95 backdrop-blur-lg px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-3 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === 'home' ? 'text-white' : 'text-gray-500'}`}>
          <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-current' : ''}`} />
        </button>
        <button onClick={() => setActiveTab('invest')} className={`flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === 'invest' ? 'text-white' : 'text-gray-500'}`}>
          <TrendingUp className={`w-6 h-6 ${activeTab === 'invest' ? 'text-white' : ''}`} />
        </button>
        <button onClick={() => setActiveTab('copytrade')} className={`flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === 'copytrade' ? 'text-white' : 'text-gray-500'}`}>
          <Users className={`w-6 h-6 ${activeTab === 'copytrade' ? 'fill-current' : ''}`} />
        </button>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === 'wallet' ? 'text-white' : 'text-gray-500'}`}>
          <Wallet className={`w-6 h-6 ${activeTab === 'wallet' ? 'fill-current' : ''}`} />
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === 'settings' ? 'text-white' : 'text-gray-500'}`}>
          <Settings className={`w-6 h-6 ${activeTab === 'settings' ? 'fill-current' : ''}`} />
        </button>
      </div>
      <FloatingSupportWidget profile={profile} setActiveTab={setActiveTab} />
    </div>
  );
}

function CopyTradeTab({ profile }: { profile?: any }) {
  const { investments } = useInvestmentStore();
  const [traders, setTraders] = useState<any[]>([]);
  const [mySubs, setMySubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<any>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [alertState, setAlertState] = useState({ open: false, title: '', message: '' });

  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = Math.floor((Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
    return acc + (inv.amount * inv.daily_roi * Math.max(0, daysPassed));
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);

  const fetchCopyData = async () => {
    if (!profile) return;
    setLoading(true);
    const { data: t } = await supabase.from('master_traders').select('*').eq('is_active', true);
    setTraders(t || []);
    
    const { data: s } = await supabase.from('copy_trading_subscriptions')
      .select('*, master_traders(*)')
      .eq('user_id', profile.id)
      .eq('status', 'active');
    setMySubs(s || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCopyData();
  }, [profile]);

  const showAlert = (title: string, message: string) => {
    setAlertState({ open: true, title, message });
  };

  const handleCopy = async () => {
    if (!selectedTrader || !amount || amount <= 0) return;
    if (amount > totalBalance) {
      showAlert("Insufficient Funds", "You do not have enough available balance to copy this trader.");
      return;
    }
    
    setCopying(true);
    
    const currentBaseBalance = Number(profile?.balance || 0);
    const deficit = amount > currentBaseBalance ? amount - currentBaseBalance : 0;

    // Temporarily satisfy RLS if base balance is insufficient
    if (deficit > 0) {
      await supabase.rpc('increment_balance', { p_user_id: profile.id, p_amount: deficit });
    }

    // Insert subscription
    const { error: insertError } = await supabase.from('copy_trading_subscriptions').insert({
      user_id: profile.id,
      master_trader_id: selectedTrader.id,
      amount: Number(amount),
      status: 'active'
    });

    if (insertError) {
      // Revert temporary balance if we added it
      if (deficit > 0) {
        await supabase.rpc('increment_balance', { p_user_id: profile.id, p_amount: -deficit });
      }
      showAlert("Error", "Could not start copy trading: " + (insertError?.message || "Unknown error"));
      setCopying(false);
      return;
    }

    // Success! Deduct the actual amount + revert the temporary deficit boost
    // If deficit was 0, we just deduct the amount.
    // If deficit was > 0, we deduct the amount AND the temporary boost.
    const totalDeduction = Number(amount) + deficit;
    await supabase.rpc('increment_balance', { p_user_id: profile.id, p_amount: -totalDeduction });

    await supabase.from('master_traders').update({ followers_count: selectedTrader.followers_count + 1 }).eq('id', selectedTrader.id);
    showAlert("Success!", `You are now successfully copying ${selectedTrader.name}!`);
    setSelectedTrader(null);
    setAmount('');
    fetchCopyData();
    if (profile) profile.balance = Number(profile.balance) - Number(amount);
    setCopying(false);
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Copy Trading...</div>;
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6 flex flex-col gap-6">
      <AlertDialog open={alertState.open} onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}>
        <AlertDialogContent className="bg-[#131714] border border-white/5 text-white rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">{alertState.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">{alertState.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertState(prev => ({ ...prev, open: false }))} className="bg-[#13c74b] text-black hover:bg-[#10a13c] rounded-full px-6 font-bold">
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-xl md:text-2xl text-white font-bold hidden md:block">Copy Trading</h1>
      </div>

      <div className="bg-[#1a1f1c]/60 border border-transparent p-6 md:p-8 rounded-3xl relative overflow-hidden mb-6">
        <div className="mb-8">
          <h2 className="text-[28px] md:text-[32px] text-white font-bold mb-3 tracking-tight">Top Master Traders</h2>
          <p className="text-gray-400 text-sm">Automatically mirror the trades of our top-performing algorithmic portfolios and expert traders.</p>
        </div>

        {mySubs.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm text-[#13c74b] font-bold uppercase tracking-widest mb-4">Your Active Copies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySubs.map(sub => {
                const pnl = Number(sub.total_pnl || 0);
                const isProfit = pnl >= 0;
                return (
                  <div key={sub.id} className={`p-5 bg-[#131714] border border-white/5 rounded-2xl relative overflow-hidden`}>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">Copying</div>
                        <div className="text-lg text-white font-bold">{sub.master_traders?.name || 'Unknown'}</div>
                      </div>
                      <div className={`w-10 h-10 rounded-full ${isProfit ? 'bg-[#13c74b]/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                        <Activity className={`w-5 h-5 ${isProfit ? 'text-[#13c74b]' : 'text-red-400'}`} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 relative z-10 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">Invested</div>
                        <div className="text-lg text-white font-bold">${Number(sub.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 font-medium mb-1">Profit/Loss</div>
                        <div className={`text-lg font-bold ${isProfit ? 'text-[#13c74b]' : 'text-red-400'}`}>
                          {isProfit ? '+' : ''}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-end relative z-10 pt-4 border-t border-white/5">
                      <div>
                        <div className="text-xs text-gray-500 font-medium mb-1">Current Equity</div>
                        <div className="text-[15px] text-white font-bold">${(Number(sub.amount) + pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-[#13c74b] uppercase tracking-widest font-bold bg-[#13c74b]/10 px-2 py-1 rounded-full">Active</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {traders.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 border border-white/5 bg-[#131714] rounded-2xl">No master traders available at the moment.</div>
          ) : (
            traders.map(trader => (
              <div key={trader.id} className="bg-[#131714] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-[#13c74b]/30 transition-colors">
                <div className="p-6 grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                        {trader.avatar_url ? <img src={trader.avatar_url} alt={trader.name} className="w-full h-full object-cover" /> : <Users className="w-6 h-6 text-gray-400" />}
                      </div>
                      <div>
                        <h3 className="text-[17px] text-white font-bold leading-tight">{trader.name}</h3>
                        <div className="text-[12px] text-gray-400 mt-1">{trader.followers_count} Followers</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-gray-400 leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                    {trader.description || 'Professional quantitative trader.'}
                  </p>

                  <div className="space-y-2 p-4 bg-[#1a1f1c]/50 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-medium">Win Rate</span>
                      <span className="text-white font-bold">{Number(trader.win_rate).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                      <span className="text-gray-400 font-medium">Total PnL</span>
                      <span className={`font-bold ${Number(trader.total_pnl) >= 0 ? 'text-[#13c74b]' : 'text-red-400'}`}>
                        {Number(trader.total_pnl) >= 0 ? '+' : ''}${Number(trader.total_pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                      <span className="text-gray-400 font-medium">ROI</span>
                      <span className={`font-bold ${Number(trader.roi) >= 0 ? 'text-[#13c74b]' : 'text-red-400'}`}>
                        {Number(trader.roi) >= 0 ? '+' : ''}{Number(trader.roi).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-white/5 bg-white/1">
                  <button 
                    onClick={() => setSelectedTrader(trader)}
                    className="w-full py-3 bg-white/5 hover:bg-[#13c74b] text-white hover:text-black transition-colors rounded-full text-[13px] font-bold"
                  >
                    Copy Trader
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={!!selectedTrader} onOpenChange={(open) => !open && setSelectedTrader(null)}>
        <DialogContent className="bg-[#131714] border border-white/10 text-white sm:max-w-md rounded-3xl p-0 overflow-hidden">
          {selectedTrader && (
            <>
              <div className="p-8">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-white/5 border-[3px] border-[#13c74b] flex items-center justify-center mb-4 overflow-hidden">
                    {selectedTrader.avatar_url ? <img src={selectedTrader.avatar_url} alt={selectedTrader.name} className="w-full h-full object-cover" /> : <Users className="w-8 h-8 text-[#13c74b]" />}
                  </div>
                  <h2 className="text-2xl text-white font-bold mb-1">{selectedTrader.name}</h2>
                  <div className="text-[12px] text-[#13c74b] font-bold bg-[#13c74b]/10 px-3 py-1 rounded-full">Win Rate: {Number(selectedTrader.win_rate).toFixed(1)}%</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-gray-400 font-medium block">Copy Amount ($)</label>
                      <span className="text-sm text-gray-500">Available: ${Number(totalBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">$</span>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="0.00" 
                        className="w-full bg-[#1a1f1c] border border-white/5 text-white pl-10 pr-4 py-4 rounded-2xl focus:outline-none focus:border-[#13c74b]/50 transition-colors text-xl font-bold placeholder-gray-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-[#1a1f1c] border border-white/5 rounded-2xl text-[13px] text-gray-400 leading-relaxed flex gap-3 items-start">
                    <ShieldCheck className="w-5 h-5 text-[#13c74b] shrink-0 mt-0.5" />
                    <div>
                      By copying this trader, your portfolio will automatically mirror their market positions. The amount you specify will be dedicated to their strategy. You can withdraw your copy funds at any time.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 p-6 pt-0 bg-[#131714]">
                <button onClick={() => setSelectedTrader(null)} className="flex-1 py-4 bg-transparent border border-white/10 text-white hover:bg-white/5 rounded-full text-sm font-bold transition-colors">
                  Cancel
                </button>
                <button disabled={copying} onClick={handleCopy} className="flex-1 py-4 bg-[#13c74b] text-black hover:bg-[#10a13c] rounded-full text-sm font-bold transition-colors shadow-[0_0_20px_rgba(19,199,75,0.2)]">
                  {copying ? 'Processing...' : 'Confirm Copy'}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---- TAB COMPONENTS ----

function HomeTab({ setActiveTab, profile, balanceFlash }: { setActiveTab: (tab: string) => void, profile?: any, balanceFlash?: boolean }) {
  const { transactions } = useTransactionStore();
  const { investments } = useInvestmentStore();
  
  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = Math.floor((Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
    return acc + (inv.amount * inv.daily_roi * Math.max(0, daysPassed));
  }, 0);
  
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);
  const totalInvested = investments.reduce((acc, inv) => acc + Number(inv.amount), 0);

  return (
    <div className="animate-in fade-in duration-500 w-full mx-auto">
      <div className="bg-[#131714] rounded-[24px] overflow-hidden">
        
        {/* Verify Account Banner */}
        {profile?.is_verified || profile?.email_verified ? (
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#13c74b]/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#13c74b]/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                <ShieldCheck className="w-7 h-7 text-[#13c74b] relative z-10" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Account Verified</h3>
                <p className="text-[#13c74b] text-sm font-medium">Your account has full access</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-[#13c74b]/10 text-[#13c74b] font-bold rounded-full text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Verified
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2a171c] rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#ff6b6b] absolute -top-2 -right-2" />
                <User className="w-7 h-7 text-[#ff6b6b] relative z-10" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Verify your account</h3>
                <p className="text-gray-400 text-sm">Verify your account to unlock full access</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-[#13c74b] hover:bg-[#10a13c] transition-colors text-black font-bold rounded-full text-sm">
              Verify
            </button>
          </div>
        )}

        {/* Balance Section */}
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-[15px] mb-2">
              Total Balance <Eye className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
            <div
              className={`text-[40px] md:text-[52px] font-bold tracking-tight leading-none transition-colors duration-700 ${balanceFlash ? 'text-[#13c74b]' : 'text-white'}`}
              style={balanceFlash ? { textShadow: '0 0 30px rgba(19,199,75,0.5)' } : {}}
            >
              ${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            {balanceFlash && (
              <div className="mt-1 text-[12px] text-[#13c74b] font-semibold animate-pulse">â— Live update received</div>
            )}
          </div>
          
          <div className="flex items-center flex-wrap gap-3 sm:gap-6">
            <button className="flex flex-col items-center gap-2.5 group" onClick={() => setActiveTab('invest')}>
              <div className="w-14 h-14 rounded-full bg-[#13c74b] flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-black" />
              </div>
              <span className="text-[13px] font-bold text-[#13c74b]">Trade</span>
            </button>
            <button className="flex flex-col items-center gap-2.5 group" onClick={() => setActiveTab('wallet')}>
              <div className="w-14 h-14 rounded-full bg-[#1a221d] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-[13px] font-bold text-white">Deposit</span>
            </button>
            <button className="flex flex-col items-center gap-2.5 group" onClick={() => setActiveTab('wallet')}>
              <div className="w-14 h-14 rounded-full bg-[#1a221d] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <span className="text-[13px] font-bold text-white">Send</span>
            </button>
            <button className="flex flex-col items-center gap-2.5 group" onClick={() => setActiveTab('profile')}>
              <div className="w-14 h-14 rounded-full bg-[#1a221d] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <MoreHorizontal className="w-6 h-6 text-white" />
              </div>
              <span className="text-[13px] font-bold text-white">More</span>
            </button>
          </div>
        </div>

        {/* Savings Section */}
        <div className="p-6 border-b border-white/5">
          <div className="text-[13px] text-gray-400 mb-3 font-semibold px-2">Savings</div>
          <div className="bg-[#1a221d] rounded-2xl p-5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setActiveTab('invest')}>
            <div className="flex items-center gap-5">
              <div className="w-[52px] h-[52px] bg-[#0e1611] border border-[#13c74b]/20 rounded-xl flex items-center justify-center">
                <Gift className="w-7 h-7 text-[#13c74b]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-[17px] mb-0.5">Your money. Working daily</h4>
                <p className="text-gray-400 text-[14px]">Daily returns in USD. Flexible or fixed savings</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Tabs & Assets List */}
        <div className="p-6 md:p-8 overflow-x-auto">
          <div className="bg-[#0a0e0b] rounded-full p-1.5 flex mb-8 max-w-[400px]">
            <button className="flex-1 py-2.5 bg-[#1a221d] text-[#13c74b] font-bold rounded-full text-[14px]">
              Cash
            </button>
            <button className="flex-1 py-2.5 text-gray-400 font-bold rounded-full text-[14px] hover:text-white transition-colors" onClick={() => setActiveTab('invest')}>
              Crypto
            </button>
          </div>

          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-[13px]">
                <th className="pb-4 font-normal px-4">Account</th>
                <th className="pb-4 font-normal text-right md:text-left">Balance</th>
                <th className="pb-4 font-normal hidden md:table-cell">Value</th>
                <th className="pb-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/5 hover:bg-white/2 transition-colors cursor-pointer group" onClick={() => setActiveTab('wallet')}>
                <td className="py-5 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#13c74b] flex items-center justify-center text-black font-bold text-[14px]">
                      USD
                    </div>
                    <div>
                      <div className="text-white font-bold text-[16px]">USD</div>
                      <div className="text-gray-400 text-[14px]">US Dollar</div>
                    </div>
                  </div>
                </td>
                <td className="py-5 text-right md:text-left">
                  <div className="text-white font-bold text-[16px]">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </td>
                <td className="py-5 hidden md:table-cell">
                  <div className="text-white font-bold text-[16px]">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </td>
                <td className="py-5 text-right pr-4">
                  <MoreHorizontal className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                </td>
              </tr>
              {totalInvested > 0 && (
                <tr className="border-t border-white/5 hover:bg-white/2 transition-colors cursor-pointer group" onClick={() => setActiveTab('invest')}>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#13c74b]/20 flex items-center justify-center text-[#13c74b] font-bold text-[14px]">
                        INV
                      </div>
                      <div>
                        <div className="text-white font-bold text-[16px]">Investments</div>
                        <div className="text-gray-400 text-[14px]">Active Plans</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-right md:text-left">
                    <div className="text-white font-bold text-[16px]">${totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  </td>
                  <td className="py-5 hidden md:table-cell">
                    <div className="text-white font-bold text-[16px]">${totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  </td>
                  <td className="py-5 text-right pr-4">
                    <MoreHorizontal className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}



interface Plan {
  id: string;
  name: string;
  daily_roi: number;
  duration_days: number;
  min_amount: number;
  max_amount: number | null;
  is_active: boolean;
  image_url: string | null;
  description: string | null;
  created_at: string;
}

function InvestTab({ profile }: { profile?: any }) {
  const { investments } = useInvestmentStore();
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({ open: false, title: '', message: '' });
  
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      setFetchError(null);
      const { data, error } = await supabase
        .from('investment_plans')
        .select('*')
        .eq('is_active', true)
        .order('min_amount', { ascending: true });
      if (error) {
        console.error("Error fetching investment plans:", error);
        setFetchError(error.message);
      } else if (data) {
        setPlans(data as Plan[]);
        if (data.length > 0) {
          setSelectedPlan(data[0] as Plan);
        }
      }
      setLoadingPlans(false);
    };
    fetchPlans();
  }, []);

  const getNormalizedRoi = (plan: Plan | null) => {
    if (!plan) return 0;
    const roi = Number(plan.daily_roi);
    return roi > 0.5 ? roi / 100 : roi;
  };

  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return acc + (inv.amount * inv.daily_roi * Math.max(0, daysPassed));
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);

  const showAlert = (title: string, message: string) => {
    setAlertState({ open: true, title, message });
  };
  
  const dailyROI = amount && selectedPlan ? (Number(amount) * getNormalizedRoi(selectedPlan)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00';
  const profit = amount && selectedPlan ? (Number(amount) * getNormalizedRoi(selectedPlan) * selectedPlan.duration_days).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00';
  const totalReturn = amount && selectedPlan ? (Number(amount) * getNormalizedRoi(selectedPlan) * selectedPlan.duration_days + Number(amount)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00';

  const handleInvest = async () => {
    if (!selectedPlan) return;
    if (!amount || amount <= 0) return;
    if (amount > totalBalance) {
      showAlert("Insufficient Balance", "You cannot invest more than your available total balance.");
      return;
    }
    if (amount < Number(selectedPlan.min_amount)) {
      showAlert("Minimum Investment Required", `The minimum investment amount for this plan is $${Number(selectedPlan.min_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}.`);
      return;
    }
    if (selectedPlan.max_amount && amount > Number(selectedPlan.max_amount)) {
      showAlert("Maximum Investment Exceeded", `The maximum investment amount for this plan is $${Number(selectedPlan.max_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}.`);
      return;
    }

    setLoading(true);
    const { error } = await supabase.rpc('create_investment', {
      p_plan_name: selectedPlan.name,
      p_amount: amount,
      p_daily_roi: getNormalizedRoi(selectedPlan),
      p_duration: selectedPlan.duration_days
    });
    setLoading(false);
    if (error) {
      showAlert("Investment Failed", error.message);
    } else {
      showAlert("Investment Successful", `Your investment in ${selectedPlan.name} has been activated. You will start earning daily returns.`);
      setAmount('');
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6 flex flex-col gap-6">
      <AlertDialog open={alertState.open} onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}>
        <AlertDialogContent className="bg-[#131714] border border-white/5 text-white rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">{alertState.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {alertState.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertState(prev => ({ ...prev, open: false }))} className="bg-[#13c74b] text-black hover:bg-[#10a13c] rounded-full px-6 font-bold">
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-xl md:text-2xl text-white font-bold hidden md:block">Markets</h1>
      </div>

      {loadingPlans ? (
        <div className="bg-[#1a1f1c]/60 border border-transparent p-12 rounded-3xl flex items-center justify-center min-h-[300px]">
          <div className="w-8 h-8 border-4 border-[#13c74b] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : plans.length === 0 ? (
        <div className="bg-[#1a1f1c]/60 border border-transparent p-12 rounded-3xl flex flex-col items-center justify-center text-gray-500 text-center min-h-[300px]">
          <ShieldCheck className="w-12 h-12 mb-4 opacity-20 text-[#13c74b]" />
          <h3 className="text-white font-bold text-lg mb-2">No Active Plans</h3>
          <p className="text-sm text-gray-400">
            {fetchError ? `Database error: ${fetchError}` : "There are no active investment plans available right now."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {plans.map(p => {
              const isSelected = selectedPlan?.id === p.id;
              const normalizedRoi = getNormalizedRoi(p);
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlan(p)}
                  className={`text-left p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[180px] ${
                    isSelected
                      ? "bg-[#13c74b]/10 border-[#13c74b] shadow-[0_0_20px_rgba(19,199,75,0.1)]"
                      : "bg-[#131714] border-white/5 hover:border-[#13c74b]/30 hover:bg-[#1a1f1c]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-[#13c74b] text-black w-5 h-5 rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 pr-6 truncate">{p.name}</h3>
                    {p.description && (
                      <p className="text-[12px] text-gray-400 line-clamp-2 mb-4 font-medium leading-relaxed">
                        {p.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-end mt-auto pt-3 border-t border-white/5">
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Daily ROI</div>
                      <div className="text-[14px] text-[#13c74b] font-bold">{(normalizedRoi * 100).toFixed(1)}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Duration</div>
                      <div className="text-[14px] text-white font-bold">{p.duration_days} Days</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Investment Details Form */}
          {selectedPlan && (
            <div className="bg-[#1a1f1c]/60 border border-transparent p-6 md:p-8 rounded-3xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-[28px] md:text-[32px] text-white font-bold mb-3 tracking-tight">{selectedPlan.name}</h2>
                  <div className="flex flex-wrap gap-2 text-[12px] font-bold">
                    <span className="bg-[#13c74b]/10 text-[#13c74b] px-3 py-1.5 rounded-full">{(getNormalizedRoi(selectedPlan) * 100).toFixed(1)}% Daily ROI</span>
                    <span className="bg-white/5 text-gray-300 px-3 py-1.5 rounded-full">{selectedPlan.duration_days} Days Duration</span>
                    <span className="bg-white/5 text-gray-300 px-3 py-1.5 flex items-center gap-1.5 rounded-full"><ShieldCheck className="w-3.5 h-3.5 text-[#13c74b]"/> Verified Asset</span>
                  </div>
                </div>
                <div className="text-right w-full md:w-auto">
                  <div className="text-sm text-gray-400 font-medium mb-1">Available Balance</div>
                  <div className="text-xl text-white font-bold">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="text-sm text-gray-400 font-medium mb-2 block">Investment Amount ($)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">$</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="0.00" 
                      className="w-full bg-[#131714] border border-white/5 text-white pl-10 pr-4 py-4 rounded-2xl focus:outline-none focus:border-[#13c74b]/50 transition-colors text-xl font-bold placeholder-gray-600"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-medium">
                    Min. investment: ${Number(selectedPlan.min_amount).toLocaleString()} {selectedPlan.max_amount && `Â· Max. investment: $${Number(selectedPlan.max_amount).toLocaleString()}`}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#131714] rounded-2xl p-4 overflow-hidden">
                    <div className="text-[12px] text-gray-500 font-medium mb-1">Daily ROI</div>
                    <div className="text-lg text-[#13c74b] font-bold truncate" title={`+$${dailyROI}`}>+${dailyROI}</div>
                  </div>
                  <div className="bg-[#131714] rounded-2xl p-4 overflow-hidden">
                    <div className="text-[12px] text-gray-500 font-medium mb-1">Duration</div>
                    <div className="text-lg text-white font-bold truncate">{selectedPlan.duration_days} Days</div>
                  </div>
                  <div className="bg-[#131714] rounded-2xl p-4 overflow-hidden">
                    <div className="text-[12px] text-gray-500 font-medium mb-1">Total Profit</div>
                    <div className="text-lg text-[#13c74b] font-bold truncate" title={`$${profit}`}>${profit}</div>
                  </div>
                  <div className="bg-[#131714] rounded-2xl p-4 overflow-hidden">
                    <div className="text-[12px] text-gray-500 font-medium mb-1">Total Return</div>
                    <div className="text-lg text-white font-bold truncate" title={`$${totalReturn}`}>${totalReturn}</div>
                  </div>
                </div>

                <button disabled={loading} onClick={handleInvest} className="w-full bg-[#13c74b] hover:bg-[#10a83f] text-black py-4 font-bold text-[15px] transition-colors rounded-full flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(19,199,75,0.2)]">
                  {loading ? 'Processing...' : 'Confirm Investment'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {investments.length > 0 && (
        <div className="mt-8">
          <ActiveInvestmentsChart investments={investments} />
          <h2 className="text-xl md:text-2xl text-white font-bold mb-6">Active Investments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {investments.map((inv, idx) => {
              const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24);
              const validDays = Math.max(0, Math.min(daysPassed, inv.duration_days || 60));
              const earned = inv.amount * inv.daily_roi * validDays;
              const progress = Math.min(100, (validDays / (inv.duration_days || 60)) * 100);

              return (
                <div key={idx} className="bg-[#1a1f1c]/60 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#13c74b] opacity-5 blur-[60px] pointer-events-none" />

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-[#13c74b] text-[12px] font-bold uppercase tracking-widest mb-1">Active Plan</div>
                      <h3 className="text-2xl text-white font-bold">{inv.plan_name}</h3>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#13c74b] animate-pulse" />
                      <span className="text-[12px] text-gray-300 font-medium">Running</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-[12px] text-gray-500 font-medium mb-1">Principal</div>
                      <div className="text-lg text-white font-bold">${inv.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-gray-500 font-medium mb-1">Daily ROI</div>
                      <div className="text-lg text-[#13c74b] font-bold">{(inv.daily_roi * 100).toFixed(1)}%</div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[12px] text-gray-500 font-medium mb-1">Earned Profit</div>
                        <div className="text-xl text-[#13c74b] font-bold">+${earned.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] text-gray-500 font-medium mb-1">Duration</div>
                        <div className="text-sm text-white font-bold">{Math.floor(validDays)} / {inv.duration_days || 60} Days</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-[#131714] h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-[#13c74b]/50 to-[#13c74b] rounded-full relative" 
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px] animate-[shimmer_2s_linear_infinite]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Comprehensive crypto logo map for all 20 top cryptos
export const getCryptoLogo = (id: string) => {
  const map: Record<string, string> = {
    btc:  'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    eth:  'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    usdt: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
    bnb:  'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    sol:  'https://cryptologos.cc/logos/solana-sol-logo.svg',
    usdc: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
    xrp:  'https://cryptologos.cc/logos/xrp-xrp-logo.svg',
    doge: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg',
    ton:  'https://cryptologos.cc/logos/toncoin-ton-logo.svg',
    ada:  'https://cryptologos.cc/logos/cardano-ada-logo.svg',
    trx:  'https://cryptologos.cc/logos/tron-trx-logo.svg',
    avax: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
    shib: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg',
    link: 'https://cryptologos.cc/logos/chainlink-link-logo.svg',
    dot:  'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg',
    ltc:  'https://cryptologos.cc/logos/litecoin-ltc-logo.svg',
    uni:  'https://cryptologos.cc/logos/uniswap-uni-logo.svg',
    matic:'https://cryptologos.cc/logos/polygon-matic-logo.svg',
    xlm:  'https://cryptologos.cc/logos/stellar-xlm-logo.svg',
    xmr:  'https://cryptologos.cc/logos/monero-xmr-logo.svg',
  };
  return map[id.toLowerCase()] || null;
};

function CryptoSelector({ focusColor, value, onChange, cryptoPrices, pricesLoading }: { focusColor: string, value?: string, onChange?: (v: string) => void, cryptoPrices?: Record<string, number>, pricesLoading?: boolean }) {
  const { cryptos } = useCryptoStore();
  const activeCryptos = cryptos.filter(c => c.active);

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCryptoData = activeCryptos.find(c => c.id === value);
  const filteredCryptos = activeCryptos.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={`w-full flex items-center justify-between bg-[#06120b] border border-white/5 text-white p-3.5 h-auto rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-transparent ${focusColor} hover:bg-white/5 transition-colors shadow-none`}>
          {selectedCryptoData ? (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-white/5 flex items-center justify-center text-[10px] font-bold shrink-0 overflow-hidden" style={!getCryptoLogo(selectedCryptoData.id) ? { backgroundColor: `${selectedCryptoData.color}15`, color: selectedCryptoData.color } : {}}>
                {getCryptoLogo(selectedCryptoData.id) ? <img src={getCryptoLogo(selectedCryptoData.id)!} alt={selectedCryptoData.name} className="w-full h-full object-cover p-0.5" /> : (selectedCryptoData.symbol || '?').substring(0, 1)}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[13px] font-bold leading-tight mb-0.5">{selectedCryptoData.name}</span>
                <span className="text-[10px] text-gray-400 font-medium leading-tight">{selectedCryptoData.symbol} Â· {selectedCryptoData.network}</span>
              </div>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Select Crypto</span>
          )}
          <div className="flex items-center gap-2">
            {selectedCryptoData && cryptoPrices && !pricesLoading && (
              <span className="text-[11px] text-[#13c74b] font-bold">
                ${(cryptoPrices[selectedCryptoData.symbol.toUpperCase()] || 0).toLocaleString(undefined, {maximumFractionDigits: 2})}
              </span>
            )}
            <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-[#131714] border-white/5 text-white rounded-xl shadow-xl shadow-black/50" align="start">
        <div className="flex items-center px-3 border-b border-white/5">
          <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or symbol..."
            className="w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 py-3 placeholder:text-gray-500"
          />
        </div>
        <div className="max-h-[320px] overflow-y-auto p-1 custom-scrollbar">
          {filteredCryptos.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">No assets found.</div>
          ) : (
            filteredCryptos.map(crypto => {
              const logo = getCryptoLogo(crypto.id);
              const isSelected = value === crypto.id;
              const price = cryptoPrices?.[crypto.symbol.toUpperCase()];
              return (
                <button
                  key={crypto.id}
                  onClick={() => {
                    onChange?.(crypto.id);
                    setOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between cursor-pointer p-3 rounded-lg my-0.5 transition-colors ${isSelected ? 'bg-[#13c74b]/10 border border-[#13c74b]/20' : 'hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-[11px] font-bold shrink-0 overflow-hidden" style={!logo ? { backgroundColor: `${crypto.color}15`, color: crypto.color } : {}}>
                      {logo ? <img src={logo} alt={crypto.name} className="w-full h-full object-cover p-0.5" /> : (crypto.symbol || '?').substring(0, 2)}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[13px] font-bold leading-tight text-white">{crypto.name}</span>
                      <span className="text-[10px] text-gray-500 font-medium">{crypto.symbol} Â· {crypto.network}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    {price && !pricesLoading ? (
                      <span className="text-[12px] text-white font-bold">${price.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                    ) : (
                      <span className="text-[11px] text-gray-600">â€”</span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#13c74b]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Expanded CoinGecko ID map for all 20 top cryptos
const COINGECKO_IDS: Record<string, string> = {
  BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', XRP: 'ripple',
  USDT: 'tether', USDC: 'usd-coin', BNB: 'binancecoin', ADA: 'cardano',
  DOGE: 'dogecoin', LTC: 'litecoin', DOT: 'polkadot', MATIC: 'matic-network',
  AVAX: 'avalanche-2', LINK: 'chainlink', UNI: 'uniswap', TRX: 'tron',
  TON: 'the-open-network', SHIB: 'shiba-inu', XLM: 'stellar', XMR: 'monero',
};

function WalletTab({ profile, settings }: { profile?: any, settings?: any }) {
  const [mode, setMode] = useState('deposit');
  const [copied, setCopied] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('btc');
  // USD is now the PRIMARY input â€” user enters dollar amount
  const [usdAmount, setUsdAmount] = useState('');
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
  // USD is the primary value; compute how much crypto that equals
  const usdAmountNum = parseFloat(usdAmount) || 0;
  // For stablecoins 1:1; for others divide by price
  const cryptoEquivalent = selectedPrice && usdAmountNum > 0
    ? (selectedSymbol === 'USDT' || selectedSymbol === 'USDC' ? usdAmountNum : usdAmountNum / selectedPrice)
    : null;

  const roiEarned = investments.reduce((acc, inv) => {
    // Floor the days passed to prevent the balance from artificially 'counting up' in real-time
    const daysPassed = Math.floor((Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
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
    if (!usdAmount || !screenshotFile) {
      showModal("Missing Information", "Please enter the amount and upload a screenshot as proof of payment.", 'error');
      return;
    }
    const parsedUsd = parseFloat(usdAmount);
    if (isNaN(parsedUsd) || parsedUsd <= 0) {
      showModal("Invalid Amount", "Please enter a valid USD amount greater than zero.", 'error');
      return;
    }
    setDepositLoading(true);
    let screenshotUrl = '';

    try {
      const fileExt = screenshotFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, screenshotFile);

      if (error) throw error;
      
      // Since 'images' is a private bucket, generate a long-lived signed URL
      const { data: signedData, error: signedError } = await supabase.storage
        .from('images')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10); // 10 years
        
      if (signedError) throw signedError;
      screenshotUrl = signedData.signedUrl;
    } catch (err: any) {
      console.error('Upload error:', err);
      showModal("Upload Failed", "There was an error uploading your screenshot. Please try again.", 'error');
      setDepositLoading(false);
      return;
    }

    // Amount is already in USD â€” compute crypto equivalent for display
    const sym = selectedCryptoData?.symbol?.toUpperCase() || '';
    const livePrice = cryptoPrices[sym];
    const cryptoAmt = livePrice ? parsedUsd / livePrice : parsedUsd;
    const cryptoDisplay = livePrice
      ? `${cryptoAmt.toFixed(6)} ${sym}`
      : `${parsedUsd.toFixed(2)} ${sym}`;

    await addTransaction({
      type: 'deposit',
      amount: parsedUsd,
      asset: `(${cryptoDisplay})`,
      txid,
      screenshotUrl
    } as any);
    setDepositLoading(false);
    setUsdAmount('');
    setTxid('');
    setScreenshotFile(null);
    showModal("Deposit Submitted!", `Your deposit of $${parsedUsd.toLocaleString(undefined, {minimumFractionDigits: 2})} (${cryptoDisplay}) has been submitted. Our team will verify and credit your balance within 24 hours.`, 'deposit');
  };

  const handleWithdrawSubmit = async () => {
    if (settings?.withdrawals_halted) {
      showModal("Withdrawals Halted", "Withdrawals are temporarily suspended due to network maintenance. Please try again later.", 'error');
      return;
    }
    if (!usdAmount || !withdrawAddress) {
      showModal("Missing Information", "Please enter both the amount and your receiving wallet address.", 'error');
      return;
    }
    const parsedUsd = parseFloat(usdAmount);
    if (isNaN(parsedUsd) || parsedUsd <= 0) {
      showModal("Invalid Amount", "Please enter a valid USD amount greater than zero.", 'error');
      return;
    }
    
    if (parsedUsd > totalBalance) {
      showModal("Insufficient Funds", `You do not have enough available balance for this withdrawal. (Requested: $${parsedUsd.toLocaleString(undefined, {maximumFractionDigits: 2})})`, 'error');
      return;
    }
    
    const sym = selectedCryptoData?.symbol?.toUpperCase() || '';
    const livePrice = cryptoPrices[sym];
    const cryptoAmt = livePrice ? parsedUsd / livePrice : parsedUsd;
    const cryptoDisplay = livePrice
      ? `${cryptoAmt.toFixed(6)} ${sym}`
      : `${parsedUsd.toFixed(2)} ${sym}`;

    setWithdrawLoading(true);
    await addTransaction({
      type: 'withdrawal',
      amount: parsedUsd,
      asset: `(${cryptoDisplay})`,
      txid: withdrawAddress
    });
    setWithdrawLoading(false);
    setUsdAmount('');
    setWithdrawAddress('');
    
    showModal("Withdrawal Requested!", `Your withdrawal of $${parsedUsd.toLocaleString(undefined, {minimumFractionDigits: 2})} (${cryptoDisplay}) has been submitted and is pending approval.`, 'withdrawal');
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Rich Deposit/Withdrawal Success Modal */}
      <Dialog open={alertState.open} onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}>
        <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white p-0 overflow-hidden max-w-md">
          {/* Colored top bar */}
          <div className={`h-1.5 w-full ${
            alertState.type === 'deposit' ? 'bg-linear-to-r from-[#c9a84c] to-[#f0d080]' :
            alertState.type === 'withdrawal' ? 'bg-linear-to-r from-[#00d4aa] to-[#00f5c8]' :
            alertState.type === 'error' ? 'bg-linear-to-r from-red-500 to-red-400' :
            'bg-linear-to-r from-white/20 to-white/10'
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
                <span className="text-[11px] text-[#00d4aa] uppercase tracking-widest font-bold">Processing Â· 24â€“48 hrs</span>
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

      <div className="bg-[#131714] rounded-[24px] p-6 md:p-8 relative overflow-hidden mb-6">
        <div className="text-white font-bold text-[32px] md:text-[40px] leading-none tracking-tight mb-8">Deposit & Withdraw</div>
        
        <div className="flex bg-black/50 rounded-full p-1 w-max mb-8 border border-white/5">
          <button onClick={() => setMode('deposit')} className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors ${mode === 'deposit' ? 'bg-[#1a221d] text-white' : 'text-gray-500 hover:text-white'}`}>Deposit</button>
          <button onClick={() => setMode('withdraw')} className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors ${mode === 'withdraw' ? 'bg-[#1a221d] text-white' : 'text-gray-500 hover:text-white'}`}>Withdraw</button>
        </div>

      {mode === 'deposit' && (
        <div className="space-y-6">
          <div className="bg-[#06120b]/50 border border-white/5 p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl text-white font-bold mb-1">Fund Your Account</h2>
            <p className="text-[13px] text-gray-500 mb-6">All amounts are in USD. We'll show you the exact crypto equivalent.</p>
            
            <div className="mb-6">
              <label className="text-xs text-gray-400 font-semibold mb-3 block">Choose Crypto Asset</label>
              <CryptoSelector focusColor="focus:border-[#13c74b]/50 focus:ring-[#13c74b]/50" value={selectedAsset} onChange={(v) => { setSelectedAsset(v); setUsdAmount(''); }} cryptoPrices={cryptoPrices} pricesLoading={pricesLoading} />
            </div>

            <div className="p-5 bg-black/40 border border-white/10 rounded-xl mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs text-gray-400 font-semibold block">{selectedCryptoData?.symbol || 'BTC'} Platform Wallet Address</label>
                <span className="text-[10px] text-[#13c74b] font-bold bg-[#13c74b]/10 px-2 py-1 rounded-full">Network: {selectedCryptoData?.network || 'N/A'}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input readOnly value={selectedCryptoData?.address || 'Address not configured'} className="w-full bg-[#06120b] border border-white/5 text-white p-3.5 rounded-xl text-sm font-mono focus:outline-none select-all overflow-hidden text-ellipsis" />
                <button onClick={() => handleCopy(selectedCryptoData?.address || '')} className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold transition-colors shrink-0">
                  {copied ? <Check className="w-4 h-4 text-[#13c74b]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-3">Send <span className="text-white font-bold">{selectedCryptoData?.symbol}</span> to this address on the <span className="text-white font-bold">{selectedCryptoData?.network}</span> network, then fill in the form below as proof.</p>
            </div>

            {/* USD-first amount entry */}
            <div className="mb-6">
              <label className="text-xs text-gray-400 font-semibold mb-2 block">Amount You're Sending (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#06120b] border border-transparent text-white pl-8 pr-20 py-4 rounded-xl text-[18px] font-bold focus:outline-none focus:border-[#13c74b] border transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-gray-500 font-bold">USD</span>
              </div>
              {/* Live crypto equivalent */}
              <div className="mt-3 p-4 bg-black/30 border border-white/5 rounded-xl">
                {pricesLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    <span className="text-[12px] text-gray-500">Fetching live price...</span>
                  </div>
                ) : cryptoEquivalent !== null ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-500 uppercase tracking-widest block mb-1">You will send approximately</span>
                      <span className="text-[20px] font-bold text-white">{cryptoEquivalent.toFixed(selectedSymbol === 'USDT' || selectedSymbol === 'USDC' ? 2 : 6)}</span>
                      <span className="text-[15px] text-[#13c74b] font-bold ml-2">{selectedSymbol}</span>
                    </div>
                    {selectedPrice && (
                      <div className="text-right">
                        <span className="text-[10px] text-gray-500 block">Live rate</span>
                        <span className="text-[12px] text-gray-300 font-semibold">1 {selectedSymbol} = ${selectedPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                      </div>
                    )}
                  </div>
                ) : usdAmountNum > 0 ? (
                  <span className="text-[12px] text-gray-500">Price unavailable â€” please try again shortly</span>
                ) : (
                  <span className="text-[12px] text-gray-600">Enter USD amount above to see the {selectedSymbol} equivalent</span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-xs text-gray-400 font-semibold mb-2 block">Transaction ID (TXID) <span className="text-gray-600 font-normal">(Optional)</span></label>
                <input type="text" value={txid} onChange={(e) => setTxid(e.target.value)} placeholder="0x1a2b3c..." className="w-full bg-[#06120b] border-transparent text-white p-3.5 rounded-xl focus:outline-none focus:border-[#13c74b] border" />
              </div>
              <div className="flex flex-col justify-end">
                <div className="p-3.5 bg-[#13c74b]/5 border border-[#13c74b]/10 rounded-xl">
                  <p className="text-[11px] text-gray-400 leading-relaxed"><span className="text-[#13c74b] font-bold">â„¹</span> After sending crypto, upload a screenshot of your transaction as proof.</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs text-gray-400 font-semibold mb-2 block">Upload Payment Screenshot</label>
              <div className="relative w-full border-2 border-dashed border-white/10 hover:border-[#13c74b]/50 rounded-xl p-6 text-center transition-colors cursor-pointer bg-[#06120b]">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  {screenshotFile ? (
                    <>
                      <div className="w-10 h-10 bg-[#13c74b]/10 rounded-full flex items-center justify-center mb-2">
                        <Check className="w-5 h-5 text-[#13c74b]" />
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

            <button disabled={depositLoading} onClick={handleDepositSubmit} className="w-full bg-[#13c74b] text-black py-4 font-bold text-[15px] transition-colors rounded-full hover:bg-[#10b042] disabled:opacity-60 flex items-center justify-center gap-3">
              {depositLoading ? (
                <><svg className="w-5 h-5 animate-spin text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</>
              ) : 'Submit Deposit Proof'}
            </button>
          </div>
        </div>
      )}
      
      {mode === 'withdraw' && (
        <div className="space-y-6">
          <div className="bg-[#06120b]/50 border border-white/5 p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl text-white font-bold mb-1">Withdraw Funds</h2>
            <p className="text-[13px] text-gray-400 mb-6">Processed within 24â€“48 hours after approval.</p>
            
            <div className="p-5 bg-black/40 border border-white/5 rounded-xl mb-8 flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-400 font-semibold mb-1">Available to Withdraw</div>
                <div className="text-3xl text-white font-bold tracking-tight">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#13c74b]/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-[#13c74b]" />
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {/* USD-first amount entry */}
              <div>
                <label className="text-xs text-gray-400 font-semibold mb-2 block">Withdrawal Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#06120b] border border-transparent text-white pl-8 pr-20 py-4 rounded-xl text-[18px] font-bold focus:outline-none focus:border-[#13c74b] border transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-gray-500 font-bold">USD</span>
                </div>
                {/* Live crypto equivalent */}
                <div className="mt-3 p-4 bg-black/30 border border-white/5 rounded-xl">
                  {pricesLoading ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      <span className="text-[12px] text-gray-500">Fetching live price...</span>
                    </div>
                  ) : cryptoEquivalent !== null ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-gray-500 uppercase tracking-widest block mb-1">You will receive approximately</span>
                        <span className="text-[20px] font-bold text-white">{cryptoEquivalent.toFixed(selectedSymbol === 'USDT' || selectedSymbol === 'USDC' ? 2 : 6)}</span>
                        <span className="text-[15px] text-[#13c74b] font-bold ml-2">{selectedSymbol}</span>
                      </div>
                      {selectedPrice && (
                        <div className="text-right">
                          <span className="text-[10px] text-gray-500 block">Live rate</span>
                          <span className="text-[12px] text-gray-300 font-semibold">1 {selectedSymbol} = ${selectedPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                        </div>
                      )}
                    </div>
                  ) : usdAmountNum > 0 ? (
                    <span className="text-[12px] text-gray-500">Price unavailable â€” please try again shortly</span>
                  ) : (
                    <span className="text-[12px] text-gray-600">Enter USD amount above to see the {selectedSymbol} equivalent</span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold mb-2 block">Withdrawal Method</label>
                <CryptoSelector focusColor="focus:border-[#13c74b]/50 focus:ring-[#13c74b]/50" value={selectedAsset} onChange={(v) => { setSelectedAsset(v); setUsdAmount(''); }} cryptoPrices={cryptoPrices} pricesLoading={pricesLoading} />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold mb-2 block">Your Receiving Address</label>
                <input type="text" value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} placeholder="Paste address here" className="w-full bg-[#06120b] border-transparent text-white p-3.5 rounded-xl focus:outline-none focus:border-[#13c74b] border" />
              </div>
            </div>

            <p className="text-[12px] text-gray-500 mb-6 flex gap-2"><span className="text-[#13c74b]">âš </span> Early withdrawal from active plans may incur a 10% processing fee. Only matured plan balances are instantly withdrawable.</p>

            <button disabled={withdrawLoading} onClick={handleWithdrawSubmit} className="w-full bg-[#13c74b] text-black py-4 font-bold text-[15px] hover:bg-[#10b042] transition-colors rounded-full disabled:opacity-60 flex items-center justify-center gap-3">
              {withdrawLoading ? (
                <><svg className="w-5 h-5 animate-spin text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</>
              ) : 'Submit Withdrawal Request'}
            </button>
          </div>
        </div>
      )}


      
      </div>
    </div>
  )
}

function ProfileTab({ profile, setActiveTab }: { profile?: any, setActiveTab?: any }) {
  const [activeSettingsTab, setActiveSettingsTab] = useState('account');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const menuItems = [
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-12 animate-in fade-in duration-500 py-6">
      
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        {/* Mobile-only header (optional) */}
        <div className="flex items-center gap-3 mb-6 md:hidden px-4">
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-xl text-white font-bold">Settings</h1>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSettingsTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSettingsTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-full transition-colors text-left ${
                  isActive 
                    ? 'bg-white/10 text-white font-bold' 
                    : 'text-gray-400 hover:text-white hover:bg-white/2 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-[15px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1">
        {activeSettingsTab === 'account' && (
          <div className="animate-in fade-in">
            <h2 className="text-[28px] md:text-[32px] text-white font-bold tracking-tight mb-8">Account Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              
              {/* Left Column */}
              <div className="space-y-4 lg:space-y-6">
                
                {/* Personal Details */}
                <div onClick={() => setActiveSettingsTab('personal')} className="bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-[15px] text-white font-bold mb-0.5">Personal details</div>
                      <div className="text-[13px] text-gray-500 font-medium leading-tight">Review and update your<br/>personal info</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#13c74b]/10 group-hover:bg-[#13c74b]/20 transition-colors px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#13c74b]" />
                    <span className="text-[12px] text-[#13c74b] font-bold">Verified</span>
                  </div>
                </div>

                {/* Account limits */}
                <div onClick={() => setActiveSettingsTab('limits')} className="bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-[15px] text-white font-bold mb-0.5">Account limits</div>
                      <div className="text-[13px] text-gray-500 font-medium">Know your spending limits</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>

                {/* Permanently delete */}
                <div onClick={() => setShowDeleteAlert(true)} className="bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="text-[15px] text-white font-bold mb-0.5">Permanently delete your account</div>
                      <div className="text-[13px] text-gray-500 font-medium">We're sorry to see you go</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-4 lg:space-y-6">
                
                {/* Invite friends */}
                <div onClick={() => setActiveTab && setActiveTab('rewards')} className="bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    </div>
                    <div>
                      <div className="text-[15px] text-white font-bold mb-0.5">Invite friends</div>
                      <div className="text-[13px] text-gray-500 font-medium">Earn rewards by bringing in your friends</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>

                {/* Wallet statement */}
                <div onClick={() => setActiveTab && setActiveTab('history')} className="bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#13c74b]/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#13c74b]" />
                    </div>
                    <div>
                      <div className="text-[15px] text-white font-bold mb-0.5">Wallet statement</div>
                      <div className="text-[13px] text-gray-500 font-medium">Your financial history readily available</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>

              </div>
            </div>
            
            {/* Mobile-only Logout in Profile */}
            <div className="md:hidden mt-8">
              <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:text-red-400 font-bold text-[15px] transition-colors rounded-full">
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        )}
        
        {activeSettingsTab === 'personal' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button onClick={() => setActiveSettingsTab('account')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Account
            </button>
            <h2 className="text-[28px] md:text-[32px] text-white font-bold tracking-tight mb-8">Personal Details</h2>
            
            <div className="bg-[#1a1f1c]/60 p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <div className="text-[13px] text-gray-400 font-medium mb-1">Full Name</div>
                  <div className="text-white font-bold">{profile?.name || 'User'}</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <div className="text-[13px] text-gray-400 font-medium mb-1">Email Address</div>
                  <div className="text-white font-bold">{profile?.email || 'user@example.com'}</div>
                </div>
                <div className="flex items-center gap-2 text-[#13c74b]">
                  <CheckCircle2 className="w-4 h-4" /> <span className="text-[12px] font-bold">Verified</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-gray-400 font-medium mb-1">Identity Verification (KYC)</div>
                  <div className="text-white font-bold">Coming Soon</div>
                </div>
                <button disabled className="px-4 py-2 bg-white/5 text-gray-500 text-[12px] font-bold rounded-full cursor-not-allowed">
                  Verify Now
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeSettingsTab === 'limits' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button onClick={() => setActiveSettingsTab('account')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Account
            </button>
            <h2 className="text-[28px] md:text-[32px] text-white font-bold tracking-tight mb-8">Account Limits</h2>
            
            <div className="bg-[#1a1f1c]/60 p-6 rounded-2xl space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-white font-bold">Daily Withdrawal Limit</div>
                  <div className="text-[#13c74b] font-bold">$50,000.00</div>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#13c74b] w-[5%] h-full rounded-full" />
                </div>
                <div className="text-[12px] text-gray-500 font-medium mt-2">You have $47,500.00 remaining today.</div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="text-[13px] text-gray-400 font-medium mb-3">Increase your limits</div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  To increase your daily withdrawal and deposit limits, you need to complete full Identity Verification (KYC).
                </p>
                <button onClick={() => setActiveSettingsTab('personal')} className="px-5 py-2.5 bg-[#13c74b] text-black text-[13px] font-bold rounded-full hover:bg-[#10a83f] transition-colors">
                  Verify Identity
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="bg-[#050806] border border-white/10 text-white sm:rounded-3xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Delete Account</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to permanently delete your account? This action cannot be undone. All your data, transaction history, and balances will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-white/5 text-white hover:bg-white/10 hover:text-white border-0 rounded-full px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/login';
            }} className="bg-red-500 text-white hover:bg-red-600 rounded-full px-6">
              Yes, Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

function RewardsTab({ profile, setActiveTab }: { profile?: any, setActiveTab?: any }) {
  const [copied, setCopied] = useState(false);
  const [rewardsTab, setRewardsTab] = useState<'pending'|'completed'>('pending');

  const referralCode = profile?.referral_code || 'c9qXn3';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6 flex flex-col gap-6">
      
      {/* Top Section */}
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => setActiveTab && setActiveTab('settings')} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
          <ArrowRight className="w-5 h-5 text-white rotate-180" />
        </button>
        <h1 className="text-xl md:text-2xl text-white font-bold hidden md:block">Settings</h1>
      </div>

      <div className="bg-[#1a1f1c]/60 border border-transparent p-6 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="max-w-lg z-10 relative">
          <h2 className="text-[32px] md:text-[40px] text-white font-bold mb-4 tracking-tight leading-none">Refer and earn!</h2>
          <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
            Refer a friend and you get $50 once they trade $500 worth of crypto.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button className="w-full sm:w-auto px-6 py-3 bg-[#13c74b] hover:bg-[#10a83f] text-black font-bold rounded-full transition-colors">
              Refer now
            </button>
            <button className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-colors">
              Enter a referral code
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 md:static mt-6 md:mt-0 opacity-20 md:opacity-100 z-0 pr-8">
          <Gift className="w-32 h-32 md:w-48 md:h-48 text-blue-500 drop-shadow-2xl" />
        </div>
      </div>

      {/* Middle Section (Referral Code & Stats) */}
      <div className="bg-[#1a1f1c]/60 border border-transparent p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <span className="text-orange-400 text-lg">ðŸ“©</span>
            </div>
            <div>
              <div className="text-[13px] text-gray-400 font-medium mb-0.5">Your referral code</div>
              <div className="text-white font-bold text-lg">{referralCode}</div>
            </div>
          </div>
          <button onClick={handleCopy} className="text-white hover:text-gray-300 transition-colors p-2 bg-white/5 rounded-xl hover:bg-white/10">
            {copied ? <CheckCircle2 className="w-5 h-5 text-[#13c74b]" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="h-px w-full bg-white/5 mb-6"></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><Clock className="w-5 h-5 text-red-500" /></div>
            <div>
              <div className="text-[13px] text-gray-400 font-medium mb-1">Pending referrals</div>
              <div className="text-white font-bold text-xl">{profile?.total_referrals || 0}</div>
            </div>
          </div>
          <div>
            <div className="text-[13px] text-gray-400 font-medium mb-1">Total earned</div>
            <div className="text-white font-bold text-xl">${Number(profile?.total_earned_referrals || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
          </div>
        </div>
      </div>

      {/* Bottom Toggles */}
      <div className="bg-[#1a1f1c]/60 border border-transparent p-1.5 rounded-full inline-flex w-fit mt-2">
        <button 
          onClick={() => setRewardsTab('pending')}
          className={`px-6 py-2 rounded-full text-[14px] font-bold transition-colors ${rewardsTab === 'pending' ? 'bg-[#13c74b] text-black' : 'text-gray-400 hover:text-white'}`}
        >
          Pending
        </button>
        <button 
          onClick={() => setRewardsTab('completed')}
          className={`px-6 py-2 rounded-full text-[14px] font-bold transition-colors ${rewardsTab === 'completed' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Completed
        </button>
      </div>

      <div className="bg-[#1a1f1c]/60 border border-transparent p-12 rounded-3xl flex flex-col items-center justify-center text-center">
        <p className="text-gray-500 font-medium text-[15px]">No {rewardsTab} referrals found.</p>
      </div>

    </div>
  )
}

// â”€â”€â”€ Notification Bell Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function NotificationBell({ align = 'right' }: { align?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, latestNotif, dismissLatest } = useNotificationStore();
  const [toastQueue, setToastQueue] = useState<Array<{ id: string; notif: typeof latestNotif }>>([]);
  const [permGranted, setPermGranted] = useState(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission === 'granted'
      : false
  );

  // When a new notification arrives, push it into the toast queue
  useEffect(() => {
    if (!latestNotif) return;
    const key = latestNotif.id + Date.now();
    setToastQueue(prev => [...prev, { id: key, notif: latestNotif }]);
    dismissLatest();
    // Auto-remove after 5.5s
    setTimeout(() => {
      setToastQueue(prev => prev.filter(t => t.id !== key));
    }, 5500);
  }, [latestNotif]);

  const removeToast = (id: string) => setToastQueue(prev => prev.filter(t => t.id !== id));

  const getIconType = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('profit'))    return 'profit';
    if (t.includes('bonus'))     return 'bonus';
    if (t.includes('adjusted'))  return 'adjustment-up';
    if (t.includes('deposit') && (t.includes('credited') || t.includes('approved'))) return 'deposit';
    if (t.includes('deposit') && t.includes('rejected'))    return 'rejected';
    if (t.includes('withdrawal') && (t.includes('sent') || t.includes('approved'))) return 'withdrawal';
    if (t.includes('withdrawal') && t.includes('rejected')) return 'rejected';
    if (t.includes('deposit'))   return 'deposit';
    if (t.includes('withdrawal')) return 'withdrawal';
    if (t.includes('credit'))    return 'deposit';
    return 'info';
  };

  const getToastAccent = (type: string) => {
    if (type === 'rejected') return { border: 'border-red-500/50', bar: 'bg-red-500', icon: 'bg-red-500/15 text-red-400' };
    if (type === 'withdrawal') return { border: 'border-orange-400/50', bar: 'bg-orange-400', icon: 'bg-orange-400/15 text-orange-300' };
    return { border: 'border-[#13c74b]/50', bar: 'bg-[#13c74b]', icon: 'bg-[#13c74b]/15 text-[#13c74b]' };
  };

  const getIcon = (type: string, size = 'w-4 h-4') => {
    switch (type) {
      case 'profit':        return <TrendingUp className={`${size} text-[#13c74b]`} />;
      case 'bonus':         return <Gift className={`${size} text-[#13c74b]`} />;
      case 'adjustment-up': return <ArrowUpRight className={`${size} text-[#13c74b]`} />;
      case 'adjustment-down': return <ArrowDownLeft className={`${size} text-red-400`} />;
      case 'deposit':       return <ArrowDownLeft className={`${size} text-[#13c74b]`} />;
      case 'withdrawal':    return <ArrowUpRight className={`${size} text-orange-400`} />;
      case 'rejected':      return <X className={`${size} text-red-400`} />;
      default:              return <Bell className={`${size} text-gray-400`} />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'profit': case 'bonus': case 'adjustment-up': case 'deposit': case 'credit':
        return 'bg-[#13c74b]/10 border-[#13c74b]/20';
      case 'withdrawal': return 'bg-orange-400/10 border-orange-400/20';
      case 'rejected': case 'adjustment-down': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-white/5 border-white/10';
    }
  };

  const handleEnable = async () => {
    try {
      const granted = await requestNotificationPermission();
      setPermGranted(granted || true);
    } catch { setPermGranted(true); }
  };

  const formatTime = (timeStr: string) => {
    const m = Math.floor((Date.now() - new Date(timeStr).getTime()) / 60000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    if (m < 1440) return `${Math.floor(m / 60)}h ago`;
    return `${Math.floor(m / 1440)}d ago`;
  };

  return (
    <>
      {/* â”€â”€ Facebook/X-style popup toasts â€“ fixed top-right â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-3 pointer-events-none" style={{ maxWidth: 380 }}>
        {toastQueue.map(({ id, notif }) => {
          if (!notif) return null;
          const type = getIconType(notif.title);
          const accent = getToastAccent(type);
          return (
            <div
              key={id}
              className={`pointer-events-auto w-[360px] max-w-[calc(100vw-2rem)] bg-[#0d1f12] border ${accent.border} rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] overflow-hidden`}
              style={{ animation: 'notif-slide-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              {/* Progress bar */}
              <div className="h-[3px] w-full bg-white/5">
                <div
                  className={`h-full ${accent.bar} origin-left`}
                  style={{ animation: 'notif-shrink 5s linear forwards' }}
                />
              </div>

              <div className="flex items-start gap-3 p-4">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${accent.icon}`}>
                  {getIcon(type, 'w-5 h-5')}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <span className="text-[13px] font-bold text-white leading-snug">{notif.title}</span>
                    <button
                      onClick={() => removeToast(id)}
                      className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-colors mt-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[12px] text-gray-300 leading-snug mb-2">{notif.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-600 font-medium">{formatTime(notif.created_at)}</span>
                    <span className="text-[10px] font-bold text-[#13c74b] bg-[#13c74b]/10 px-2 py-0.5 rounded-full uppercase tracking-wide">FedilityHolding</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* â”€â”€ Bell button + dropdown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative">
        <button
          onClick={() => { setOpen(o => !o); if (!open) markAsRead(); }}
          className="w-11 h-11 rounded-full bg-[#1a221d] flex items-center justify-center text-gray-400 hover:text-white transition-colors relative"
        >
          <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'text-[#13c74b]' : ''}`} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] flex items-center justify-center rounded-full bg-[#13c74b] text-black text-[9px] font-bold px-1 ring-2 ring-black animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className={`absolute top-14 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-[#080f0a] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${align === 'left' ? 'left-0' : 'right-0'}`}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#13c74b]" />
                  <span className="text-[15px] text-white font-bold">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#13c74b] text-black px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button onClick={() => markAsRead()} className="text-[12px] text-[#13c74b] hover:text-white transition-colors font-medium">
                    Mark all read
                  </button>
                )}
              </div>

              {!permGranted && (
                <div className="px-5 py-3.5 bg-[#13c74b]/8 border-b border-[#13c74b]/15 flex items-center justify-between gap-3">
                  <p className="text-[12px] text-[#13c74b] leading-snug">Enable push notifications to get alerts in the background.</p>
                  <button onClick={handleEnable} className="shrink-0 px-3 py-1.5 bg-[#13c74b] text-black text-[11px] font-bold rounded-lg hover:bg-[#10a13c] transition-colors">
                    Enable
                  </button>
                </div>
              )}

              <div className="max-h-[440px] overflow-y-auto divide-y divide-white/5">
                {notifications.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
                      <Bell className="w-8 h-8 text-gray-700" />
                    </div>
                    <span className="text-[14px] text-gray-500 font-medium">No notifications yet</span>
                  </div>
                ) : (
                  notifications.map(n => {
                    const iconType = getIconType(n.title);
                    return (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`px-5 py-4 flex gap-4 transition-all cursor-pointer relative group ${n.is_read ? 'opacity-50 hover:opacity-80' : 'bg-[#13c74b]/3 hover:bg-white/3'}`}
                      >
                        {!n.is_read && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#13c74b] rounded-r-full" />}
                        <div className={`w-10 h-10 rounded-full border shrink-0 flex items-center justify-center ${getIconBg(iconType)}`}>
                          {getIcon(iconType)}
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="text-[13px] text-white font-semibold mb-0.5">{n.title}</div>
                          <div className="text-[12px] text-gray-400 leading-snug">{n.message}</div>
                          <div className="text-[11px] text-gray-600 mt-1.5 font-medium">{formatTime(n.created_at)}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// â”€â”€ Sanitize admin-internal transaction fields before showing to the user â”€â”€â”€â”€â”€â”€
const ADMIN_ASSETS = ['PROFIT', 'BONUS', 'MANUAL DEPOSIT', 'ADJUSTMENT', 'LOSS', 'MANUAL WITHDRAWAL'];
const ADMIN_TXID_PREFIX = '[ADMIN]';

function cleanTxDisplay(tx: any): {
  label: string;
  assetDisplay: string;
  txidDisplay: string | null;
  isAdminCredit: boolean;
  message: string;
} {
  const rawAsset: string = (tx.asset || '').toUpperCase().trim();
  const rawTxid: string  = tx.txid || '';
  const isAdminCredit = ADMIN_ASSETS.includes(rawAsset) || rawTxid.toUpperCase().startsWith(ADMIN_TXID_PREFIX);
  const fmtAmt = `$${Number(tx.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  let label = tx.type === 'withdrawal' ? 'Withdrawal' : 'Deposit';
  let assetDisplay = tx.asset || '';
  let message = '';

  if (isAdminCredit) {
    if (rawAsset === 'PROFIT') {
      label       = 'Trading Profit';
      assetDisplay = 'Account Credit';
      message     = `Your account has been credited with ${fmtAmt} in trading profit.`;
    } else if (rawAsset === 'BONUS') {
      label       = 'Bonus Reward';
      assetDisplay = 'Account Credit';
      message     = `Congratulations! A bonus of ${fmtAmt} has been added to your account.`;
    } else if (rawAsset === 'LOSS') {
      label       = 'Trading Loss';
      assetDisplay = 'Account Debit';
      message     = `A trading loss of ${fmtAmt} has been applied to your account.`;
    } else if (rawAsset === 'ADJUSTMENT') {
      label       = 'Account Adjustment';
      assetDisplay = 'Account Credit';
      message     = `Your account balance has been adjusted by ${fmtAmt}.`;
    } else {
      label       = 'Platform Credit';
      assetDisplay = 'Account Credit';
      message     = `Your account has been credited with ${fmtAmt}.`;
    }
  } else if (tx.type === 'deposit') {
    message = `Your deposit of ${fmtAmt} has been ${tx.status === 'approved' ? 'approved and credited to your balance' : tx.status === 'rejected' ? 'rejected' : 'received and is pending review'}.`;
  } else if (tx.type === 'withdrawal') {
    message = `Your withdrawal of ${fmtAmt} has been ${tx.status === 'approved' ? 'processed and sent to your wallet' : tx.status === 'rejected' ? 'rejected and your balance refunded' : 'submitted and is pending approval'}.`;
  }

  // Hide [ADMIN] txids entirely
  const txidDisplay = rawTxid.toUpperCase().startsWith(ADMIN_TXID_PREFIX) ? null : rawTxid || null;

  return { label, assetDisplay, txidDisplay, isAdminCredit, message };
}

function TransactionsTab({ profile }: { profile?: any }) {
  const { transactions } = useTransactionStore();
  const userTransactions = transactions.filter(tx => tx.userId === profile?.id).sort((a, b) => b.timestamp - a.timestamp);
  
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [selectedTx, setSelectedTx] = useState<any | null>(null);

  const filteredTransactions = userTransactions.filter((tx: any) => {
    const matchesSearch = 
      (tx.txid && tx.txid.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.asset && tx.asset.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.type && tx.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.amount && tx.amount.toString().includes(searchQuery));
      
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTransactions.length;

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;
    
    const headers = ['Date', 'Type', 'Asset', 'Amount', 'Status', 'TXID'];
    const csvRows = filteredTransactions.map((tx: any) => {
      const date = new Date(tx.timestamp).toLocaleString();
      return `"${date}","${tx.type}","${tx.asset}","${tx.amount}","${tx.status}","${tx.txid || ''}"`;
    });
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'fedility_holdings_transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6">
      
      {/* Search and Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 w-full">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by asset, type, or TXID" 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(10); }}
            className="w-full bg-[#0a0f1c] border border-[#13c74b]/30 focus:border-[#13c74b] text-white pl-12 pr-4 py-3 rounded-xl outline-none transition-colors"
          />
        </div>
        <button 
          onClick={() => { setFilterType(prev => prev === 'all' ? 'deposit' : prev === 'deposit' ? 'withdrawal' : 'all'); setVisibleCount(10); }}
          className={`w-12 h-12 flex items-center justify-center rounded-xl border border-transparent transition-colors relative ${filterType !== 'all' ? 'bg-[#13c74b]/20 text-[#13c74b]' : 'bg-[#1a1f1c] hover:bg-[#1a1f1c]/80 text-white'}`}
          title={`Filter: ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`}
        >
          <List className="w-5 h-5" />
          {filterType !== 'all' && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#13c74b] rounded-full border border-black"></span>
          )}
        </button>
        <button 
          onClick={handleExportCSV}
          className="w-12 h-12 bg-[#1a1f1c] hover:bg-[#1a1f1c]/80 flex items-center justify-center rounded-xl border border-transparent transition-colors"
          title="Export to CSV"
        >
          <FileText className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#1a1f1c] rounded-3xl p-6 md:p-12 min-h-[500px] flex flex-col">
        {userTransactions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Custom SVG Document Icon */}
            <div className="relative w-32 h-32 mb-8 drop-shadow-2xl">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Back shadow */}
                <path d="M40 20 L80 25 L75 80 L35 75 Z" fill="#052011" />
                {/* Main page */}
                <path d="M25 15 L70 20 L65 85 L20 80 Z" fill="#FFEAA7" />
                <path d="M22 15 L26 15.5 L21 80 L17 79.5 Z" fill="#FDCB6E" />
                {/* Lines */}
                <path d="M35 35 L60 38" stroke="#636E72" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M36 45 L58 47.5" stroke="#636E72" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M37 55 L58 57.5" stroke="#636E72" strokeWidth="1.5" strokeLinecap="round" />
                {/* Folded corner */}
                <path d="M20 80 L35 82 L75 65 L65 85 Z" fill="#6C5CE7" />
              </svg>
            </div>
            
            <h3 className="text-2xl text-white font-bold mb-3">No transactions yet</h3>
            <p className="text-gray-400 text-[15px]">Your transactions will appear here after you complete one.</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="space-y-0 flex-1">
              {visibleTransactions.map((tx: any) => {
                const timeAgo = Math.floor((Date.now() - tx.timestamp) / 60000);
                const timeStr = timeAgo < 1 ? 'Just now' : timeAgo < 60 ? `${timeAgo}m ago` : timeAgo < 1440 ? `${Math.floor(timeAgo/60)}h ago` : `${Math.floor(timeAgo/1440)}d ago`;
                const { label, assetDisplay, txidDisplay, isAdminCredit, message } = cleanTxDisplay(tx);
                
                return (
                  <div 
                    key={tx.id} 
                    onClick={() => setSelectedTx(tx)}
                    className="group bg-transparent hover:bg-white/2 border-b border-white/5 last:border-0 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === 'withdrawal' ? 'bg-orange-500/10 text-orange-400' : isAdminCredit ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : 'bg-[#13c74b]/10 text-[#13c74b]'
                      }`}>
                        {tx.type === 'withdrawal' ? <ArrowUpRight className="w-5 h-5" /> : isAdminCredit ? <Gift className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-[15px] text-white font-bold mb-0.5">{label}</div>
                        {message && (
                          <div className="text-[12px] text-gray-400 mb-1 max-w-[260px] leading-snug">{message}</div>
                        )}
                        <div className="text-[11px] text-gray-600 font-medium flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> {timeStr}
                          {!isAdminCredit && txidDisplay && (
                            <>
                              <span className="opacity-50">â€¢</span>
                              <span className="font-mono">TXID: {txidDisplay.substring(0, 10)}...</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-left md:text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center">
                      <div className={`text-[16px] font-bold mb-1 ${
                        tx.type === 'withdrawal' ? 'text-orange-400' : 'text-white'
                      }`}>
                        {tx.type === 'withdrawal' ? '-' : '+'}${(tx.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full w-fit ${
                        tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                        tx.status === 'approved' ? 'bg-[#13c74b]/10 text-[#13c74b]' : 
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {hasMore && (
              <div className="mt-8 flex justify-center pb-2">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="px-6 py-3 bg-[#13c74b]/10 hover:bg-[#13c74b]/20 text-[#13c74b] font-bold rounded-full transition-colors text-[14px]"
                >
                  Load More Transactions
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <Dialog open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
        <DialogContent className="bg-[#0a0f1c] border border-white/10 text-white sm:max-w-md p-0 overflow-hidden">
          {selectedTx && (() => {
            const { label, assetDisplay, txidDisplay, isAdminCredit, message } = cleanTxDisplay(selectedTx);
            return (
              <div className="flex flex-col">
                <div className="p-6 border-b border-white/5 flex flex-col items-center justify-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 mb-4 ${
                    selectedTx.type === 'withdrawal' ? 'bg-orange-500/10 text-orange-400' : isAdminCredit ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : 'bg-[#13c74b]/10 text-[#13c74b]'
                  }`}>
                    {selectedTx.type === 'withdrawal' ? <ArrowUpRight className="w-8 h-8" /> : isAdminCredit ? <Gift className="w-8 h-8" /> : <ArrowDownLeft className="w-8 h-8" />}
                  </div>
                  <h2 className="text-3xl font-bold mb-1">
                    {selectedTx.type === 'withdrawal' ? '-' : '+'}${(selectedTx.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </h2>
                  <p className="text-[13px] font-semibold text-gray-300 mb-2">{label}</p>
                  {message && (
                    <p className="text-[12px] text-gray-400 leading-relaxed mb-3 px-4 max-w-[300px]">{message}</p>
                  )}
                  <div className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${
                    selectedTx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                    selectedTx.status === 'approved' ? 'bg-[#13c74b]/10 text-[#13c74b]' : 
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {selectedTx.status}
                  </div>
                </div>
                
                <div className="p-6 space-y-1">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-gray-400 text-[14px]">Category</span>
                    <span className="font-bold text-[15px]">{assetDisplay}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-gray-400 text-[14px]">Type</span>
                    <span className="font-bold capitalize text-[15px]">{label}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-gray-400 text-[14px]">Date &amp; Time</span>
                    <span className="font-bold text-right text-[15px]">
                      {new Date(selectedTx.timestamp).toLocaleString()}
                    </span>
                  </div>
                  {txidDisplay && (
                    <div className="flex justify-between items-start py-3 border-b border-white/5">
                      <span className="text-gray-400 text-[14px]">Transaction ID</span>
                      <span className="font-mono text-[13px] text-[#13c74b] break-all text-right max-w-[200px]">
                        {txidDisplay}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400 text-[14px]">Amount</span>
                    <span className="font-bold text-[15px] text-white">
                      ${(selectedTx.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
