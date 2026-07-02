import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Logo, LogoText } from "../components/Logo";
import { 
  ArrowRight, ShieldCheck, HeadphonesIcon, 
  Lock, Menu, X, 
  CheckCircle2, TrendingUp, Landmark,
  ArrowUpRight, Users
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
              <Logo size={28} />
              <LogoText />
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

      {/* Hero Section — Professional Institutional Design */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden flex flex-col items-center justify-center min-h-[95vh]">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#13c74b]/8 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#13c74b]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Headline + CTAs + Stats */}
            <div className="flex flex-col items-start">
              {/* Headline */}
              <h1 className="text-[44px] md:text-[56px] lg:text-[62px] font-bold tracking-tight leading-[1.08] mb-6 font-['Outfit'] text-white">
                Build Lasting<br />
                <span className="text-[#13c74b]">Generational Wealth</span><br />
                with Precision.
              </h1>

              <p className="text-gray-400 text-[17px] leading-relaxed mb-10 max-w-lg">
                Fidelity Holdings gives you access to institutional-grade investment plans, automated copy trading, and real-time portfolio management — all in one secure platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-14">
                <Link to={REGISTER}>
                  <button className="flex items-center gap-2 bg-[#13c74b] hover:bg-[#10b340] text-black font-bold px-7 py-3.5 rounded-xl text-[15px] transition-all duration-200 shadow-lg shadow-[#13c74b]/25">
                    Open Account <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={LOGIN}>
                  <button className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-3.5 rounded-xl text-[15px] transition-all duration-200 hover:bg-white/5">
                    Sign In
                  </button>
                </Link>
              </div>

              {/* Key Stats Row */}
              <div className="flex items-center gap-10 border-t border-white/10 pt-8 w-full">
                <div>
                  <div className="text-2xl font-bold text-white font-['Outfit']">$2.4B+</div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium uppercase tracking-wide">Assets Managed</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-2xl font-bold text-white font-['Outfit']">18%</div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium uppercase tracking-wide">Max Annual Yield</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-2xl font-bold text-white font-['Outfit']">40K+</div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium uppercase tracking-wide">Active Investors</div>
                </div>
              </div>
            </div>

            {/* Right: Professional Dashboard Panel */}
            <div className="hidden lg:flex flex-col gap-4">
              {/* Main panel */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1">Portfolio Value</p>
                    <p className="text-3xl font-bold text-white font-['Outfit']">$284,920.<span className="text-gray-500 text-xl">48</span></p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[#13c74b] text-sm font-semibold bg-[#13c74b]/10 border border-[#13c74b]/20 px-3 py-1.5 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5" /> +14.2%
                  </span>
                </div>
                {/* Minimal chart */}
                <div className="w-full h-20 mb-4">
                  <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#13c74b" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#13c74b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 65 L30 58 L60 62 L90 45 L120 50 L150 35 L180 28 L210 32 L240 18 L270 12 L300 8" fill="none" stroke="#13c74b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0 65 L30 58 L60 62 L90 45 L120 50 L150 35 L180 28 L210 32 L240 18 L270 12 L300 8 L300 80 L0 80Z" fill="url(#chartGrad)" />
                  </svg>
                </div>
                {/* Allocation rows */}
                <div className="space-y-3">
                  {[
                    { label: 'Fixed Yield Plan', pct: '55%', bar: 55, color: '#13c74b' },
                    { label: 'Copy Trading', pct: '30%', bar: 30, color: '#c9a84c' },
                    { label: 'Liquid Reserve', pct: '15%', bar: 15, color: '#60a5fa' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-white font-medium">{item.pct}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: item.pct, backgroundColor: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two smaller info cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Today's Return</p>
                  <p className="text-xl font-bold text-[#13c74b] font-['Outfit']">+$412.80</p>
                  <p className="text-xs text-gray-600 mt-1">Daily yield credited</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Security</p>
                  <div className="flex items-center gap-2 mt-1">
                    <ShieldCheck className="w-5 h-5 text-[#13c74b]" />
                    <p className="text-sm font-semibold text-white">Fully Secured</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">256-bit encryption</p>
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
          <div className="text-lg font-medium text-gray-300">Track <span className="text-white font-bold">real-time digital assets</span> on Fidelity Holdings</div>
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

      {/* TRADE WITH CONFIDENCE */}
      {/* ALGORITHMIC COPY TRADING */}
      <section className="py-24 lg:py-32 bg-[#020605]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white uppercase tracking-tight">Master Your<br/>Portfolio</h2>
            <p className="text-gray-400 text-lg mb-8">
              Mirror the strategies of elite master traders and automate your market positions on Fidelity Holdings's secure, institutional-grade platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#12b744]" />
                <span className="text-sm font-medium text-white">Verified algorithmic strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#12b744]" />
                <span className="text-sm font-medium text-white">Real-time execution & transparency</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch h-full">
            <div className="flex flex-col gap-4">
              <div className="bg-[#c9a84c] text-black rounded-3xl p-8 shadow-xl grow min-h-[260px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black/60"></div>
                  </div>
                  <h3 className="text-xl font-bold">Automate Your Strategy</h3>
                </div>
                <p className="text-black/80 font-medium">
                  Mirror top algorithmic traders with proven win rates to capture market alpha effortlessly on Fidelity Holdings.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <h4 className="font-semibold">Institutional-Grade Execution</h4>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <h4 className="font-semibold">Transparent Performance Tracking</h4>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] border border-white/10 group">
              <img src="/assets/images/trade_with_confidence.png" alt="Automate your portfolio" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20"></div>
              {/* Glass UI overlay */}
              <div className="absolute top-1/2 -translate-y-1/2 left-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-[200px] shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white hover:text-[#12b744] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xl leading-none mb-1">+</span>
                    </div>
                    <span className="font-semibold">Subscribe</span>
                  </div>
                  <div className="flex items-center gap-4 text-white hover:text-red-400 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xl leading-none mb-1">-</span>
                    </div>
                    <span className="font-semibold">Unsubscribe</span>
                  </div>
                  <div className="flex items-center gap-4 text-white hover:text-[#c9a84c] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <span className="font-semibold">Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROW YOUR WEALTH */}
      <section className="py-24 lg:py-32 bg-[#000000]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white uppercase tracking-tight">Grow Your Wealth<br/>With Fidelity Holdings</h2>
            <p className="text-gray-400 text-lg mb-8">
              Deploy your digital assets into high-yield structured plans designed to provide consistent daily returns and preserve capital on Fidelity Holdings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#12b744]" />
                <span className="text-sm font-medium text-white">Earn daily ROI on structured plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#12b744]" />
                <span className="text-sm font-medium text-white">Institutional security & asset custody</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch h-full">
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] border border-white/10 order-2 lg:order-1 group">
              <img src="/assets/images/grow_your_wealth.png" alt="Grow your wealth" className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10"></div>
              {/* Glass UI overlay */}
              <div className="absolute top-1/2 -translate-y-1/2 right-8 bg-black/40 backdrop-blur-xl border border-[#c9a84c]/30 rounded-3xl p-8 w-[240px] shadow-2xl flex flex-col items-center justify-center">
                <div className="text-[40px] font-bold text-white mb-1 tracking-tight leading-none">1,980</div>
                <div className="text-white/60 text-sm font-medium mb-10">USDT Yield</div>
                
                <div className="w-full text-center space-y-3 mt-4 border-t border-white/10 pt-8">
                  <div className="text-white/80 text-sm">Matures in 6 months</div>
                  <div className="text-[#c9a84c] text-sm font-semibold">25% per annum</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 order-1 lg:order-2">
              <div className="bg-[#c9a84c] text-black rounded-3xl p-8 shadow-xl grow min-h-[260px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black/60"></div>
                  </div>
                  <h3 className="text-xl font-bold">Consistent Daily Passive Returns</h3>
                </div>
                <p className="text-black/80 font-medium">
                  Institutional yield opportunities available on Fidelity Holdings with fully transparent performance metrics and real-time tracking.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <h4 className="font-semibold">Flexible Maturation Periods</h4>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <h4 className="font-semibold">Full Control, Anytime</h4>
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
              <Logo size={28} className="mb-6" />
              <p className="text-sm text-gray-500 max-w-[200px]">
                Fidelity Holdings is a leading digital asset provider, fully compliant for secure data protection and algorithmic investing.
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
                <li><a href="#" className="hover:text-white transition-colors">About Fidelity Holdings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-500 text-center md:text-left leading-relaxed max-w-3xl">
              Â© {new Date().getFullYear()} Fidelity Holdings. All rights reserved. By using this website, you consent to our Privacy Policy and Cookie Policy. Please read our full Risk Warning to understand the potential risks involved in investing.
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


