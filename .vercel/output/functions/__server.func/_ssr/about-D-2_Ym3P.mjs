import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { X, M as Menu, h as ArrowRight, N as Target, O as Briefcase, U as Users, W as Wallet, d as ShieldCheck, Z as Zap } from "../_libs/lucide-react.mjs";
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
function About() {
  const [isScrolled, setIsScrolled] = reactExports.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020605] text-white font-['Inter'] selection:bg-[#12b744]/30 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#020605]/90 backdrop-blur-lg border-b border-white/5 py-4" : "bg-[#020605] py-4"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-sm rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-2xl tracking-tight text-white font-['Outfit']", children: "XHoldings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-8 ml-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/personal", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400", children: "Personal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "cursor-pointer text-[#12b744] transition-colors text-[15px] font-bold", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400", children: "Company" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-5 py-2.5 rounded-xl border border-transparent text-[14px] font-medium text-white hover:bg-white/5 transition-colors", children: "Log in" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "bg-[#12b744] hover:bg-[#10a13c] text-black rounded-full px-6 py-2.5 text-[14px] font-bold transition-all flex items-center gap-2", children: "Get Started" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "lg:hidden text-white p-2", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6" }) })
      ] }),
      mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden absolute top-full left-0 w-full bg-[#020605] border-b border-white/5 flex flex-col p-6 shadow-2xl h-screen", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 text-lg font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/personal", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4", children: "Personal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4 text-[#12b744]", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4", children: "Company" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full rounded-xl py-6 text-lg border border-white/20 text-white hover:bg-white/5", children: "Log in" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full bg-[#12b744] hover:bg-[#10a13c] text-black rounded-xl py-6 text-lg font-bold flex items-center justify-center gap-2", children: [
            "Get Started ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-32 pb-64 px-6 md:px-8 relative bg-white text-black overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-full h-[150px] bg-[#0c1e11] transform origin-bottom-left -skew-y-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 relative z-10 pt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-[40px] font-bold leading-tight font-['Outfit'] max-w-[500px]", children: "Founded in 2019, XHoldings was born from a simple observation: the traditional financial system often excludes emerging and global markets from true efficiency." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-[15px] font-medium text-gray-800 max-w-[500px] leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "People and businesses were locked out of global markets, trapped by inflation, and burdened with slow, expensive ways to move money." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "XHoldings saw the opportunity that digital assets such as crypto, stablecoins, and tokenised RWAs provided; they weren't just investments. They were new financial rails, and XHoldings decided that everyone globally should have access to borderless finance." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "XHoldings started by making crypto simple and safe to access. As proof of our commitment to trust and security, XHoldings built an institution-grade platform equipped for the modern era. But that was just the first step. Today, XHoldings is building the all-in-one platform for individuals to achieve true economic freedom and for businesses to operate in a new digital economy." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-32 px-6 md:px-8 bg-white text-black text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[800px] mx-auto mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-[56px] font-bold font-['Outfit'] uppercase mb-6 tracking-tight leading-tight", children: [
          "BUILDING THE FUTURE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " OF GLOBAL MONEY"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium text-sm max-w-[600px] mx-auto", children: "The traditional financial system wasn't built for a borderless world. XHoldings is creating a new one where people and businesses access, save, move, and grow wealth globally." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[500px] md:h-auto md:flex-row rounded-[24px] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative min-h-[250px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=2000&auto=format&fit=crop", alt: "Individuals", className: "w-full h-full object-cover absolute inset-0" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-[#facc15] p-10 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-extrabold mb-4 uppercase tracking-widest text-black/80", children: "For individuals" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[32px] font-bold leading-[1.1] font-['Outfit']", children: "Unlock Your Economic Prosperity" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold text-black/80 mt-12 leading-relaxed pr-4", children: "With XHoldings, we're giving you tools to save in stablecoins, invest in digital assets, and access new wealth-building opportunities." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[500px] md:h-auto md:flex-row rounded-[24px] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-[#12b744] p-10 flex flex-col justify-between text-black", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-extrabold mb-4 uppercase tracking-widest text-black/80", children: "For businesses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[32px] font-bold leading-[1.1] font-['Outfit']", children: "Power Your Financial Operations" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold text-black/80 mt-12 leading-relaxed pr-4", children: "XHoldings provides stablecoin infrastructure that helps your business manage treasury, make payments, and move money efficiently across the globe." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative min-h-[250px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop", alt: "Businesses", className: "w-full h-full object-cover absolute inset-0" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-32 px-6 md:px-8 bg-[#0c1e11] text-white text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[600px] mx-auto mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-[48px] font-bold font-['Outfit'] uppercase mb-6 tracking-tight", children: [
          "WE ARE HERE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " FOR YOU"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm font-medium leading-relaxed max-w-[500px] mx-auto", children: "People around the world start their crypto journey with XHoldings. XHoldings puts customers first and focuses on making every step simple and enjoyable." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1000px] mx-auto grid md:grid-cols-3 gap-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6 text-white mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-[15px] mb-2", children: "Impact driven" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-[#8e9a93] font-medium leading-snug", children: "XHoldings creates tools that make real change" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-6 h-6 text-white mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-[15px] mb-2", children: "Largest product suite" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-[#8e9a93] font-medium leading-snug", children: "All your crypto needs in one place" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-white mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-[15px] mb-2", children: "24/7 Human support" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-[#8e9a93] font-medium leading-snug", children: "Real help, anytime" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-6 h-6 text-white mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-[15px] mb-2", children: "Best-market pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-[#8e9a93] font-medium leading-snug", children: "Fair rates, every time" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6 text-white mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-[15px] mb-2", children: "Maximum security" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-[#8e9a93] font-medium leading-snug", children: "Your assets stay protected" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#122817] p-8 rounded-[20px] flex flex-col justify-between h-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-white mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-[15px] mb-2", children: "Faster speed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-[#8e9a93] font-medium leading-snug", children: "Transactions without delay" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-32 bg-[#020605] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] left-0 w-full h-[500px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzA0MDgxMCIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMDEsMjI0TDEyMCwyMTMuM0MyNDAsMjAzLDQ4MCwxODEsNzIwLDE4Ni43Qzk2MCwxOTIsMTIwMCwyMjQsMTMyMCwyNDBMMTQ0MCwyNTZMMTQ0MCwzMjBMMTMyMCwzMjBDMTIwMCwzMjAsOTYwLDMyMCw3MjAsMzIwQzQ4MCwzMjAsMjQwLDMyMCwxMjAsMzIwTDBsMzIwWiI+PC9wYXRoPjwvc3ZnPg==')] bg-bottom bg-no-repeat bg-cover opacity-50" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[800px] mx-auto px-6 md:px-8 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-8 uppercase font-['Outfit'] tracking-tight", children: [
          "Ready to scale ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " your business?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-lg mb-10", children: "Join thousands of enterprises already building the future of finance with XHoldings." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-10 py-4 bg-white hover:bg-gray-200 text-black rounded-full font-bold text-[16px] transition-all", children: "Log in" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "pt-20 pb-10 bg-black border-t border-white/5 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center text-[12px] text-[#8e9a93]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " XHoldings Inc. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 mt-4 md:mt-0 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Terms of Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Privacy Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Disclosures" })
      ] })
    ] }) }) })
  ] });
}
export {
  About as component
};
