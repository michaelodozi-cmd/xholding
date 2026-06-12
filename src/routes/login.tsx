import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Sun, HeadphonesIcon } from "lucide-react";
import { useState, useEffect } from "react";
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

  const [rememberMe, setRememberMe] = useState(false);

  // On mount, load saved email if "Keep me signed in" was previously used
  useEffect(() => {
    const savedEmail = localStorage.getItem("xholdings_remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }

    // Handle "Keep me signed in"
    if (rememberMe) {
      localStorage.setItem("xholdings_remember_email", email);
    } else {
      localStorage.removeItem("xholdings_remember_email");
    }

    // Execute necessary database checks concurrently to reduce redirect latency
    const [profileRes, settingsRes] = await Promise.all([
      supabase.from('profiles').select('role').eq('id', data.user.id).single(),
      supabase.from('platform_settings').select('maintenance_mode').eq('id', 1).single()
    ]);
    
    setLoading(false);

    if (profileRes.data?.role !== 'admin') {
      if (settingsRes.data?.maintenance_mode) {
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
    <div className="min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#12b744]/30 flex flex-col relative">
      
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:px-8 absolute top-0 left-0 right-0 z-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[4px] bg-transparent border-[2px] border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-[12px] rotate-45">
            <div className="-rotate-45">X</div>
          </div>
          <span className="font-semibold text-xl tracking-tight text-white font-['Outfit']">XHoldings</span>
        </Link>
        <div className="flex items-center gap-4">
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-[460px] mx-auto z-10 mt-16 md:mt-0">
        <div className="w-full">
          <h1 className="text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight">Log in to your account</h1>
          <p className="text-[15px] text-[#8e9a93] mb-8">
            New user? <Link to="/register" className="text-white font-bold hover:underline">Create account</Link>
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 pr-12 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all"
                placeholder="Password"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#325240] hover:text-[#12b744] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <label className="flex items-center gap-3 pt-2 pb-4 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="appearance-none w-[18px] h-[18px] border-[2px] border-[#12b744] rounded-[4px] bg-transparent cursor-pointer checked:bg-[#12b744] transition-colors peer" 
                />
                <svg className="absolute w-[10px] h-[10px] text-black pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[14px] text-white font-medium">Keep me signed in on this device</span>
            </label>

            <button 
              disabled={loading} 
              type="submit"
              className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-6">
            <Link to="/forgot-password" className="text-white text-[15px] font-bold underline decoration-white/40 underline-offset-4 hover:decoration-white transition-all">
              Forgot password?
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 left-6 md:left-8 z-20 hidden sm:block">
        <span className="text-[#52665a] text-[13px] font-medium">© XHoldings {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
