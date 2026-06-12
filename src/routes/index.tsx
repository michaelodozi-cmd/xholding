import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { 
  ArrowRight, ChevronDown, ShieldCheck, HeadphonesIcon, 
  Lock, Wallet, BarChart3, Globe, Smartphone, Menu, X, 
  Star, CheckCircle2, TrendingUp, CreditCard, Landmark,
  ArrowUpRight, Users, PlayCircle, Rocket, QrCode
} from "lucide-react";

const LOGIN = "/login";
const REGISTER = "/register";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [marketData, setMarketData] = useState<any[]>([
    {pair: 'BTC/USD', price: '$65,240', change: '+2.4%', isPositive: true},
    {pair: 'ETH/USD', price: '$3,450', change: '+1.2%', isPositive: true},
    {pair: 'SOL/USD', price: '$145', change: '+5.7%', isPositive: true},
    {pair: 'USDT/USD', price: '$1.00', change: '0.0%', isPositive: true},
  ]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,tether')
      .then(res => res.json())
      .then(data => {
        setMarketData(data.map((coin: any) => ({
          pair: `${coin.symbol.toUpperCase()}/USD`,
          price: `$${coin.current_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}`,
          change: `${coin.price_change_percentage_24h > 0 ? '+' : ''}${coin.price_change_percentage_24h?.toFixed(2) || '0.00'}%`,
          isPositive: coin.price_change_percentage_24h >= 0
        })));
      }).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#020605] text-white font-['Inter'] selection:bg-[#c9a84c]/30">
      {/* Navigation - Exact Screenshot Match */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#020605]/90 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-sm rotate-45">
                <div className="-rotate-45">X</div>
              </div>
              <span className="font-semibold text-2xl tracking-tight text-white font-['Outfit']">XHoldings</span>
            </Link>

            {/* Left Desktop Links */}
            <div className="hidden lg:flex items-center gap-8 ml-4">
              <Link to="/personal" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-white">
                Personal
              </Link>
              <Link to="/about" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-300">
                About
              </Link>
              <Link to="/company" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400">
                Company
              </Link>
            </div>
          </div>

          {/* Right Desktop Links & Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to={LOGIN}>
              <button className="px-5 py-2.5 rounded-xl border border-transparent text-[14px] font-medium text-white hover:bg-white/5 transition-colors">
                Log in
              </button>
            </Link>
            <Link to={REGISTER}>
              <button className="bg-white/10 hover:bg-white/15 text-white rounded-xl px-5 py-2.5 text-[14px] font-bold transition-all flex items-center gap-2">
                Sign up <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#020605] border-b border-white/5 flex flex-col p-6 shadow-2xl h-screen">
            <div className="flex flex-col gap-6 text-lg font-medium">
              <Link to="/personal" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4">Personal</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4">About</Link>
              <Link to="/company" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4">Company</Link>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <Link to={LOGIN} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl py-6 text-lg border-white/20 text-white hover:bg-white/5">
                  Log in
                </Button>
              </Link>
              <Link to={REGISTER} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-white/15 hover:bg-white/25 text-white rounded-xl py-6 text-lg font-medium flex items-center justify-center gap-2">
                  Sign up <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Centered with Card Grid */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1000px] mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center w-full">
          
          {/* Main Headline & Subhead */}
          <h1 className="text-[56px] md:text-[72px] lg:text-[84px] font-bold tracking-tight leading-[1] mb-8 font-['Inter'] uppercase">
            XHOLDINGS IS YOUR<br/>PRIVATE WEALTH APP
          </h1>
          <p className="text-[17px] md:text-[20px] text-gray-300 mb-20 max-w-2xl font-medium leading-relaxed">
            Invest in daily-yield portfolios, automatically copy top master traders, and manage your digital assets on the simplest, safest platform.
          </p>

          {/* Cards Row Container */}
          <div className="w-full max-w-[1100px] flex gap-4 md:gap-6 justify-center items-end h-[280px]">
            
            {/* Card 1: Large Green */}
            <div className="bg-[#12b744] rounded-[32px] p-8 w-[320px] h-full flex flex-col justify-between shadow-2xl relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <h2 className="text-white text-[56px] font-bold leading-none tracking-tight">$125k</h2>
              <div className="flex justify-between items-center text-white/90 text-sm font-medium mt-auto">
                <span>Date</span>
                <span>Jan 20, 2026</span>
              </div>
            </div>

            {/* Card 2: White Yield */}
            <div className="bg-white rounded-[32px] p-6 w-[260px] h-[90%] flex flex-col relative shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-black text-2xl font-bold leading-tight mb-2 text-center">
                Up to 18%<br/>in interest
              </h3>
              {/* Illustration Placeholder (Using shapes to mimic 3D) */}
              <div className="absolute bottom-0 left-0 w-full h-[120px] flex items-end justify-center">
                <div className="w-[80%] h-[100px] bg-green-100 rounded-t-3xl relative border-4 border-green-200 shadow-inner">
                  <div className="absolute -top-6 left-4 w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-300 shadow-lg"></div>
                  <div className="absolute -top-4 left-10 w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-300 shadow-lg"></div>
                  <div className="absolute bottom-2 right-4 w-6 h-16 bg-green-500 rounded shadow-md"></div>
                  <div className="absolute bottom-2 right-12 w-6 h-10 bg-green-400 rounded shadow-md"></div>
                </div>
              </div>
            </div>

            {/* Card 3: Purple / Pre-IPO */}
            <div className="bg-[#6b52ff] rounded-[32px] p-6 w-[240px] h-[85%] flex flex-col justify-between shadow-2xl relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center mt-2">
                <Rocket className="w-16 h-16 text-white drop-shadow-2xl fill-white/20" />
              </div>
              <h3 className="text-white text-xl font-bold leading-tight text-center">
                Automated<br/>Copy Trading<br/><span className="text-sm font-normal text-white/80">for members</span>
              </h3>
            </div>

            {/* Column for Cards 4 & 5 */}
            <div className="flex flex-col justify-end h-full gap-4 md:gap-6">
              {/* Card 4: QR Code */}
              <div className="bg-[#8b5cf6] rounded-3xl w-[140px] h-[140px] flex items-center justify-center shadow-xl transform hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm p-2">
                  <QrCode className="w-full h-full text-white" />
                </div>
              </div>

              {/* Card 5: Small Green Chart */}
              <div className="bg-[#10b981] rounded-2xl w-[140px] h-[100px] p-4 flex flex-col justify-between shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-white font-bold text-lg">36.7%</div>
                <div className="w-full h-8 relative">
                   <svg viewBox="0 0 100 30" className="w-full h-full stroke-white stroke-2 fill-none">
                     <path d="M0 25 Q 20 10, 40 15 T 80 5 T 100 0" />
                   </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Ticker / Brands Section */}
      {/* Ticker / Brands Section */}
      <section className="py-10 border-y border-white/10 bg-[#000000]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-lg font-medium text-gray-300">Track <span className="text-white font-bold">real-time digital assets</span> on XHoldings</div>
          <div className="flex items-center gap-8 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
            {marketData.map((crypto, i) => (
              <div key={i} className="flex flex-col min-w-max">
                <span className="text-gray-400 text-sm font-medium">{crypto.pair}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{crypto.price}</span>
                  <span className={`text-xs ${crypto.isPositive !== false ? 'text-green-500' : 'text-red-500'}`}>{crypto.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 1: Trade / Invest */}
      <section className="py-24 lg:py-32 bg-[#020605]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Invest & Copy Top Traders</h2>
            <p className="text-gray-400 text-lg">Deploy your capital into high-yield structured plans and mirror the strategies of elite algorithmic traders automatically.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a0f0d] rounded-[32px] p-8 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Daily ROI Investments</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Deploy your capital into structured investment plans and earn daily passive returns with full transparency and real-time tracking.
              </p>
            </div>
            
            <div className="bg-[#0a0f0d] rounded-[32px] p-8 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Instant Deposits & Payouts</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Seamlessly fund your account with crypto and request withdrawals that are processed directly and securely to your wallet.
              </p>
            </div>

            <div className="bg-[#0a0f0d] rounded-[32px] p-8 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Premium Copy Trading</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Experience the most convenient platform for mirroring expert algorithmic traders, capturing their win rates, and earning passive income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Grow Your Wealth */}
      <section className="py-24 lg:py-32 bg-[#000000]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12b744]/10 text-[#12b744] text-sm font-semibold mb-6">
                <Landmark className="w-4 h-4" /> Yield & Copying
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                Build Your Wealth
              </h2>
              <p className="text-gray-400 text-lg mb-10 font-light">
                Deploy your digital assets into high-yield algorithmic plans and mirror top-performing master traders to grow your portfolio effortlessly.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-[20px] bg-white/5 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-white">Earn daily ROI on investments</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Multiple structured plans designed to provide consistent daily returns on your digital assets.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-[20px] bg-white/5 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-white">Algorithmic Copy Trading</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Subscribe to top master traders and automatically mirror their market positions and proven win rates.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-[20px] bg-white/5 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-white">Full Control, Anytime</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Track your live portfolio, view active investment progress, and manage your assets through a single dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#12b744]/20 to-transparent blur-[100px] rounded-full" />
              <div className="relative bg-[#0a0f0d] rounded-[32px] border border-white/10 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Investment Portfolio</div>
                    <div className="text-3xl font-bold text-white">$45,250.00</div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-green-500/10 text-[#12b744] font-semibold text-sm">
                    +3.2% Daily
                  </div>
                </div>
                
                {/* Chart Mockup */}
                <div className="h-40 w-full border-b border-white/10 relative flex items-end mb-8 pb-4">
                  <svg viewBox="0 0 100 40" className="w-full h-full stroke-[#12b744] stroke-[2] fill-none preserve-3d">
                    <path d="M0 40 Q 20 30, 40 35 T 80 15 T 100 0" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12b744]/20 to-transparent mix-blend-screen pointer-events-none" style={{ clipPath: 'path("M0 40 Q 20 30, 40 35 T 80 15 T 100 0 L 100 40 L 0 40 Z")' }}></div>
                </div>

                <Link to={LOGIN}>
                  <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-xl py-6 font-semibold">
                    Start Investing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 border-y border-white/5 bg-[#020605]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <HeadphonesIcon className="w-10 h-10 text-white mb-4" />
              <p className="text-gray-400"><strong>24/7 Premium Support</strong>: Dedicated account managers and human support to guide your investment journey.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lock className="w-10 h-10 text-white mb-4" />
              <p className="text-gray-400"><strong>Institutional-Grade Security</strong>: Enterprise-grade encryption and cold-storage security to keep your digital assets safe.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-10 h-10 text-white mb-4" />
              <p className="text-gray-400"><strong>Trusted globally</strong> by thousands of private investors and high-net-worth individuals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 bg-[#000000] border-t border-white/10">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="w-8 h-8 rounded border-2 border-green-500 flex items-center justify-center font-bold text-green-500 font-['Outfit'] text-sm rotate-45 mb-6">
                <div className="-rotate-45">X</div>
              </div>
              <p className="text-sm text-gray-500 max-w-[200px]">
                XHoldings is a leading digital asset provider, fully compliant for secure data protection and algorithmic investing.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to={LOGIN} className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to={LOGIN} className="hover:text-white transition-colors">Invest</Link></li>
                <li><Link to={LOGIN} className="hover:text-white transition-colors">Copy Trading</Link></li>
                <li><Link to={LOGIN} className="hover:text-white transition-colors">Wallet</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to={LOGIN} className="hover:text-white transition-colors">Market Data</Link></li>
                <li><Link to={LOGIN} className="hover:text-white transition-colors">Top Traders</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About XHoldings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-500 text-center md:text-left leading-relaxed max-w-3xl">
              © {new Date().getFullYear()} XHoldings. All rights reserved. By using this website, you consent to our Privacy Policy and Cookie Policy. Please read our full Risk Warning to understand the potential risks involved in investing.
            </p>
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" />
               <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" />
               <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

