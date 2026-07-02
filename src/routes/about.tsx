import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Zap, Target, Briefcase, Users, Wallet, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo, LogoText } from "../components/Logo";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link to="/personal" className="cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400">Personal</Link>
              <Link to="/about" className="cursor-pointer text-[#12b744] transition-colors text-[15px] font-bold">About</Link>
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
                Get Started
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
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4 text-[#12b744]">About</Link>
              <Link to="/company" onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-4">Company</Link>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full rounded-xl py-6 text-lg border border-white/20 text-white hover:bg-white/5">
                  Log in
                </button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-[#12b744] hover:bg-[#10a13c] text-black rounded-xl py-6 text-lg font-bold flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Introduction Section */}
      <section className="pt-32 pb-64 px-6 md:px-8 relative bg-white text-black overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[150px] bg-[#0c1e11] transform origin-bottom-left -skew-y-2"></div>
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 relative z-10 pt-16">
          <div>
            <h1 className="text-3xl md:text-[40px] font-bold leading-tight font-['Outfit'] max-w-[500px]">
              Founded in 2019, Fedility Holding was born from a simple observation: the traditional financial system often excludes emerging and global markets from true efficiency.
            </h1>
          </div>
          <div className="space-y-6 text-[15px] font-medium text-gray-800 max-w-[500px] leading-relaxed">
            <p>
              People and businesses were locked out of global markets, trapped by inflation, and burdened with slow, expensive ways to move money.
            </p>
            <p>
              Fedility Holding saw the opportunity that digital assets such as crypto, stablecoins, and tokenised RWAs provided; they weren't just investments. They were new financial rails, and Fedility Holding decided that everyone globally should have access to borderless finance.
            </p>
            <p>
              Fedility Holding started by making crypto simple and safe to access. As proof of our commitment to trust and security, Fedility Holding built an institution-grade platform equipped for the modern era. But that was just the first step. Today, Fedility Holding is building the all-in-one platform for individuals to achieve true economic freedom and for businesses to operate in a new digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Building the Future Section */}
      <section className="py-32 px-6 md:px-8 bg-white text-black text-center">
        <div className="max-w-[800px] mx-auto mb-20">
          <h2 className="text-4xl md:text-[56px] font-bold font-['Outfit'] uppercase mb-6 tracking-tight leading-tight">BUILDING THE FUTURE <br/> OF GLOBAL MONEY</h2>
          <p className="text-gray-500 font-medium text-sm max-w-[600px] mx-auto">
            The traditional financial system wasn't built for a borderless world. Fedility Holding is creating a new one where people and businesses access, save, move, and grow wealth globally.
          </p>
        </div>
        
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6 text-left">
          {/* Card 1 */}
          <div className="flex flex-col h-[500px] md:h-auto md:flex-row rounded-[24px] overflow-hidden">
             <div className="flex-1 relative min-h-[250px]">
               <img src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=2000&auto=format&fit=crop" alt="Individuals" className="w-full h-full object-cover absolute inset-0" />
             </div>
             <div className="flex-1 bg-[#facc15] p-10 flex flex-col justify-between">
               <div>
                 <p className="text-xs font-extrabold mb-4 uppercase tracking-widest text-black/80">For individuals</p>
                 <h3 className="text-[32px] font-bold leading-[1.1] font-['Outfit']">Unlock Your Economic Prosperity</h3>
               </div>
               <p className="text-[13px] font-semibold text-black/80 mt-12 leading-relaxed pr-4">
                 With Fedility Holding, we're giving you tools to save in stablecoins, invest in digital assets, and access new wealth-building opportunities.
               </p>
             </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex flex-col h-[500px] md:h-auto md:flex-row rounded-[24px] overflow-hidden">
             <div className="flex-1 bg-[#12b744] p-10 flex flex-col justify-between text-black">
               <div>
                 <p className="text-xs font-extrabold mb-4 uppercase tracking-widest text-black/80">For businesses</p>
                 <h3 className="text-[32px] font-bold leading-[1.1] font-['Outfit']">Power Your Financial Operations</h3>
               </div>
               <p className="text-[13px] font-semibold text-black/80 mt-12 leading-relaxed pr-4">
                 Fedility Holding provides stablecoin infrastructure that helps your business manage treasury, make payments, and move money efficiently across the globe.
               </p>
             </div>
             <div className="flex-1 relative min-h-[250px]">
               <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop" alt="Businesses" className="w-full h-full object-cover absolute inset-0" />
             </div>
          </div>
        </div>
      </section>

      {/* We are here for you section */}
      <section className="py-32 px-6 md:px-8 bg-[#0c1e11] text-white text-center">
        <div className="max-w-[600px] mx-auto mb-20">
          <h2 className="text-3xl md:text-[48px] font-bold font-['Outfit'] uppercase mb-6 tracking-tight">WE ARE HERE <br/> FOR YOU</h2>
          <p className="text-[#8e9a93] text-sm font-medium leading-relaxed max-w-[500px] mx-auto">
            People around the world start their crypto journey with Fedility Holding. Fedility Holding puts customers first and focuses on making every step simple and enjoyable.
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto grid md:grid-cols-3 gap-4 text-left">
           <div className="bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]">
              <Target className="w-6 h-6 text-white mb-4" />
              <div>
                <h4 className="font-bold text-[15px] mb-2">Impact driven</h4>
                <p className="text-[13px] text-[#8e9a93] font-medium leading-snug">Fedility Holding creates tools that make real change</p>
              </div>
           </div>
           
           <div className="bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]">
              <Briefcase className="w-6 h-6 text-white mb-4" />
              <div>
                <h4 className="font-bold text-[15px] mb-2">Largest product suite</h4>
                <p className="text-[13px] text-[#8e9a93] font-medium leading-snug">All your crypto needs in one place</p>
              </div>
           </div>

           <div className="bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]">
              <Users className="w-6 h-6 text-white mb-4" />
              <div>
                <h4 className="font-bold text-[15px] mb-2">24/7 Human support</h4>
                <p className="text-[13px] text-[#8e9a93] font-medium leading-snug">Real help, anytime</p>
              </div>
           </div>

           <div className="bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]">
              <Wallet className="w-6 h-6 text-white mb-4" />
              <div>
                <h4 className="font-bold text-[15px] mb-2">Best-market pricing</h4>
                <p className="text-[13px] text-[#8e9a93] font-medium leading-snug">Fair rates, every time</p>
              </div>
           </div>

           <div className="bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]">
              <ShieldCheck className="w-6 h-6 text-white mb-4" />
              <div>
                <h4 className="font-bold text-[15px] mb-2">Maximum security</h4>
                <p className="text-[13px] text-[#8e9a93] font-medium leading-snug">Your assets stay protected</p>
              </div>
           </div>

           <div className="bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]">
              <Zap className="w-6 h-6 text-white mb-4" />
              <div>
                <h4 className="font-bold text-[15px] mb-2">Faster speed</h4>
                <p className="text-[13px] text-[#8e9a93] font-medium leading-snug">Transactions without delay</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 bg-[#020605] relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            {/* Abstract Waves Graphic representation */}
            <div className="absolute bottom-[-20%] left-0 w-full h-[500px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzA0MDgxMCIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMDEsMjI0TDEyMCwyMTMuM0MyNDAsMjAzLDQ4MCwxODEsNzIwLDE4Ni43Qzk2MCwxOTIsMTIwMCwyMjQsMTMyMCwyNDBMMTQ0MCwyNTZMMTQ0MCwzMjBMMTMyMCwzMjBDMTIwMCwzMjAsOTYwLDMyMCw3MjAsMzIwQzQ4MCwzMjAsMjQwLDMyMCwxMjAsMzIwTDBsMzIwWiI+PC9wYXRoPjwvc3ZnPg==')] bg-bottom bg-no-repeat bg-cover opacity-50"></div>
         </div>

        <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase font-['Outfit'] tracking-tight">Ready to scale <br/> your business?</h2>
          <p className="text-[#8e9a93] text-lg mb-10">
            Join thousands of enterprises already building the future of finance with Fedility Holding.
          </p>
          <Link to="/login">
            <button className="px-10 py-4 bg-white hover:bg-gray-200 text-black rounded-full font-bold text-[16px] transition-all">
              Log in
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

