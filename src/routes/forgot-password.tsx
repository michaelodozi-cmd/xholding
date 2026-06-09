import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";

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
    <div className="min-h-screen bg-[#070b14] text-[#f0f4ff] font-['Inter'] selection:bg-[#c9a84c]/30 flex flex-col md:flex-row">
      {/* Left Branding/Image Section */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/3 relative bg-[#0a0f1c] border-r border-white/5 flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3270&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-[#0a0f1c]/80 to-[#0a0f1c] pointer-events-none" />
        
        <div className="relative z-10">
          <Link to="/login" className="inline-flex items-center gap-2 text-[12px] font-medium text-gray-400 hover:text-[#c9a84c] transition-colors uppercase tracking-widest mb-16">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 border border-[#c9a84c]/50 flex items-center justify-center font-bold text-[#e8c96a] font-['Outfit'] text-lg">
              X
            </div>
            <span className="font-light text-2xl tracking-[0.15em] text-white font-['Outfit'] uppercase">XHoldings</span>
          </div>
          <h2 className="text-3xl font-light text-white font-['Outfit'] leading-snug">
            Reset <br/> Password
          </h2>
        </div>

        <div className="relative z-10 text-[11px] text-gray-500 uppercase tracking-widest leading-loose">
          <p>Secure account recovery <br/> for your peace of mind.</p>
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
          <Link to="/login" className="text-[12px] text-gray-500 uppercase tracking-widest">Return</Link>
        </div>
        
        <div className="w-full max-w-[400px]">
          <div className="mb-12">
            <div className="text-[12px] text-[#c9a84c] uppercase tracking-[0.2em] mb-4 font-bold">Account Recovery</div>
            <h3 className="text-4xl font-light mb-2 font-['Outfit']">Forgot Password?</h3>
            <p className="text-[14px] text-gray-400 font-light leading-relaxed">Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="mb-6 p-6 bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-white rounded-sm text-center">
              <div className="text-[#00d4aa] mb-2 font-bold uppercase tracking-widest text-[12px]">Email Sent</div>
              <p className="text-[13px] text-gray-300">Check your inbox. We've sent password reset instructions to <strong>{email}</strong>.</p>
              <Button onClick={() => navigate({ to: "/login" })} className="w-full mt-6 py-6 text-[13px] rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-[0.15em] transition-colors">
                Return to Login
              </Button>
            </div>
          ) : (
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

              <Button disabled={loading} className="w-full py-6 text-[13px] rounded-none bg-[#c9a84c] hover:bg-[#b59640] text-[#070b14] font-bold uppercase tracking-[0.15em] transition-colors border-none mt-4">
                {loading ? "Sending link..." : "Send Reset Link"}
              </Button>
            </form>
          )}

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[12px] text-gray-500 font-light">
              Remembered your password?{' '}
              <Link to="/login" className="text-white hover:text-[#c9a84c] uppercase tracking-widest font-medium transition-colors ml-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
