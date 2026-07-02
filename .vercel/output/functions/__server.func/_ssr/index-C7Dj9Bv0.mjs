import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BXrfXN_b.mjs";
import { h as ArrowRight, X, M as Menu, R as Rocket, Q as QrCode, e as CircleCheck, V as Headphones, Y as Lock, d as ShieldCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const LOGIN = "/login";
const REGISTER = "/register";
function Landing() {
  const [isScrolled, setIsScrolled] = reactExports.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [marketData, setMarketData] = reactExports.useState([{
    pair: "BTC/USD",
    price: "$65,240",
    change: "+2.4%",
    isPositive: true
  }, {
    pair: "ETH/USD",
    price: "$3,450",
    change: "+1.2%",
    isPositive: true
  }, {
    pair: "SOL/USD",
    price: "$145",
    change: "+5.7%",
    isPositive: true
  }, {
    pair: "USDT/USD",
    price: "$1.00",
    change: "0.0%",
    isPositive: true
  }]);
  reactExports.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  reactExports.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,tether").then((res) => res.json()).then((data) => {
      setMarketData(data.map((coin) => ({
        pair: `${coin.symbol.toUpperCase()}/USD`,
        price: `$${coin.current_price.toLocaleString(void 0, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6
        })}`,
        change: `${coin.price_change_percentage_24h > 0 ? "+" : ""}${coin.price_change_percentage_24h?.toFixed(2) || "0.00"}%`,
        isPositive: coin.price_change_percentage_24h >= 0
      })));
    }).catch(console.error);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020605] text-white font-['Inter'] selection:bg-[#c9a84c]/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#020605]/90 backdrop-blur-lg border-b border-white/5 py-4" : "bg-transparent py-6"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-transparent border-2 border-[#12b744] flex items-center justify-center font-bold text-[#12b744] font-['Outfit'] text-sm rotate-45", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-2xl tracking-tight text-white font-['Outfit']", children: "XHoldings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-8 ml-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/personal", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-white", children: "Personal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-300", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", className: "cursor-pointer hover:text-white transition-colors text-[15px] font-medium text-gray-400", children: "Company" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-5 py-2.5 rounded-xl border border-transparent text-[14px] font-medium text-white hover:bg-white/5 transition-colors", children: "Log in" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: REGISTER, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-white/10 hover:bg-white/15 text-white rounded-xl px-5 py-2.5 text-[14px] font-bold transition-all flex items-center gap-2", children: [
            "Sign up ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "lg:hidden text-white p-2", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6" }) })
      ] }),
      mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden absolute top-full left-0 w-full bg-[#020605] border-b border-white/5 flex flex-col p-6 shadow-2xl h-screen", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 text-lg font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/personal", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4", children: "Personal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", onClick: () => setMobileMenuOpen(false), className: "border-b border-white/10 pb-4", children: "Company" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full rounded-xl py-6 text-lg border-white/20 text-white hover:bg-white/5", children: "Log in" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: REGISTER, onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full bg-white/15 hover:bg-white/25 text-white rounded-xl py-6 text-lg font-medium flex items-center justify-center gap-2", children: [
            "Sign up ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1000px] mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[56px] md:text-[72px] lg:text-[84px] font-bold tracking-tight leading-none mb-8 font-['Inter'] uppercase", children: [
          "XHOLDINGS IS YOUR",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "PRIVATE WEALTH APP"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[17px] md:text-[20px] text-gray-300 mb-20 max-w-2xl font-medium leading-relaxed", children: "Invest in daily-yield portfolios, automatically copy top master traders, and manage your digital assets on the simplest, safest platform." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[1100px] hidden md:flex gap-4 md:gap-6 justify-center items-end h-[280px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#12b744] rounded-[32px] p-8 w-[320px] h-full flex flex-col justify-between shadow-2xl relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-[56px] font-bold leading-none tracking-tight", children: "$125k" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-white/90 text-sm font-medium mt-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Jan 20, 2026" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[32px] p-6 w-[260px] h-[90%] flex flex-col relative shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-black text-2xl font-bold leading-tight mb-2 text-center", children: [
              "Up to 18%",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "in interest"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-full h-[120px] flex items-end justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[80%] h-[100px] bg-green-100 rounded-t-3xl relative border-4 border-green-200 shadow-inner", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-6 left-4 w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-300 shadow-lg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-10 w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-300 shadow-lg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-4 w-6 h-16 bg-green-500 rounded shadow-md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-12 w-6 h-10 bg-green-400 rounded shadow-md" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#6b52ff] rounded-[32px] p-6 w-[240px] h-[85%] flex flex-col justify-between shadow-2xl relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-16 h-16 text-white drop-shadow-2xl fill-white/20" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-white text-xl font-bold leading-tight text-center", children: [
              "Automated",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Copy Trading",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-white/80", children: "for members" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-end h-full gap-4 md:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#8b5cf6] rounded-3xl w-[140px] h-[140px] flex items-center justify-center shadow-xl transform hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-full h-full text-white" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#10b981] rounded-2xl w-[140px] h-[100px] p-4 flex flex-col justify-between shadow-xl transform hover:-translate-y-1 transition-transform duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-lg", children: "36.7%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-8 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 100 30", className: "w-full h-full stroke-white stroke-2 fill-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 25 Q 20 10, 40 15 T 80 5 T 100 0" }) }) })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 border-y border-white/10 bg-[#000000]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-medium text-gray-300", children: [
        "Track ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "real-time digital assets" }),
        " on XHoldings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-8 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide", children: marketData.map((crypto, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-max", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-sm font-medium", children: crypto.pair }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold", children: crypto.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${crypto.isPositive !== false ? "text-green-500" : "text-red-500"}`, children: crypto.change })
        ] })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 lg:py-32 bg-[#020605]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6 text-white uppercase tracking-tight", children: [
          "Master Your",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Portfolio"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-lg mb-8", children: "Mirror the strategies of elite master traders and automate your market positions on XHoldings' secure, institutional-grade platform." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-[#12b744]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Verified algorithmic strategies" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-[#12b744]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Real-time execution & transparency" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8 items-stretch h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#c9a84c] text-black rounded-3xl p-8 shadow-xl grow min-h-[260px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-black/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-black/60" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Automate Your Strategy" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-black/80 font-medium", children: "Mirror top algorithmic traders with proven win rates to capture market alpha effortlessly on XHoldings." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Institutional-Grade Execution" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Transparent Performance Tracking" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden min-h-[400px] border border-white/10 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/images/trade_with_confidence.png", alt: "Automate your portfolio", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 -translate-y-1/2 left-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-[200px] shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-white hover:text-[#12b744] transition-colors cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none mb-1", children: "+" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Subscribe" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-white hover:text-red-400 transition-colors cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none mb-1", children: "-" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Unsubscribe" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-white hover:text-[#c9a84c] transition-colors cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Performance" })
            ] })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 lg:py-32 bg-[#000000]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-6 text-white uppercase tracking-tight", children: [
          "Grow Your Wealth",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "With XHoldings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-lg mb-8", children: "Deploy your digital assets into high-yield structured plans designed to provide consistent daily returns and preserve capital on XHoldings." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-[#12b744]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Earn daily ROI on structured plans" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-[#12b744]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Institutional security & asset custody" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8 items-stretch h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden min-h-[400px] border border-white/10 order-2 lg:order-1 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/images/grow_your_wealth.png", alt: "Grow your wealth", className: "absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1/2 -translate-y-1/2 right-8 bg-black/40 backdrop-blur-xl border border-[#c9a84c]/30 rounded-3xl p-8 w-[240px] shadow-2xl flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[40px] font-bold text-white mb-1 tracking-tight leading-none", children: "1,980" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/60 text-sm font-medium mb-10", children: "USDT Yield" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full text-center space-y-3 mt-4 border-t border-white/10 pt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 text-sm", children: "Matures in 6 months" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#c9a84c] text-sm font-semibold", children: "25% per annum" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 order-1 lg:order-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#c9a84c] text-black rounded-3xl p-8 shadow-xl grow min-h-[260px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border border-black/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-black/60" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Consistent Daily Passive Returns" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-black/80 font-medium", children: "Institutional yield opportunities available on XHoldings with fully transparent performance metrics and real-time tracking." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Flexible Maturation Periods" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 rounded-2xl p-6 text-white/70 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Full Control, Anytime" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 border-y border-white/5 bg-[#020605]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "w-10 h-10 text-white mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "24/7 Premium Support" }),
          ": Dedicated account managers and human support to guide your investment journey."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-10 h-10 text-white mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Institutional-Grade Security" }),
          ": Enterprise-grade encryption and cold-storage security to keep your digital assets safe."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 text-white mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Trusted globally" }),
          " by thousands of private investors and high-net-worth individuals."
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "pt-20 pb-10 bg-[#000000] border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1300px] mx-auto px-6 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-12 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded border-2 border-green-500 flex items-center justify-center font-bold text-green-500 font-['Outfit'] text-sm rotate-45 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 max-w-[200px]", children: "XHoldings is a leading digital asset provider, fully compliant for secure data protection and algorithmic investing." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-6", children: "Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-sm text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, className: "hover:text-white transition-colors", children: "Dashboard" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, className: "hover:text-white transition-colors", children: "Invest" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, className: "hover:text-white transition-colors", children: "Copy Trading" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, className: "hover:text-white transition-colors", children: "Wallet" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-6", children: "Resources" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-sm text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, className: "hover:text-white transition-colors", children: "Market Data" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: LOGIN, className: "hover:text-white transition-colors", children: "Top Traders" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Support" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-6", children: "Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-sm text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "About XHoldings" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Security" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Contact" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Help Center" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 text-center md:text-left leading-relaxed max-w-3xl", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " XHoldings. All rights reserved. By using this website, you consent to our Privacy Policy and Cookie Policy. Please read our full Risk Warning to understand the potential risks involved in investing."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Landing as component
};
