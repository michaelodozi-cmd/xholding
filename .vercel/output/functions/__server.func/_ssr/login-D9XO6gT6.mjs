import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./supabase-83CNBwKx.mjs";
import { E as EyeOff, a as Eye } from "../_libs/lucide-react.mjs";
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
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [rememberMe, setRememberMe] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const savedEmail = localStorage.getItem("xholdings_remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const {
      data,
      error: signInError
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }
    if (rememberMe) {
      localStorage.setItem("xholdings_remember_email", email);
    } else {
      localStorage.removeItem("xholdings_remember_email");
    }
    const [profileRes, settingsRes] = await Promise.all([supabase.from("profiles").select("role").eq("id", data.user.id).single(), supabase.from("platform_settings").select("maintenance_mode").eq("id", 1).single()]);
    setLoading(false);
    if (profileRes.data?.role !== "admin") {
      if (settingsRes.data?.maintenance_mode) {
        await supabase.auth.signOut();
        setError("The platform is currently under maintenance. Please try again later.");
        return;
      }
      navigate({
        to: "/dashboard"
      });
    } else {
      navigate({
        to: "/admin"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#12b744]/30 flex flex-col relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between p-6 md:px-8 absolute top-0 left-0 right-0 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-[4px] bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-[12px] rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-xl tracking-tight text-white font-['Outfit']", children: "XHoldings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex flex-col items-center justify-center p-6 w-full max-w-[460px] mx-auto z-10 mt-16 md:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight", children: "Log in to your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[15px] text-[#8e9a93] mb-8", children: [
        "New user? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-white font-bold hover:underline", children: "Create account" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all", placeholder: "Email address" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 pr-12 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all", placeholder: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-[#325240] hover:text-[#12b744] transition-colors", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 pt-2 pb-4 cursor-pointer group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center w-5 h-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked), className: "appearance-none w-[18px] h-[18px] border-2 border-[#12b744] rounded-[4px] bg-transparent cursor-pointer checked:bg-[#12b744] transition-colors peer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute w-[10px] h-[10px] text-black pointer-events-none opacity-0 peer-checked:opacity-100", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] text-white font-medium", children: "Keep me signed in on this device" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, type: "submit", className: "w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none", children: loading ? "Logging in..." : "Log in" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-white text-[15px] font-bold underline decoration-white/40 underline-offset-4 hover:decoration-white transition-all", children: "Forgot password?" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "absolute bottom-6 left-6 md:left-8 z-20 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#52665a] text-[13px] font-medium", children: [
      "© XHoldings ",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] }) })
  ] });
}
export {
  Login as component
};
