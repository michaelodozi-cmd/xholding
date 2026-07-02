import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
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
function Personal() {
  const [isScrolled, setIsScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020605] text-white font-['Inter'] selection:bg-[#12b744]/30 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#020605]/90 backdrop-blur-lg border-b border-white/5 py-4" : "bg-[#020605] py-4"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-sm rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-2xl tracking-tight text-white font-['Outfit']", children: "XHoldings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-8 ml-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/personal", className: "cursor-pointer text-[#12b744] transition-colors text-[15px] font-bold", children: "Personal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400", children: "Company" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-5 py-2.5 rounded-xl border border-transparent text-[14px] font-medium text-white hover:bg-white/5 transition-colors", children: "Log in" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "bg-[#12b744] hover:bg-[#10a13c] text-black rounded-full px-6 py-2.5 text-[14px] font-bold transition-all flex items-center gap-2", children: "Open Account" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-40 pb-20 px-6 md:px-8 bg-[#efede8] text-black flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto w-full text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[56px] md:text-[80px] font-bold tracking-tight mb-8 font-['Outfit'] uppercase", children: [
        "BUILT FOR ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        " YOUR WEALTH"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-[18px] md:text-[20px] max-w-3xl mx-auto mb-16 leading-relaxed", children: "Whatever your financial goals, XHoldings provides the tools to power your growth, from saving in high-yield stablecoins to trading digital assets, or sending money to family globally." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 border-y border-white/5 relative z-10 bg-[#06120b]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-sm uppercase tracking-widest font-bold mb-8", children: "Secured by top-tier cryptographic infrastructure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale text-[#8e9a93]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "FIREBLOCKS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "CHAINALYSIS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "COINBASE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-['Outfit']", children: "BINANCE" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 bg-white text-black", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1100px] mx-auto px-6 md:px-8 text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6 uppercase font-['Outfit'] tracking-tight", children: [
          "TRADE WITH ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " CONFIDENCE"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-[15px] max-w-2xl mx-auto mb-6", children: "Buy, sell, and convert BTC, ETH, USDT, and 70+ digital assets with the best local rates and a platform trusted by over a million users." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 text-sm font-semibold text-green-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100" }),
            "Trade anytime"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100" }),
            "Robust compliance and regulatory oversight"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1100px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-gray-800", children: "Buy, Sell & Convert instantly" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#fcd535] p-6 rounded-2xl cursor-pointer shadow-sm relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-black/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-black", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-black", children: "Automate Your Strategy" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-black/80 text-[14px] leading-relaxed", children: "Set up recurring buys and sell limit orders to buy/sell at your preferred price." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-gray-800", children: "Instant Wallet Funding & Payouts" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[24px] overflow-hidden relative h-[450px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop", alt: "Trading", className: "absolute inset-0 w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1/2 left-8 -translate-y-1/2 w-[220px] bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shadow-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 border-b border-white/10 mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 100 40", className: "w-full h-full stroke-white stroke-2 fill-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 20 Q 20 10, 40 25 T 80 15 T 100 5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Limit Order" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm opacity-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Recurring Buy" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 bg-white text-black border-t border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1100px] mx-auto px-6 md:px-8 text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6 uppercase font-['Outfit'] tracking-tight", children: [
          "GROW YOUR ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " WEALTH"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-[15px] max-w-2xl mx-auto mb-6", children: "Manage and deploy your digital assets, including optional earn features and collateral-based liquidity solutions provided through licensed partners." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 text-sm font-semibold text-green-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100" }),
            "Earn daily interest on your savings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100" }),
            "Licensed & secure"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1100px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[24px] overflow-hidden relative h-[450px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop", alt: "Wealth", className: "absolute inset-0 w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1/2 right-8 -translate-y-1/2 bg-[#a38012]/40 backdrop-blur-md border border-white/30 rounded-[32px] w-[180px] h-[220px] p-6 text-white shadow-2xl flex flex-col justify-center items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold mb-1", children: "$21,730" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium opacity-80", children: "USD" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-gray-800", children: "Earn up to 10% annual interest" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#fcd535] p-6 rounded-2xl cursor-pointer shadow-sm relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-black/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-black", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-black", children: "Borrow without selling" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-black/80 text-[14px] leading-relaxed", children: "Access collateral-based liquidity in partnership with licensed financial institutions without selling your assets." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#f4f5f5] p-5 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-gray-800", children: "Full Control, Anytime" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 bg-[#3d1a17] text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1100px] mx-auto px-6 md:px-8 text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-6 uppercase font-['Outfit'] tracking-tight", children: "GO GLOBAL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-[15px] max-w-2xl mx-auto mb-6", children: "Open a USD account, shop anywhere with XHoldings debit cards, and earn instant cashback every time you spend in-app." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 text-sm font-semibold text-[#fcd535]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-[#fcd535] ring-4 ring-[#fcd535]/30" }),
            "Shop anywhere, no restrictions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-[#fcd535] ring-4 ring-[#fcd535]/30" }),
            "Low fees"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1100px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#fcd1ce] p-6 rounded-2xl cursor-pointer shadow-sm relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-black/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-black", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-black", children: "Global USD Account" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-black/80 text-[14px] leading-relaxed", children: "Open a USD account, shop anywhere with XHoldings debit cards, and earn instant cashback every time you spend in-app." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#5a2f2b] p-5 rounded-xl cursor-pointer hover:bg-[#6e3934] transition-colors border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-white", children: "Virtual & Physical Debit Cards" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#5a2f2b] p-5 rounded-xl cursor-pointer hover:bg-[#6e3934] transition-colors border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[15px] font-bold text-white", children: "Instant Cashback" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[24px] overflow-hidden relative h-[450px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2000&auto=format&fit=crop", alt: "Pool", className: "absolute inset-0 w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-8 -translate-y-1/2 w-[200px] h-[300px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white shadow-2xl flex flex-col justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold mb-8", children: "$1,256" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 10l7-7m0 0l7 7m-7-7v18" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) }) })
            ] })
          ] }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-[#f4f5f5]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-16 text-black", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold mb-4 font-['Outfit'] uppercase", children: [
        "Loved by retail ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        " investors globally."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-[#12b744] mb-4", children: "★★★★★" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: `"I used to keep my savings in a traditional bank earning almost nothing. Moving to XHoldings' Growth Plan has been the best financial decision I've made."` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/150?img=47`, alt: "Avatar" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-black text-sm", children: "Elena R." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: "Retail Investor" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-[#12b744] mb-4", children: "★★★★★" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: '"The dashboard is incredibly easy to use. I can track my daily ROI directly from my phone and the withdrawals actually hit my personal wallet instantly."' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/150?img=11`, alt: "Avatar" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-black text-sm", children: "James M." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: "Crypto Enthusiast" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 text-[#12b744] mb-4", children: "★★★★★" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed mb-8", children: `"I appreciate the transparency. Being able to see exactly how much yield I'm generating every single day gives me massive peace of mind."` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/150?img=5`, alt: "Avatar" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-black text-sm", children: "Michael T." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: "Long-term Holder" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-32 bg-[#020605] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] left-0 w-full h-[500px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzA2MTIwYiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMDEsMjI0TDEyMCwyMTMuM0MyNDAsMjAzLDQ4MCwxODEsNzIwLDE4Ni43Qzk2MCwxOTIsMTIwMCwyMjQsMTMyMCwyNDBMMTQ0MCwyNTZMMTQ0MCwzMjBMMTMyMCwzMjBDMTIwMCwzMjAsOTYwLDMyMCw3MjAsMzIwQzQ4MCwzMjAsMjQwLDMyMCwxMjAsMzIwTDBsMzIwWiI+PC9wYXRoPjwvc3ZnPg==')] bg-bottom bg-no-repeat bg-cover opacity-50" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[800px] mx-auto px-6 md:px-8 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-6xl font-bold mb-8 uppercase font-['Outfit'] tracking-tight", children: [
          "Ready to start ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " your journey?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8e9a93] text-lg mb-10", children: "Open a personal account today and start earning daily ROI on your crypto assets." }),
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
  Personal as component
};
