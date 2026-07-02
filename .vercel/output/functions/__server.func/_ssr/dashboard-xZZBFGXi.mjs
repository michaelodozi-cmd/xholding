import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { c as cn } from "./button-BXrfXN_b.mjs";
import { u as useTransactionStore, D as Dialog, a as DialogContent, b as useCryptoStore } from "./dialog-BpZhHK7_.mjs";
import { s as supabase } from "./supabase-83CNBwKx.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, g as AlertDialogCancel, f as AlertDialogAction } from "./alert-dialog-CqeYel26.mjs";
import { g as getCryptoLogo } from "./router-DgBNmsuS.mjs";
import { H as House, T as TrendingUp, U as Users, W as Wallet, L as List, S as Settings, b as Shield, c as LogOut, C as ChevronDown, X, B as Bell, d as ShieldCheck, e as CircleCheck, f as User, a as Eye, g as ArrowUpRight, P as Plus, h as ArrowRight, i as Ellipsis, G as Gift, j as ChevronRight, k as Check, l as Activity, m as Copy, I as Image, n as Search, F as FileText, o as ArrowDownLeft, p as Clock, q as Trash2, r as Star } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
function useInvestmentStore() {
  const [investments, setInvestments] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchInvestments();
    const channelId = `investments_changes_${Math.random()}`;
    const channel = supabase.channel(channelId).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "investments" },
      () => {
        fetchInvestments();
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const fetchInvestments = async () => {
    const { data, error } = await supabase.from("investments").select("*").order("created_at", { ascending: false });
    if (data && !error) {
      setInvestments(data);
    }
  };
  const addInvestment = async (inv) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const newInv = {
      user_id: user.id,
      plan_name: inv.plan_name,
      amount: inv.amount,
      daily_roi: inv.daily_roi,
      duration_days: inv.duration_days,
      status: "active"
    };
    const { error } = await supabase.from("investments").insert([newInv]);
    if (error) {
      console.error("Error adding investment:", error);
    } else {
      fetchInvestments();
    }
  };
  return { investments, addInvestment };
}
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const playNote = (freq, startTime, duration, gain) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(1e-3, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    const now = ctx.currentTime;
    playNote(523.25, now, 0.3, 0.25);
    playNote(659.25, now + 0.15, 0.4, 0.2);
    setTimeout(() => ctx.close(), 700);
  } catch (_) {
  }
}
function useNotificationStore() {
  const [notifications, setNotifications] = reactExports.useState([]);
  const [unreadCount, setUnreadCount] = reactExports.useState(0);
  const [latestNotif, setLatestNotif] = reactExports.useState(null);
  const [userId, setUserId] = reactExports.useState(null);
  const channelRef = reactExports.useRef(null);
  const prevUnread = reactExports.useRef(0);
  const isFirstLoad = reactExports.useRef(true);
  const fetchNotifications = reactExports.useCallback(async (uid) => {
    const resolvedUid = uid || userId;
    if (!resolvedUid) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      return fetchNotifications(user.id);
    }
    const { data, error } = await supabase.from("notifications").select("*").eq("user_id", resolvedUid).order("created_at", { ascending: false }).limit(30);
    if (data && !error) {
      const newUnread = data.filter((n) => !n.is_read).length;
      if (!isFirstLoad.current && newUnread > prevUnread.current) {
        playNotificationSound();
      }
      prevUnread.current = newUnread;
      isFirstLoad.current = false;
      setNotifications(data);
      setUnreadCount(newUnread);
    }
  }, [userId]);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      fetchNotifications(user.id);
      if (channelRef.current) supabase.removeChannel(channelRef.current);
      const channel = supabase.channel(`notif-${user.id}`).on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const newNotif = payload.new;
          setNotifications((prev) => [newNotif, ...prev]);
          setUnreadCount((prev) => {
            const next = prev + 1;
            prevUnread.current = next;
            return next;
          });
          if (!isFirstLoad.current) {
            playNotificationSound();
            setLatestNotif(newNotif);
          }
        }
      ).on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const updated = payload.new;
          setNotifications((prev) => prev.map((n) => n.id === updated.id ? updated : n));
          if (updated.is_read) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        }
      ).subscribe((status) => {
        if (status === "SUBSCRIBED") {
          isFirstLoad.current = false;
        }
      });
      channelRef.current = channel;
    });
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, []);
  const markAsRead = async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (id) {
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount((prev) => Math.max(0, prev - 1));
      prevUnread.current = Math.max(0, prevUnread.current - 1);
      await supabase.from("notifications").update({ is_read: true }).eq("id", id).eq("user_id", user.id);
    } else {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
      prevUnread.current = 0;
      await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id);
    }
  };
  const dismissLatest = () => setLatestNotif(null);
  return { notifications, unreadCount, markAsRead, refetch: fetchNotifications, latestNotif, dismissLatest };
}
const ICON_URL = "/favicon.ico";
async function requestNotificationPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}
function sendPushNotification(payload) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const n = new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon ?? ICON_URL,
      badge: payload.badge ?? ICON_URL,
      tag: payload.tag,
      // prevents duplicates with the same tag
      requireInteraction: false
      // auto-dismiss after a few seconds
    });
    setTimeout(() => n.close(), 6e3);
    n.onclick = () => {
      window.focus();
      n.close();
    };
  } catch (_) {
  }
}
function notifyDepositApproved(amount, asset) {
  sendPushNotification({
    title: "✅ Deposit Approved — XHoldings",
    body: `Your deposit of ${amount} ${asset} has been credited to your account.`,
    tag: "deposit-approved"
  });
}
function notifyDepositRejected(amount, asset) {
  sendPushNotification({
    title: "❌ Deposit Rejected — XHoldings",
    body: `Your deposit of ${amount} ${asset} was not approved. Contact support for help.`,
    tag: "deposit-rejected"
  });
}
function notifyWithdrawalApproved(amount, asset) {
  sendPushNotification({
    title: "💸 Withdrawal Sent — XHoldings",
    body: `Your withdrawal of ${amount} ${asset} has been processed and sent.`,
    tag: "withdrawal-approved"
  });
}
function notifyWithdrawalRejected(amount, asset) {
  sendPushNotification({
    title: "❌ Withdrawal Rejected — XHoldings",
    body: `Your withdrawal of ${amount} ${asset} was rejected. Contact support.`,
    tag: "withdrawal-rejected"
  });
}
const VAPID_PUBLIC_KEY = "BFpA9qck6mVvXczwUS4uYnD1CClquj5hXJRtFG5Njw8EvCQAzJPcs97Kai2CDnVWkVV7uDJmXppiDAmDLhuSuew";
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
async function registerPushSubscription() {
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("[Push] Service workers or PushManager not supported.");
      return false;
    }
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    await navigator.serviceWorker.ready;
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("[Push] Permission denied.");
      return false;
    }
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const subJson = subscription.toJSON();
    await supabase.from("push_subscriptions").upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      subscription: subJson
    }, { onConflict: "user_id,endpoint" });
    console.log("[Push] Subscription saved successfully.");
    return true;
  } catch (err) {
    console.error("[Push] Failed to register push subscription:", err);
    return false;
  }
}
function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("home");
  const [profile, setProfile] = reactExports.useState(null);
  const [settings, setSettings] = reactExports.useState(null);
  const [balanceFlash, setBalanceFlash] = reactExports.useState(false);
  const [liveToast, setLiveToast] = reactExports.useState(null);
  reactExports.useRef(null);
  reactExports.useEffect(() => {
    let profileChannel = null;
    const fetchProfile = async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) {
        navigate({
          to: "/login"
        });
        return;
      }
      const {
        data
      } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      const {
        data: appSettings
      } = await supabase.from("platform_settings").select("*").eq("id", 1).single();
      if (data?.role !== "admin" && appSettings?.maintenance_mode) {
        await supabase.auth.signOut();
        navigate({
          to: "/login"
        });
        return;
      }
      if (data) {
        setProfile({
          ...data,
          email_verified: !!user.email_confirmed_at
        });
      }
      if (appSettings) setSettings(appSettings);
      registerPushSubscription();
      profileChannel = supabase.channel(`profile_changes_${user.id}`).on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "profiles",
        filter: `id=eq.${user.id}`
      }, (payload) => {
        const newBalance = Number(payload.new?.balance || 0);
        setProfile((prev) => {
          const prevBal = Number(prev?.balance || 0);
          if (newBalance !== prevBal) {
            setBalanceFlash(true);
            setTimeout(() => setBalanceFlash(false), 1500);
            setLiveToast({
              show: true,
              amount: newBalance,
              prev: prevBal
            });
            setTimeout(() => setLiveToast(null), 5e3);
          }
          return {
            ...prev,
            ...payload.new
          };
        });
      }).subscribe();
    };
    fetchProfile();
    return () => {
      if (profileChannel) supabase.removeChannel(profileChannel);
    };
  }, [navigate]);
  const {
    transactions,
    hasFetched
  } = useTransactionStore();
  const prevStatuses = reactExports.useRef({});
  const isSeeded = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {
      });
    }
  }, []);
  reactExports.useEffect(() => {
    if (!hasFetched) return;
    if (!isSeeded.current) {
      transactions.forEach((tx) => {
        prevStatuses.current[tx.id] = tx.status;
      });
      isSeeded.current = true;
      return;
    }
    transactions.forEach((tx) => {
      const prev = prevStatuses.current[tx.id];
      const curr = tx.status;
      const isNewAdminAction = prev === void 0 && curr === "approved" && ["PROFIT", "BONUS", "ADJUSTMENT", "MANUAL DEPOSIT"].includes(tx.asset);
      const isStatusChange = prev !== void 0 && prev !== curr;
      if (isStatusChange || isNewAdminAction) {
        const amt = `$${Number(tx.amount).toLocaleString(void 0, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
        const asset = tx.asset || "";
        if (curr === "approved") {
          if (tx.asset === "PROFIT") notifyDepositApproved(amt, "Profit");
          else if (tx.asset === "BONUS") notifyDepositApproved(amt, "Bonus");
          else if (tx.type === "deposit") notifyDepositApproved(amt, asset);
          else if (tx.type === "withdrawal") notifyWithdrawalApproved(amt, asset);
        } else if (curr === "rejected") {
          if (tx.type === "deposit") notifyDepositRejected(amt, asset);
          else if (tx.type === "withdrawal") notifyWithdrawalRejected(amt, asset);
        }
      }
      prevStatuses.current[tx.id] = curr;
    });
  }, [transactions]);
  profile?.id ? transactions.filter((t) => t.userId === profile.id) : [];
  const [showLogoutConfirm, setShowLogoutConfirm] = reactExports.useState(false);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({
      to: "/login"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-[#f0f4ff] font-['Inter'] selection:bg-[#13c74b]/30 pb-24 md:pb-0 md:pl-[280px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showLogoutConfirm, onOpenChange: setShowLogoutConfirm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "bg-[#06120b] border border-white/10 text-white rounded-2xl shadow-2xl max-w-[400px] p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-2xl font-['Outfit'] font-bold mb-1", children: "Confirm Logout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-gray-400 text-[15px] leading-relaxed", children: "Are you sure you want to securely log out of your XHoldings account? You will need to re-enter your credentials to access your portfolio." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-8 gap-3 sm:gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "bg-transparent text-white border-white/10 hover:bg-white/5 rounded-xl py-6 transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleLogout, className: "bg-red-500 hover:bg-red-600 text-white border-none rounded-xl py-6 font-bold transition-all", children: "Log out" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex flex-col w-[280px] fixed top-0 left-0 h-screen bg-black p-6 z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-10 px-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-[1.5px] border-[#13c74b] flex items-center justify-center font-bold text-[#13c74b] rotate-45 text-[10px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[22px] tracking-tight text-white font-['Inter']", children: "XHoldings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 grow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("home"), className: `flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === "home" ? "bg-[#1a221d] text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-[22px] h-[22px]" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Portfolio" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("invest"), className: `flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === "invest" ? "bg-[#1a221d] text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-[22px] h-[22px]" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Markets" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("copytrade"), className: `flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === "copytrade" ? "bg-[#1a221d] text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-[22px] h-[22px]" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Copy Trading" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("wallet"), className: `flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === "wallet" ? "bg-[#1a221d] text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-[22px] h-[22px]" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Deposit / Withdraw" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("history"), className: `flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === "history" ? "bg-[#1a221d] text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-[22px] h-[22px]" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Transactions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("settings"), className: `flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors ${activeTab === "settings" ? "bg-[#1a221d] text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-[22px] h-[22px]" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Settings" })
        ] }),
        profile?.role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors mt-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-[22px] h-[22px]" }),
          " SuperAdmin"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowLogoutConfirm(true), className: "flex items-center gap-4 px-4 py-3.5 rounded-full transition-colors mt-auto text-gray-500 hover:bg-red-500/10 hover:text-red-400 group font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-[22px] h-[22px] group-hover:text-red-400" }),
          " Logout"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 flex md:hidden items-center justify-between px-6 py-4 bg-black/95 backdrop-blur-md z-40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-[1.5px] border-[#13c74b] flex items-center justify-center font-bold text-[#13c74b] rotate-45 text-[10px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-rotate-45", children: "X" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-lg tracking-tight text-white font-['Inter']", children: "XHoldings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "w-full mx-auto px-4 py-4 md:px-10 md:py-8 relative z-10 flex-1 min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "hidden md:flex items-center justify-end gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-[#1a221d] hover:bg-white/10 transition-colors ml-2", onClick: () => setActiveTab("profile"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#ea580c] flex items-center justify-center text-white font-bold text-sm uppercase", children: profile?.name ? profile.name.charAt(0) : "U" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white font-medium ml-1 truncate max-w-[140px]", children: profile?.name || "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-gray-400 ml-1" })
        ] })
      ] }),
      activeTab === "home" && /* @__PURE__ */ jsxRuntimeExports.jsx(HomeTab, { setActiveTab, profile, balanceFlash }),
      activeTab === "invest" && /* @__PURE__ */ jsxRuntimeExports.jsx(InvestTab, { profile }),
      activeTab === "copytrade" && /* @__PURE__ */ jsxRuntimeExports.jsx(CopyTradeTab, { profile }),
      activeTab === "wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx(WalletTab, { profile, settings }),
      activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionsTab, { profile }),
      activeTab === "rewards" && /* @__PURE__ */ jsxRuntimeExports.jsx(RewardsTab, { profile, setActiveTab }),
      activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { profile, setActiveTab }),
      activeTab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { profile, setActiveTab })
    ] }),
    liveToast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-28 md:bottom-8 right-4 md:right-8 z-[9999] animate-in slide-in-from-bottom-4 fade-in duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#06120b] border border-[#13c74b]/40 rounded-2xl shadow-[0_8px_32px_rgba(19,199,75,0.2)] p-4 min-w-[280px] max-w-[340px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#13c74b]/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-[#13c74b]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-bold text-white mb-0.5", children: "Balance Updated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-400", children: liveToast.amount > liveToast.prev ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#13c74b] font-semibold", children: [
          "+$",
          (liveToast.amount - liveToast.prev).toLocaleString(void 0, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }),
          " credited"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400 font-semibold", children: [
          "-$",
          (liveToast.prev - liveToast.amount).toLocaleString(void 0, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }),
          " debited"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-gray-500 mt-1", children: [
          "New balance: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-semibold", children: [
            "$",
            liveToast.amount.toLocaleString(void 0, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLiveToast(null), className: "text-gray-600 hover:text-white mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden fixed bottom-0 left-0 w-full bg-[#050806]/95 backdrop-blur-lg px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-3 flex justify-around items-center z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("home"), className: `flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === "home" ? "text-white" : "text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: `w-6 h-6 ${activeTab === "home" ? "fill-current" : ""}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("invest"), className: `flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === "invest" ? "text-white" : "text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: `w-6 h-6 ${activeTab === "invest" ? "text-white" : ""}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("copytrade"), className: `flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === "copytrade" ? "text-white" : "text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: `w-6 h-6 ${activeTab === "copytrade" ? "fill-current" : ""}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("wallet"), className: `flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === "wallet" ? "text-white" : "text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: `w-6 h-6 ${activeTab === "wallet" ? "fill-current" : ""}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("settings"), className: `flex flex-col items-center gap-1 transition-all duration-300 py-1 ${activeTab === "settings" ? "text-white" : "text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: `w-6 h-6 ${activeTab === "settings" ? "fill-current" : ""}` }) })
    ] })
  ] });
}
function CopyTradeTab({
  profile
}) {
  const {
    investments
  } = useInvestmentStore();
  const [traders, setTraders] = reactExports.useState([]);
  const [mySubs, setMySubs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [copying, setCopying] = reactExports.useState(false);
  const [selectedTrader, setSelectedTrader] = reactExports.useState(null);
  const [amount, setAmount] = reactExports.useState("");
  const [alertState, setAlertState] = reactExports.useState({
    open: false,
    title: "",
    message: ""
  });
  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = Math.floor((Date.now() - new Date(inv.created_at).getTime()) / (1e3 * 60 * 60 * 24));
    return acc + inv.amount * inv.daily_roi * Math.max(0, daysPassed);
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);
  const fetchCopyData = async () => {
    if (!profile) return;
    setLoading(true);
    const {
      data: t
    } = await supabase.from("master_traders").select("*").eq("is_active", true);
    setTraders(t || []);
    const {
      data: s
    } = await supabase.from("copy_trading_subscriptions").select("*, master_traders(*)").eq("user_id", profile.id).eq("status", "active");
    setMySubs(s || []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchCopyData();
  }, [profile]);
  const showAlert = (title, message) => {
    setAlertState({
      open: true,
      title,
      message
    });
  };
  const handleCopy = async () => {
    if (!selectedTrader || !amount || amount <= 0) return;
    if (amount > totalBalance) {
      showAlert("Insufficient Funds", "You do not have enough available balance to copy this trader.");
      return;
    }
    setCopying(true);
    const currentBaseBalance = Number(profile?.balance || 0);
    const deficit = amount > currentBaseBalance ? amount - currentBaseBalance : 0;
    if (deficit > 0) {
      await supabase.rpc("increment_balance", {
        p_user_id: profile.id,
        p_amount: deficit
      });
    }
    const {
      error: insertError
    } = await supabase.from("copy_trading_subscriptions").insert({
      user_id: profile.id,
      master_trader_id: selectedTrader.id,
      amount: Number(amount),
      status: "active"
    });
    if (insertError) {
      if (deficit > 0) {
        await supabase.rpc("increment_balance", {
          p_user_id: profile.id,
          p_amount: -deficit
        });
      }
      showAlert("Error", "Could not start copy trading: " + (insertError?.message || "Unknown error"));
      setCopying(false);
      return;
    }
    const totalDeduction = Number(amount) + deficit;
    await supabase.rpc("increment_balance", {
      p_user_id: profile.id,
      p_amount: -totalDeduction
    });
    await supabase.from("master_traders").update({
      followers_count: selectedTrader.followers_count + 1
    }).eq("id", selectedTrader.id);
    showAlert("Success!", `You are now successfully copying ${selectedTrader.name}!`);
    setSelectedTrader(null);
    setAmount("");
    fetchCopyData();
    if (profile) profile.balance = Number(profile.balance) - Number(amount);
    setCopying(false);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-xs", children: "Loading Copy Trading..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6 flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: alertState.open, onOpenChange: (open) => setAlertState((prev) => ({
      ...prev,
      open
    })), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "bg-[#131714] border border-white/5 text-white rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl font-bold", children: alertState.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-gray-400", children: alertState.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => setAlertState((prev) => ({
        ...prev,
        open: false
      })), className: "bg-[#13c74b] text-black hover:bg-[#10a13c] rounded-full px-6 font-bold", children: "Okay" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl md:text-2xl text-white font-bold hidden md:block", children: "Copy Trading" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-6 md:p-8 rounded-3xl relative overflow-hidden mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[28px] md:text-[32px] text-white font-bold mb-3 tracking-tight", children: "Top Master Traders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Automatically mirror the trades of our top-performing algorithmic portfolios and expert traders." })
      ] }),
      mySubs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm text-[#13c74b] font-bold uppercase tracking-widest mb-4", children: "Your Active Copies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: mySubs.map((sub) => {
          const pnl = Number(sub.total_pnl || 0);
          const isProfit = pnl >= 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 bg-[#131714] border border-white/5 rounded-2xl relative overflow-hidden`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4 relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 font-medium mb-1", children: "Copying" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg text-white font-bold", children: sub.master_traders?.name || "Unknown" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-full ${isProfit ? "bg-[#13c74b]/10" : "bg-red-500/10"} flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: `w-5 h-5 ${isProfit ? "text-[#13c74b]" : "text-red-400"}` }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 relative z-10 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 font-medium mb-1", children: "Invested" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-white font-bold", children: [
                  "$",
                  Number(sub.amount).toLocaleString(void 0, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 font-medium mb-1", children: "Profit/Loss" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-lg font-bold ${isProfit ? "text-[#13c74b]" : "text-red-400"}`, children: [
                  isProfit ? "+" : "",
                  "$",
                  pnl.toLocaleString(void 0, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end relative z-10 pt-4 border-t border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 font-medium mb-1", children: "Current Equity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[15px] text-white font-bold", children: [
                  "$",
                  (Number(sub.amount) + pnl).toLocaleString(void 0, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-[#13c74b] uppercase tracking-widest font-bold bg-[#13c74b]/10 px-2 py-1 rounded-full", children: "Active" }) })
            ] })
          ] }, sub.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5", children: traders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full py-12 text-center text-gray-500 border border-white/5 bg-[#131714] rounded-2xl", children: "No master traders available at the moment." }) : traders.map((trader) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#131714] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-[#13c74b]/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 grow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-white/5 flex items-center justify-center overflow-hidden", children: trader.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: trader.avatar_url, alt: trader.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-gray-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[17px] text-white font-bold leading-tight", children: trader.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] text-gray-400 mt-1", children: [
                trader.followers_count,
                " Followers"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-400 leading-relaxed mb-6 line-clamp-2 min-h-[40px]", children: trader.description || "Professional quantitative trader." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-4 bg-[#1a1f1c]/50 rounded-2xl border border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 font-medium", children: "Win Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-bold", children: [
                Number(trader.win_rate).toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs pt-2 border-t border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 font-medium", children: "Total PnL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-bold ${Number(trader.total_pnl) >= 0 ? "text-[#13c74b]" : "text-red-400"}`, children: [
                Number(trader.total_pnl) >= 0 ? "+" : "",
                "$",
                Number(trader.total_pnl).toLocaleString(void 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs pt-2 border-t border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 font-medium", children: "ROI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-bold ${Number(trader.roi) >= 0 ? "text-[#13c74b]" : "text-red-400"}`, children: [
                Number(trader.roi) >= 0 ? "+" : "",
                Number(trader.roi).toFixed(1),
                "%"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-white/5 bg-white/1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedTrader(trader), className: "w-full py-3 bg-white/5 hover:bg-[#13c74b] text-white hover:text-black transition-colors rounded-full text-[13px] font-bold", children: "Copy Trader" }) })
      ] }, trader.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedTrader, onOpenChange: (open) => !open && setSelectedTrader(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "bg-[#131714] border border-white/10 text-white sm:max-w-md rounded-3xl p-0 overflow-hidden", children: selectedTrader && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/5 border-[3px] border-[#13c74b] flex items-center justify-center mb-4 overflow-hidden", children: selectedTrader.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedTrader.avatar_url, alt: selectedTrader.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-[#13c74b]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl text-white font-bold mb-1", children: selectedTrader.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] text-[#13c74b] font-bold bg-[#13c74b]/10 px-3 py-1 rounded-full", children: [
            "Win Rate: ",
            Number(selectedTrader.win_rate).toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 font-medium block", children: "Copy Amount ($)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
                "Available: $",
                Number(totalBalance).toLocaleString(void 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl", children: "$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(Number(e.target.value)), placeholder: "0.00", className: "w-full bg-[#1a1f1c] border border-white/5 text-white pl-10 pr-4 py-4 rounded-2xl focus:outline-none focus:border-[#13c74b]/50 transition-colors text-xl font-bold placeholder-gray-600" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-[#1a1f1c] border border-white/5 rounded-2xl text-[13px] text-gray-400 leading-relaxed flex gap-3 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-[#13c74b] shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "By copying this trader, your portfolio will automatically mirror their market positions. The amount you specify will be dedicated to their strategy. You can withdraw your copy funds at any time." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 p-6 pt-0 bg-[#131714]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedTrader(null), className: "flex-1 py-4 bg-transparent border border-white/10 text-white hover:bg-white/5 rounded-full text-sm font-bold transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: copying, onClick: handleCopy, className: "flex-1 py-4 bg-[#13c74b] text-black hover:bg-[#10a13c] rounded-full text-sm font-bold transition-colors shadow-[0_0_20px_rgba(19,199,75,0.2)]", children: copying ? "Processing..." : "Confirm Copy" })
      ] })
    ] }) }) })
  ] });
}
function HomeTab({
  setActiveTab,
  profile,
  balanceFlash
}) {
  useTransactionStore();
  const {
    investments
  } = useInvestmentStore();
  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = Math.floor((Date.now() - new Date(inv.created_at).getTime()) / (1e3 * 60 * 60 * 24));
    return acc + inv.amount * inv.daily_roi * Math.max(0, daysPassed);
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);
  const totalInvested = investments.reduce((acc, inv) => acc + Number(inv.amount), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in fade-in duration-500 w-full mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#131714] rounded-[24px] overflow-hidden", children: [
    profile?.is_verified || profile?.email_verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/5 bg-[#13c74b]/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-[#13c74b]/20 rounded-lg flex items-center justify-center relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-7 h-7 text-[#13c74b] relative z-10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg", children: "Account Verified" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#13c74b] text-sm font-medium", children: "Your account has full access" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 bg-[#13c74b]/10 text-[#13c74b] font-bold rounded-full text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
        " Verified"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-14 h-14 bg-[#2a171c] rounded-lg flex items-center justify-center relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#ff6b6b] absolute -top-2 -right-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-[#ff6b6b] relative z-10" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg", children: "Verify your account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Verify your account to unlock full access" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-6 py-2.5 bg-[#13c74b] hover:bg-[#10a13c] transition-colors text-black font-bold rounded-full text-sm", children: "Verify" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-[15px] mb-2", children: [
          "Total Balance ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 cursor-pointer hover:text-white" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[40px] md:text-[52px] font-bold tracking-tight leading-none transition-colors duration-700 ${balanceFlash ? "text-[#13c74b]" : "text-white"}`, style: balanceFlash ? {
          textShadow: "0 0 30px rgba(19,199,75,0.5)"
        } : {}, children: [
          "$",
          totalBalance.toLocaleString(void 0, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        ] }),
        balanceFlash && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[12px] text-[#13c74b] font-semibold animate-pulse", children: "● Live update received" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-3 sm:gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center gap-2.5 group", onClick: () => setActiveTab("invest"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[#13c74b] flex items-center justify-center group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-6 h-6 text-black" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-[#13c74b]", children: "Trade" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center gap-2.5 group", onClick: () => setActiveTab("wallet"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[#1a221d] flex items-center justify-center group-hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-white", children: "Deposit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center gap-2.5 group", onClick: () => setActiveTab("wallet"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[#1a221d] flex items-center justify-center group-hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-6 h-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-white", children: "Send" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center gap-2.5 group", onClick: () => setActiveTab("profile"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[#1a221d] flex items-center justify-center group-hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-6 h-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-white", children: "More" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 mb-3 font-semibold px-2", children: "Savings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a221d] rounded-2xl p-5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors", onClick: () => setActiveTab("invest"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[52px] h-[52px] bg-[#0e1611] border border-[#13c74b]/20 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-7 h-7 text-[#13c74b]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-bold text-[17px] mb-0.5", children: "Your money. Working daily" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-[14px]", children: "Daily returns in USD. Flexible or fixed savings" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-gray-500" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0a0e0b] rounded-full p-1.5 flex mb-8 max-w-[400px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 py-2.5 bg-[#1a221d] text-[#13c74b] font-bold rounded-full text-[14px]", children: "Cash" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 py-2.5 text-gray-400 font-bold rounded-full text-[14px] hover:text-white transition-colors", onClick: () => setActiveTab("invest"), children: "Crypto" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left min-w-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-gray-400 text-[13px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 font-normal px-4", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 font-normal text-right md:text-left", children: "Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 font-normal hidden md:table-cell", children: "Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-4 w-10" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5 hover:bg-white/2 transition-colors cursor-pointer group", onClick: () => setActiveTab("wallet"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-[#13c74b] flex items-center justify-center text-black font-bold text-[14px]", children: "USD" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-[16px]", children: "USD" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-[14px]", children: "US Dollar" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 text-right md:text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white font-bold text-[16px]", children: [
              "$",
              totalBalance.toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white font-bold text-[16px]", children: [
              "$",
              totalBalance.toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 text-right pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-6 h-6 text-gray-500 group-hover:text-white transition-colors" }) })
          ] }),
          totalInvested > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5 hover:bg-white/2 transition-colors cursor-pointer group", onClick: () => setActiveTab("invest"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-[#13c74b]/20 flex items-center justify-center text-[#13c74b] font-bold text-[14px]", children: "INV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-[16px]", children: "Investments" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-[14px]", children: "Active Plans" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 text-right md:text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white font-bold text-[16px]", children: [
              "$",
              totalInvested.toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white font-bold text-[16px]", children: [
              "$",
              totalInvested.toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-5 text-right pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-6 h-6 text-gray-500 group-hover:text-white transition-colors" }) })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function InvestTab({
  profile
}) {
  const {
    investments
  } = useInvestmentStore();
  const [amount, setAmount] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [alertState, setAlertState] = reactExports.useState({
    open: false,
    title: "",
    message: ""
  });
  const [plans, setPlans] = reactExports.useState([]);
  const [selectedPlan, setSelectedPlan] = reactExports.useState(null);
  const [loadingPlans, setLoadingPlans] = reactExports.useState(true);
  const [fetchError, setFetchError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      setFetchError(null);
      const {
        data,
        error
      } = await supabase.from("investment_plans").select("*").eq("is_active", true).order("min_amount", {
        ascending: true
      });
      if (error) {
        console.error("Error fetching investment plans:", error);
        setFetchError(error.message);
      } else if (data) {
        setPlans(data);
        if (data.length > 0) {
          setSelectedPlan(data[0]);
        }
      }
      setLoadingPlans(false);
    };
    fetchPlans();
  }, []);
  const getNormalizedRoi = (plan) => {
    if (!plan) return 0;
    const roi = Number(plan.daily_roi);
    return roi > 0.5 ? roi / 100 : roi;
  };
  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1e3 * 60 * 60 * 24);
    return acc + inv.amount * inv.daily_roi * Math.max(0, daysPassed);
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);
  const showAlert = (title, message) => {
    setAlertState({
      open: true,
      title,
      message
    });
  };
  const dailyROI = amount && selectedPlan ? (Number(amount) * getNormalizedRoi(selectedPlan)).toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : "0.00";
  const profit = amount && selectedPlan ? (Number(amount) * getNormalizedRoi(selectedPlan) * selectedPlan.duration_days).toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : "0.00";
  const totalReturn = amount && selectedPlan ? (Number(amount) * getNormalizedRoi(selectedPlan) * selectedPlan.duration_days + Number(amount)).toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : "0.00";
  const handleInvest = async () => {
    if (!selectedPlan) return;
    if (!amount || amount <= 0) return;
    if (amount > totalBalance) {
      showAlert("Insufficient Balance", "You cannot invest more than your available total balance.");
      return;
    }
    if (amount < Number(selectedPlan.min_amount)) {
      showAlert("Minimum Investment Required", `The minimum investment amount for this plan is $${Number(selectedPlan.min_amount).toLocaleString(void 0, {
        minimumFractionDigits: 2
      })}.`);
      return;
    }
    if (selectedPlan.max_amount && amount > Number(selectedPlan.max_amount)) {
      showAlert("Maximum Investment Exceeded", `The maximum investment amount for this plan is $${Number(selectedPlan.max_amount).toLocaleString(void 0, {
        minimumFractionDigits: 2
      })}.`);
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.rpc("create_investment", {
      p_plan_name: selectedPlan.name,
      p_amount: amount,
      p_daily_roi: getNormalizedRoi(selectedPlan),
      p_duration: selectedPlan.duration_days
    });
    setLoading(false);
    if (error) {
      showAlert("Investment Failed", error.message);
    } else {
      showAlert("Investment Successful", `Your investment in ${selectedPlan.name} has been activated. You will start earning daily returns.`);
      setAmount("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6 flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: alertState.open, onOpenChange: (open) => setAlertState((prev) => ({
      ...prev,
      open
    })), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "bg-[#131714] border border-white/5 text-white rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl font-bold", children: alertState.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-gray-400", children: alertState.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => setAlertState((prev) => ({
        ...prev,
        open: false
      })), className: "bg-[#13c74b] text-black hover:bg-[#10a13c] rounded-full px-6 font-bold", children: "Okay" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl md:text-2xl text-white font-bold hidden md:block", children: "Markets" }) }),
    loadingPlans ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-12 rounded-3xl flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-[#13c74b] border-t-transparent rounded-full animate-spin" }) }) : plans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-12 rounded-3xl flex flex-col items-center justify-center text-gray-500 text-center min-h-[300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-12 h-12 mb-4 opacity-20 text-[#13c74b]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg mb-2", children: "No Active Plans" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: fetchError ? `Database error: ${fetchError}` : "There are no active investment plans available right now." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300", children: plans.map((p) => {
        const isSelected = selectedPlan?.id === p.id;
        const normalizedRoi = getNormalizedRoi(p);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedPlan(p), className: `text-left p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[180px] ${isSelected ? "bg-[#13c74b]/10 border-[#13c74b] shadow-[0_0_20px_rgba(19,199,75,0.1)]" : "bg-[#131714] border-white/5 hover:border-[#13c74b]/30 hover:bg-[#1a1f1c]"}`, children: [
          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 bg-[#13c74b] text-black w-5 h-5 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 stroke-[3]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-2 pr-6 truncate", children: p.name }),
            p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gray-400 line-clamp-2 mb-4 font-medium leading-relaxed", children: p.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mt-auto pt-3 border-t border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5", children: "Daily ROI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[14px] text-[#13c74b] font-bold", children: [
                (normalizedRoi * 100).toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5", children: "Duration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[14px] text-white font-bold", children: [
                p.duration_days,
                " Days"
              ] })
            ] })
          ] })
        ] }, p.id);
      }) }),
      selectedPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-6 md:p-8 rounded-3xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[28px] md:text-[32px] text-white font-bold mb-3 tracking-tight", children: selectedPlan.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-[12px] font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-[#13c74b]/10 text-[#13c74b] px-3 py-1.5 rounded-full", children: [
                (getNormalizedRoi(selectedPlan) * 100).toFixed(1),
                "% Daily ROI"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/5 text-gray-300 px-3 py-1.5 rounded-full", children: [
                selectedPlan.duration_days,
                " Days Duration"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/5 text-gray-300 px-3 py-1.5 flex items-center gap-1.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-[#13c74b]" }),
                " Verified Asset"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right w-full md:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 font-medium mb-1", children: "Available Balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl text-white font-bold", children: [
              "$",
              totalBalance.toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 font-medium mb-2 block", children: "Investment Amount ($)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl", children: "$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value === "" ? "" : Number(e.target.value)), placeholder: "0.00", className: "w-full bg-[#131714] border border-white/5 text-white pl-10 pr-4 py-4 rounded-2xl focus:outline-none focus:border-[#13c74b]/50 transition-colors text-xl font-bold placeholder-gray-600" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 mt-2 font-medium", children: [
              "Min. investment: $",
              Number(selectedPlan.min_amount).toLocaleString(),
              " ",
              selectedPlan.max_amount && `· Max. investment: $${Number(selectedPlan.max_amount).toLocaleString()}`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#131714] rounded-2xl p-4 overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Daily ROI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-[#13c74b] font-bold truncate", title: `+$${dailyROI}`, children: [
                "+$",
                dailyROI
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#131714] rounded-2xl p-4 overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Duration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-white font-bold truncate", children: [
                selectedPlan.duration_days,
                " Days"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#131714] rounded-2xl p-4 overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Total Profit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-[#13c74b] font-bold truncate", title: `$${profit}`, children: [
                "$",
                profit
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#131714] rounded-2xl p-4 overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Total Return" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-white font-bold truncate", title: `$${totalReturn}`, children: [
                "$",
                totalReturn
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: loading, onClick: handleInvest, className: "w-full bg-[#13c74b] hover:bg-[#10a83f] text-black py-4 font-bold text-[15px] transition-colors rounded-full flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(19,199,75,0.2)]", children: [
            loading ? "Processing..." : "Confirm Investment",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
          ] })
        ] })
      ] })
    ] }),
    investments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl text-white font-bold mb-6", children: "Active Investments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: investments.map((inv, idx) => {
        const daysPassed = (Date.now() - new Date(inv.created_at).getTime()) / (1e3 * 60 * 60 * 24);
        const validDays = Math.max(0, Math.min(daysPassed, inv.duration_days || 60));
        const earned = inv.amount * inv.daily_roi * validDays;
        const progress = Math.min(100, validDays / (inv.duration_days || 60) * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 w-32 h-32 bg-[#13c74b] opacity-5 blur-[60px] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#13c74b] text-[12px] font-bold uppercase tracking-widest mb-1", children: "Active Plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl text-white font-bold", children: inv.plan_name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-[#13c74b] animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-300 font-medium", children: "Running" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Principal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-white font-bold", children: [
                "$",
                inv.amount.toLocaleString(void 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Daily ROI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-[#13c74b] font-bold", children: [
                (inv.daily_roi * 100).toFixed(1),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Earned Profit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl text-[#13c74b] font-bold", children: [
                  "+$",
                  earned.toLocaleString(void 0, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mb-1", children: "Duration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-white font-bold", children: [
                  Math.floor(validDays),
                  " / ",
                  inv.duration_days || 60,
                  " Days"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-[#131714] h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-linear-to-r from-[#13c74b]/50 to-[#13c74b] rounded-full relative", style: {
              width: `${progress}%`
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px] animate-[shimmer_2s_linear_infinite]" }) }) })
          ] })
        ] }, idx);
      }) })
    ] })
  ] });
}
function CryptoSelector({
  focusColor,
  value,
  onChange,
  cryptoPrices,
  pricesLoading
}) {
  const {
    cryptos
  } = useCryptoStore();
  const activeCryptos = cryptos.filter((c) => c.active);
  const [open, setOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const selectedCryptoData = activeCryptos.find((c) => c.id === value);
  const filteredCryptos = activeCryptos.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `w-full flex items-center justify-between bg-[#06120b] border border-white/5 text-white p-3.5 h-auto rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-transparent ${focusColor} hover:bg-white/5 transition-colors shadow-none`, children: [
      selectedCryptoData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full border border-white/5 flex items-center justify-center text-[10px] font-bold shrink-0 overflow-hidden", style: !getCryptoLogo(selectedCryptoData.id) ? {
          backgroundColor: `${selectedCryptoData.color}15`,
          color: selectedCryptoData.color
        } : {}, children: getCryptoLogo(selectedCryptoData.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getCryptoLogo(selectedCryptoData.id), alt: selectedCryptoData.name, className: "w-full h-full object-cover p-0.5" }) : (selectedCryptoData.symbol || "?").substring(0, 1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold leading-tight mb-0.5", children: selectedCryptoData.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-gray-400 font-medium leading-tight", children: [
            selectedCryptoData.symbol,
            " · ",
            selectedCryptoData.network
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-sm", children: "Select Crypto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        selectedCryptoData && cryptoPrices && !pricesLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-[#13c74b] font-bold", children: [
          "$",
          (cryptoPrices[selectedCryptoData.symbol.toUpperCase()] || 0).toLocaleString(void 0, {
            maximumFractionDigits: 2
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 opacity-50 shrink-0" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 bg-[#131714] border-white/5 text-white rounded-xl shadow-xl shadow-black/50", align: "start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-3 border-b border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-gray-500 mr-2 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name or symbol...", className: "w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 py-3 placeholder:text-gray-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[320px] overflow-y-auto p-1 custom-scrollbar", children: filteredCryptos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-sm text-gray-500", children: "No assets found." }) : filteredCryptos.map((crypto) => {
        const logo = getCryptoLogo(crypto.id);
        const isSelected = value === crypto.id;
        const price = cryptoPrices?.[crypto.symbol.toUpperCase()];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          onChange?.(crypto.id);
          setOpen(false);
          setSearchQuery("");
        }, className: `w-full flex items-center justify-between cursor-pointer p-3 rounded-lg my-0.5 transition-colors ${isSelected ? "bg-[#13c74b]/10 border border-[#13c74b]/20" : "hover:bg-white/5"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-[11px] font-bold shrink-0 overflow-hidden", style: !logo ? {
              backgroundColor: `${crypto.color}15`,
              color: crypto.color
            } : {}, children: logo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: crypto.name, className: "w-full h-full object-cover p-0.5" }) : (crypto.symbol || "?").substring(0, 2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold leading-tight text-white", children: crypto.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-gray-500 font-medium", children: [
                crypto.symbol,
                " · ",
                crypto.network
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5", children: [
            price && !pricesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] text-white font-bold", children: [
              "$",
              price.toLocaleString(void 0, {
                maximumFractionDigits: 2
              })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-600", children: "—" }),
            isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-[#13c74b]" })
          ] })
        ] }, crypto.id);
      }) })
    ] })
  ] });
}
const COINGECKO_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  XRP: "ripple",
  USDT: "tether",
  USDC: "usd-coin",
  BNB: "binancecoin",
  ADA: "cardano",
  DOGE: "dogecoin",
  LTC: "litecoin",
  DOT: "polkadot",
  MATIC: "matic-network",
  AVAX: "avalanche-2",
  LINK: "chainlink",
  UNI: "uniswap",
  TRX: "tron",
  TON: "the-open-network",
  SHIB: "shiba-inu",
  XLM: "stellar",
  XMR: "monero"
};
function WalletTab({
  profile,
  settings
}) {
  const [mode, setMode] = reactExports.useState("deposit");
  const [copied, setCopied] = reactExports.useState(false);
  const [selectedAsset, setSelectedAsset] = reactExports.useState("btc");
  const [usdAmount, setUsdAmount] = reactExports.useState("");
  const [txid, setTxid] = reactExports.useState("");
  const [cryptoPrices, setCryptoPrices] = reactExports.useState({});
  const [pricesLoading, setPricesLoading] = reactExports.useState(true);
  const {
    addTransaction,
    transactions
  } = useTransactionStore();
  const {
    cryptos
  } = useCryptoStore();
  const {
    investments
  } = useInvestmentStore();
  [...transactions].sort((a, b) => b.timestamp - a.timestamp);
  const selectedCryptoData = cryptos.find((c) => c.id === selectedAsset) || cryptos[0];
  reactExports.useEffect(() => {
    const fetchPrices = async () => {
      try {
        setPricesLoading(true);
        const ids = Object.values(COINGECKO_IDS).join(",");
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        const data = await res.json();
        const prices = {};
        Object.entries(COINGECKO_IDS).forEach(([symbol, id]) => {
          if (data[id]?.usd) prices[symbol] = data[id].usd;
        });
        setCryptoPrices(prices);
      } catch (e) {
        console.error("Price fetch failed:", e);
      } finally {
        setPricesLoading(false);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 6e4);
    return () => clearInterval(interval);
  }, []);
  const selectedSymbol = selectedCryptoData?.symbol?.toUpperCase() || "";
  const selectedPrice = cryptoPrices[selectedSymbol] || null;
  const usdAmountNum = parseFloat(usdAmount) || 0;
  const cryptoEquivalent = selectedPrice && usdAmountNum > 0 ? selectedSymbol === "USDT" || selectedSymbol === "USDC" ? usdAmountNum : usdAmountNum / selectedPrice : null;
  const roiEarned = investments.reduce((acc, inv) => {
    const daysPassed = Math.floor((Date.now() - new Date(inv.created_at).getTime()) / (1e3 * 60 * 60 * 24));
    return acc + inv.amount * inv.daily_roi * Math.max(0, daysPassed);
  }, 0);
  const totalBalance = Number(profile?.balance || 0) + roiEarned + Number(profile?.total_earned_referrals || 0);
  const handleCopy = (text) => {
    if (text) navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const [screenshotFile, setScreenshotFile] = reactExports.useState(null);
  const [withdrawAddress, setWithdrawAddress] = reactExports.useState("");
  const [depositLoading, setDepositLoading] = reactExports.useState(false);
  const [withdrawLoading, setWithdrawLoading] = reactExports.useState(false);
  const [alertState, setAlertState] = reactExports.useState({
    open: false,
    title: "",
    message: "",
    type: "info"
  });
  const showModal = (title, message, type = "info") => {
    setAlertState({
      open: true,
      title,
      message,
      type
    });
  };
  const handleDepositSubmit = async () => {
    if (!usdAmount || !screenshotFile) {
      showModal("Missing Information", "Please enter the amount and upload a screenshot as proof of payment.", "error");
      return;
    }
    const parsedUsd = parseFloat(usdAmount);
    if (isNaN(parsedUsd) || parsedUsd <= 0) {
      showModal("Invalid Amount", "Please enter a valid USD amount greater than zero.", "error");
      return;
    }
    setDepositLoading(true);
    let screenshotUrl = "";
    try {
      const fileExt = screenshotFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const {
        data,
        error
      } = await supabase.storage.from("images").upload(fileName, screenshotFile);
      if (error) throw error;
      const {
        data: signedData,
        error: signedError
      } = await supabase.storage.from("images").createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10);
      if (signedError) throw signedError;
      screenshotUrl = signedData.signedUrl;
    } catch (err) {
      console.error("Upload error:", err);
      showModal("Upload Failed", "There was an error uploading your screenshot. Please try again.", "error");
      setDepositLoading(false);
      return;
    }
    const sym = selectedCryptoData?.symbol?.toUpperCase() || "";
    const livePrice = cryptoPrices[sym];
    const cryptoAmt = livePrice ? parsedUsd / livePrice : parsedUsd;
    const cryptoDisplay = livePrice ? `${cryptoAmt.toFixed(6)} ${sym}` : `${parsedUsd.toFixed(2)} ${sym}`;
    await addTransaction({
      type: "deposit",
      amount: parsedUsd,
      asset: `(${cryptoDisplay})`,
      txid,
      screenshotUrl
    });
    setDepositLoading(false);
    setUsdAmount("");
    setTxid("");
    setScreenshotFile(null);
    showModal("Deposit Submitted!", `Your deposit of $${parsedUsd.toLocaleString(void 0, {
      minimumFractionDigits: 2
    })} (${cryptoDisplay}) has been submitted. Our team will verify and credit your balance within 24 hours.`, "deposit");
  };
  const handleWithdrawSubmit = async () => {
    if (settings?.withdrawals_halted) {
      showModal("Withdrawals Halted", "Withdrawals are temporarily suspended due to network maintenance. Please try again later.", "error");
      return;
    }
    if (!usdAmount || !withdrawAddress) {
      showModal("Missing Information", "Please enter both the amount and your receiving wallet address.", "error");
      return;
    }
    const parsedUsd = parseFloat(usdAmount);
    if (isNaN(parsedUsd) || parsedUsd <= 0) {
      showModal("Invalid Amount", "Please enter a valid USD amount greater than zero.", "error");
      return;
    }
    if (parsedUsd > totalBalance) {
      showModal("Insufficient Funds", `You do not have enough available balance for this withdrawal. (Requested: $${parsedUsd.toLocaleString(void 0, {
        maximumFractionDigits: 2
      })})`, "error");
      return;
    }
    const sym = selectedCryptoData?.symbol?.toUpperCase() || "";
    const livePrice = cryptoPrices[sym];
    const cryptoAmt = livePrice ? parsedUsd / livePrice : parsedUsd;
    const cryptoDisplay = livePrice ? `${cryptoAmt.toFixed(6)} ${sym}` : `${parsedUsd.toFixed(2)} ${sym}`;
    setWithdrawLoading(true);
    await addTransaction({
      type: "withdrawal",
      amount: parsedUsd,
      asset: `(${cryptoDisplay})`,
      txid: withdrawAddress
    });
    setWithdrawLoading(false);
    setUsdAmount("");
    setWithdrawAddress("");
    showModal("Withdrawal Requested!", `Your withdrawal of $${parsedUsd.toLocaleString(void 0, {
      minimumFractionDigits: 2
    })} (${cryptoDisplay}) has been submitted and is pending approval.`, "withdrawal");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: alertState.open, onOpenChange: (open) => setAlertState((prev) => ({
      ...prev,
      open
    })), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-[#0a0f1c] border border-white/10 text-white p-0 overflow-hidden max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 w-full ${alertState.type === "deposit" ? "bg-linear-to-r from-[#c9a84c] to-[#f0d080]" : alertState.type === "withdrawal" ? "bg-linear-to-r from-[#00d4aa] to-[#00f5c8]" : alertState.type === "error" ? "bg-linear-to-r from-red-500 to-red-400" : "bg-linear-to-r from-white/20 to-white/10"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${alertState.type === "deposit" ? "bg-[#c9a84c]/15" : alertState.type === "withdrawal" ? "bg-[#00d4aa]/15" : alertState.type === "error" ? "bg-red-500/15" : "bg-white/10"}`, children: [
          alertState.type === "deposit" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-[#c9a84c]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
          alertState.type === "withdrawal" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-[#00d4aa]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }),
          alertState.type === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-red-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" }) }),
          alertState.type === "info" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-white/50", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `text-xl font-['Outfit'] font-semibold text-center mb-3 ${alertState.type === "deposit" ? "text-[#c9a84c]" : alertState.type === "withdrawal" ? "text-[#00d4aa]" : alertState.type === "error" ? "text-red-400" : "text-white"}`, children: alertState.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-[14px] text-center leading-relaxed mb-6", children: alertState.message }),
        alertState.type === "deposit" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-sm px-4 py-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-[#c9a84c] uppercase tracking-widest font-bold", children: "Pending Admin Review" })
        ] }),
        alertState.type === "withdrawal" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-sm px-4 py-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-[#00d4aa] uppercase tracking-widest font-bold", children: "Processing · 24–48 hrs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setAlertState((prev) => ({
          ...prev,
          open: false
        })), className: `w-full py-3 font-bold text-[13px] tracking-widest uppercase rounded-sm transition-colors ${alertState.type === "deposit" ? "bg-[#c9a84c] hover:bg-[#b89945] text-[#070b14]" : alertState.type === "withdrawal" ? "bg-[#00d4aa] hover:bg-[#00b38f] text-[#070b14]" : alertState.type === "error" ? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30" : "bg-white/10 hover:bg-white/20 text-white"}`, children: alertState.type === "deposit" ? "Got it, Thanks!" : alertState.type === "withdrawal" ? "Done" : "Dismiss" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#131714] rounded-[24px] p-6 md:p-8 relative overflow-hidden mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-[32px] md:text-[40px] leading-none tracking-tight mb-8", children: "Deposit & Withdraw" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-black/50 rounded-full p-1 w-max mb-8 border border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("deposit"), className: `px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors ${mode === "deposit" ? "bg-[#1a221d] text-white" : "text-gray-500 hover:text-white"}`, children: "Deposit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("withdraw"), className: `px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors ${mode === "withdraw" ? "bg-[#1a221d] text-white" : "text-gray-500 hover:text-white"}`, children: "Withdraw" })
      ] }),
      mode === "deposit" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#06120b]/50 border border-white/5 p-6 md:p-8 rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl text-white font-bold mb-1", children: "Fund Your Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-500 mb-6", children: "All amounts are in USD. We'll show you the exact crypto equivalent." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-gray-400 font-semibold mb-3 block", children: "Choose Crypto Asset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoSelector, { focusColor: "focus:border-[#13c74b]/50 focus:ring-[#13c74b]/50", value: selectedAsset, onChange: (v) => {
            setSelectedAsset(v);
            setUsdAmount("");
          }, cryptoPrices, pricesLoading })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-black/40 border border-white/10 rounded-xl mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-gray-400 font-semibold block", children: [
              selectedCryptoData?.symbol || "BTC",
              " Platform Wallet Address"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-[#13c74b] font-bold bg-[#13c74b]/10 px-2 py-1 rounded-full", children: [
              "Network: ",
              selectedCryptoData?.network || "N/A"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { readOnly: true, value: selectedCryptoData?.address || "Address not configured", className: "w-full bg-[#06120b] border border-white/5 text-white p-3.5 rounded-xl text-sm font-mono focus:outline-none select-all overflow-hidden text-ellipsis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleCopy(selectedCryptoData?.address || ""), className: "px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold transition-colors shrink-0", children: [
              copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-[#13c74b]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
              copied ? "Copied" : "Copy"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-gray-500 mt-3", children: [
            "Send ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: selectedCryptoData?.symbol }),
            " to this address on the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: selectedCryptoData?.network }),
            " network, then fill in the form below as proof."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-gray-400 font-semibold mb-2 block", children: "Amount You're Sending (USD)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-gray-400 font-bold", children: "$" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: usdAmount, onChange: (e) => setUsdAmount(e.target.value), placeholder: "0.00", className: "w-full bg-[#06120b] border border-transparent text-white pl-8 pr-20 py-4 rounded-xl text-[18px] font-bold focus:outline-none focus:border-[#13c74b] border transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-gray-500 font-bold", children: "USD" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-4 bg-black/30 border border-white/5 rounded-xl", children: pricesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-3.5 h-3.5 animate-spin text-gray-500", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "Fetching live price..." })
          ] }) : cryptoEquivalent !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-500 uppercase tracking-widest block mb-1", children: "You will send approximately" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[20px] font-bold text-white", children: cryptoEquivalent.toFixed(selectedSymbol === "USDT" || selectedSymbol === "USDC" ? 2 : 6) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] text-[#13c74b] font-bold ml-2", children: selectedSymbol })
            ] }),
            selectedPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-500 block", children: "Live rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] text-gray-300 font-semibold", children: [
                "1 ",
                selectedSymbol,
                " = $",
                selectedPrice.toLocaleString(void 0, {
                  maximumFractionDigits: 2
                })
              ] })
            ] })
          ] }) : usdAmountNum > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "Price unavailable — please try again shortly" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] text-gray-600", children: [
            "Enter USD amount above to see the ",
            selectedSymbol,
            " equivalent"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-gray-400 font-semibold mb-2 block", children: [
              "Transaction ID (TXID) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 font-normal", children: "(Optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: txid, onChange: (e) => setTxid(e.target.value), placeholder: "0x1a2b3c...", className: "w-full bg-[#06120b] border-transparent text-white p-3.5 rounded-xl focus:outline-none focus:border-[#13c74b] border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3.5 bg-[#13c74b]/5 border border-[#13c74b]/10 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#13c74b] font-bold", children: "ℹ" }),
            " After sending crypto, upload a screenshot of your transaction as proof."
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-gray-400 font-semibold mb-2 block", children: "Upload Payment Screenshot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full border-2 border-dashed border-white/10 hover:border-[#13c74b]/50 rounded-xl p-6 text-center transition-colors cursor-pointer bg-[#06120b]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setScreenshotFile(e.target.files?.[0] || null), className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center gap-2 pointer-events-none", children: screenshotFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-[#13c74b]/10 rounded-full flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-[#13c74b]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: screenshotFile.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-500 uppercase tracking-widest", children: "Click to change file" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-gray-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white", children: "Select screenshot image" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-500 uppercase tracking-widest", children: "PNG, JPG up to 5MB" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: depositLoading, onClick: handleDepositSubmit, className: "w-full bg-[#13c74b] text-black py-4 font-bold text-[15px] transition-colors rounded-full hover:bg-[#10b042] disabled:opacity-60 flex items-center justify-center gap-3", children: depositLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5 animate-spin text-black", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
          ] }),
          " Submitting..."
        ] }) : "Submit Deposit Proof" })
      ] }) }),
      mode === "withdraw" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#06120b]/50 border border-white/5 p-6 md:p-8 rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl text-white font-bold mb-1", children: "Withdraw Funds" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-400 mb-6", children: "Processed within 24–48 hours after approval." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-black/40 border border-white/5 rounded-xl mb-8 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 font-semibold mb-1", children: "Available to Withdraw" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl text-white font-bold tracking-tight", children: [
              "$",
              totalBalance.toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#13c74b]/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-5 h-5 text-[#13c74b]" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-gray-400 font-semibold mb-2 block", children: "Withdrawal Amount (USD)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-gray-400 font-bold", children: "$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: usdAmount, onChange: (e) => setUsdAmount(e.target.value), placeholder: "0.00", className: "w-full bg-[#06120b] border border-transparent text-white pl-8 pr-20 py-4 rounded-xl text-[18px] font-bold focus:outline-none focus:border-[#13c74b] border transition-colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-gray-500 font-bold", children: "USD" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-4 bg-black/30 border border-white/5 rounded-xl", children: pricesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-3.5 h-3.5 animate-spin text-gray-500", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "Fetching live price..." })
            ] }) : cryptoEquivalent !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-500 uppercase tracking-widest block mb-1", children: "You will receive approximately" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[20px] font-bold text-white", children: cryptoEquivalent.toFixed(selectedSymbol === "USDT" || selectedSymbol === "USDC" ? 2 : 6) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] text-[#13c74b] font-bold ml-2", children: selectedSymbol })
              ] }),
              selectedPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-500 block", children: "Live rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] text-gray-300 font-semibold", children: [
                  "1 ",
                  selectedSymbol,
                  " = $",
                  selectedPrice.toLocaleString(void 0, {
                    maximumFractionDigits: 2
                  })
                ] })
              ] })
            ] }) : usdAmountNum > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "Price unavailable — please try again shortly" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] text-gray-600", children: [
              "Enter USD amount above to see the ",
              selectedSymbol,
              " equivalent"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-gray-400 font-semibold mb-2 block", children: "Withdrawal Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoSelector, { focusColor: "focus:border-[#13c74b]/50 focus:ring-[#13c74b]/50", value: selectedAsset, onChange: (v) => {
              setSelectedAsset(v);
              setUsdAmount("");
            }, cryptoPrices, pricesLoading })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-gray-400 font-semibold mb-2 block", children: "Your Receiving Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: withdrawAddress, onChange: (e) => setWithdrawAddress(e.target.value), placeholder: "Paste address here", className: "w-full bg-[#06120b] border-transparent text-white p-3.5 rounded-xl focus:outline-none focus:border-[#13c74b] border" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-gray-500 mb-6 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#13c74b]", children: "⚠" }),
          " Early withdrawal from active plans may incur a 10% processing fee. Only matured plan balances are instantly withdrawable."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: withdrawLoading, onClick: handleWithdrawSubmit, className: "w-full bg-[#13c74b] text-black py-4 font-bold text-[15px] hover:bg-[#10b042] transition-colors rounded-full disabled:opacity-60 flex items-center justify-center gap-3", children: withdrawLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5 animate-spin text-black", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
          ] }),
          " Submitting..."
        ] }) : "Submit Withdrawal Request" })
      ] }) })
    ] })
  ] });
}
function ProfileTab({
  profile,
  setActiveTab
}) {
  const [activeSettingsTab, setActiveSettingsTab] = reactExports.useState("account");
  const [showDeleteAlert, setShowDeleteAlert] = reactExports.useState(false);
  const menuItems = [{
    id: "account",
    label: "Account",
    icon: User
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col md:flex-row gap-8 lg:gap-12 animate-in fade-in duration-500 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-64 shrink-0 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 md:hidden px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl text-white font-bold", children: "Settings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSettingsTab === item.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveSettingsTab(item.id), className: `w-full flex items-center gap-4 px-4 py-3 rounded-full transition-colors text-left ${isActive ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white hover:bg-white/2 font-medium"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px]", children: item.label })
        ] }, item.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      activeSettingsTab === "account" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[28px] md:text-[32px] text-white font-bold tracking-tight mb-8", children: "Account Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 lg:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 lg:space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setActiveSettingsTab("personal"), className: "bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-blue-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] text-white font-bold mb-0.5", children: "Personal details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] text-gray-500 font-medium leading-tight", children: [
                    "Review and update your",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    "personal info"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-[#13c74b]/10 group-hover:bg-[#13c74b]/20 transition-colors px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-[#13c74b]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-[#13c74b] font-bold", children: "Verified" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setActiveSettingsTab("limits"), className: "bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-orange-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] text-white font-bold mb-0.5", children: "Account limits" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-500 font-medium", children: "Know your spending limits" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-gray-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setShowDeleteAlert(true), className: "bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5 text-red-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] text-white font-bold mb-0.5", children: "Permanently delete your account" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-500 font-medium", children: "We're sorry to see you go" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-gray-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 lg:space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setActiveTab && setActiveTab("rewards"), className: "bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-400 fill-amber-400/20" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] text-white font-bold mb-0.5", children: "Invite friends" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-500 font-medium", children: "Earn rewards by bringing in your friends" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-gray-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setActiveTab && setActiveTab("history"), className: "bg-[#1a1f1c]/60 hover:bg-[#1a1f1c] transition-colors border border-transparent cursor-pointer p-5 rounded-2xl flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#13c74b]/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-[#13c74b]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] text-white font-bold mb-0.5", children: "Wallet statement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-500 font-medium", children: "Your financial history readily available" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-gray-500" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
          await supabase.auth.signOut();
          window.location.href = "/login";
        }, className: "w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:text-red-400 font-bold text-[15px] transition-colors rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" }),
          " Sign Out"
        ] }) })
      ] }),
      activeSettingsTab === "personal" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-right-4 duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveSettingsTab("account"), className: "flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rotate-180" }),
          " Back to Account"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[28px] md:text-[32px] text-white font-bold tracking-tight mb-8", children: "Personal Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 p-6 rounded-2xl space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between border-b border-white/5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 font-medium mb-1", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold", children: profile?.name || "User" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/5 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 font-medium mb-1", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold", children: profile?.email || "user@example.com" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#13c74b]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-bold", children: "Verified" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 font-medium mb-1", children: "Identity Verification (KYC)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold", children: "Coming Soon" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: true, className: "px-4 py-2 bg-white/5 text-gray-500 text-[12px] font-bold rounded-full cursor-not-allowed", children: "Verify Now" })
          ] })
        ] })
      ] }),
      activeSettingsTab === "limits" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-right-4 duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveSettingsTab("account"), className: "flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rotate-180" }),
          " Back to Account"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[28px] md:text-[32px] text-white font-bold tracking-tight mb-8", children: "Account Limits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 p-6 rounded-2xl space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold", children: "Daily Withdrawal Limit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#13c74b] font-bold", children: "$50,000.00" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-black/40 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#13c74b] w-[5%] h-full rounded-full" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 font-medium mt-2", children: "You have $47,500.00 remaining today." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 font-medium mb-3", children: "Increase your limits" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-300 leading-relaxed mb-4", children: "To increase your daily withdrawal and deposit limits, you need to complete full Identity Verification (KYC)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveSettingsTab("personal"), className: "px-5 py-2.5 bg-[#13c74b] text-black text-[13px] font-bold rounded-full hover:bg-[#10a83f] transition-colors", children: "Verify Identity" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeleteAlert, onOpenChange: setShowDeleteAlert, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "bg-[#050806] border border-white/10 text-white sm:rounded-3xl max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl", children: "Delete Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-gray-400", children: "Are you sure you want to permanently delete your account? This action cannot be undone. All your data, transaction history, and balances will be lost." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "bg-white/5 text-white hover:bg-white/10 hover:text-white border-0 rounded-full px-6", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: async () => {
          await supabase.auth.signOut();
          window.location.href = "/login";
        }, className: "bg-red-500 text-white hover:bg-red-600 rounded-full px-6", children: "Yes, Delete Account" })
      ] })
    ] }) })
  ] });
}
function RewardsTab({
  profile,
  setActiveTab
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const [rewardsTab, setRewardsTab] = reactExports.useState("pending");
  const referralCode = profile?.referral_code || "c9qXn3";
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6 flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab && setActiveTab("settings"), className: "w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 text-white rotate-180" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl md:text-2xl text-white font-bold hidden md:block", children: "Settings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-6 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg z-10 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[32px] md:text-[40px] text-white font-bold mb-4 tracking-tight leading-none", children: "Refer and earn!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-[15px] mb-8 leading-relaxed", children: "Refer a friend and you get $50 once they trade $500 worth of crypto." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full sm:w-auto px-6 py-3 bg-[#13c74b] hover:bg-[#10a83f] text-black font-bold rounded-full transition-colors", children: "Refer now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-colors", children: "Enter a referral code" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-0 md:static mt-6 md:mt-0 opacity-20 md:opacity-100 z-0 pr-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-32 h-32 md:w-48 md:h-48 text-blue-500 drop-shadow-2xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-6 rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400 text-lg", children: "📩" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 font-medium mb-0.5", children: "Your referral code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-lg", children: referralCode })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCopy, className: "text-white hover:text-gray-300 transition-colors p-2 bg-white/5 rounded-xl hover:bg-white/10", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-[#13c74b]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-white/5 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-red-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 font-medium mb-1", children: "Pending referrals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-xl", children: profile?.total_referrals || 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-gray-400 font-medium mb-1", children: "Total earned" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white font-bold text-xl", children: [
            "$",
            Number(profile?.total_earned_referrals || 0).toLocaleString(void 0, {
              minimumFractionDigits: 2
            })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-1.5 rounded-full inline-flex w-fit mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRewardsTab("pending"), className: `px-6 py-2 rounded-full text-[14px] font-bold transition-colors ${rewardsTab === "pending" ? "bg-[#13c74b] text-black" : "text-gray-400 hover:text-white"}`, children: "Pending" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRewardsTab("completed"), className: `px-6 py-2 rounded-full text-[14px] font-bold transition-colors ${rewardsTab === "completed" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`, children: "Completed" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#1a1f1c]/60 border border-transparent p-12 rounded-3xl flex flex-col items-center justify-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 font-medium text-[15px]", children: [
      "No ",
      rewardsTab,
      " referrals found."
    ] }) })
  ] });
}
function NotificationBell({
  align = "right"
}) {
  const [open, setOpen] = reactExports.useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    latestNotif,
    dismissLatest
  } = useNotificationStore();
  const [toastQueue, setToastQueue] = reactExports.useState([]);
  const [permGranted, setPermGranted] = reactExports.useState(typeof window !== "undefined" && "Notification" in window ? Notification.permission === "granted" : false);
  reactExports.useEffect(() => {
    if (!latestNotif) return;
    const key = latestNotif.id + Date.now();
    setToastQueue((prev) => [...prev, {
      id: key,
      notif: latestNotif
    }]);
    dismissLatest();
    setTimeout(() => {
      setToastQueue((prev) => prev.filter((t) => t.id !== key));
    }, 5500);
  }, [latestNotif]);
  const removeToast = (id) => setToastQueue((prev) => prev.filter((t) => t.id !== id));
  const getIconType = (title) => {
    const t = title.toLowerCase();
    if (t.includes("profit")) return "profit";
    if (t.includes("bonus")) return "bonus";
    if (t.includes("adjusted")) return "adjustment-up";
    if (t.includes("deposit") && (t.includes("credited") || t.includes("approved"))) return "deposit";
    if (t.includes("deposit") && t.includes("rejected")) return "rejected";
    if (t.includes("withdrawal") && (t.includes("sent") || t.includes("approved"))) return "withdrawal";
    if (t.includes("withdrawal") && t.includes("rejected")) return "rejected";
    if (t.includes("deposit")) return "deposit";
    if (t.includes("withdrawal")) return "withdrawal";
    if (t.includes("credit")) return "deposit";
    return "info";
  };
  const getToastAccent = (type) => {
    if (type === "rejected") return {
      border: "border-red-500/50",
      bar: "bg-red-500",
      icon: "bg-red-500/15 text-red-400"
    };
    if (type === "withdrawal") return {
      border: "border-orange-400/50",
      bar: "bg-orange-400",
      icon: "bg-orange-400/15 text-orange-300"
    };
    return {
      border: "border-[#13c74b]/50",
      bar: "bg-[#13c74b]",
      icon: "bg-[#13c74b]/15 text-[#13c74b]"
    };
  };
  const getIcon = (type, size = "w-4 h-4") => {
    switch (type) {
      case "profit":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: `${size} text-[#13c74b]` });
      case "bonus":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: `${size} text-[#13c74b]` });
      case "adjustment-up":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: `${size} text-[#13c74b]` });
      case "adjustment-down":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: `${size} text-red-400` });
      case "deposit":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: `${size} text-[#13c74b]` });
      case "withdrawal":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: `${size} text-orange-400` });
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: `${size} text-red-400` });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: `${size} text-gray-400` });
    }
  };
  const getIconBg = (type) => {
    switch (type) {
      case "profit":
      case "bonus":
      case "adjustment-up":
      case "deposit":
      case "credit":
        return "bg-[#13c74b]/10 border-[#13c74b]/20";
      case "withdrawal":
        return "bg-orange-400/10 border-orange-400/20";
      case "rejected":
      case "adjustment-down":
        return "bg-red-500/10 border-red-500/20";
      default:
        return "bg-white/5 border-white/10";
    }
  };
  const handleEnable = async () => {
    try {
      const granted = await requestNotificationPermission();
      setPermGranted(granted || true);
    } catch {
      setPermGranted(true);
    }
  };
  const formatTime = (timeStr) => {
    const m = Math.floor((Date.now() - new Date(timeStr).getTime()) / 6e4);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    if (m < 1440) return `${Math.floor(m / 60)}h ago`;
    return `${Math.floor(m / 1440)}d ago`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-[99999] flex flex-col gap-3 pointer-events-none", style: {
      maxWidth: 380
    }, children: toastQueue.map(({
      id,
      notif
    }) => {
      if (!notif) return null;
      const type = getIconType(notif.title);
      const accent = getToastAccent(type);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `pointer-events-auto w-[360px] max-w-[calc(100vw-2rem)] bg-[#0d1f12] border ${accent.border} rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] overflow-hidden`, style: {
        animation: "notif-slide-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[3px] w-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${accent.bar} origin-left`, style: {
          animation: "notif-shrink 5s linear forwards"
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${accent.icon}`, children: getIcon(type, "w-5 h-5") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-white leading-snug", children: notif.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeToast(id), className: "shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-colors mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gray-300 leading-snug mb-2", children: notif.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-600 font-medium", children: formatTime(notif.created_at) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[#13c74b] bg-[#13c74b]/10 px-2 py-0.5 rounded-full uppercase tracking-wide", children: "XHoldings" })
            ] })
          ] })
        ] })
      ] }, id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setOpen((o) => !o);
        if (!open) markAsRead();
      }, className: "w-11 h-11 rounded-full bg-[#1a221d] flex items-center justify-center text-gray-400 hover:text-white transition-colors relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: `w-5 h-5 ${unreadCount > 0 ? "text-[#13c74b]" : ""}` }),
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 min-w-[17px] h-[17px] flex items-center justify-center rounded-full bg-[#13c74b] text-black text-[9px] font-bold px-1 ring-2 ring-black animate-pulse", children: unreadCount > 9 ? "9+" : unreadCount })
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute top-14 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-[#080f0a] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${align === "left" ? "left-0" : "right-0"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-[#13c74b]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] text-white font-bold", children: "Notifications" }),
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold bg-[#13c74b] text-black px-1.5 py-0.5 rounded-full", children: unreadCount })
            ] }),
            notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => markAsRead(), className: "text-[12px] text-[#13c74b] hover:text-white transition-colors font-medium", children: "Mark all read" })
          ] }),
          !permGranted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3.5 bg-[#13c74b]/8 border-b border-[#13c74b]/15 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-[#13c74b] leading-snug", children: "Enable push notifications to get alerts in the background." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleEnable, className: "shrink-0 px-3 py-1.5 bg-[#13c74b] text-black text-[11px] font-bold rounded-lg hover:bg-[#10a13c] transition-colors", children: "Enable" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[440px] overflow-y-auto divide-y divide-white/5", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 text-gray-700" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] text-gray-500 font-medium", children: "No notifications yet" })
          ] }) : notifications.map((n) => {
            const iconType = getIconType(n.title);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => markAsRead(n.id), className: `px-5 py-4 flex gap-4 transition-all cursor-pointer relative group ${n.is_read ? "opacity-50 hover:opacity-80" : "bg-[#13c74b]/3 hover:bg-white/3"}`, children: [
              !n.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-[3px] bg-[#13c74b] rounded-r-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-full border shrink-0 flex items-center justify-center ${getIconBg(iconType)}`, children: getIcon(iconType) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-white font-semibold mb-0.5", children: n.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-400 leading-snug", children: n.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-gray-600 mt-1.5 font-medium", children: formatTime(n.created_at) })
              ] })
            ] }, n.id);
          }) })
        ] })
      ] })
    ] })
  ] });
}
const ADMIN_ASSETS = ["PROFIT", "BONUS", "MANUAL DEPOSIT", "ADJUSTMENT", "LOSS", "MANUAL WITHDRAWAL"];
const ADMIN_TXID_PREFIX = "[ADMIN]";
function cleanTxDisplay(tx) {
  const rawAsset = (tx.asset || "").toUpperCase().trim();
  const rawTxid = tx.txid || "";
  const isAdminCredit = ADMIN_ASSETS.includes(rawAsset) || rawTxid.toUpperCase().startsWith(ADMIN_TXID_PREFIX);
  const fmtAmt = `$${Number(tx.amount || 0).toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
  let label = tx.type === "withdrawal" ? "Withdrawal" : "Deposit";
  let assetDisplay = tx.asset || "";
  let message = "";
  if (isAdminCredit) {
    if (rawAsset === "PROFIT") {
      label = "Trading Profit";
      assetDisplay = "Account Credit";
      message = `Your account has been credited with ${fmtAmt} in trading profit.`;
    } else if (rawAsset === "BONUS") {
      label = "Bonus Reward";
      assetDisplay = "Account Credit";
      message = `Congratulations! A bonus of ${fmtAmt} has been added to your account.`;
    } else if (rawAsset === "LOSS") {
      label = "Trading Loss";
      assetDisplay = "Account Debit";
      message = `A trading loss of ${fmtAmt} has been applied to your account.`;
    } else if (rawAsset === "ADJUSTMENT") {
      label = "Account Adjustment";
      assetDisplay = "Account Credit";
      message = `Your account balance has been adjusted by ${fmtAmt}.`;
    } else {
      label = "Platform Credit";
      assetDisplay = "Account Credit";
      message = `Your account has been credited with ${fmtAmt}.`;
    }
  } else if (tx.type === "deposit") {
    message = `Your deposit of ${fmtAmt} has been ${tx.status === "approved" ? "approved and credited to your balance" : tx.status === "rejected" ? "rejected" : "received and is pending review"}.`;
  } else if (tx.type === "withdrawal") {
    message = `Your withdrawal of ${fmtAmt} has been ${tx.status === "approved" ? "processed and sent to your wallet" : tx.status === "rejected" ? "rejected and your balance refunded" : "submitted and is pending approval"}.`;
  }
  const txidDisplay = rawTxid.toUpperCase().startsWith(ADMIN_TXID_PREFIX) ? null : rawTxid || null;
  return {
    label,
    assetDisplay,
    txidDisplay,
    isAdminCredit,
    message
  };
}
function TransactionsTab({
  profile
}) {
  const {
    transactions
  } = useTransactionStore();
  const userTransactions = transactions.filter((tx) => tx.userId === profile?.id).sort((a, b) => b.timestamp - a.timestamp);
  const [visibleCount, setVisibleCount] = reactExports.useState(10);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [selectedTx, setSelectedTx] = reactExports.useState(null);
  const filteredTransactions = userTransactions.filter((tx) => {
    const matchesSearch = tx.txid && tx.txid.toLowerCase().includes(searchQuery.toLowerCase()) || tx.asset && tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) || tx.type && tx.type.toLowerCase().includes(searchQuery.toLowerCase()) || tx.amount && tx.amount.toString().includes(searchQuery);
    const matchesFilter = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });
  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTransactions.length;
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;
    const headers = ["Date", "Type", "Asset", "Amount", "Status", "TXID"];
    const csvRows = filteredTransactions.map((tx) => {
      const date = new Date(tx.timestamp).toLocaleString();
      return `"${date}","${tx.type}","${tx.asset}","${tx.amount}","${tx.status}","${tx.txid || ""}"`;
    });
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "xholdings_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search by asset, type, or TXID", value: searchQuery, onChange: (e) => {
          setSearchQuery(e.target.value);
          setVisibleCount(10);
        }, className: "w-full bg-[#0a0f1c] border border-[#13c74b]/30 focus:border-[#13c74b] text-white pl-12 pr-4 py-3 rounded-xl outline-none transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setFilterType((prev) => prev === "all" ? "deposit" : prev === "deposit" ? "withdrawal" : "all");
        setVisibleCount(10);
      }, className: `w-12 h-12 flex items-center justify-center rounded-xl border border-transparent transition-colors relative ${filterType !== "all" ? "bg-[#13c74b]/20 text-[#13c74b]" : "bg-[#1a1f1c] hover:bg-[#1a1f1c]/80 text-white"}`, title: `Filter: ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-5 h-5" }),
        filterType !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-[#13c74b] rounded-full border border-black" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleExportCSV, className: "w-12 h-12 bg-[#1a1f1c] hover:bg-[#1a1f1c]/80 flex items-center justify-center rounded-xl border border-transparent transition-colors", title: "Export to CSV", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-white" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#1a1f1c] rounded-3xl p-6 md:p-12 min-h-[500px] flex flex-col", children: userTransactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-32 h-32 mb-8 drop-shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M40 20 L80 25 L75 80 L35 75 Z", fill: "#052011" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M25 15 L70 20 L65 85 L20 80 Z", fill: "#FFEAA7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 15 L26 15.5 L21 80 L17 79.5 Z", fill: "#FDCB6E" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M35 35 L60 38", stroke: "#636E72", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M36 45 L58 47.5", stroke: "#636E72", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M37 55 L58 57.5", stroke: "#636E72", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 80 L35 82 L75 65 L65 85 Z", fill: "#6C5CE7" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl text-white font-bold mb-3", children: "No transactions yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-[15px]", children: "Your transactions will appear here after you complete one." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0 flex-1", children: visibleTransactions.map((tx) => {
        const timeAgo = Math.floor((Date.now() - tx.timestamp) / 6e4);
        const timeStr = timeAgo < 1 ? "Just now" : timeAgo < 60 ? `${timeAgo}m ago` : timeAgo < 1440 ? `${Math.floor(timeAgo / 60)}h ago` : `${Math.floor(timeAgo / 1440)}d ago`;
        const {
          label,
          txidDisplay,
          isAdminCredit,
          message
        } = cleanTxDisplay(tx);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setSelectedTx(tx), className: "group bg-transparent hover:bg-white/2 border-b border-white/5 last:border-0 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${tx.type === "withdrawal" ? "bg-orange-500/10 text-orange-400" : isAdminCredit ? "bg-[#00d4aa]/10 text-[#00d4aa]" : "bg-[#13c74b]/10 text-[#13c74b]"}`, children: tx.type === "withdrawal" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-5 h-5" }) : isAdminCredit ? /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] text-white font-bold mb-0.5", children: label }),
              message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-400 mb-1 max-w-[260px] leading-snug", children: message }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-gray-600 font-medium flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                " ",
                timeStr,
                !isAdminCredit && txidDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                    "TXID: ",
                    txidDisplay.substring(0, 10),
                    "..."
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left md:text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[16px] font-bold mb-1 ${tx.type === "withdrawal" ? "text-orange-400" : "text-white"}`, children: [
              tx.type === "withdrawal" ? "-" : "+",
              "$",
              (tx.amount || 0).toLocaleString(void 0, {
                minimumFractionDigits: 2
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full w-fit ${tx.status === "pending" ? "bg-yellow-500/10 text-yellow-500" : tx.status === "approved" ? "bg-[#13c74b]/10 text-[#13c74b]" : "bg-red-500/10 text-red-400"}`, children: tx.status })
          ] })
        ] }, tx.id);
      }) }),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setVisibleCount((prev) => prev + 10), className: "px-6 py-3 bg-[#13c74b]/10 hover:bg-[#13c74b]/20 text-[#13c74b] font-bold rounded-full transition-colors text-[14px]", children: "Load More Transactions" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedTx, onOpenChange: (open) => !open && setSelectedTx(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "bg-[#0a0f1c] border border-white/10 text-white sm:max-w-md p-0 overflow-hidden", children: selectedTx && (() => {
      const {
        label,
        assetDisplay,
        txidDisplay,
        isAdminCredit,
        message
      } = cleanTxDisplay(selectedTx);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-white/5 flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-16 h-16 rounded-full flex items-center justify-center shrink-0 mb-4 ${selectedTx.type === "withdrawal" ? "bg-orange-500/10 text-orange-400" : isAdminCredit ? "bg-[#00d4aa]/10 text-[#00d4aa]" : "bg-[#13c74b]/10 text-[#13c74b]"}`, children: selectedTx.type === "withdrawal" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-8 h-8" }) : isAdminCredit ? /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-8 h-8" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold mb-1", children: [
            selectedTx.type === "withdrawal" ? "-" : "+",
            "$",
            (selectedTx.amount || 0).toLocaleString(void 0, {
              minimumFractionDigits: 2
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold text-gray-300 mb-2", children: label }),
          message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gray-400 leading-relaxed mb-3 px-4 max-w-[300px]", children: message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${selectedTx.status === "pending" ? "bg-yellow-500/10 text-yellow-500" : selectedTx.status === "approved" ? "bg-[#13c74b]/10 text-[#13c74b]" : "bg-red-500/10 text-red-400"}`, children: selectedTx.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-[14px]", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[15px]", children: assetDisplay })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-[14px]", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold capitalize text-[15px]", children: label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-[14px]", children: "Date & Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-right text-[15px]", children: new Date(selectedTx.timestamp).toLocaleString() })
          ] }),
          txidDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start py-3 border-b border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-[14px]", children: "Transaction ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[13px] text-[#13c74b] break-all text-right max-w-[200px]", children: txidDisplay })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-[14px]", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[15px] text-white", children: [
              "$",
              (selectedTx.amount || 0).toLocaleString(void 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            ] })
          ] })
        ] })
      ] });
    })() }) })
  ] });
}
export {
  Dashboard as component
};
