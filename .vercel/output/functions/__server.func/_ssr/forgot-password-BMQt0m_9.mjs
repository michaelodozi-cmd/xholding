import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./supabase-83CNBwKx.mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const {
      error: resetError
    } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSuccess(true);
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "inline-flex items-center gap-2 text-[14px] font-medium text-[#8e9a93] hover:text-[#12b744] transition-colors mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Login"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[32px] md:text-[34px] font-bold text-white mb-2 tracking-tight", children: "Reset Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] text-[#8e9a93] mb-8 leading-relaxed", children: "Enter the email address associated with your account, and we'll send you a link to reset your password." }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl", children: error }),
      success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-6 bg-[#12b744]/10 border border-[#12b744]/20 text-white rounded-xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#12b744] mb-2 font-bold text-[16px]", children: "Email Sent!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[14px] text-gray-300", children: [
          "Check your inbox. We've sent password reset instructions to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: email }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/login"
        }), className: "w-full mt-6 py-4 text-[16px] rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10", children: "Return to Login" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full bg-[#06120b] border border-[#113a1f] px-5 py-4 rounded-xl text-[15px] text-white placeholder-[#325240] focus:outline-none focus:border-[#12b744] focus:ring-1 focus:ring-[#12b744] transition-all", placeholder: "Email address" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, type: "submit", className: "w-full py-4 text-[16px] rounded-full bg-[#13c74b] hover:bg-[#10a13c] text-black font-bold transition-all border-none", children: loading ? "Sending link..." : "Send Reset Link" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "absolute bottom-6 left-6 md:left-8 z-20 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#52665a] text-[13px] font-medium", children: [
      "© XHoldings ",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] }) })
  ] });
}
export {
  ForgotPassword as component
};
