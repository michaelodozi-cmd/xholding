import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Profile = { id: string; email: string; name: string | null; role: string };
type Investment = {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  daily_roi: number;
  duration_days: number;
  status: string;
  created_at: string;
};

const CATEGORIES = ["Copy Trading", "Growth Plan"] as const;
const STATUSES = ["active", "pending", "completed"] as const;

export default function UserPlansTab() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Profile | null>(null);
  const [plans, setPlans] = useState<Investment[]>([]);

  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Copy Trading");
  const [planName, setPlanName] = useState("");
  const [amount, setAmount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [dailyRoi, setDailyRoi] = useState("1");
  const [duration, setDuration] = useState("30");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("active");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id,email,name,role")
      .neq("role", "admin")
      .order("email")
      .then(({ data }) => setUsers(data || []));
  }, []);

  useEffect(() => {
    if (!selected) return setPlans([]);
    const load = async () => {
      const { data } = await supabase
        .from("investments")
        .select("*")
        .eq("user_id", selected.id)
        .order("created_at", { ascending: false });
      setPlans((data || []) as Investment[]);
    };
    load();
    const ch = supabase
      .channel(`up_${selected.id}_${Math.random()}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "investments", filter: `user_id=eq.${selected.id}` },
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

  const validate = () => {
    if (!selected) return "Select a user";
    if (!planName.trim()) return "Plan name required";
    const a = Number(amount);
    if (!isFinite(a) || a <= 0) return "Investment amount must be > 0";
    if (currentBalance && (!isFinite(Number(currentBalance)) || Number(currentBalance) < 0))
      return "Current balance must be ≥ 0";
    const r = Number(dailyRoi);
    if (!isFinite(r) || r < 0) return "Daily ROI must be ≥ 0";
    const d = Number(duration);
    if (!isFinite(d) || d <= 0) return "Duration must be > 0 days";
    if (!startDate) return "Start date required";
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) return toast.error(err);
    setBusy(true);
    const a = Number(amount);
    const bal = currentBalance ? Number(currentBalance) : a;
    const startIso = new Date(startDate).toISOString();
    const fullName = `${category}: ${planName.trim()}`;

    const { error } = await supabase.from("investments").insert([
      {
        user_id: selected!.id,
        plan_name: fullName,
        amount: a,
        daily_roi: Number(dailyRoi),
        duration_days: Number(duration),
        status,
        created_at: startIso,
      },
    ]);

    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }

    // Reflect "current balance" as a profit credit so dashboard balance moves immediately
    const delta = bal - a;
    if (delta !== 0) {
      const tx = {
        id: Math.random().toString(36).slice(2, 10),
        user_id: selected!.id,
        user_email: selected!.email,
        type: (delta > 0 ? "deposit" : "withdrawal") as "deposit" | "withdrawal",
        amount: Math.abs(delta),
        asset: "PROFIT",
        txid: `[ADMIN] Plan opening balance — ${fullName}`,
        status: "approved",
        timestamp: Date.now(),
      };
      await supabase.from("transactions").insert([tx]);
      await supabase.rpc("increment_balance", { p_user_id: selected!.id, p_amount: delta });
    }

    setBusy(false);
    toast.success(`Assigned ${fullName}`);
    setPlanName("");
    setAmount("");
    setCurrentBalance("");
  };

  const updateStatus = async (id: string, s: string) => {
    const { error } = await supabase.from("investments").update({ status: s }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Marked ${s}`);
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this plan assignment?")) return;
    const { error } = await supabase.from("investments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Removed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-white font-['Outfit']">Manage User Plans</h1>
        <p className="text-sm text-gray-500">
          Assign Copy Trading or Growth plans manually. Appears on the user's dashboard instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="bg-[#131714] border border-white/5 p-4 rounded-2xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, or user ID…"
            className="w-full bg-black/20 border border-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#13c74b]/50"
          />
          <div className="mt-3 max-h-[420px] overflow-y-auto space-y-1">
            {filtered.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelected(u)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                  selected?.id === u.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <div className="font-medium text-white truncate">{u.name || u.email}</div>
                <div className="text-[10px] text-gray-500 truncate">{u.email}</div>
              </button>
            ))}
            {filtered.length === 0 && <div className="text-xs text-gray-600 px-3 py-4">No users</div>}
          </div>
        </div>

        <div className="space-y-4">
          {!selected ? (
            <div className="bg-[#131714] border border-white/5 p-10 rounded-2xl text-center text-sm text-gray-500">
              Select a user to assign a plan.
            </div>
          ) : (
            <>
              <div className="bg-[#131714] border border-white/5 p-5 rounded-2xl">
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                  Assign New Plan — {selected.name || selected.email}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <F label="Plan Type">
                    <select value={category} onChange={(e) => setCategory(e.target.value as any)} className={inp}>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </F>
                  <F label="Plan Name">
                    <input value={planName} onChange={(e) => setPlanName(e.target.value)} className={inp} placeholder="e.g. Aggressive Q1" maxLength={80} />
                  </F>
                  <F label="Investment Amount (USD)">
                    <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className={inp} />
                  </F>
                  <F label="Current Balance (USD)">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      placeholder="Defaults to investment amount"
                      className={inp}
                    />
                  </F>
                  <F label="Daily ROI (%)">
                    <input type="number" min="0" step="0.01" value={dailyRoi} onChange={(e) => setDailyRoi(e.target.value)} className={inp} />
                  </F>
                  <F label="Duration (days)">
                    <input type="number" min="1" step="1" value={duration} onChange={(e) => setDuration(e.target.value)} className={inp} />
                  </F>
                  <F label="Start Date">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inp} />
                  </F>
                  <F label="Status">
                    <select value={status} onChange={(e) => setStatus(e.target.value as any)} className={inp}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </F>
                </div>
                <button
                  onClick={submit}
                  disabled={busy}
                  className="mt-4 px-6 py-2.5 bg-[#13c74b] text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#10a13c] disabled:opacity-50"
                >
                  {busy ? "Assigning…" : "Assign Plan"}
                </button>
              </div>

              <div className="bg-[#131714] border border-white/5 rounded-2xl">
                <div className="px-5 py-3 border-b border-white/5 text-xs uppercase tracking-widest text-gray-400">
                  Existing Plans ({plans.length})
                </div>
                <div className="divide-y divide-white/5 max-h-[360px] overflow-y-auto">
                  {plans.length === 0 && <div className="px-5 py-6 text-xs text-gray-600">No plans assigned.</div>}
                  {plans.map((p) => (
                    <div key={p.id} className="px-5 py-3 flex items-center gap-3 text-xs">
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{p.plan_name}</div>
                        <div className="text-gray-500 mt-0.5">
                          ${Number(p.amount).toFixed(2)} · {p.daily_roi}%/day · {p.duration_days}d ·{" "}
                          {new Date(p.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <select
                        value={p.status}
                        onChange={(e) => updateStatus(p.id, e.target.value)}
                        className="bg-black/20 border border-white/5 px-2 py-1 text-[10px] uppercase tracking-widest text-white rounded-2xl"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => remove(p.id)}
                        className="px-2 py-1 text-[10px] uppercase tracking-widest border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-2xl"
                      >
                        Remove
                      </button>
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

const inp =
  "w-full bg-black/20 border border-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#13c74b]/50";

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
