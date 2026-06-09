import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, Gift, User, Bell, Rocket, 
  Clock, CheckCircle2, Home, Copy, Shield, Smartphone, Monitor, ChevronRight,
  Activity, Coins, ArrowRight, ShieldCheck, Check
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');

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
          <button onClick={() => setActiveTab('wallet')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'wallet' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Wallet className="w-5 h-5"/> Wallet</button>
          <button onClick={() => setActiveTab('rewards')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'rewards' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Gift className="w-5 h-5"/> Rewards</button>
          <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'profile' ? 'bg-white/5 text-[#c9a84c]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><User className="w-5 h-5"/> Profile</button>
        </div>
      </aside>

      {/* Top Header Mobile */}
      <header className="flex md:hidden items-center justify-between p-6 bg-[#0a0f1c] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-sm">X</div>
        </div>
        <Bell className="w-5 h-5 text-gray-400" />
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto p-6 space-y-8 relative z-10">
        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
        {activeTab === 'invest' && <InvestTab />}
        {activeTab === 'wallet' && <WalletTab />}
        {activeTab === 'rewards' && <RewardsTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0f1c] border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>
        <button onClick={() => setActiveTab('invest')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'invest' ? 'text-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Invest</span>
        </button>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'wallet' ? 'text-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Wallet</span>
        </button>
        <button onClick={() => setActiveTab('rewards')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'rewards' ? 'text-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>
          <Gift className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Rewards</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Profile</span>
        </button>
      </div>
    </div>
  );
}

// ---- TAB COMPONENTS ----

function HomeTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mt-4 md:mt-10 mb-8">
        <div>
          <div className="text-[13px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Good evening,</div>
          <h1 className="text-2xl text-white font-['Outfit'] font-light">Akhatasebhudojoseph1 👋</h1>
        </div>
        <Bell className="hidden md:block w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
      </div>

      <div className="bg-[#0a0f1c] border border-white/5 p-8 relative overflow-hidden rounded-sm mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <div className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Total Portfolio Balance</div>
            <div className="text-5xl font-['Outfit'] font-light text-white tracking-tight">$48,872.<span className="text-gray-500">49</span></div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-[#00d4aa] rounded-full text-[10px] uppercase tracking-widest font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse"></div>Live
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#00d4aa] mb-8 relative z-10">
          <ArrowUpRight className="w-4 h-4" />
          <span className="text-[13px] font-bold tracking-wider">+$1,280.40 today</span>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 relative z-10">
          <div><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">ROI Earned</div><div className="text-lg text-white font-light font-['Outfit']">$6,840</div></div>
          <div><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Active Plans</div><div className="text-lg text-white font-light font-['Outfit']">2</div></div>
          <div><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Next Payout</div><div className="text-lg text-[#c9a84c] font-light font-['Outfit']">Today</div></div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <button onClick={() => setActiveTab('wallet')} className="flex flex-col items-center justify-center p-4 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><Wallet className="w-6 h-6 text-[#c9a84c] mb-2 group-hover:scale-110 transition-transform" /><span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Deposit</span></button>
        <button onClick={() => setActiveTab('wallet')} className="flex flex-col items-center justify-center p-4 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><ArrowDownLeft className="w-6 h-6 text-[#00d4aa] mb-2 group-hover:scale-110 transition-transform" /><span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Withdraw</span></button>
        <button onClick={() => setActiveTab('invest')} className="flex flex-col items-center justify-center p-4 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><TrendingUp className="w-6 h-6 text-[#e8c96a] mb-2 group-hover:scale-110 transition-transform" /><span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Invest</span></button>
        <button onClick={() => setActiveTab('rewards')} className="flex flex-col items-center justify-center p-4 bg-[#0a0f1c] border border-white/5 rounded-sm hover:bg-white/5 transition-colors group"><Gift className="w-6 h-6 text-[#b088f5] mb-2 group-hover:scale-110 transition-transform" /><span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Rewards</span></button>
      </div>

      <div className="flex items-center justify-between p-4 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-sm mb-8">
        <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#c9a84c]" /><div><div className="text-[11px] text-[#c9a84c] uppercase tracking-widest font-bold mb-0.5">Upcoming Payout</div><div className="text-[13px] text-gray-300">Growth Plan · Processing at midnight</div></div></div>
        <div className="text-lg text-[#e8c96a] font-['Outfit'] font-bold">+$2524.00</div>
      </div>

      {/* SpaceX Pre-IPO */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-light text-white font-['Outfit']">Featured Pre-IPO</h2><span onClick={() => setActiveTab('invest')} className="text-[11px] text-[#c9a84c] uppercase tracking-widest cursor-pointer hover:underline">View</span></div>
        <div className="p-6 bg-[#0a0f1c] border border-white/5 rounded-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="text-[10px] text-[#c9a84c] uppercase tracking-[0.2em] mb-4 font-bold flex items-center gap-2"><Rocket className="w-3 h-3" /> PRIVATE MARKETS · FEATURED</div>
          <h3 className="text-3xl text-white font-light font-['Outfit'] mb-4">SpaceX <span className="text-gray-500 text-lg block mt-1">Pre-IPO · Private Markets</span></h3>
          <p className="text-[13px] text-gray-400 leading-relaxed mb-6">Founded by Elon Musk in 2002, SpaceX designs, manufactures and launches advanced rockets and spacecraft — including Falcon, Dragon and Starship. Members gain pro-rata exposure to secondary shares ahead of an anticipated public listing.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white/5 border border-white/5"><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Valuation</div><div className="text-xl text-white font-['Outfit']">$350B</div></div>
            <div className="p-4 bg-white/5 border border-white/5"><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Allocation Left</div><div className="text-xl text-white font-['Outfit']">42%</div></div>
            <div className="p-4 bg-white/5 border border-white/5"><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Minimum</div><div className="text-xl text-white font-['Outfit']">$25,000</div></div>
            <div className="p-4 bg-white/5 border border-white/5"><div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Investor Interest</div><div className="text-xl text-[#00d4aa] font-['Outfit']">Very High</div></div>
          </div>
          <div className="text-[12px] text-gray-400 mb-6 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c9a84c]" />IPO Status: Anticipated 2026 · Filing in preparation</div>
          <button onClick={() => setActiveTab('invest')} className="w-full bg-[#c9a84c] text-[#070b14] font-bold text-[13px] tracking-widest uppercase py-4 hover:bg-[#b59640] transition-colors rounded-sm">Invest in SpaceX</button>
        </div>
      </div>

      {/* Active Investments */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-light text-white font-['Outfit']">Active Investments</h2><span onClick={() => setActiveTab('invest')} className="text-[11px] text-[#c9a84c] uppercase tracking-widest cursor-pointer hover:underline">See all</span></div>
        <div className="space-y-4">
          <div className="p-5 bg-[#0a0f1c] border border-white/5 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <div><h3 className="text-lg text-white font-light font-['Outfit'] mb-1">Growth Plan</h3><div className="text-[12px] text-[#00d4aa] font-bold">+$320.00/day</div></div>
              <div className="text-right"><div className="text-[12px] text-gray-400">Day 12 of 60</div><div className="text-[11px] text-[#c9a84c]">3.2%/day</div></div>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2"><div className="bg-[#00d4aa] h-full" style={{ width: '20%' }}></div></div>
            <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest"><span>20% complete</span><span>48d remaining</span></div>
          </div>
          <div className="p-5 bg-[#0a0f1c] border border-white/5 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <div><h3 className="text-lg text-white font-light font-['Outfit'] mb-1">Premium Plan</h3><div className="text-[12px] text-[#00d4aa] font-bold">+$2204.00/day</div></div>
              <div className="text-right"><div className="text-[12px] text-gray-400">Day 3 of 90</div><div className="text-[11px] text-[#c9a84c]">5.8%/day</div></div>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2"><div className="bg-[#c9a84c] h-full" style={{ width: '3%' }}></div></div>
            <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest"><span>3% complete</span><span>87d remaining</span></div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-light text-white font-['Outfit']">Recent Transactions</h2><span className="text-[11px] text-[#c9a84c] uppercase tracking-widest cursor-pointer hover:underline">See all</span></div>
        <div className="bg-[#0a0f1c] border border-white/5 rounded-sm divide-y divide-white/5">
          {[{ title: 'Growth Plan ROI', time: 'Today, 00:00', amount: '+$320.00', status: 'Verified', color: '#00d4aa', icon: TrendingUp }, { title: 'Premium Plan ROI', time: 'Today, 00:00', amount: '+$2,204.00', status: 'Verified', color: '#00d4aa', icon: TrendingUp }, { title: 'Bitcoin Deposit', time: 'Apr 18, 14:32', amount: '+$10,000', status: 'Verified', color: '#00d4aa', icon: Wallet }, { title: 'Premium Plan Activated', time: 'Apr 21, 09:15', amount: '-$38,000', status: 'Active', color: '#c9a84c', icon: TrendingUp }].map((tx, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"><tx.icon className="w-5 h-5" style={{color: tx.color === '#00d4aa' ? (i < 2 ? '#00d4aa' : '#d1d5db') : '#d1d5db'}} /></div>
                <div><div className="text-[14px] text-white font-medium">{tx.title}</div><div className="text-[11px] text-gray-500 mt-1">{tx.time}</div></div>
              </div>
              <div className="text-right"><div className="text-[14px] font-bold" style={{color: tx.amount.includes('+') ? '#00d4aa' : 'white'}}>{tx.amount}</div><div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{tx.status}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvestTab() {
  const [amount, setAmount] = useState<number | ''>('');
  
  const dailyROI = amount ? (Number(amount) * 0.032).toFixed(2) : '0.00';
  const profit = amount ? (Number(amount) * 0.032 * 60).toFixed(2) : '0.00';
  const totalReturn = amount ? (Number(amount) * 0.032 * 60 + Number(amount)).toFixed(2) : '0.00';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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

          <button className="w-full bg-[#c9a84c] hover:bg-[#b59640] text-[#070b14] py-4 font-bold text-[13px] tracking-widest uppercase transition-colors rounded-sm flex items-center justify-center gap-2">
            Continue to Payment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function WalletTab() {
  const [mode, setMode] = useState('deposit');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 mt-4 md:mt-10">
        <h1 className="text-3xl text-white font-['Outfit'] font-light mb-6">Wallet</h1>
        
        <div className="flex border-b border-white/10">
          <button onClick={() => setMode('deposit')} className={`pb-4 px-6 text-[13px] uppercase tracking-widest font-semibold transition-all ${mode === 'deposit' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>Deposit</button>
          <button onClick={() => setMode('withdraw')} className={`pb-4 px-6 text-[13px] uppercase tracking-widest font-semibold transition-all ${mode === 'withdraw' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'text-gray-500 hover:text-white'}`}>Withdraw</button>
        </div>
      </div>

      {mode === 'deposit' ? (
        <div className="space-y-8">
          <div className="bg-[#0a0f1c] border border-white/5 p-6 md:p-8 rounded-sm">
            <h2 className="text-lg text-white font-['Outfit'] mb-6">Fund Your Account</h2>
            
            <div className="mb-6">
              <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-3 block">Choose Network</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button className="p-3 border border-[#c9a84c]/50 bg-[#c9a84c]/10 text-white rounded-sm text-[12px] font-semibold flex items-center justify-center gap-2"><div className="w-2 h-2 rounded-full bg-[#c9a84c]"></div> ETH (ERC20)</button>
                <button className="p-3 border border-white/10 hover:border-white/30 text-gray-400 rounded-sm text-[12px] font-semibold flex items-center justify-center gap-2">Bitcoin</button>
                <button className="p-3 border border-white/10 hover:border-white/30 text-gray-400 rounded-sm text-[12px] font-semibold flex items-center justify-center gap-2">USDT</button>
                <button className="p-3 border border-white/10 hover:border-white/30 text-gray-400 rounded-sm text-[12px] font-semibold flex items-center justify-center gap-2">Bank Wire</button>
              </div>
            </div>

            <div className="p-6 bg-[#070b14] border border-[#c9a84c]/30 rounded-sm mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] text-gray-400 uppercase tracking-widest block">ETH Wallet Address</label>
                <span className="text-[10px] text-red-400 font-semibold bg-red-400/10 px-2 py-0.5 rounded-sm">⚠ Only send ETH</span>
              </div>
              <div className="flex gap-2">
                <input readOnly value="0x4Fa3E9d2b3A18C8eF6a7B2C9D10F5E8A3b4C6D7E" className="w-full bg-transparent border border-white/10 text-white p-3 rounded-sm text-sm font-mono focus:outline-none" />
                <button onClick={handleCopy} className="px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm flex items-center gap-2 text-[12px] uppercase tracking-widest font-semibold transition-colors">
                  {copied ? <Check className="w-4 h-4 text-[#00d4aa]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Amount Sent ($)</label>
                <input type="number" placeholder="e.g. 5000" className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#c9a84c]/50" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Transaction ID (TXID)</label>
                <input type="text" placeholder="0x1a2b3c..." className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#c9a84c]/50" />
              </div>
            </div>

            <button className="w-full bg-white text-[#070b14] py-4 font-bold text-[13px] tracking-widest uppercase transition-colors rounded-sm hover:bg-gray-200">
              Submit Deposit Proof
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-[#0a0f1c] border border-white/5 p-6 md:p-8 rounded-sm">
            <h2 className="text-lg text-white font-['Outfit'] mb-2">Withdraw Funds</h2>
            <p className="text-[12px] text-gray-400 mb-6">Processed within 24–48 hours after approval.</p>
            
            <div className="p-6 bg-gradient-to-r from-[#00d4aa]/10 to-transparent border border-[#00d4aa]/20 rounded-sm mb-8">
              <div className="text-[11px] text-[#00d4aa] uppercase tracking-widest font-bold mb-1">Available to Withdraw</div>
              <div className="text-3xl text-white font-light font-['Outfit']">$48,872.49</div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Amount ($)</label>
                <input type="number" placeholder="Enter amount" className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#00d4aa]/50" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Withdrawal Method</label>
                <select className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#00d4aa]/50 appearance-none">
                  <option>Bitcoin (BTC)</option>
                  <option>Ethereum (ETH)</option>
                  <option>Tether (USDT TRC20)</option>
                  <option>Bank Wire Transfer</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-widest mb-2 block">Your Receiving Address</label>
                <input type="text" placeholder="Paste address here" className="w-full bg-[#070b14] border border-white/10 text-white p-3 rounded-sm focus:outline-none focus:border-[#00d4aa]/50" />
              </div>
            </div>

            <p className="text-[11px] text-gray-500 mb-6 flex gap-2"><span className="text-[#c9a84c]">⚠</span> Early withdrawal from active plans may incur a 10% processing fee. Only matured plan balances are instantly withdrawable.</p>

            <button className="w-full bg-[#00d4aa] text-[#070b14] py-4 font-bold text-[13px] tracking-widest uppercase hover:bg-[#00b38f] transition-colors rounded-sm">
              Submit Withdrawal Request
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 mt-4 md:mt-10">
        <h1 className="text-3xl text-white font-['Outfit'] font-light mb-2">Profile & Security</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <ShieldCheck className="w-6 h-6 text-[#c9a84c]" />
            <h2 className="text-lg text-white font-['Outfit']">Account Verification</h2>
          </div>
          <p className="text-[13px] text-gray-400">Complete KYC to unlock full investment and withdrawal capabilities.</p>
          <ul className="space-y-3 text-[13px] text-white">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4aa]" /> Identity document check</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4aa]" /> Address verification</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4aa]" /> Risk profile assessment</li>
          </ul>
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 text-[12px] tracking-widest uppercase font-semibold transition-colors rounded-sm mt-4">
            Complete Verification
          </button>
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
      </div>
    </div>
  )
}

function RewardsTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 mt-4 md:mt-10 text-center py-10 border border-[#b088f5]/30 bg-gradient-to-b from-[#b088f5]/10 to-[#0a0f1c] rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 bg-[#b088f5]/20 rounded-full blur-[80px] pointer-events-none" />
        <Gift className="w-12 h-12 text-[#b088f5] mx-auto mb-4 relative z-10" />
        <h1 className="text-4xl text-white font-['Outfit'] font-light mb-2 relative z-10">Refer & Earn</h1>
        <p className="text-gray-400 text-[13px] max-w-md mx-auto relative z-10 px-4">Invite friends to join XHoldings and earn 5% of their initial deposit instantly to your withdrawable balance.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-[#0a0f1c] border border-white/5 rounded-sm text-center">
          <div className="text-[11px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Total Referrals</div>
          <div className="text-4xl text-white font-['Outfit']">4</div>
        </div>
        <div className="p-6 bg-[#0a0f1c] border border-white/5 rounded-sm text-center">
          <div className="text-[11px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Total Earned</div>
          <div className="text-4xl text-[#00d4aa] font-['Outfit']">$1,250.00</div>
        </div>
      </div>

      <div className="bg-[#0a0f1c] border border-white/5 p-6 md:p-8 rounded-sm mb-8">
        <h2 className="text-lg text-white font-['Outfit'] mb-4">Your Referral Link</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input readOnly value="https://xholdings.com/join?ref=AKHA2026" className="w-full bg-[#070b14] border border-white/10 text-gray-300 p-4 rounded-sm text-sm focus:outline-none" />
          <button className="px-8 bg-[#b088f5] hover:bg-[#9a70e0] text-[#070b14] py-4 text-[13px] tracking-widest uppercase font-bold transition-colors rounded-sm whitespace-nowrap">
            Copy Link
          </button>
        </div>
      </div>
    </div>
  )
}
