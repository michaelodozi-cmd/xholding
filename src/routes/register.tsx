import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, HeadphonesIcon, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Logo, LogoText } from "../components/Logo";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertState, setAlertState] = useState({ open: false, title: '', message: '', onConfirm: () => {} });

  const showAlert = (title: string, message: string, onConfirm = () => {}) => {
    setAlertState({ open: true, title, message, onConfirm });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!email) return setError("Email is required");
      if (!email.includes("@")) return setError("Please enter a valid email address");
      setStep(2);
    } else if (step === 2) {
      if (!name) return setError("Full name is required");
      if (name.length < 2) return setError("Please enter your full name");
      setStep(3);
    } else if (step === 3) {
      if (password.length < 6) return setError("Password must be at least 6 characters");
      if (password !== confirmPassword) return setError("Passwords do not match");
      setStep(4);
    } else if (step === 4) {
      submitRegistration();
    }
  };

  const submitRegistration = async () => {
    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session === null) {
      showAlert("Registration Successful", "A confirmation email has been sent to your inbox. Please confirm your email (check your spam or junk folder if you don't see it).", () => navigate({ to: "/login" }));
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1 className="text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight">What's your email address?</h1>
            <p className="text-[15px] text-[#8e9a93] mb-8">
              Already have an account? <Link to="/login" className="text-white font-bold hover:underline">Log in</Link>
            </p>
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all"
                placeholder="Email address"
              />
            </div>
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
              >
                Continue
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight">What's your full name?</h1>
            <p className="text-[15px] text-[#8e9a93] mb-8">
              This will be displayed on your portfolio.
            </p>
            <div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all"
                placeholder="Full Name"
              />
            </div>
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
              >
                Continue
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight">Create a password</h1>
            <p className="text-[15px] text-[#8e9a93] mb-8">
              Use at least 6 characters for strong security.
            </p>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  minLength={6}
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

              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 pr-12 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
              >
                Continue
              </button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h1 className="text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight">Have an invite code?</h1>
            <p className="text-[15px] text-[#8e9a93] mb-8">
              Optional, but you can earn rewards if you were invited.
            </p>
            <div>
              <input 
                type="text" 
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                autoFocus
                className="w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all uppercase"
                placeholder="Invite Code (Optional)"
              />
            </div>
            <div className="pt-4">
              <button 
                disabled={loading} 
                type="submit"
                className="w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
            <p className="text-[#8e9a93] text-xs text-center mt-6">
              By creating an account, you agree to our <span className="text-white hover:underline cursor-pointer">Terms of Service</span> and <span className="text-white hover:underline cursor-pointer">Privacy Policy</span>.
            </p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#12b744]/30 flex flex-col relative">
      <AlertDialog open={alertState.open} onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}>
        <AlertDialogContent className="bg-[#0a0f0d] border border-white/10 text-white rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{alertState.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-[#8e9a93]">
              {alertState.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setAlertState(prev => ({ ...prev, open: false }));
              alertState.onConfirm();
            }} className="bg-[#12b744] text-black hover:bg-[#10a13c] rounded-xl font-bold">
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <header className="flex items-center justify-between p-6 md:px-8 absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-4">
          {step > 1 ? (
            <button 
              onClick={() => { setStep(s => s - 1); setError(""); }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <Logo size={26} />
              <LogoText className="font-semibold text-xl tracking-tight text-white font-['Outfit'] hidden sm:block" />
            </Link>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-[#325240] tracking-widest uppercase mr-2">
            Step {step} of 4
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-[460px] mx-auto z-10 mt-20 md:mt-0 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="w-full">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleNext}>
            {renderStepContent()}
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 left-6 md:left-8 z-20 hidden sm:block">
        <span className="text-[#52665a] text-[13px] font-medium">Â© Fidelity Holdings {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}


