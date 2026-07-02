import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const appCss = "/assets/styles-B2Vlzuah.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Aurora Prime merges broker and admin platforms into a premium private investment experience." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Aurora Prime merges broker and admin platforms into a premium private investment experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Aurora Prime merges broker and admin platforms into a premium private investment experience." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/766a9fb3-8e9c-43db-8ef0-624835ac17f3/id-preview-6c39b27b--9387c1da-78a7-4794-a696-a0165d70c179.lovable.app-1780917809196.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/766a9fb3-8e9c-43db-8ef0-624835ac17f3/id-preview-6c39b27b--9387c1da-78a7-4794-a696-a0165d70c179.lovable.app-1780917809196.png" }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$9 = () => import("./register-CX6nHgLv.mjs");
const Route$9 = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./personal-Ch7mujsH.mjs");
const Route$8 = createFileRoute("/personal")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-D9XO6gT6.mjs");
const Route$7 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./forgot-password-BMQt0m_9.mjs");
const Route$6 = createFileRoute("/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-xZZBFGXi.mjs");
const Route$5 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const getCryptoLogo = (id) => {
  const map = {
    btc: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
    eth: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    usdt: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
    bnb: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
    sol: "https://cryptologos.cc/logos/solana-sol-logo.svg",
    usdc: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
    xrp: "https://cryptologos.cc/logos/xrp-xrp-logo.svg",
    doge: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg",
    ton: "https://cryptologos.cc/logos/toncoin-ton-logo.svg",
    ada: "https://cryptologos.cc/logos/cardano-ada-logo.svg",
    trx: "https://cryptologos.cc/logos/tron-trx-logo.svg",
    avax: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
    shib: "https://cryptologos.cc/logos/shiba-inu-shib-logo.svg",
    link: "https://cryptologos.cc/logos/chainlink-link-logo.svg",
    dot: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg",
    ltc: "https://cryptologos.cc/logos/litecoin-ltc-logo.svg",
    uni: "https://cryptologos.cc/logos/uniswap-uni-logo.svg",
    matic: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
    xlm: "https://cryptologos.cc/logos/stellar-xlm-logo.svg",
    xmr: "https://cryptologos.cc/logos/monero-xmr-logo.svg"
  };
  return map[id.toLowerCase()] || null;
};
const $$splitComponentImporter$4 = () => import("./company-CMIuqhWH.mjs");
const Route$4 = createFileRoute("/company")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin-ef72RU3d.mjs");
const Route$3 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-D-2_Ym3P.mjs");
const Route$2 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-C7Dj9Bv0.mjs");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./article._articleId-dO0u-plz.mjs");
const Route = createFileRoute("/article/$articleId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$9.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$a
});
const PersonalRoute = Route$8.update({
  id: "/personal",
  path: "/personal",
  getParentRoute: () => Route$a
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$a
});
const ForgotPasswordRoute = Route$6.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$a
});
const DashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$a
});
const CompanyRoute = Route$4.update({
  id: "/company",
  path: "/company",
  getParentRoute: () => Route$a
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$a
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const ArticleArticleIdRoute = Route.update({
  id: "/article/$articleId",
  path: "/article/$articleId",
  getParentRoute: () => Route$a
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  CompanyRoute,
  DashboardRoute,
  ForgotPasswordRoute,
  LoginRoute,
  PersonalRoute,
  RegisterRoute,
  ArticleArticleIdRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  getCryptoLogo as g,
  router as r
};
