import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowRight, ChevronRight, BarChart3, Shield, BookOpen, Lock, Wallet, Rocket, Coins, TrendingUp } from "lucide-react";

const LOGIN = "/login";
const REGISTER = "/register";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] font-['Inter'] selection:bg-[#c9a84c]/30">
      {/* Ultra-Minimal Institutional Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#070b14]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-lg">
              X
            </div>
            <span className="font-light text-2xl tracking-[0.15em] text-white font-['Outfit'] uppercase">XHoldings</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-gray-300 tracking-wider uppercase">
            <a href="#markets" className="hover:text-[#e8c96a] transition-colors">Markets</a>
            <a href="#ipos" className="hover:text-[#e8c96a] transition-colors">IPOs</a>
            <a href="#about" className="hover:text-[#e8c96a] transition-colors">About</a>
            <Link to="/publications" className="hover:text-[#e8c96a] transition-colors">Publications</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to={LOGIN} className="text-[13px] font-medium text-white hover:text-[#e8c96a] transition-colors hidden sm:block uppercase tracking-wider">
              Sign In
            </Link>
            <Link to={REGISTER}>
              <Button className="bg-white/5 hover:bg-white/10 text-white border border-[#c9a84c]/30 rounded-none px-6 py-2 h-auto text-[13px] font-semibold transition-all tracking-wider uppercase">
                Become a Member
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 lg:pt-64 lg:pb-40 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=3271&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-luminosity pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/90 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#c9a84c]/5 to-transparent blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-[76px] font-light tracking-tight mb-8 leading-[1.05] font-['Outfit'] text-white">
              Invest in the world's <br/> <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#e8c96a]">most promising</span> opportunities.
            </h1>
            <p className="text-lg md:text-[21px] text-gray-400 mb-12 leading-relaxed font-light max-w-3xl">
              Access private market opportunities, IPO offerings, crypto-funded investments, and curated investment products through a single platform.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to={REGISTER}>
                <Button className="bg-[#c9a84c] hover:bg-[#b59640] text-[#070b14] rounded-none px-8 py-7 h-auto text-[14px] font-bold transition-all tracking-wider uppercase flex items-center gap-3">
                  Become a Member <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#markets" className="flex items-center gap-3 text-[14px] font-semibold text-[#e8c96a] tracking-wider uppercase hover:text-white transition-colors py-4">
                Explore Opportunities <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section id="markets" className="py-24 lg:py-32 bg-[#070b14] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[12px] text-[#c9a84c] uppercase tracking-[0.2em] mb-4 font-bold">Featured Opportunities</h2>
              <h3 className="text-4xl lg:text-[52px] font-light text-white font-['Outfit'] leading-tight">Exclusive deals beyond <br/>public exchanges.</h3>
            </div>
            <p className="text-[15px] text-gray-400 font-light leading-relaxed max-w-md">
              We offer simple access to carefully vetted investments that help you grow your wealth safely, no matter what the stock market is doing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Opportunity 1 */}
            <div className="group border border-white/5 p-12 bg-[#0a0f1c] hover:bg-white/[0.02] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/5 rounded-full blur-3xl group-hover:bg-[#c9a84c]/10 transition-colors" />
              <Rocket className="w-8 h-8 text-[#c9a84c] mb-8" />
              <h4 className="text-2xl font-light text-white mb-4 font-['Outfit']">SpaceX Pre-IPO</h4>
              <p className="text-[15px] text-gray-400 leading-relaxed font-light mb-8">
                Reserve allocation in the most anticipated listing. Invest alongside major institutions before the company goes public.
              </p>
              <div className="text-[13px] font-medium text-white uppercase tracking-widest border-b border-white/10 pb-2 inline-flex items-center gap-2 group-hover:border-[#c9a84c] group-hover:text-[#c9a84c] transition-all cursor-pointer">
                View Allocation <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Opportunity 2 */}
            <div id="ipos" className="group border border-white/5 p-12 bg-[#0a0f1c] hover:bg-white/[0.02] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4aa]/5 rounded-full blur-3xl group-hover:bg-[#00d4aa]/10 transition-colors" />
              <TrendingUp className="w-8 h-8 text-[#00d4aa] mb-8" />
              <h4 className="text-2xl font-light text-white mb-4 font-['Outfit']">IPO Opportunities</h4>
              <p className="text-[15px] text-gray-400 leading-relaxed font-light mb-8">
                Early access to curated public offerings. We secure shares in high-growth companies at institutional prices before they hit retail brokerages.
              </p>
              <div className="text-[13px] font-medium text-white uppercase tracking-widest border-b border-white/10 pb-2 inline-flex items-center gap-2 group-hover:border-[#00d4aa] group-hover:text-[#00d4aa] transition-all cursor-pointer">
                View Offerings <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Opportunity 3 */}
            <div className="group border border-white/5 p-12 bg-[#0a0f1c] hover:bg-white/[0.02] transition-colors relative overflow-hidden">
              <Coins className="w-8 h-8 text-[#e8c96a] mb-8" />
              <h4 className="text-2xl font-light text-white mb-4 font-['Outfit']">Crypto Investments</h4>
              <p className="text-[15px] text-gray-400 leading-relaxed font-light mb-8">
                Fund and grow positions with digital assets. Seamlessly transfer your crypto into stable, high-yield private market investments.
              </p>
              <div className="text-[13px] font-medium text-white uppercase tracking-widest border-b border-white/10 pb-2 inline-flex items-center gap-2 group-hover:border-[#e8c96a] group-hover:text-[#e8c96a] transition-all cursor-pointer">
                Learn More <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Opportunity 4 */}
            <div className="group border border-white/5 p-12 bg-[#0a0f1c] hover:bg-white/[0.02] transition-colors relative overflow-hidden">
              <Lock className="w-8 h-8 text-white mb-8" />
              <h4 className="text-2xl font-light text-white mb-4 font-['Outfit']">Private Markets</h4>
              <p className="text-[15px] text-gray-400 leading-relaxed font-light mb-8">
                Exclusive deals beyond public exchanges. Access private credit, high-end real estate, and venture capital funds typically reserved for billionaires.
              </p>
              <div className="text-[13px] font-medium text-white uppercase tracking-widest border-b border-white/10 pb-2 inline-flex items-center gap-2 transition-all cursor-pointer">
                View Markets <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-[#0a0f1c] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-[12px] text-[#c9a84c] uppercase tracking-[0.2em] mb-4 font-bold">Process</h2>
            <h3 className="text-4xl font-light text-white font-['Outfit']">How It Works</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 border border-white/5 bg-[#070b14] relative">
              <div className="text-6xl font-black text-white/5 absolute top-4 right-6 font-['Outfit']">01</div>
              <h4 className="text-xl font-light text-white mb-4 font-['Outfit'] relative z-10">Create Account</h4>
              <p className="text-[14px] text-gray-400 font-light leading-relaxed relative z-10">Register in minutes and complete our secure institutional-grade verification process.</p>
            </div>
            <div className="p-8 border border-white/5 bg-[#070b14] relative">
              <div className="text-6xl font-black text-white/5 absolute top-4 right-6 font-['Outfit']">02</div>
              <h4 className="text-xl font-light text-white mb-4 font-['Outfit'] relative z-10">Fund With Crypto</h4>
              <p className="text-[14px] text-gray-400 font-light leading-relaxed relative z-10">Deposit USD, stablecoins, or major digital assets directly into your secure wallet.</p>
            </div>
            <div className="p-8 border border-white/5 bg-[#070b14] relative">
              <div className="text-6xl font-black text-white/5 absolute top-4 right-6 font-['Outfit']">03</div>
              <h4 className="text-xl font-light text-white mb-4 font-['Outfit'] relative z-10">Invest</h4>
              <p className="text-[14px] text-gray-400 font-light leading-relaxed relative z-10">Allocate your capital into curated private deals, Pre-IPOs, and yield-generating assets.</p>
            </div>
            <div className="p-8 border border-white/5 bg-[#070b14] relative">
              <div className="text-6xl font-black text-white/5 absolute top-4 right-6 font-['Outfit']">04</div>
              <h4 className="text-xl font-light text-white mb-4 font-['Outfit'] relative z-10">Track Portfolio</h4>
              <p className="text-[14px] text-gray-400 font-light leading-relaxed relative z-10">Monitor your daily performance and distributions through your real-time dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Investors Choose Us */}
      <section id="about" className="py-24 lg:py-32 bg-[#070b14] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[12px] text-[#c9a84c] uppercase tracking-[0.2em] mb-4 font-bold">The XHoldings Advantage</h2>
              <h3 className="text-4xl font-light text-white font-['Outfit'] leading-tight mb-8">Why Investors <br/>Choose Us</h3>
              <p className="text-[15px] text-gray-400 font-light leading-relaxed mb-8">
                We bridge the gap between traditional high finance and the modern digital economy. Our platform is built for serious investors who demand the highest quality assets with the flexibility of modern technology.
              </p>
              <Link to={REGISTER}>
                <Button className="bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-none px-6 py-5 text-[12px] font-bold tracking-widest uppercase flex items-center gap-3 transition-colors">
                  Become a Member < ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-12 gap-y-16">
              <div>
                <Shield className="w-6 h-6 text-[#c9a84c] mb-5" />
                <h4 className="text-lg font-medium text-white mb-3">Private Market Access</h4>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  Bypass the public markets entirely. We grant you access to the same private equity deals and Pre-IPO shares normally reserved for Wall Street elites.
                </p>
              </div>
              <div>
                <Wallet className="w-6 h-6 text-[#c9a84c] mb-5" />
                <h4 className="text-lg font-medium text-white mb-3">Crypto Funding</h4>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  Your capital shouldn't be locked in legacy banking. Instantly fund your investments using digital assets and stablecoins without friction.
                </p>
              </div>
              <div>
                <BookOpen className="w-6 h-6 text-[#c9a84c] mb-5" />
                <h4 className="text-lg font-medium text-white mb-3">Curated Opportunities</h4>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  We reject 99% of the deals we review. Our expert analysts hand-pick only the most profitable, secure, and inflation-resistant investments for our members.
                </p>
              </div>
              <div>
                <BarChart3 className="w-6 h-6 text-[#c9a84c] mb-5" />
                <h4 className="text-lg font-medium text-white mb-3">Portfolio Tracking</h4>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  Watch your wealth grow in real-time. Our institutional-grade dashboard provides total transparency over your holdings, returns, and future distributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 bg-[#0a0f1c]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <div className="flex flex-col items-center mb-12">
            <div className="w-12 h-12 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-xl mb-6">
              X
            </div>
            <h2 className="text-3xl font-light text-white font-['Outfit'] mb-8">Ready to grow your portfolio?</h2>
            <div className="flex justify-center gap-4">
              <Link to={REGISTER}>
                <Button className="bg-[#c9a84c] hover:bg-[#b59640] text-[#070b14] rounded-none px-8 py-6 text-[13px] font-bold tracking-widest uppercase transition-all">
                  Create Account
                </Button>
              </Link>
              <Link to={LOGIN}>
                <Button className="bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-none px-8 py-6 text-[13px] font-bold tracking-widest uppercase transition-all">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 mt-10">
            <p className="text-[12px] text-gray-500 font-light">© {new Date().getFullYear()} XHoldings. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
