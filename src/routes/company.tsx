import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/company")({
  component: Company,
});

function Company() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020605] text-white font-['Inter'] selection:bg-[#12b744]/30 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#020605]/90 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-sm rotate-45">
                <div className="-rotate-45">X</div>
              </div>
              <span className="font-semibold text-2xl tracking-tight text-white font-['Outfit']">XHoldings</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 ml-4">
              <Link to="/personal" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400">Personal</Link>
              <Link to="/about" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400">About</Link>
              <Link to="/company" className="cursor-pointer text-[#12b744] transition-colors text-[15px] font-bold">Company</Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <button className="px-5 py-2.5 rounded-xl border border-transparent text-[14px] font-medium text-white hover:bg-white/5 transition-colors">
                Log in
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-[#12b744] hover:bg-[#10a13c] text-black rounded-full px-6 py-2.5 text-[14px] font-bold transition-all flex items-center gap-2">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 md:px-8 relative flex flex-col items-center text-center overflow-hidden min-h-[90vh]">
        
        {/* Giant Overlapping Circles Background */}
        <div className="absolute top-[10%] right-[-15%] w-[800px] h-[800px] bg-[#020605] border-2 border-white/10 rounded-full pointer-events-none opacity-50 z-0" />
        
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[1100px] h-[1100px] bg-linear-to-b from-[#0a1e12] to-[#020605] border-2 border-[#12b744]/30 rounded-full pointer-events-none shadow-[inset_0_-80px_100px_rgba(18,183,68,0.15)] z-0" />
        
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#020605] border-2 border-white/10 rounded-full pointer-events-none opacity-80 z-0" />
        <div className="absolute bottom-[0%] left-[5%] w-[400px] h-[400px] bg-[#020605] border-2 border-[#12b744]/20 rounded-full pointer-events-none z-0" />

        <h1 className="text-[48px] md:text-[72px] font-bold tracking-tight leading-[1.1] mb-6 relative z-10 font-['Outfit'] uppercase max-w-4xl mx-auto">
          ACCESS THE WORLD <br/> THROUGH ONE PLATFORM
        </h1>
        <p className="text-[#8e9a93] text-[16px] md:text-[18px] font-medium max-w-[650px] mb-10 relative z-10 leading-relaxed">
          All-in-one crypto infrastructure platform enabling payments, corporate treasury and asset management without physical cash handling.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 mb-24">
          <Link to="/register">
            <button className="px-6 py-3 bg-[#12b744] hover:bg-[#10a13c] text-black rounded-lg font-bold text-[15px] transition-all flex items-center justify-center gap-2">
              Create a business account <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-6 py-3 bg-transparent hover:bg-white/5 text-white border border-white/10 rounded-lg font-bold text-[15px] transition-all flex items-center justify-center gap-2">
              Speak to our team
            </button>
          </Link>
        </div>


      </section>

      {/* Trust Banner */}
      <section className="py-10 border-y border-white/5 relative z-10 bg-[#06120b]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 text-center">
          <p className="text-[#8e9a93] text-sm uppercase tracking-widest font-bold mb-8">Secured by top-tier cryptographic infrastructure</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale text-[#8e9a93]">
            <div className="text-xl font-bold font-['Outfit']">FIREBLOCKS</div>
            <div className="text-xl font-bold font-['Outfit']">CHAINALYSIS</div>
            <div className="text-xl font-bold font-['Outfit']">COINBASE</div>
            <div className="text-xl font-bold font-['Outfit']">BINANCE</div>
          </div>
        </div>
      </section>

      {/* Light Section: Built for Every Investor Strategy */}
      <section className="py-24 bg-[#f4f5f5] text-black">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase font-['Outfit'] tracking-tight">Built For <br/> Every Investor Strategy</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From everyday retail investors to massive corporate treasuries, XHoldings provides the liquidity and yield generation needed to scale your wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden relative h-[400px] group">
              <img src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop" alt="Personal Wealth" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <h3 className="text-white text-2xl font-bold">Personal Wealth</h3>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden relative h-[400px] group">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" alt="Corporate Treasury" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <h3 className="text-white text-2xl font-bold">Corporate Treasury</h3>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden relative h-[400px] group">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="Private Equity" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <h3 className="text-white text-2xl font-bold">Private Equity</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Section: Generate Predictable Yield */}
      <section className="py-24 bg-[#020605] relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase font-['Outfit'] tracking-tight">Generate predictable yield. <br/> Compounded daily.</h2>
          <p className="text-[#8e9a93] text-lg max-w-2xl mx-auto mb-8">
            Bypass legacy banking infrastructure. Our investment engine generates daily ROI through secured staking, algorithmic trading, and private debt.
          </p>
          <Link to="/register">
            <button className="px-8 py-3 bg-white hover:bg-gray-200 text-black rounded-full font-bold text-[15px] transition-all">
              Start Earning
            </button>
          </Link>
        </div>

        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Interactive Feature List Card */}
            <div className="bg-[#051409] rounded-[40px] p-10 border border-[#12b744]/20">
              <div className="space-y-6">
                <div className="bg-[#0a1f12] p-6 rounded-2xl border border-[#12b744]/30 cursor-pointer">
                  <h4 className="text-xl font-bold text-white mb-2">Growth & VIP Plans</h4>
                  <p className="text-[#8e9a93] text-sm">Lock your capital into predefined duration plans specifically tailored for aggressive growth or capital preservation.</p>
                </div>
                <div className="p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                  <h4 className="text-xl font-bold text-gray-400 mb-2">Algorithmic Trading</h4>
                </div>
                <div className="p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                  <h4 className="text-xl font-bold text-gray-400 mb-2">Real Estate Syndication</h4>
                </div>
              </div>
            </div>

            {/* Glowing Phone Mockup Card */}
            <div className="bg-[#0b100d] rounded-[40px] p-10 border border-white/5 relative h-[500px] flex items-center justify-center overflow-hidden">
               <div className="absolute w-[400px] h-[400px] border border-[#12b744]/20 rounded-full" />
               <div className="absolute w-[600px] h-[600px] border border-[#12b744]/10 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#12b744]/20 blur-[100px] rounded-full" />
               
               {/* Phone UI Placeholder */}
               <div className="w-[280px] h-[580px] bg-[#020605] border border-white/20 rounded-[40px] shadow-2xl relative z-10 flex flex-col p-6 mt-20">
                  <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-8" />
                  <div className="text-center mb-8">
                    <p className="text-gray-500 text-sm mb-1">Total Balance</p>
                    <h3 className="text-4xl font-bold">$428,500.00</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="h-16 bg-linear-to-r from-[#12b744]/10 to-transparent border border-[#12b744]/20 rounded-2xl flex items-center px-4 justify-between">
                       <span className="text-sm font-bold">Daily ROI</span>
                       <span className="text-[#12b744] font-bold">+$1,240.50</span>
                    </div>
                    <div className="h-16 bg-white/5 rounded-2xl flex items-center px-4 justify-between">
                       <span className="text-sm text-gray-400">Growth Plan</span>
                       <span className="text-white font-bold">$250,000</span>
                    </div>
                    <div className="h-16 bg-white/5 rounded-2xl flex items-center px-4 justify-between">
                       <span className="text-sm text-gray-400">Available</span>
                       <span className="text-white font-bold">$178,500</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Section: Total Portfolio Control */}
      <section className="py-24 bg-[#030906] relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase font-['Outfit'] tracking-tight">Total Portfolio <br/> Control.</h2>
          <p className="text-[#8e9a93] text-lg max-w-2xl mx-auto mb-8">
            Monitor, manage, and withdraw your funds instantly with absolute transparency via our secure administrative infrastructure.
          </p>
        </div>

        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
             {/* Glowing Phone Mockup Card (Left Side this time) */}
             <div className="bg-[#0b100d] rounded-[40px] p-10 border border-white/5 relative h-[500px] flex items-center justify-center overflow-hidden order-2 md:order-1">
               <div className="absolute w-[400px] h-[400px] border border-[#12b744]/20 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#12b744]/20 blur-[100px] rounded-full" />
               
               <div className="w-[280px] h-[580px] bg-[#020605] border border-[#12b744]/30 rounded-[40px] shadow-[0_0_50px_rgba(18,183,68,0.2)] relative z-10 flex flex-col p-6 mt-20">
                  <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-8" />
                  <div className="text-center mb-8">
                    <p className="text-gray-500 text-sm mb-1">Status</p>
                    <h3 className="text-2xl font-bold text-[#12b744]">Withdrawal Approved</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                       <p className="text-xs text-gray-500 mb-1">Amount Sent</p>
                       <p className="text-lg font-bold">50,000 USDT</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center break-all">
                       <p className="text-xs text-gray-500 mb-1">TXID</p>
                       <p className="text-[10px] text-gray-400">0x8f2a...9b41c</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Interactive Feature List Card */}
            <div className="bg-[#051409] rounded-[40px] p-10 border border-[#12b744]/20 order-1 md:order-2">
              <div className="space-y-6">
                <div className="bg-[#0a1f12] p-6 rounded-2xl border border-[#12b744]/30 cursor-pointer">
                  <h4 className="text-xl font-bold text-white mb-2">Instant Crypto Withdrawals</h4>
                  <p className="text-[#8e9a93] text-sm">We process massive liquidity exits daily. Submit your verified wallet address and receive funds without traditional banking delays.</p>
                </div>
                <div className="p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                  <h4 className="text-xl font-bold text-gray-400 mb-2">Immutable Ledger</h4>
                </div>
                <div className="p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                  <h4 className="text-xl font-bold text-gray-400 mb-2">Zero Hidden Fees</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid with Icons */}
      <section className="py-20 bg-[#061409] border-y border-[#12b744]/10">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Zap className="w-8 h-8 text-[#12b744] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Proof of Reserves</h3>
              <p className="text-[#8e9a93] text-sm leading-relaxed">XHoldings maintains a strict 1:1 asset backing. We never co-mingle funds, ensuring absolute solvency regardless of market volatility.</p>
            </div>
            <div>
              <ShieldCheck className="w-8 h-8 text-[#12b744] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Institutional Security</h3>
              <p className="text-[#8e9a93] text-sm leading-relaxed">Client funds are protected by multi-signature cold storage, rigorous penetration testing, and enterprise-grade operational security.</p>
            </div>
            <div>
              <CheckCircle2 className="w-8 h-8 text-[#12b744] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Regulated Operations</h3>
              <p className="text-[#8e9a93] text-sm leading-relaxed">We strictly adhere to global KYC/AML standards, ensuring a safe, compliant, and legally fortified investing environment.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials (Light Section) */}
      <section className="py-24 bg-[#f4f5f5]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16 text-black">
            <h2 className="text-3xl font-bold mb-4 font-['Outfit'] uppercase">Trusted by thousands <br/> of serious investors.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-[#12b744] mb-4">{"★★★★★"}</div>
              <p className="text-gray-700 leading-relaxed mb-8">
                "XHoldings completely transformed my portfolio. Their fixed-yield plans provide incredible stability during market downturns, and the daily ROI is always on time."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=12`} alt="Avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">Marcus T.</h4>
                  <p className="text-gray-500 text-xs">Private Investor</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-[#12b744] mb-4">{"★★★★★"}</div>
              <p className="text-gray-700 leading-relaxed mb-8">
                "The withdrawal process is flawless. Unlike traditional institutions that lock up your cash for weeks, my crypto withdrawals process almost instantly."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=44`} alt="Avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">Sarah Jenkins</h4>
                  <p className="text-gray-500 text-xs">Crypto Fund Manager</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-[#12b744] mb-4">{"★★★★★"}</div>
              <p className="text-gray-700 leading-relaxed mb-8">
                "I was skeptical of the high yield at first, but their transparency regarding proof of reserves and algorithmic strategies is unparalleled. Very satisfied."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=33`} alt="Avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">David Chen</h4>
                  <p className="text-gray-500 text-xs">Enterprise Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 bg-[#020605] relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            {/* Abstract Waves Graphic representation */}
            <div className="absolute bottom-[-20%] left-0 w-full h-[500px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzA2MTIwYiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMDEsMjI0TDEyMCwyMTMuM0MyNDAsMjAzLDQ4MCwxODEsNzIwLDE4Ni43Qzk2MCwxOTIsMTIwMCwyMjQsMTMyMCwyNDBMMTQ0MCwyNTZMMTQ0MCwzMjBMMTMyMCwzMjBDMTIwMCwzMjAsOTYwLDMyMCw3MjAsMzIwQzQ4MCwzMjAsMjQwLDMyMCwxMjAsMzIwTDBsMzIwWiI+PC9wYXRoPjwvc3ZnPg==')] bg-bottom bg-no-repeat bg-cover opacity-50"></div>
         </div>

        <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase font-['Outfit'] tracking-tight">Ready to compound <br/> your wealth?</h2>
          <p className="text-[#8e9a93] text-lg mb-10">
            Join thousands of smart investors already building their financial future with XHoldings.
          </p>
          <Link to="/register">
            <button className="px-10 py-4 bg-[#12b744] hover:bg-[#10a13c] text-black rounded-full font-bold text-[16px] transition-all">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>

      {/* Dark Footer */}
      <footer className="pt-20 pb-10 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-[12px] text-[#8e9a93]">
            <p>© {new Date().getFullYear()} XHoldings Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-white transition-colors">Disclosures</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
