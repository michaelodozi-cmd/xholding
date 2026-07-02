import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./supabase-83CNBwKx.mjs";
import { R as Root, b as Trigger, a as Close, P as Portal, C as Content, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./button-BXrfXN_b.mjs";
import { X } from "../_libs/lucide-react.mjs";
function useCryptoStore() {
  const [cryptos, setCryptos] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchCryptos();
    const channelId = `crypto_assets_changes_${Math.random()}`;
    const channel = supabase.channel(channelId).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "crypto_assets" },
      () => {
        fetchCryptos();
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const fetchCryptos = async () => {
    const { data, error } = await supabase.from("crypto_assets").select("*").order("name");
    if (data && !error) {
      const mapped = data.map((row) => ({
        ...row,
        dbId: row.id,
        id: row.symbol.toLowerCase()
      }));
      setCryptos(mapped);
    }
  };
  const addCrypto = async (crypto) => {
    const optimistic = { ...crypto, dbId: "" };
    setCryptos((prev) => [...prev, optimistic]);
    const { data, error } = await supabase.from("crypto_assets").insert([{
      name: crypto.name,
      symbol: crypto.symbol,
      color: crypto.color,
      address: crypto.address,
      network: crypto.network,
      active: crypto.active
    }]).select().single();
    if (error) {
      console.error("Error adding crypto:", error);
      fetchCryptos();
    } else if (data) {
      fetchCryptos();
    }
  };
  const removeCrypto = async (id) => {
    const crypto = cryptos.find((c) => c.id === id);
    if (!crypto) return;
    setCryptos((prev) => prev.filter((c) => c.id !== id));
    const { error } = await supabase.from("crypto_assets").delete().eq("id", crypto.dbId);
    if (error) {
      console.error("Error removing crypto:", error);
      fetchCryptos();
    }
  };
  const toggleActive = async (id) => {
    const crypto = cryptos.find((c) => c.id === id);
    if (!crypto) return;
    setCryptos((prev) => prev.map((c) => c.id === id ? { ...c, active: !c.active } : c));
    const { error } = await supabase.from("crypto_assets").update({ active: !crypto.active }).eq("id", crypto.dbId);
    if (error) {
      console.error("Error toggling active:", error);
      fetchCryptos();
    }
  };
  const updateAddress = async (id, address) => {
    const crypto = cryptos.find((c) => c.id === id);
    if (!crypto) return;
    setCryptos((prev) => prev.map((c) => c.id === id ? { ...c, address } : c));
    const { error } = await supabase.from("crypto_assets").update({ address }).eq("id", crypto.dbId);
    if (error) {
      console.error("Error updating address:", error);
      fetchCryptos();
    }
  };
  return { cryptos, addCrypto, removeCrypto, toggleActive, updateAddress };
}
function useTransactionStore() {
  const [transactions, setTransactions] = reactExports.useState([]);
  const [hasFetched, setHasFetched] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchTransactions();
    const channelId = `transactions_changes_${Math.random()}`;
    const channel = supabase.channel(channelId).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "transactions" },
      () => {
        fetchTransactions();
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const fetchTransactions = async () => {
    const { data, error } = await supabase.from("transactions").select("*").order("timestamp", { ascending: false });
    if (data && !error) {
      const formatted = data.map((tx) => ({
        id: tx.id,
        userId: tx.user_id,
        userEmail: tx.user_email,
        type: tx.type,
        amount: Number(tx.amount),
        asset: tx.asset,
        txid: tx.txid,
        status: tx.status,
        timestamp: Number(tx.timestamp),
        screenshotUrl: tx.screenshot_url ?? null
      }));
      setTransactions(formatted);
      setHasFetched(true);
    }
  };
  const addTransaction = async (tx) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const newTx = {
      id: Math.random().toString(36).substring(2, 9),
      user_id: user.id,
      user_email: user.email || "",
      type: tx.type,
      amount: tx.amount,
      asset: tx.asset,
      txid: tx.txid,
      status: "pending",
      timestamp: Date.now(),
      screenshot_url: tx.screenshotUrl || null
    };
    setTransactions((prev) => [{
      id: newTx.id,
      userId: newTx.user_id,
      userEmail: newTx.user_email,
      type: newTx.type,
      amount: newTx.amount,
      asset: newTx.asset,
      txid: newTx.txid,
      status: newTx.status,
      timestamp: newTx.timestamp,
      screenshotUrl: newTx.screenshot_url
    }, ...prev]);
    const { error } = await supabase.from("transactions").insert([newTx]);
    if (error) {
      console.error("Error adding transaction:", error);
      fetchTransactions();
    } else if (tx.type === "withdrawal") {
      await supabase.rpc("increment_balance", {
        p_user_id: user.id,
        p_amount: -Number(tx.amount)
      });
    }
  };
  const updateStatus = async (id, status, usdValue) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;
    setTransactions((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
    const { error } = await supabase.from("transactions").update({ status }).eq("id", id);
    if (error) {
      console.error("Error updating status:", error);
      fetchTransactions();
      return;
    }
    if (status === "approved" && tx.type === "deposit") {
      const amountToAdd = usdValue !== void 0 ? Number(usdValue) : Number(tx.amount);
      const { error: rpcError } = await supabase.rpc("increment_balance", {
        p_user_id: tx.userId,
        p_amount: amountToAdd
      });
      if (rpcError) console.error("Error incrementing balance:", rpcError);
      const fmtAmt = `$${amountToAdd.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      await supabase.from("notifications").insert([{
        user_id: tx.userId,
        title: "Deposit Approved ✅",
        message: `Your deposit of ${fmtAmt} ${tx.asset || ""} has been approved and credited to your balance.`,
        is_read: false
      }]);
    } else if (status === "rejected" && tx.type === "deposit") {
      const fmtAmt = `$${Number(tx.amount).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      await supabase.from("notifications").insert([{
        user_id: tx.userId,
        title: "Deposit Rejected ❌",
        message: `Your deposit of ${fmtAmt} ${tx.asset || ""} was not approved. Please contact support for assistance.`,
        is_read: false
      }]);
    } else if (status === "approved" && tx.type === "withdrawal") {
      const fmtAmt = `$${Number(tx.amount).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      await supabase.from("notifications").insert([{
        user_id: tx.userId,
        title: "Withdrawal Sent 💸",
        message: `Your withdrawal of ${fmtAmt} ${tx.asset || ""} has been processed and sent to your wallet.`,
        is_read: false
      }]);
    } else if (status === "rejected" && tx.type === "withdrawal") {
      const { error: rpcError } = await supabase.rpc("increment_balance", {
        p_user_id: tx.userId,
        p_amount: Number(tx.amount)
      });
      if (rpcError) console.error("Error refunding balance:", rpcError);
      const fmtAmt = `$${Number(tx.amount).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      await supabase.from("notifications").insert([{
        user_id: tx.userId,
        title: "Withdrawal Rejected ❌",
        message: `Your withdrawal of ${fmtAmt} ${tx.asset || ""} was rejected. Your balance has been refunded. Contact support for help.`,
        is_read: false
      }]);
    }
  };
  return { transactions, hasFetched, addTransaction, updateStatus };
}
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogClose = Close;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
export {
  Dialog as D,
  DialogContent as a,
  useCryptoStore as b,
  DialogTrigger as c,
  DialogHeader as d,
  DialogTitle as e,
  DialogDescription as f,
  DialogFooter as g,
  DialogClose as h,
  useTransactionStore as u
};
