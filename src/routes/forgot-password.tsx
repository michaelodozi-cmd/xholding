import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sun, HeadphonesIcon, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Logo, LogoText } from "../components/Logo";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#12b744]/30 flex flex-col relative">
      
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:px-8 absolute top-0 left-0 right-0 z-20">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={26} />
          <LogoText className="font-semibold text-xl tracking-tight text-white font-['Outfit']" />
        </Link>
        <div className="flex items-center gap-4">
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-[460px] mx-auto z-10 mt-16 md:mt-0">
        <div className="w-full">
          <Link to="/login" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#8e9a93] hover:text-[#12b744] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
          
          <h1 className="text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight">Reset Password</h1>
          <p className="text-[15px] text-[#8e9a93] mb-8 leading-relaxed">
            Enter the email address associated with your account, and we'll send you a link to reset your password.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
              {error}
            </div>
          )}

          {success ? (
            <div className="mb-6 p-6 bg-[#12b744]/10 border border-[#12b744]/20 text-white rounded-xl text-center">
              <div className="text-[#12b744] mb-2 font-bold text-[16px]">Email Sent!</div>
              <p className="text-[14px] text-gray-300">Check your inbox. We've sent password reset instructions to <strong className="text-white">{email}</strong> (check your spam or junk folder if you don't see it).</p>
              <button onClick={() => navigate({ to: "/login" })} className="w-full mt-6 py-4 text-[16px] rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10">
                Return to Login
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
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

              <button 
                disabled={loading} 
                type="submit"
                className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
              >
                {loading ? "Sending link..." : "Send Reset Link"}
              </button>
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

