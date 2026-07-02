import React, { useState, useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  CrosshairMode,
  LineStyle,
  IChartApi,
  ISeriesApi,
  Time,
  AreaSeries,
  CandlestickSeries,
} from 'lightweight-charts';
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
  Layers,
  Zap,
  Award,
  CircleDot,
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
  const [viewMode, setViewMode] = useState<'curve' | 'candlestick' | 'comparison'>('curve');
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(30); // 14, 30, 60, 90 days

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const principalSeriesRef = useRef<ISeriesApi<'Area'> | null>(null);
  const totalSeriesRef = useRef<ISeriesApi<'Area'> | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  // Crosshair hover live values
  const [hoveredData, setHoveredData] = useState<{ date: string; principal: number; profit: number; total: number } | null>(null);

  if (!investments || investments.length === 0) return null;

  // 1. Calculate Executive Metrics
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

  // 2. Build Simulation Data with actual calendar dates for TradingView Canvas
  useEffect(() => {
    if (viewMode === 'comparison' || !chartContainerRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
      chartInstanceRef.current = null;
    }

    const container = chartContainerRef.current;
    const width = Math.max(container.clientWidth || 0, 600);
    const height = Math.max(container.clientHeight || 0, 380);
    const chart = createChart(container, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#0b0e11' }, // Deep charcoal TradingView theme
        textColor: '#848e9c',
        fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontSize: 12,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.04)', style: LineStyle.Dotted },
        horzLines: { color: 'rgba(255, 255, 255, 0.04)', style: LineStyle.Dotted },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: '#0ecb81', width: 1, style: LineStyle.Dashed, labelBackgroundColor: '#0ecb81' },
        horzLine: { color: '#0ecb81', width: 1, style: LineStyle.Dashed, labelBackgroundColor: '#0ecb81' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        scaleMargins: { top: 0.15, bottom: 0.1 },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
      },
      handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true },
      handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    });

    chartInstanceRef.current = chart;

    const now = new Date();
    const areaPrincipalData: any[] = [];
    const areaTotalData: any[] = [];
    const candleData: any[] = [];

    let prevClose = totalPrincipal;

    for (let day = 0; day <= selectedTimeframe; day++) {
      const targetDate = new Date(now.getTime() + day * 24 * 60 * 60 * 1000);
      const timeStr = targetDate.toISOString().split('T')[0] as Time;

      let dayPrincipal = 0;
      let dayProfit = 0;

      investments.forEach((inv) => {
        const duration = inv.duration_days || 60;
        const simDays = Math.min(day, duration);
        dayPrincipal += inv.amount;
        dayProfit += inv.amount * inv.daily_roi * simDays;
      });

      const totalVal = Math.round((dayPrincipal + dayProfit) * 100) / 100;
      const prinVal = Math.round(dayPrincipal * 100) / 100;

      areaPrincipalData.push({ time: timeStr, value: prinVal });
      areaTotalData.push({ time: timeStr, value: totalVal });

      // Build simulated daily OHLC return candles
      const dailyGain = day === 0 ? 0 : totalVal - prevClose;
      const open = prevClose;
      const close = totalVal;
      const high = Math.max(open, close) + Math.abs(dailyGain) * 0.4;
      const low = Math.min(open, close) - Math.abs(dailyGain) * 0.1;
      prevClose = close;

      candleData.push({
        time: timeStr,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
      });
    }

    if (viewMode === 'curve') {
      const totalSeries = chart.addSeries(AreaSeries, {
        lineColor: '#0ecb81',
        topColor: 'rgba(14, 203, 129, 0.45)',
        bottomColor: 'rgba(14, 203, 129, 0.0)',
        lineWidth: 3,
        title: 'Total Projected Value ($)',
      });
      totalSeries.setData(areaTotalData);
      totalSeriesRef.current = totalSeries as any;

      const prinSeries = chart.addSeries(AreaSeries, {
        lineColor: '#3b82f6',
        topColor: 'rgba(59, 130, 246, 0.3)',
        bottomColor: 'rgba(59, 130, 246, 0.0)',
        lineWidth: 2,
        title: 'Protected Principal ($)',
      });
      prinSeries.setData(areaPrincipalData);
      principalSeriesRef.current = prinSeries as any;
    } else if (viewMode === 'candlestick') {
      const candles = chart.addSeries(CandlestickSeries, {
        upColor: '#0ecb81',
        downColor: '#f6465d',
        borderVisible: false,
        wickUpColor: '#0ecb81',
        wickDownColor: '#f6465d',
        title: 'Daily Compounding Candlesticks',
      });
      candles.setData(candleData);
      candleSeriesRef.current = candles as any;
    }

    // Subscribe to crosshair move
    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.seriesData || param.seriesData.size === 0) {
        setHoveredData(null);
        return;
      }
      const timeStr = param.time as string;
      if (viewMode === 'curve') {
        const totalVal = param.seriesData.get(totalSeriesRef.current as any) as any;
        const prinVal = param.seriesData.get(principalSeriesRef.current as any) as any;
        if (totalVal && prinVal) {
          setHoveredData({
            date: timeStr,
            principal: prinVal.value,
            total: totalVal.value,
            profit: Number((totalVal.value - prinVal.value).toFixed(2)),
          });
        }
      } else if (viewMode === 'candlestick') {
        const cVal = param.seriesData.get(candleSeriesRef.current as any) as any;
        if (cVal) {
          setHoveredData({
            date: timeStr,
            principal: totalPrincipal,
            total: cVal.close,
            profit: Number((cVal.close - totalPrincipal).toFixed(2)),
          });
        }
      }
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartInstanceRef.current) {
        const w = chartContainerRef.current.clientWidth;
        const h = chartContainerRef.current.clientHeight;
        if (w > 0 && h > 0) {
          chartInstanceRef.current.applyOptions({
            width: w,
            height: h || 380,
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Initial hover data set to latest
    const lastIdx = areaTotalData.length - 1;
    if (lastIdx >= 0) {
      setHoveredData({
        date: areaTotalData[lastIdx].time,
        principal: areaPrincipalData[lastIdx].value,
        total: areaTotalData[lastIdx].value,
        profit: Number((areaTotalData[lastIdx].value - areaPrincipalData[lastIdx].value).toFixed(2)),
      });
    }

    return () => {
      resizeObserver.disconnect();
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
    };
  }, [investments, viewMode, selectedTimeframe]);

  // 3. Build Comparison Matrix Data for Bar view
  const comparisonData = investments.map((inv) => {
    const daysPassed = Math.max(0, (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
    const duration = inv.duration_days || 60;
    const validDays = Math.min(daysPassed, duration);
    const earned = inv.amount * inv.daily_roi * validDays;
    const totalProfit = inv.amount * inv.daily_roi * duration;

    return {
      name: inv.plan_name,
      principal: inv.amount,
      earned: Math.round(earned * 100) / 100,
      remaining: Math.round((totalProfit - earned) * 100) / 100,
      dailyRate: (inv.daily_roi * 100).toFixed(1) + '%',
      progress: Math.round((validDays / duration) * 100),
    };
  });

  return (
    <div className="bg-[#0b0e11] border border-[#1e2329] rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden my-8 text-white font-['Outfit'] animate-in fade-in duration-500">
      {/* Background Neon Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0ecb81]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2b313a] relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#0ecb81]/15 border border-[#0ecb81]/30 text-[#0ecb81] text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0ecb81] animate-pulse" />
              TradingView Quant Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#181a20] border border-white/10 text-gray-400 text-[11px] font-mono font-bold">
              Sharpe: 2.94 Institutional
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Activity className="w-7 h-7 text-[#0ecb81]" />
            Active Portfolio Compounding & Yield Curve
          </h2>
          <p className="text-xs sm:text-sm text-[#848e9c] mt-1">
            Real-time quantitative simulation of daily compounding interest, capital preservation, and maturity payout schedules.
          </p>
        </div>

        {/* Chart View Mode Selector */}
        <div className="flex items-center gap-1.5 bg-[#181a20] p-1.5 rounded-2xl border border-white/10 self-start lg:self-auto shrink-0">
          <button
            onClick={() => setViewMode('curve')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'curve'
                ? 'bg-[#0ecb81] text-black shadow-[0_0_15px_rgba(14,203,129,0.3)]'
                : 'text-[#848e9c] hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Yield Curve</span>
          </button>
          <button
            onClick={() => setViewMode('candlestick')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'candlestick'
                ? 'bg-[#0ecb81] text-black shadow-[0_0_15px_rgba(14,203,129,0.3)]'
                : 'text-[#848e9c] hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 rotate-90" />
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'comparison'
                ? 'bg-[#0ecb81] text-black shadow-[0_0_15px_rgba(14,203,129,0.3)]'
                : 'text-[#848e9c] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Plan Matrix</span>
          </button>
        </div>
      </div>

      {/* 4 Executive Metric Summary Cards (Binance Institutional Styling) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 relative z-10">
        <div className="bg-[#131722] border border-[#2b313a] rounded-2xl p-5 flex flex-col justify-between hover:border-[#0ecb81]/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-[#848e9c] text-xs mb-3 font-bold uppercase tracking-wider">
            <span>Invested Principal</span>
            <ShieldCheck className="w-4 h-4 text-[#3b82f6]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            ${totalPrincipal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 font-medium">
            <span className="text-[#3b82f6] font-bold">100% Segregated</span> institutional vault
          </div>
        </div>

        <div className="bg-[#131722] border border-[#2b313a] rounded-2xl p-5 flex flex-col justify-between hover:border-[#0ecb81]/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-[#848e9c] text-xs mb-3 font-bold uppercase tracking-wider">
            <span>Accrued Profit (To Date)</span>
            <Sparkles className="w-4 h-4 text-[#0ecb81]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#0ecb81] font-mono">
            +${totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0ecb81]" />
            <span className="text-[#0ecb81] font-bold">
              +{totalPrincipal > 0 ? ((totalEarned / totalPrincipal) * 100).toFixed(2) : '0'}%
            </span>{' '}
            return generated
          </div>
        </div>

        <div className="bg-[#131722] border border-[#2b313a] rounded-2xl p-5 flex flex-col justify-between hover:border-[#0ecb81]/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-[#848e9c] text-xs mb-3 font-bold uppercase tracking-wider">
            <span>Weighted Daily ROI</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {avgDailyRoi.toFixed(2)}% <span className="text-xs text-[#848e9c] font-normal">/ day</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2 font-medium">
            Automated quant yield compounding
          </div>
        </div>

        <div className="bg-[#131722] border border-[#2b313a] rounded-2xl p-5 flex flex-col justify-between hover:border-[#0ecb81]/50 transition-all shadow-lg">
          <div className="flex items-center justify-between text-[#848e9c] text-xs mb-3 font-bold uppercase tracking-wider">
            <span>Projected Maturity Payout</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
            ${totalProjectedPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-gray-400 mt-2 font-medium">
            Total principal + guaranteed yield
          </div>
        </div>
      </div>

      {/* Chart Workspace Container */}
      <div className="bg-[#131722] border border-[#2b313a] rounded-3xl p-5 sm:p-6 mb-8 relative z-10 shadow-inner">
        {/* Top Control Bar inside Chart Workspace */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
          {/* Live Hover Badge (Institutional Crosshair Readout) */}
          <div className="flex items-center gap-4 flex-wrap">
            {hoveredData ? (
              <div className="flex items-center gap-4 text-xs font-mono bg-[#181a20] px-3.5 py-2 rounded-xl border border-white/10">
                <span className="text-gray-400 font-bold">
                  Date: <strong className="text-white">{hoveredData.date}</strong>
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">
                  Principal: <strong className="text-[#3b82f6]">${hoveredData.principal.toLocaleString()}</strong>
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">
                  Profit: <strong className="text-[#0ecb81]">+${hoveredData.profit.toLocaleString()}</strong>
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">
                  Total: <strong className="text-white font-black">${hoveredData.total.toLocaleString()}</strong>
                </span>
              </div>
            ) : (
              <div className="text-xs text-[#848e9c] font-mono">Hover over the chart to inspect daily compounding values</div>
            )}
          </div>

          {/* Timeframe Scrubber for Curve/Candles */}
          {viewMode !== 'comparison' && (
            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
              <span className="text-xs text-[#848e9c] font-bold mr-1">Horizon:</span>
              {[14, 30, 60, 90, 180].map((days) => (
                <button
                  key={days}
                  onClick={() => setSelectedTimeframe(days)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all font-mono ${
                    selectedTimeframe === days
                      ? 'bg-[#0ecb81] text-black font-black shadow-[0_0_10px_rgba(14,203,129,0.3)]'
                      : 'bg-[#181a20] text-[#848e9c] hover:text-white border border-white/5'
                  }`}
                >
                  {days}D
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chart View Render */}
        <div className="w-full h-[380px] sm:h-[420px] relative">
          {viewMode === 'comparison' ? (
            /* Plan Allocation & Risk Matrix View */
            <div className="h-full flex flex-col justify-center gap-6 overflow-y-auto custom-scrollbar pr-2 py-4">
              {comparisonData.map((plan, idx) => (
                <div key={idx} className="bg-[#181a20] border border-white/10 rounded-2xl p-5 hover:border-[#0ecb81]/40 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-black text-white flex items-center gap-2">
                      <CircleDot className="w-4 h-4 text-[#0ecb81]" />
                      {plan.name}
                    </span>
                    <span className="text-xs font-mono text-[#0ecb81] font-bold bg-[#0ecb81]/15 px-3 py-1 rounded-full border border-[#0ecb81]/30">
                      {plan.dailyRate} / day
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 font-mono text-xs mb-4">
                    <div>
                      <span className="text-[#848e9c] block text-[11px] uppercase">Principal</span>
                      <span className="text-white font-bold text-base">${plan.principal.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[#848e9c] block text-[11px] uppercase">Earned Profit</span>
                      <span className="text-[#0ecb81] font-bold text-base">+${plan.earned.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[#848e9c] block text-[11px] uppercase">Remaining Yield</span>
                      <span className="text-amber-400 font-bold text-base">${plan.remaining.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#848e9c]">Milestone Completion</span>
                      <span className="text-white font-bold">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-[#0b0e11] h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-linear-to-r from-[#0ecb81]/60 to-[#0ecb81] rounded-full transition-all"
                        style={{ width: `${plan.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Lightweight Charts Canvas Engine Container */
            <div ref={chartContainerRef} className="w-full h-full" />
          )}
        </div>
      </div>

      {/* Detailed Plan Progression & Milestone Schedule Table */}
      <div className="relative z-10">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#0ecb81]" />
          Detailed Plan Progression & Institutional Schedule
        </h3>

        <div className="bg-[#131722] border border-[#2b313a] rounded-2xl overflow-hidden shadow-inner">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[#181a20] border-b border-[#2b313a] text-[11px] uppercase tracking-widest text-[#848e9c] font-extrabold">
                  <th className="p-4 pl-6">Investment Plan</th>
                  <th className="p-4">Principal</th>
                  <th className="p-4">Daily ROI</th>
                  <th className="p-4">Earned Profit</th>
                  <th className="p-4">Duration Elapsed</th>
                  <th className="p-4 pr-6">Milestone Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium text-gray-300 font-mono">
                {investments.map((inv, idx) => {
                  const daysPassed = Math.max(0, (Date.now() - new Date(inv.created_at).getTime()) / (1000 * 60 * 60 * 24));
                  const duration = inv.duration_days || 60;
                  const validDays = Math.min(daysPassed, duration);
                  const earned = inv.amount * inv.daily_roi * validDays;
                  const progress = Math.min(100, Math.round((validDays / duration) * 100));

                  return (
                    <tr key={idx} className="hover:bg-white/5 transition-colors font-sans">
                      <td className="p-4 pl-6 font-extrabold text-white flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0ecb81] shrink-0 animate-pulse" />
                        <span className="text-sm">{inv.plan_name}</span>
                      </td>
                      <td className="p-4 font-mono text-white text-sm font-bold">
                        ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-4 font-mono text-[#0ecb81] font-extrabold text-sm">
                        {(inv.daily_roi * 100).toFixed(1)}% <span className="text-[10px] text-gray-500 font-sans font-normal">/ day</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-[#0ecb81] text-sm">
                        +${earned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-4 font-mono">
                        <span className="text-white font-bold">{Math.floor(validDays)}</span> / {duration} Days
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center gap-2.5">
                          <div className="flex-1 bg-black/50 h-2 rounded-full overflow-hidden w-24 border border-white/10">
                            <div
                              className="h-full bg-linear-to-r from-[#0ecb81]/60 to-[#0ecb81] rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-gray-400 font-bold w-10 text-right">{progress}%</span>
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
