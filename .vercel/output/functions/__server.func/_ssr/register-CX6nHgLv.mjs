import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./supabase-83CNBwKx.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogAction } from "./alert-dialog-CqeYel26.mjs";
import { A as ArrowLeft, E as EyeOff, a as Eye } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./button-BXrfXN_b.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Register() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [inviteCode, setInviteCode] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [alertState, setAlertState] = reactExports.useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {
    }
  });
  const showAlert = (title, message, onConfirm = () => {
  }) => {
    setAlertState({
      open: true,
      title,
      message,
      onConfirm
    });
  };
  const handleNext = (e) => {
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
    const {
      data,
      error: signUpError
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    if (data.session === null) {
      showAlert("Registration Successful", "A confirmation email has been sent to your inbox. Please confirm your email.", () => navigate({
        to: "/login"
      }));
    } else {
      navigate({
        to: "/dashboard"
      });
    }
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight", children: "What's your email address?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[15px] text-[#8e9a93] mb-8", children: [
            "Already have an account? ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-white font-bold hover:underline", children: "Log in" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoFocus: true, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all", placeholder: "Email address" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none", children: "Continue" }) })
        ] });
      case 2:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight", children: "What's your full name?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] text-[#8e9a93] mb-8", children: "This will be displayed on your portfolio." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, autoFocus: true, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all", placeholder: "Full Name" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none", children: "Continue" }) })
        ] });
      case 3:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight", children: "Create a password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] text-[#8e9a93] mb-8", children: "Use at least 6 characters for strong security." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoFocus: true, minLength: 6, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 pr-12 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all", placeholder: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-[#325240] hover:text-[#12b744] transition-colors", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, minLength: 6, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 pr-12 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all", placeholder: "Confirm Password" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none", children: "Continue" }) })
        ] });
      case 4:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight", children: "Have an invite code?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] text-[#8e9a93] mb-8", children: "Optional, but you can earn rewards if you were invited." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: inviteCode, onChange: (e) => setInviteCode(e.target.value), autoFocus: true, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all uppercase", placeholder: "Invite Code (Optional)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, type: "submit", className: "w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none", children: loading ? "Creating account..." : "Create account" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#8e9a93] text-xs text-center mt-6", children: [
            "By creating an account, you agree to our ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white hover:underline cursor-pointer", children: "Terms of Service" }),
            " and ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white hover:underline cursor-pointer", children: "Privacy Policy" }),
            "."
          ] })
        ] });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#12b744]/30 flex flex-col relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: alertState.open, onOpenChange: (open) => setAlertState((prev) => ({
      ...prev,
      open
    })), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "bg-[#0a0f0d] border border-white/10 text-white rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: alertState.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-[#8e9a93]", children: alertState.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => {
        setAlertState((prev) => ({
          ...prev,
          open: false
        }));
        alertState.onConfirm();
      }, className: "bg-[#12b744] text-black hover:bg-[#10a13c] rounded-xl font-bold", children: "Okay" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between p-6 md:px-8 absolute top-0 left-0 right-0 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setStep((s) => s - 1);
        setError("");
      }, className: "w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-[4px] bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-[12px] rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-xl tracking-tight text-white font-['Outfit'] hidden sm:block", children: "XHoldings" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-[#325240] tracking-widest uppercase mr-2", children: [
        "Step ",
        step,
        " of 4"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex flex-col items-center justify-center p-6 w-full max-w-[460px] mx-auto z-10 mt-20 md:mt-0 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl animate-in fade-in slide-in-from-top-2", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { className: "space-y-4", onSubmit: handleNext, children: renderStepContent() })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "absolute bottom-6 left-6 md:left-8 z-20 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#52665a] text-[13px] font-medium", children: [
      "© XHoldings ",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] }) })
  ] });
}
export {
  Register as component
};
