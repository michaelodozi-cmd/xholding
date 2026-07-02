import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  Activity,
  DollarSign,
  Calendar,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

type Investment = {
  plan_name: string;
  amount: number;
  daily_roi: number;
  duration_days?: number;
  created_at: string;
};

interface ActiveInvestmentsChartProps {
  investments: Investment[];
}

export default function ActiveInvestmentsChart({ investments }: ActiveInvestmentsChartProps) {
  const [viewMode, setViewMode] = useState<'curve' | 'comparison'>('curve');
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(30); // 14, 30, 60 days

  if (!investments || investments.length === 0) return null;

  // 1. Calculate Summary Metrics
  let totalPrincipal = 0;
  let totalEarned = 0;
  let totalProjectedProfit = 0;
  let weightedDailyRoiSum = 0;

  investments.forEach((inv) => {
    const daysPassed = Math.max(0, (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
    const duration = inv.duration_days || 60;
    const validDays = Math.min(daysPassed, duration);
    
    const earned = inv.amount * inv.daily_roi * validDays;
    const projectedProfit = inv.amount * inv.daily_roi * duration;

    totalPrincipal += inv.amount;
    totalEarned += earned;
    totalProjectedProfit += projectedProfit;
    weightedDailyRoiSum += inv.amount * inv.daily_roi;
  });

  const avgDailyRoi = totalPrincipal > 0 ? (weightedDailyRoiSum / totalPrincipal) * 100 : 0;
  const totalProjectedPayout = totalPrincipal + totalProjectedProfit;

  // 2. Build Daily Progression Simulation Data (Day 0 to selectedTimeframe)
  const curveData = [];
  for (let day = 0; day <= selectedTimeframe; day += 2) {
    let dayPrincipal = 0;
    let dayProfit = 0;

    investments.forEach((inv) => {
      const duration = inv.duration_days || 60;
      const simDays = Math.min(day, duration);
      dayPrincipal += inv.amount;
      dayProfit += inv.amount * inv.daily_roi * simDays;
    });

    curveData.push({
      day: `Day ${day}`,
      dayNumber: day,
      Principal: Math.round(dayPrincipal * 100) / 100,
      Profit: Math.round(dayProfit * 100) / 100,
      TotalValue: Math.round((dayPrincipal + dayProfit) * 100) / 100,
    });
  }

  // 3. Build Plan-by-Plan Comparison Data
  const comparisonData = investments.map((inv, idx) => {
    const daysPassed = Math.max(0, (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
    const duration = inv.duration_days || 60;
    const validDays = Math.min(daysPassed, duration);
    const earned = inv.amount * inv.daily_roi * validDays;
    const totalProfit = inv.amount * inv.daily_roi * duration;

    return {
      name: inv.plan_name.length > 15 ? inv.plan_name.slice(0, 15) + '...' : inv.plan_name,
      Principal: inv.amount,
      EarnedSoFar: Math.round(earned * 100) / 100,
      RemainingProfit: Math.round((totalProfit - earned) * 100) / 100,
      dailyRate: (inv.daily_roi * 100).toFixed(1) + '%',
      progress: Math.round((validDays / duration) * 100),
    };
  });

  // Custom Institutional Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111613]/95 border border-[#13c74b]/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md min-w-[200px]">
          <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between border-b border-white/10 pb-1.5">
            <span>{label}</span>
            <span className="text-[#13c74b] text-[10px] font-mono">Live Quant</span>
          </div>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between text-xs gap-4">
                <span className="flex items-center gap-1.5 font-medium text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-mono font-extrabold text-white">
                  ${Number(entry.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-b from-[#161c18] to-[#111613] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden my-8 animate-in fade-in duration-500">
      {/* Background Neon Glow Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#13c74b]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#13c74b]/15 border border-[#13c74b]/30 text-[#13c74b] text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13c74b] animate-pulse" />
              Realtime Quant Analytics
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-[#13c74b]" />
            Active Portfolio Performance & Yield Curve
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Visualizing live principal allocation, daily compounding yield trajectories, and maturity payout schedules.
          </p>
        </div>

        {/* Chart View Toggle Buttons */}
        <div className="flex items-center gap-2 bg-[#181f1a] p-1 rounded-2xl border border-white/10 self-start lg:self-auto shrink-0">
          <button
            onClick={() => setViewMode('curve')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'curve'
                ? 'bg-[#13c74b] text-black shadow-[0_0_15px_rgba(19,199,75,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Yield Progression Curve</span>
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'comparison'
                ? 'bg-[#13c74b] text-black shadow-[0_0_15px_rgba(19,199,75,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Plan Allocation</span>
          </button>
        </div>
      </div>

      {/* 4 Executive Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 relative z-10">
        <div className="bg-[#1a221d]/80 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#13c74b]/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2 font-medium">
            <span>Invested Principal</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-2xl font-black text-white font-mono">
            ${totalPrincipal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-bold">100% Segregated</span> capital
          </div>
        </div>

        <div className="bg-[#1a221d]/80 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#13c74b]/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2 font-medium">
            <span>Accrued Profit (To Date)</span>
            <Sparkles className="w-4 h-4 text-[#13c74b]" />
          </div>
          <div className="text-lg sm:text-2xl font-black text-[#13c74b] font-mono">
            +${totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-[#13c74b]" />
            <span className="text-[#13c74b] font-bold">+{totalPrincipal > 0 ? ((totalEarned / totalPrincipal) * 100).toFixed(2) : '0'}%</span> return generated
          </div>
        </div>

        <div className="bg-[#1a221d]/80 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#13c74b]/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2 font-medium">
            <span>Weighted Daily ROI</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-lg sm:text-2xl font-black text-white font-mono">
            {avgDailyRoi.toFixed(2)}% <span className="text-xs text-gray-400 font-normal">/ day</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Automated quant yield compounding
          </div>
        </div>

        <div className="bg-[#1a221d]/80 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#13c74b]/40 transition-all">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2 font-medium">
            <span>Projected Maturity Payout</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono">
            ${totalProjectedPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Total principal + guaranteed yield
          </div>
        </div>
      </div>

      {/* Chart Workspace Container */}
      <div className="bg-[#0f1411] border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 relative z-10">
        {viewMode === 'curve' && (
          <div className="flex items-center justify-end gap-2 mb-4">
            <span className="text-xs text-gray-400 font-bold">Simulation Horizon:</span>
            {[14, 30, 60].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedTimeframe(days)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedTimeframe === days
                    ? 'bg-[#13c74b]/20 text-[#13c74b] border border-[#13c74b]/40'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {days} Days
              </button>
            ))}
          </div>
        )}

        <div className="w-full h-[320px] sm:h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'curve' ? (
              <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13c74b" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#13c74b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="Principal"
                  name="Protected Principal Capital"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#principalGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="Profit"
                  name="Accrued Cumulative Profit"
                  stroke="#13c74b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#profitGradient)"
                />
              </AreaChart>
            ) : (
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
                <Bar dataKey="Principal" name="Invested Principal" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="EarnedSoFar" name="Profit Earned To-Date" fill="#13c74b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="RemainingProfit" name="Remaining Maturity Yield" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* "To See and Read" Detail Table & Maturity Schedule */}
      <div className="relative z-10">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#13c74b]" />
          Detailed Plan Progression & Milestone Schedule
        </h3>
        
        <div className="bg-[#181f1a] border border-white/10 rounded-2xl overflow-hidden shadow-inner">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-black/40 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-400 font-extrabold">
                  <th className="p-3.5 pl-5">Investment Plan</th>
                  <th className="p-3.5">Principal</th>
                  <th className="p-3.5">Daily ROI</th>
                  <th className="p-3.5">Earned Profit</th>
                  <th className="p-3.5">Duration Elapsed</th>
                  <th className="p-3.5 pr-5">Milestone Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium text-gray-300">
                {investments.map((inv, idx) => {
                  const daysPassed = Math.max(0, (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
                  const duration = inv.duration_days || 60;
                  const validDays = Math.min(daysPassed, duration);
                  const earned = inv.amount * inv.daily_roi * validDays;
                  const progress = Math.min(100, Math.round((validDays / duration) * 100));

                  return (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 pl-5 font-extrabold text-white flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#13c74b] shrink-0 animate-pulse" />
                        <span>{inv.plan_name}</span>
                      </td>
                      <td className="p-3.5 font-mono text-white">
                        ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-3.5 text-[#13c74b] font-extrabold">
                        {(inv.daily_roi * 100).toFixed(1)}% <span className="text-[10px] text-gray-500 font-normal">/ day</span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-[#13c74b]">
                        +${earned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-3.5">
                        <span className="text-white font-bold">{Math.floor(validDays)}</span> / {duration} Days
                      </td>
                      <td className="p-3.5 pr-5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-black/50 h-2 rounded-full overflow-hidden w-24 border border-white/5">
                            <div
                              className="h-full bg-gradient-to-r from-[#13c74b]/60 to-[#13c74b] rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-gray-400 font-bold w-9 text-right">{progress}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
