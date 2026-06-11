import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Search, Users, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

type Profile = { id: string; email: string; name: string | null; balance: number; role: string };
type Tx = {
  id: string;
  user_id: string;
  user_email: string;
  type: "deposit" | "withdrawal";
  amount: number;
  asset: string;
  txid: string;
  status: string;
  timestamp: number;
};

const CATEGORIES = ["PROFIT", "BONUS", "ADJUSTMENT", "MANUAL DEPOSIT"] as const;
type Category = (typeof CATEGORIES)[number];

const ADMIN_TAG = "[ADMIN]";

export default function BalanceOpsTab() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Profile | null>(null);
  const [category, setCategory] = useState<Category>("PROFIT");
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<"credit" | "debit">("credit");
  const [note, setNote] = useState("");
  const [history, setHistory] = useState<Tx[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id,email,name,balance,role")
      .neq("role", "admin")
      .order("email")
      .then(({ data }) => setUsers(data || []));

    const globalProfileCh = supabase
      .channel('global_profile_changes_balance_ops')
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        ({ new: n }: any) => {
          setUsers(prev => prev.map(u => u.id === n.id ? { ...u, balance: n.balance } : u));
          setSelected(s => (s && s.id === n.id) ? { ...s, balance: n.balance } : s);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(globalProfileCh);
    };
  }, []);

  useEffect(() => {
    if (!selected) {
      setHistory([]);
      return;
    }
    const load = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", selected.id)
        .order("timestamp", { ascending: false })
        .limit(50);
      setHistory((data || []) as Tx[]);
    };
    load();
    const ch = supabase
      .channel(`bo_${selected.id}_${Math.random()}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions", filter: `user_id=eq.${selected.id}` },
        load,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [selected?.id]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users.slice(0, 25);
    return users
      .filter(
        (u) =>
          u.email?.toLowerCase().includes(q) ||
          u.name?.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q),
      )
      .slice(0, 25);
  }, [users, query]);

  const adminOps = useMemo(
    () => history.filter((t) => CATEGORIES.includes(t.asset as Category) && t.txid?.startsWith(ADMIN_TAG)),
    [history],
  );

  const submit = async () => {
    if (!selected) return toast.error("Select a user first");
    const amt = Number(amount);
    if (!isFinite(amt) || amt <= 0) return toast.error("Enter a valid positive amount");
    const signed = direction === "credit" ? amt : -amt;
    if (direction === "debit" && selected.balance + signed < 0)
      return toast.error("Debit exceeds user balance");

    setBusy(true);
    const payload = {
      id: Math.random().toString(36).slice(2, 10),
      user_id: selected.id,
      user_email: selected.email,
      type: (direction === "credit" ? "deposit" : "withdrawal") as "deposit" | "withdrawal",
      amount: amt,
      asset: category,
      txid: `${ADMIN_TAG} ${note || category.toLowerCase()}`.slice(0, 200),
      status: "approved",
      timestamp: Date.now(),
    };
    const { error: insErr } = await supabase.from("transactions").insert([payload]);
    if (insErr) {
      setBusy(false);
      return toast.error(insErr.message);
    }
    const { error: rpcErr } = await supabase.rpc("increment_balance", {
      p_user_id: selected.id,
      p_amount: signed,
    });
    setBusy(false);
    if (rpcErr) {
      toast.error("Balance update failed: " + rpcErr.message);
      return;
    }
    toast.success(`${direction === "credit" ? "Credited" : "Debited"} $${amt.toFixed(2)} ${category}`);
    setAmount("");
    setNote("");
  };

  const reverse = async (tx: Tx) => {
    if (!selected) return;
    if (!confirm(`Reverse ${tx.type === "deposit" ? "+" : "-"}$${tx.amount} ${tx.asset}?`)) return;
    const counterType = tx.type === "deposit" ? "withdrawal" : "deposit";
    const signed = tx.type === "deposit" ? -tx.amount : tx.amount;
    if (signed < 0 && selected.balance + signed < 0)
      return toast.error("Reversal would make balance negative");
    const { error } = await supabase.from("transactions").insert([
      {
        id: Math.random().toString(36).slice(2, 10),
        user_id: tx.user_id,
        user_email: tx.user_email,
        type: counterType,
        amount: tx.amount,
        asset: tx.asset,
        txid: `${ADMIN_TAG} REVERSAL of ${tx.id}`,
        status: "approved",
        timestamp: Date.now(),
      },
    ]);
    if (error) return toast.error(error.message);
    const { error: rpcErr } = await supabase.rpc("increment_balance", {
      p_user_id: tx.user_id,
      p_amount: signed,
    });
    if (rpcErr) return toast.error(rpcErr.message);
    toast.success("Reversed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-white font-['Outfit']">Balance Operations</h1>
        <p className="text-sm text-gray-500">Manually credit profit, bonuses, deposits, or adjustments.</p>
      </div>

      <div className="grid lg:grid-cols-[350px_1fr] gap-6">
        {/* User picker */}
        <div className="bg-[#0a0f1c] border border-white/5 p-5 rounded-sm flex flex-col h-[600px]">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-[#070b14] border border-white/10 pl-9 pr-3 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#00d4aa]/50 transition-colors rounded-sm"
            />
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filtered.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelected(u)}
                className={`w-full text-left px-4 py-3 rounded-sm text-xs transition-all border ${
                  selected?.id === u.id 
                    ? "bg-[#00d4aa]/10 border-[#00d4aa]/30 text-white shadow-[0_0_15px_rgba(0,212,170,0.1)]" 
                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className={`font-medium truncate ${selected?.id === u.id ? 'text-[#00d4aa]' : 'text-white'}`}>
                    {u.name || 'Unnamed User'}
                  </div>
                  <div className={`text-[10px] font-mono ${selected?.id === u.id ? 'text-white' : 'text-gray-500'}`}>
                    ${Number(u.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 truncate">{u.email}</div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                <Users className="w-8 h-8 mb-2 opacity-20" />
                <div className="text-xs">No users found</div>
              </div>
            )}
          </div>
        </div>

        {/* Form + history */}
        <div className="space-y-6">
          {!selected ? (
            <div className="bg-[#0a0f1c] border border-white/5 p-12 rounded-sm flex flex-col items-center justify-center text-gray-500 min-h-[300px]">
              <Wallet className="w-12 h-12 mb-4 opacity-20" />
              <div className="text-sm tracking-wide">Select a user to manage their balance</div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-br from-[#0a0f1c] to-[#070b14] border border-[#00d4aa]/20 p-6 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4aa]/5 blur-2xl rounded-full" />
                <div className="flex items-baseline justify-between mb-6 relative z-10">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#00d4aa] font-bold mb-1">Current Balance</div>
                    <div className="text-3xl font-light text-white font-mono">
                      ${Number(selected.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-400 mb-1">{selected.name || 'User'}</div>
                    <div className="text-[10px] text-gray-600 font-mono bg-black/40 px-2 py-1 rounded-sm border border-white/5">
                      {selected.id.slice(0, 12)}…
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                  <Field label="Category">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full bg-[#070b14] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#00d4aa]/50 transition-colors rounded-sm"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Direction">
                    <div className="flex gap-2">
                      {(["credit", "debit"] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDirection(d)}
                          className={`flex-1 px-4 py-3 text-xs uppercase tracking-widest rounded-sm border transition-all font-bold ${
                            direction === d
                              ? d === "credit"
                                ? "border-[#00d4aa]/50 bg-[#00d4aa]/10 text-[#00d4aa] shadow-[0_0_10px_rgba(0,212,170,0.1)]"
                                : "border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                              : "border-white/10 text-gray-500 hover:bg-white/5 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {d === "credit" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {d}
                          </div>
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Amount (USD)">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#070b14] border border-white/10 pl-8 pr-4 py-3 text-sm text-white outline-none focus:border-[#00d4aa]/50 transition-colors rounded-sm font-mono"
                      />
                    </div>
                  </Field>
                  <Field label="Admin Note (Optional)">
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. VIP deposit bonus"
                      maxLength={160}
                      className="w-full bg-[#070b14] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#00d4aa]/50 transition-colors rounded-sm"
                    />
                  </Field>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 relative z-10">
                  <button
                    onClick={submit}
                    disabled={busy || !amount || Number(amount) <= 0}
                    className={`flex-1 w-full sm:w-auto px-6 py-3.5 text-[12px] uppercase tracking-widest font-bold rounded-sm transition-all flex items-center justify-center gap-2 ${
                      !amount || Number(amount) <= 0 || busy
                        ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                        : direction === 'credit'
                          ? 'bg-[#00d4aa] text-[#070b14] hover:bg-[#00b38f] shadow-[0_0_15px_rgba(0,212,170,0.3)]'
                          : 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    }`}
                  >
                    {busy ? (
                      <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Processing...</>
                    ) : (
                      <>Apply {direction === "credit" ? "Credit" : "Debit"}</>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-[#0a0f1c] border border-white/5 rounded-sm">
                <div className="px-5 py-3 border-b border-white/5 text-xs uppercase tracking-widest text-gray-400">
                  Admin Activity ({adminOps.length})
                </div>
                <div className="divide-y divide-white/5 max-h-[360px] overflow-y-auto">
                  {adminOps.length === 0 && (
                    <div className="px-5 py-6 text-xs text-gray-600">No admin entries yet.</div>
                  )}
                  {adminOps.map((tx) => (
                    <div key={tx.id} className="px-5 py-3 flex items-center gap-3 text-xs">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-widest bg-white/5 text-gray-300 rounded-sm">
                            {tx.asset}
                          </span>
                          <span
                            className={`font-mono ${tx.type === "deposit" ? "text-emerald-400" : "text-red-400"}`}
                          >
                            {tx.type === "deposit" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-gray-500 truncate mt-0.5">{tx.txid}</div>
                        <div className="text-[10px] text-gray-600 mt-0.5">
                          {new Date(Number(tx.timestamp)).toLocaleString()}
                        </div>
                      </div>
                      {!tx.txid.includes("REVERSAL") && (
                        <button
                          onClick={() => reverse(tx)}
                          className="px-3 py-1.5 text-[10px] uppercase tracking-widest border border-white/10 text-gray-300 hover:bg-white/5 rounded-sm"
                        >
                          Reverse
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
