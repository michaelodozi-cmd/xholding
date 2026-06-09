import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // Check if admin
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
    
    if (profile?.role !== 'admin') {
      const { data: settings } = await supabase.from('platform_settings').select('maintenance_mode').eq('id', 1).single();
      if (settings?.maintenance_mode) {
        await supabase.auth.signOut();
        setError("The platform is currently under maintenance. Please try again later.");
        return;
      }
      navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] font-['Inter'] selection:bg-[#c9a84c]/30 flex flex-col md:flex-row">
      {/* Left Branding/Image Section */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/3 relative bg-[#0a0f1c] border-r border-white/5 flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3270&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
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
            Welcome <br/> Back
          </h2>
        </div>

        <div className="relative z-10 text-[11px] text-gray-500 uppercase tracking-widest leading-loose">
          <p>Log in to securely access <br/> your investment portfolio.</p>
          <p className="mt-4">© {new Date().getFullYear()} XHoldings Inc.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 w-full md:w-7/12 lg:w-2/3 flex flex-col justify-start md:justify-center items-center p-6 sm:p-12 md:p-24 relative bg-[#070b14] min-h-[100dvh] md:min-h-0">
        {/* Mobile Header */}
        <div className="md:hidden w-full max-w-[400px] flex justify-between items-center mb-10 mt-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-sm">X</div>
          </div>
          <Link to="/" className="text-[12px] text-gray-500 uppercase tracking-widest">Return</Link>
        </div>
        
        <div className="w-full max-w-[400px]">
          <div className="mb-12">
            <div className="text-[12px] text-[#c9a84c] uppercase tracking-[0.2em] mb-4 font-bold">Secure Login</div>
            <h3 className="text-4xl font-light mb-2 font-['Outfit']">Sign In</h3>
            <p className="text-[14px] text-gray-400 font-light leading-relaxed">Enter your email and password to view your portfolio.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-sm">
              {error}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-[15px] text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-none"
                placeholder="you@email.com"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-[#c9a84c] hover:text-white uppercase tracking-widest transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-[15px] text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] transition-colors rounded-none"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button disabled={loading} className="w-full py-6 text-[13px] rounded-none bg-[#c9a84c] hover:bg-[#b59640] text-[#070b14] font-bold uppercase tracking-[0.15em] transition-colors border-none mt-4">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[12px] text-gray-500 font-light">
              Don't have an account?{' '}
              <Link to="/register" className="text-white hover:text-[#c9a84c] uppercase tracking-widest font-medium transition-colors ml-2">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
