import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { X, M as Menu, h as ArrowRight, Z as Zap, d as ShieldCheck, e as CircleCheck } from "../_libs/lucide-react.mjs";
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
function Company() {
  const [isScrolled, setIsScrolled] = reactExports.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020605] text-white font-['Inter'] selection:bg-[#12b744]/30 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#020605]/90 backdrop-blur-lg border-b border-white/5 py-4" : "bg-transparent py-6"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-sm rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-2xl tracking-tight text-white font-['Outfit']", children: "XHoldings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-8 ml-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/personal", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400", children: "Personal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", className: "cursor-pointer text-[#12b744] transition-colors text-[15px] font-bold", children: "Company" })
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4 text-[#12b744]", children: "Company" })
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-40 pb-32 px-6 md:px-8 relative flex flex-col items-center text-center overflow-hidden min-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[10%] right-[-15%] w-[800px] h-[800px] bg-[#020605] border-2 border-white/10 rounded-full pointer-events-none opacity-50 z-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-20%] left-[50%] -translate-x-1/2 w-[1100px] h-[1100px] bg-linear-to-b from-[#0a1e12] to-[#020605] border-2 border-[#12b744]/30 rounded-full pointer-events-none shadow-[inset_0_-80px_100px_rgba(18,183,68,0.15)] z-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#020605] border-2 border-white/10 rounded-full pointer-events-none opacity-80 z-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[0%] left-[5%] w-[400px] h-[400px] bg-[#020605] border-2 border-[#12b744]/20 rounded-full pointer-events-none z-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[48px] md:text-[72px] font-bold tracking-tight leading-[1.1] mb-6 relative z-10 font-['Outfit'] uppercase max-w-4xl mx-auto", children: [
        "ACCESS THE WORLD ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        " THROUGH ONE PLATFORM"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-[16px] md:text-[18px] font-medium max-w-[650px] mb-10 relative z-10 leading-relaxed", children: "All-in-one crypto infrastructure platform enabling payments, corporate treasury and asset management without physical cash handling." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 relative z-10 mb-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-6 py-3 bg-[#12b744] hover:bg-[#10a13c] text-black rounded-lg font-bold text-[15px] transition-all flex items-center justify-center gap-2", children: [
          "Create a business account ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@xholdings.com", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-6 py-3 bg-transparent hover:bg-white/5 text-white border border-white/10 rounded-lg font-bold text-[15px] transition-all flex items-center justify-center gap-2", children: "Speak to our team" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 border-y border-white/5 relative z-10 bg-[#06120b]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm uppercase tracking-widest font-bold mb-8", children: "Secured by top-tier cryptographic infrastructure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale text-[#8e9a93]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "FIREBLOCKS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "CHAINALYSIS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "COINBASE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "BINANCE" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-[#f4f5f5] text-black", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-4 uppercase font-['Outfit'] tracking-tight", children: [
          "Built For ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " Every Investor Strategy"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "From everyday retail investors to massive corporate treasuries, XHoldings provides the liquidity and yield generation needed to scale your wealth." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl overflow-hidden relative h-[400px] group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop", alt: "Personal Wealth", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white text-2xl font-bold", children: "Personal Wealth" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl overflow-hidden relative h-[400px] group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop", alt: "Corporate Treasury", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white text-2xl font-bold", children: "Corporate Treasury" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl overflow-hidden relative h-[400px] group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop", alt: "Private Equity", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white text-2xl font-bold", children: "Private Equity" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 bg-[#020605] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-4 uppercase font-['Outfit'] tracking-tight", children: [
          "Generate predictable yield. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " Compounded daily."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-lg max-w-2xl mx-auto mb-8", children: "Bypass legacy banking infrastructure. Our investment engine generates daily ROI through secured staking, algorithmic trading, and private debt." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-8 py-3 bg-white hover:bg-gray-200 text-black rounded-full font-bold text-[15px] transition-all", children: "Start Earning" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#051409] rounded-[40px] p-10 border border-[#12b744]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0a1f12] p-6 rounded-2xl border border-[#12b744]/30 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-white mb-2", children: "Growth & VIP Plans" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm", children: "Lock your capital into predefined duration plans specifically tailored for aggressive growth or capital preservation." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-gray-400 mb-2", children: "Algorithmic Trading" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-gray-400 mb-2", children: "Real Estate Syndication" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0b100d] rounded-[40px] p-6 md:p-10 border border-white/5 relative h-[500px] flex items-center justify-center overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-[400px] h-[400px] border border-[#12b744]/20 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-[600px] h-[600px] border border-[#12b744]/10 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#12b744]/20 blur-[100px] rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[280px] h-[580px] bg-[#020605] border border-white/20 rounded-[40px] shadow-2xl relative z-10 flex flex-col p-6 mt-20 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-1 bg-gray-800 rounded-full mx-auto mb-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mb-1", children: "Total Balance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[32px] sm:text-4xl font-bold break-all leading-tight", children: "$428,500.00" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 bg-linear-to-r from-[#12b744]/10 to-transparent border border-[#12b744]/20 rounded-2xl flex items-center px-4 justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "Daily ROI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#12b744] font-bold", children: "+$1,240.50" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 bg-white/5 rounded-2xl flex items-center px-4 justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400", children: "Growth Plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "$250,000" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 bg-white/5 rounded-2xl flex items-center px-4 justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400", children: "Available" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "$178,500" })
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 bg-[#030906] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-4 uppercase font-['Outfit'] tracking-tight", children: [
          "Total Portfolio ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " Control."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-lg max-w-2xl mx-auto mb-8", children: "Monitor, manage, and withdraw your funds instantly with absolute transparency via our secure administrative infrastructure." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0b100d] rounded-[40px] p-6 md:p-10 border border-white/5 relative h-[500px] flex items-center justify-center overflow-hidden order-2 md:order-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-[400px] h-[400px] border border-[#12b744]/20 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#12b744]/20 blur-[100px] rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[280px] h-[580px] bg-[#020605] border border-[#12b744]/30 rounded-[40px] shadow-[0_0_50px_rgba(18,183,68,0.2)] relative z-10 flex flex-col p-6 mt-20 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-1 bg-gray-800 rounded-full mx-auto mb-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mb-1", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[22px] sm:text-2xl font-bold text-[#12b744]", children: "Withdrawal Approved" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-white/5 rounded-xl border border-white/10 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Amount Sent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: "50,000 USDT" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-white/5 rounded-xl border border-white/10 text-center break-all", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "TXID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400", children: "0x8f2a...9b41c" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#051409] rounded-[40px] p-10 border border-[#12b744]/20 order-1 md:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0a1f12] p-6 rounded-2xl border border-[#12b744]/30 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-white mb-2", children: "Instant Crypto Withdrawals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm", children: "We process massive liquidity exits daily. Submit your verified wallet address and receive funds without traditional banking delays." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-gray-400 mb-2", children: "Immutable Ledger" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-gray-400 mb-2", children: "Zero Hidden Fees" }) })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-[#061409] border-y border-[#12b744]/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8 text-[#12b744] mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Proof of Reserves" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm leading-relaxed", children: "XHoldings maintains a strict 1:1 asset backing. We never co-mingle funds, ensuring absolute solvency regardless of market volatility." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-[#12b744] mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Institutional Security" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm leading-relaxed", children: "Client funds are protected by multi-signature cold storage, rigorous penetration testing, and enterprise-grade operational security." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-[#12b744] mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Regulated Operations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm leading-relaxed", children: "We strictly adhere to global KYC/AML standards, ensuring a safe, compliant, and legally fortified investing environment." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-[#f4f5f5]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-16 text-black", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold mb-4 font-['Outfit'] uppercase", children: [
        "Trusted by thousands ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        " of serious investors."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-[#12b744] mb-4", children: "★★★★★" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: '"XHoldings completely transformed my portfolio. Their fixed-yield plans provide incredible stability during market downturns, and the daily ROI is always on time."' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/150?img=12`, alt: "Avatar" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-black text-sm", children: "Marcus T." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: "Private Investor" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-[#12b744] mb-4", children: "★★★★★" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: '"The withdrawal process is flawless. Unlike traditional institutions that lock up your cash for weeks, my crypto withdrawals process almost instantly."' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/150?img=44`, alt: "Avatar" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-black text-sm", children: "Sarah Jenkins" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: "Crypto Fund Manager" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-[#12b744] mb-4", children: "★★★★★" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: '"I was skeptical of the high yield at first, but their transparency regarding proof of reserves and algorithmic strategies is unparalleled. Very satisfied."' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/150?img=33`, alt: "Avatar" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-black text-sm", children: "David Chen" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: "Enterprise Client" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-32 bg-[#020605] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] left-0 w-full h-[500px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzA2MTIwYiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMDEsMjI0TDEyMCwyMTMuM0MyNDAsMjAzLDQ4MCwxODEsNzIwLDE4Ni43Qzk2MCwxOTIsMTIwMCwyMjQsMTMyMCwyNDBMMTQ0MCwyNTZMMTQ0MCwzMjBMMTMyMCwzMjBDMTIwMCwzMjAsOTYwLDMyMCw3MjAsMzIwQzQ4MCwzMjAsMjQwLDMyMCwxMjAsMzIwTDBsMzIwWiI+PC9wYXRoPjwvc3ZnPg==')] bg-bottom bg-no-repeat bg-cover opacity-50" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[800px] mx-auto px-6 md:px-8 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-8 uppercase font-['Outfit'] tracking-tight", children: [
          "Ready to compound ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " your wealth?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-lg mb-10", children: "Join thousands of smart investors already building their financial future with XHoldings." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-10 py-4 bg-[#12b744] hover:bg-[#10a13c] text-black rounded-full font-bold text-[16px] transition-all", children: "Create Free Account" }) })
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
  Company as component
};
