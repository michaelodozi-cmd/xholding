import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo, LogoText } from "../components/Logo";

export const Route = createFileRoute("/personal")({
  component: Personal,
});

function Personal() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020605] text-white font-['Inter'] selection:bg-[#12b744]/30 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#020605]/90 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-[#020605] py-4'}`}>
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <Logo size={28} />
              <LogoText />
            </Link>

            <div className="hidden lg:flex items-center gap-8 ml-4">
              <Link to="/personal" className="cursor-pointer text-[#12b744] transition-colors text-[15px] font-bold">Personal</Link>
              <Link to="/about" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400">About</Link>
              <Link to="/company" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400">Company</Link>
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
                Open Account
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-8 bg-[#efede8] text-black flex flex-col items-center justify-center">
        <div className="max-w-[1300px] mx-auto w-full text-center">
          <h1 className="text-[56px] md:text-[80px] font-bold tracking-tight mb-8 font-['Outfit'] uppercase">
            BUILT FOR <br/> YOUR WEALTH
          </h1>
          <p className="text-gray-700 text-[18px] md:text-[20px] max-w-3xl mx-auto mb-16 leading-relaxed">
            Whatever your financial goals, Fedility Holding provides the tools to power your growth, from saving in high-yield stablecoins to trading digital assets, or sending money to family globally.
          </p>


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

      {/* TRADE WITH CONFIDENCE Section */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-['Outfit'] tracking-tight">TRADE WITH <br/> CONFIDENCE</h2>
          <p className="text-gray-600 text-[15px] max-w-2xl mx-auto mb-6">
            Buy, sell, and convert BTC, ETH, USDT, and 70+ digital assets with the best local rates and a platform trusted by over a million users.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-semibold text-green-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              Trade anytime
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              Robust compliance and regulatory oversight
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left Items */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                <h4 className="text-[15px] font-bold text-gray-800">Buy, Sell & Convert instantly</h4>
              </div>
              <div className="bg-[#fcd535] p-6 rounded-2xl cursor-pointer shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  </div>
                  <h4 className="text-[15px] font-bold text-black">Automate Your Strategy</h4>
                </div>
                <p className="text-black/80 text-[14px] leading-relaxed">Set up recurring buys and sell limit orders to buy/sell at your preferred price.</p>
              </div>
              <div className="bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                <h4 className="text-[15px] font-bold text-gray-800">Instant Wallet Funding & Payouts</h4>
              </div>
            </div>

            {/* Right Image */}
            <div className="rounded-[24px] overflow-hidden relative h-[450px]">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" alt="Trading" className="absolute inset-0 w-full h-full object-cover" />
              {/* Floating UI Mockup */}
              <div className="absolute top-1/2 left-8 -translate-y-1/2 w-[220px] bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shadow-2xl">
                <div className="h-20 border-b border-white/10 mb-4 flex items-center justify-center">
                   <svg viewBox="0 0 100 40" className="w-full h-full stroke-white stroke-2 fill-none">
                     <path d="M0 20 Q 20 10, 40 25 T 80 15 T 100 5" />
                   </svg>
                </div>
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <span>Limit Order</span>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  </div>
                  <span>Recurring Buy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROW YOUR WEALTH Section */}
      <section className="py-24 bg-white text-black border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-['Outfit'] tracking-tight">GROW YOUR <br/> WEALTH</h2>
          <p className="text-gray-600 text-[15px] max-w-2xl mx-auto mb-6">
            Manage and deploy your digital assets, including optional earn features and collateral-based liquidity solutions provided through licensed partners.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-semibold text-green-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              Earn daily interest on your savings
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              Licensed & secure
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left Image */}
            <div className="rounded-[24px] overflow-hidden relative h-[450px]">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" alt="Wealth" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-1/2 right-8 -translate-y-1/2 bg-[#a38012]/40 backdrop-blur-md border border-white/30 rounded-[32px] w-[180px] h-[220px] p-6 text-white shadow-2xl flex flex-col justify-center items-center text-center">
                 <h3 className="text-3xl font-bold mb-1">$21,730</h3>
                 <p className="text-sm font-medium opacity-80">USD</p>
              </div>
            </div>

            {/* Right Items */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                <h4 className="text-[15px] font-bold text-gray-800">Earn up to 10% annual interest</h4>
              </div>
              <div className="bg-[#fcd535] p-6 rounded-2xl cursor-pointer shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <h4 className="text-[15px] font-bold text-black">Borrow without selling</h4>
                </div>
                <p className="text-black/80 text-[14px] leading-relaxed">Access collateral-based liquidity in partnership with licensed financial institutions without selling your assets.</p>
              </div>
              <div className="bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                <h4 className="text-[15px] font-bold text-gray-800">Full Control, Anytime</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GO GLOBAL Section */}
      <section className="py-24 bg-[#3d1a17] text-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-['Outfit'] tracking-tight">GO GLOBAL</h2>
          <p className="text-white/80 text-[15px] max-w-2xl mx-auto mb-6">
            Open a USD account, shop anywhere with Fedility Holding debit cards, and earn instant cashback every time you spend in-app.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-semibold text-[#fcd535]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#fcd535] ring-4 ring-[#fcd535]/30"></div>
              Shop anywhere, no restrictions
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#fcd535] ring-4 ring-[#fcd535]/30"></div>
              Low fees
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left Items */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#fcd1ce] p-6 rounded-2xl cursor-pointer shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <h4 className="text-[15px] font-bold text-black">Global USD Account</h4>
                </div>
                <p className="text-black/80 text-[14px] leading-relaxed">Open a USD account, shop anywhere with Fedility Holding debit cards, and earn instant cashback every time you spend in-app.</p>
              </div>
              <div className="bg-[#5a2f2b] p-5 rounded-xl cursor-pointer hover:bg-[#6e3934] transition-colors border border-white/5">
                <h4 className="text-[15px] font-bold text-white">Virtual & Physical Debit Cards</h4>
              </div>
              <div className="bg-[#5a2f2b] p-5 rounded-xl cursor-pointer hover:bg-[#6e3934] transition-colors border border-white/5">
                <h4 className="text-[15px] font-bold text-white">Instant Cashback</h4>
              </div>
            </div>

            {/* Right Image */}
            <div className="rounded-[24px] overflow-hidden relative h-[450px]">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2000&auto=format&fit=crop" alt="Pool" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-1/2 left-8 -translate-y-1/2 w-[200px] h-[300px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white shadow-2xl flex flex-col justify-between">
                <div>
                   <h3 className="text-3xl font-bold mb-8">$1,256</h3>
                   <div className="flex gap-2 justify-center">
                     <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Light Section) */}
      <section className="py-24 bg-[#f4f5f5]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16 text-black">
            <h2 className="text-3xl font-bold mb-4 font-['Outfit'] uppercase">Loved by retail <br/> investors globally.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-[#12b744] mb-4">{"â˜…â˜…â˜…â˜…â˜…"}</div>
              <p className="text-gray-700 leading-relaxed mb-8">
                "I used to keep my savings in a traditional bank earning almost nothing. Moving to Fedility Holding' Growth Plan has been the best financial decision I've made."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=47`} alt="Avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">Elena R.</h4>
                  <p className="text-gray-500 text-xs">Retail Investor</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-[#12b744] mb-4">{"â˜…â˜…â˜…â˜…â˜…"}</div>
              <p className="text-gray-700 leading-relaxed mb-8">
                "The dashboard is incredibly easy to use. I can track my daily ROI directly from my phone and the withdrawals actually hit my personal wallet instantly."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=11`} alt="Avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">James M.</h4>
                  <p className="text-gray-500 text-xs">Crypto Enthusiast</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-[#12b744] mb-4">{"â˜…â˜…â˜…â˜…â˜…"}</div>
              <p className="text-gray-700 leading-relaxed mb-8">
                "I appreciate the transparency. Being able to see exactly how much yield I'm generating every single day gives me massive peace of mind."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=5`} alt="Avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">Michael T.</h4>
                  <p className="text-gray-500 text-xs">Long-term Holder</p>
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
          <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase font-['Outfit'] tracking-tight">Ready to start <br/> your journey?</h2>
          <p className="text-[#8e9a93] text-lg mb-10">
            Open a personal account today and start earning daily ROI on your crypto assets.
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
            <p>Â© {new Date().getFullYear()} Fedility Holding Inc. All rights reserved.</p>
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

