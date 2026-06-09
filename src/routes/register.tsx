import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] font-['Inter'] selection:bg-[#c9a84c]/30 flex flex-col md:flex-row">
      {/* Left Branding/Image Section */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/3 relative bg-[#0a0f1c] border-r border-white/5 flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=3271&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-[#0a0f1c]/80 to-[#0a0f1c] pointer-events-none" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] font-medium text-gray-400 hover:text-[#c9a84c] transition-colors uppercase tracking-widest mb-16">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-lg">
              X
            </div>
            <span className="font-light text-2xl tracking-[0.15em] text-white font-['Outfit'] uppercase">XHoldings</span>
          </div>
          <h2 className="text-3xl font-light text-white font-['Outfit'] leading-snug">
            Create Account
          </h2>
        </div>

        <div className="relative z-10 text-[11px] text-gray-500 uppercase tracking-widest leading-loose">
          <p>Join thousands of investors <br/> growing their wealth.</p>
          <p className="mt-4">© {new Date().getFullYear()} XHoldings Inc.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col justify-center items-center p-8 sm:p-12 md:p-24 relative bg-[#070b14] overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden w-full max-w-md flex justify-between items-center mb-12 mt-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-sm">X</div>
          </div>
          <Link to="/" className="text-[12px] text-gray-500 uppercase tracking-widest">Return</Link>
        </div>
        
        <div className="w-full max-w-[400px] my-auto">
          <div className="mb-12">
            <div className="text-[12px] text-[#c9a84c] uppercase tracking-[0.2em] mb-4 font-bold">Get Started</div>
            <h3 className="text-4xl font-light mb-2 font-['Outfit']">Sign Up</h3>
            <p className="text-[14px] text-gray-400 font-light leading-relaxed">Fill out the form below to set up your profile and start investing.</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-[15px] text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-none"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-[15px] text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-none"
                placeholder="you@email.com"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]">Password</label>
              <input 
                type="password" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-[15px] text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-none"
                placeholder="Create a strong password"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]">Invite Code</label>
                <span className="text-[10px] text-gray-600 uppercase tracking-widest">Optional</span>
              </div>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-[15px] text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-none uppercase"
                placeholder="If you have one"
              />
            </div>

            <Button className="w-full py-6 text-[13px] rounded-none bg-white/5 hover:bg-white/10 border border-[#c9a84c]/50 text-white font-bold uppercase tracking-[0.15em] transition-colors mt-4">
              Create Account
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[12px] text-gray-500 font-light">
              Already have an account?{' '}
              <Link to="/login" className="text-[#c9a84c] hover:text-white uppercase tracking-widest font-medium transition-colors ml-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
