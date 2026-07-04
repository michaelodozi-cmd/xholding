import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Logo, LogoText } from "../components/Logo";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [canReset, setCanReset] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeRecovery = async () => {
      try {
        // Check if code exists in URL search params (PKCE flow)
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error("Error exchanging recovery code:", exchangeError.message);
          }
        }

        // Check if there is an active session or hash fragment
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          if (session || window.location.hash.includes("access_token")) {
            setCanReset(true);
          }
          setCheckingAuth(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (mounted) setCheckingAuth(false);
      }
    };

    initializeRecovery();

    // Listen for auth state changes (especially PASSWORD_RECOVERY event)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted && (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || session)) {
        setCanReset(true);
        setCheckingAuth(false);
      }
    });

    // Fallback timeout to stop showing loader if no tokens are found
    const timer = setTimeout(() => {
      if (mounted) setCheckingAuth(false);
    }, 2500);

    return () => {
      mounted = false;
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    // Sign out so the user logs in fresh with their new password
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#12b744]/30 flex flex-col relative">
      
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:px-8 absolute top-0 left-0 right-0 z-20">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={26} />
          <LogoText className="font-semibold text-xl tracking-tight text-white font-['Outfit']" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-[460px] mx-auto z-10 mt-16 md:mt-0">
        <div className="w-full">
          <Link to="/login" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#8e9a93] hover:text-[#12b744] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
          
          <h1 className="text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight">Set New Password</h1>
          <p className="text-[15px] text-[#8e9a93] mb-8 leading-relaxed">
            Please enter your new password below to secure your Fidelity Holdings account.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
              {error}
            </div>
          )}

          {checkingAuth ? (
            <div className="p-8 bg-[#06120b] border border-[#113a1f] rounded-2xl text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-3 border-[#12b744] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[14px] text-[#8e9a93]">Verifying reset security token...</p>
            </div>
          ) : !canReset ? (
            <div className="p-6 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl text-center">
              <div className="font-bold text-[16px] mb-2">Invalid or Expired Link</div>
              <p className="text-[14px] text-gray-300 mb-6">
                We couldn't verify your password recovery token. The reset link may have expired or already been used.
              </p>
              <button 
                onClick={() => navigate({ to: "/forgot-password" })} 
                className="w-full py-3.5 text-[15px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
              >
                Request New Reset Link
              </button>
            </div>
          ) : success ? (
            <div className="mb-6 p-6 bg-[#12b744]/10 border border-[#12b744]/20 text-white rounded-xl text-center">
              <CheckCircle2 className="w-12 h-12 text-[#12b744] mx-auto mb-3" />
              <div className="text-[#12b744] mb-2 font-bold text-[18px]">Password Updated!</div>
              <p className="text-[14px] text-gray-300 mb-6">Your password has been successfully reset. You can now log in with your new credentials.</p>
              <button 
                onClick={() => navigate({ to: "/login" })} 
                className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 pr-12 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all"
                  placeholder="New Password (min 6 chars)"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#325240] hover:text-[#12b744] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 pr-12 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all"
                  placeholder="Confirm New Password"
                />
              </div>

              <div className="pt-2">
                <button 
                  disabled={loading} 
                  type="submit"
                  className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
                >
                  {loading ? "Updating password..." : "Save New Password"}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 left-6 md:left-8 z-20 hidden sm:block">
        <span className="text-[#52665a] text-[13px] font-medium">Â© Fidelity Holdings {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
