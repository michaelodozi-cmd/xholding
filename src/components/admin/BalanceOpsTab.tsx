import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${selected.id}` },
        ({ new: n }: any) => setSelected((s) => (s ? { ...s, balance: n.balance } : s)),
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

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* User picker */}
        <div className="bg-[#0a0f1c] border border-white/5 p-4 rounded-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, or user ID…"
            className="w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-white/30"
          />
          <div className="mt-3 max-h-[420px] overflow-y-auto space-y-1">
            {filtered.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelected(u)}
                className={`w-full text-left px-3 py-2 rounded-sm text-xs transition-colors ${
                  selected?.id === u.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <div className="font-medium text-white truncate">{u.name || u.email}</div>
                <div className="text-[10px] text-gray-500 truncate">{u.email}</div>
                <div className="text-[10px] text-emerald-400 mt-1">${Number(u.balance || 0).toFixed(2)}</div>
              </button>
            ))}
            {filtered.length === 0 && <div className="text-xs text-gray-600 px-3 py-4">No users</div>}
          </div>
        </div>

        {/* Form + history */}
        <div className="space-y-4">
          {!selected ? (
            <div className="bg-[#0a0f1c] border border-white/5 p-10 rounded-sm text-center text-sm text-gray-500">
              Select a user to manage their balance.
            </div>
          ) : (
            <>
              <div className="bg-[#0a0f1c] border border-white/5 p-5 rounded-sm">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500">Current Balance</div>
                    <div className="text-2xl font-light text-white">${Number(selected.balance || 0).toFixed(2)}</div>
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">{selected.id.slice(0, 8)}…</div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Category">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-white outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Direction">
                    <div className="flex gap-2">
                      {(["credit", "debit"] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDirection(d)}
                          className={`flex-1 px-3 py-2 text-xs uppercase tracking-widest rounded-sm border ${
                            direction === d
                              ? d === "credit"
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                                : "border-red-500/50 bg-red-500/10 text-red-300"
                              : "border-white/10 text-gray-500"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Amount (USD)">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-white outline-none"
                    />
                  </Field>
                  <Field label="Admin note">
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Optional"
                      maxLength={160}
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-sm text-white outline-none"
                    />
                  </Field>
                </div>

                <button
                  onClick={submit}
                  disabled={busy}
                  className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-white/90 disabled:opacity-50"
                >
                  {busy ? "Applying…" : `Apply ${direction === "credit" ? "credit" : "debit"}`}
                </button>
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
            </>
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
