import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  createChart,
  ColorType,
  CrosshairMode,
  LineStyle,
  IChartApi,
  ISeriesApi,
  Time,
  CandlestickSeries,
  AreaSeries,
  HistogramSeries,
  LineSeries,
} from 'lightweight-charts';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart2,
  Maximize2,
  RefreshCw,
  Sliders,
  Layers,
  Zap,
  ChevronDown,
  Clock,
  ShieldCheck,
  Compass,
  Crosshair,
  Minus,
  Volume2,
  LineChart,
  CheckCircle2,
  Users,
  Award,
  DollarSign,
  Search,
  Sparkles,
  Check,
  Briefcase,
  X,
  Filter,
} from 'lucide-react';
import { supabase } from "../../lib/supabase";

// Wealth Asset Structure
export interface WealthAsset {
  id: string;
  symbol: string;
  name: string;
  category: 'Yield Plans' | 'Copy Traders' | 'Active Portfolios';
  basePrice: number; // Represents Base Capital or NAV Index
  change24h: number; // Daily ROI %
  high24h: number;
  low24h: number;
  volume24h: string; // Total AUM or Capital Inflows / Allocations
  subtitle?: string;
  risk?: string;
  protection?: string;
  rawObject?: any;
}

const DEFAULT_WEALTH_ASSETS: WealthAsset[] = [
  {
    id: 'FPS-01',
    symbol: 'Fidelity Prime Shield',
    name: '1.80% Daily Compounding Plan',
    category: 'Yield Plans',
    basePrice: 1000.00,
    change24h: 1.80,
    high24h: 2080.00,
    low24h: 1000.00,
    volume24h: '$420.5M',
    subtitle: '60-Day Lockup · Daily Dividend Payout',
    risk: 'Ultra-Low Risk',
    protection: '100% Principal Shielded',
  },
  {
    id: 'AQY-02',
    symbol: 'Alpha Quantitative Yield',
    name: '2.40% Daily Alpha Fund',
    category: 'Yield Plans',
    basePrice: 2500.00,
    change24h: 2.40,
    high24h: 6100.00,
    low24h: 2500.00,
    volume24h: '$680.2M',
    subtitle: '90-Day Lockup · High-Frequency Arbitrage',
    risk: 'Low-Medium Risk',
    protection: 'Institutional Reserve Protected',
  },
  {
    id: 'FGR-03',
    symbol: 'Fidelity Growth Compounder',
    name: '3.20% Institutional Tier-1 Plan',
    category: 'Yield Plans',
    basePrice: 5000.00,
    change24h: 3.20,
    high24h: 14600.00,
    low24h: 5000.00,
    volume24h: '$1.12B',
    subtitle: '120-Day Lockup · Automated Multi-Strategy',
    risk: 'Medium Risk',
    protection: 'Sovereign Guarantee Shield',
  },
  {
    id: 'GDP-04',
    symbol: 'Global Dividend Portfolio',
    name: '1.50% Flexible Wealth Plan',
    category: 'Yield Plans',
    basePrice: 500.00,
    change24h: 1.50,
    high24h: 950.00,
    low24h: 500.00,
    volume24h: '$890.4M',
    subtitle: '30-Day Lockup · Instant Liquidity Access',
    risk: 'Conservative',
    protection: '100% Principal Shielded',
  },
  {
    id: 'AW-QUANT',
    symbol: 'Alexander Wright',
    name: 'Quant High-Frequency Master',
    category: 'Copy Traders',
    basePrice: 2450.00,
    change24h: 2.85,
    high24h: 3120.00,
    low24h: 2100.00,
    volume24h: '$14.2M',
    subtitle: 'Win Rate: 94.2% · 1,420 Active Copiers',
    risk: 'Algorithmic Alpha',
    protection: 'Stop-Loss Auto Guard',
  },
  {
    id: 'ER-MACRO',
    symbol: 'Elena Rostova',
    name: 'Global Macro Yield Master',
    category: 'Copy Traders',
    basePrice: 1840.50,
    change24h: 1.95,
    high24h: 2200.00,
    low24h: 1700.00,
    volume24h: '$21.8M',
    subtitle: 'Win Rate: 91.8% · 2,180 Active Copiers',
    risk: 'Conservative Macro',
    protection: 'Hedging Shield Enabled',
  },
  {
    id: 'MV-ALPHA',
    symbol: 'Marcus Vance',
    name: 'Multi-Strategy Alpha Master',
    category: 'Copy Traders',
    basePrice: 3120.00,
    change24h: 3.40,
    high24h: 3900.00,
    low24h: 2800.00,
    volume24h: '$38.5M',
    subtitle: 'Win Rate: 89.5% · 980 Active Copiers',
    risk: 'Dynamic Growth',
    protection: 'Dynamic Drawdown Limit',
  },
  {
    id: 'SJ-ARB',
    symbol: 'Sarah Jenkins',
    name: 'Arbitrage Yield Fund Master',
    category: 'Copy Traders',
    basePrice: 1520.00,
    change24h: 1.45,
    high24h: 1800.00,
    low24h: 1400.00,
    volume24h: '$19.1M',
    subtitle: 'Win Rate: 96.0% · 3,410 Active Copiers',
    risk: 'Ultra-Low Volatility',
    protection: 'Market-Neutral Guarantee',
  },
];

// Helper to generate deterministic strictly ascending UTC dates
function generateHistoricalData(basePrice: number, days: number = 180, dailyRoi: number = 0.018) {
  const data = [];
  const volumeData = [];
  
  const now = new Date();
  const startUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - days);
  
  let currentNav = basePrice * 0.65;
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(startUtc + i * 86400000);
    const timeStr = date.toISOString().split('T')[0] as Time;
    
    // Smooth compounding upward drift with realistic daily micro-fluctuations
    const dailyGrowth = (dailyRoi / 100) * (0.85 + Math.random() * 0.3);
    const open = currentNav;
    const close = open * (1 + dailyGrowth);
    const high = Math.max(open, close) * (1 + Math.random() * 0.003);
    const low = Math.min(open, close) * (1 - Math.random() * 0.002);
    
    currentNav = close;
    
    const isUp = close >= open;
    const vol = Math.round((basePrice * 250) * (0.6 + Math.random() * 1.4));
    
    data.push({
      time: timeStr,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });

    volumeData.push({
      time: timeStr,
      value: vol,
      color: isUp ? 'rgba(14, 203, 129, 0.45)' : 'rgba(246, 70, 93, 0.45)',
    });
  }

  const ema20 = calculateEMA(data, 20);
  const ema50 = calculateEMA(data, 50);
  const ema200 = calculateEMA(data, 200);
  const bollinger = calculateBollingerBands(data, 20, 2);

  return { candles: data, volumes: volumeData, ema20, ema50, ema200, bollinger };
}

function calculateEMA(data: any[], period: number) {
  const k = 2 / (period + 1);
  let ema = data[0].close;
  return data.map((d, idx) => {
    if (idx === 0) {
      ema = d.close;
    } else {
      ema = d.close * k + ema * (1 - k);
    }
    return {
      time: d.time,
      value: Number(ema.toFixed(2)),
    };
  });
}

function calculateBollingerBands(data: any[], period: number = 20, multiplier: number = 2) {
  const upper: any[] = [];
  const lower: any[] = [];
  const middle: any[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upper.push({ time: data[i].time, value: data[i].close });
      lower.push({ time: data[i].time, value: data[i].close });
      middle.push({ time: data[i].time, value: data[i].close });
      continue;
    }
    const slice = data.slice(i - period + 1, i + 1);
    const sum = slice.reduce((acc, val) => acc + val.close, 0);
    const mean = sum / period;
    const variance = slice.reduce((acc, val) => acc + Math.pow(val.close - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);

    upper.push({ time: data[i].time, value: Number((mean + stdDev * multiplier).toFixed(2)) });
    lower.push({ time: data[i].time, value: Number((mean - stdDev * multiplier).toFixed(2)) });
    middle.push({ time: data[i].time, value: Number(mean.toFixed(2)) });
  }

  return { upper, lower, middle };
}

interface TradingViewMarketChartProps {
  investments?: any[];
  plans?: any[];
  copyTraders?: any[];
  copySubs?: any[];
  selectedPlan?: any | null;
  onSelectPlan?: (plan: any) => void;
  onSelectAsset?: (asset: WealthAsset) => void;
}

export default function TradingViewMarketChart({
  investments = [],
  plans = [],
  copyTraders = [],
  copySubs = [],
  selectedPlan = null,
  onSelectPlan,
  onSelectAsset,
}: TradingViewMarketChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const mainSeriesRef = useRef<ISeriesApi<'Candlestick' | 'Area'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  
  // Indicator Series Refs
  const ema20SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const ema50SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const ema200SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const bbUpperRef = useRef<ISeriesApi<'Line'> | null>(null);
  const bbLowerRef = useRef<ISeriesApi<'Line'> | null>(null);

  // Auto-fetch Database Plans & Master Traders if not provided
  const [dbPlans, setDbPlans] = useState<any[]>([]);
  const [dbTraders, setDbTraders] = useState<any[]>([]);
  
  useEffect(() => {
    supabase.from('plans').select('*').then(({ data }) => {
      if (data && data.length > 0) setDbPlans(data);
    });
    supabase.from('master_traders').select('*').eq('is_active', true).then(({ data }) => {
      if (data && data.length > 0) setDbTraders(data);
    });
  }, []);

  // Dynamic Wealth Assets List combining User Investments, Copy Trades, Plans, and Master Traders
  const allAssets = useMemo(() => {
    const list: WealthAsset[] = [];

    // 1. Map User's Active Portfolios (Investment Plans owned)
    if (investments && investments.length > 0) {
      investments.forEach((inv, idx) => {
        const amt = Number(inv.amount || 0);
        const roi = Number(inv.daily_roi || 0.018);
        const dur = Number(inv.duration_days || 60);
        list.push({
          id: inv.id || `active-${idx}`,
          symbol: inv.plan_name || 'Active Plan',
          name: `My Investment ($${amt.toLocaleString()})`,
          category: 'Active Portfolios',
          basePrice: amt,
          change24h: Number((roi * 100).toFixed(2)),
          high24h: Number((amt * (1 + roi * dur)).toFixed(2)),
          low24h: amt,
          volume24h: `$${amt.toLocaleString()}`,
          subtitle: 'Live Compounding Active Deposit',
          risk: 'Protected',
          protection: '100% Principal Shielded',
          rawObject: inv,
        });
      });
    }

    // 1b. Map User's Active Copy Trade Subscriptions
    if (copySubs && copySubs.length > 0) {
      copySubs.forEach((sub, idx) => {
        const amt = Number(sub.amount || 0);
        const pnl = Number(sub.total_pnl || 0);
        const traderName = sub.master_traders?.name || 'Master Strategy';
        list.push({
          id: sub.id || `copy-sub-${idx}`,
          symbol: traderName,
          name: `My Copy Portfolio ($${amt.toLocaleString()})`,
          category: 'Active Portfolios',
          basePrice: amt + Math.max(0, pnl),
          change24h: Number((sub.master_traders?.win_rate ? Number(sub.master_traders.win_rate) / 30 : 2.45).toFixed(2)),
          high24h: Number((amt * 1.8).toFixed(2)),
          low24h: amt,
          volume24h: `$${amt.toLocaleString()}`,
          subtitle: `Active Mirroring · PnL: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`,
          risk: 'Algorithmic Copy',
          protection: 'Stop-Loss Guard Active',
          rawObject: sub,
        });
      });
    }

    // 2. Map Investment Plans (props or db or fallback)
    const activePlansList = (plans && plans.length > 0) ? plans : (dbPlans.length > 0 ? dbPlans : null);
    if (activePlansList) {
      activePlansList.forEach((p) => {
        const rawRoi = Number(p.daily_roi || 0.018);
        const roi = rawRoi > 0.5 ? rawRoi / 100 : rawRoi;
        const roiPct = Number((roi * 100).toFixed(2));
        const dur = Number(p.duration_days || 60);
        const base = Number(p.min_amount || 1000);
        list.push({
          id: p.id,
          symbol: p.name,
          name: `${roiPct}% Daily Compounding Plan`,
          category: 'Yield Plans',
          basePrice: base,
          change24h: roiPct,
          high24h: Number((base * (1 + roi * dur)).toFixed(2)),
          low24h: base,
          volume24h: `$${((p.min_amount || 500) * 850).toLocaleString()}`,
          subtitle: `${dur}-Day Lockup · Daily Dividend Payout`,
          risk: roiPct > 2.5 ? 'Growth Alpha' : 'Ultra-Low Risk',
          protection: '100% Principal Shielded',
          rawObject: p,
        });
      });
    } else {
      list.push(...DEFAULT_WEALTH_ASSETS.filter((a) => a.category === 'Yield Plans'));
    }

    // 3. Map Master Copy Traders (props or db or fallback)
    const activeTradersList = (copyTraders && copyTraders.length > 0) ? copyTraders : (dbTraders.length > 0 ? dbTraders : null);
    if (activeTradersList) {
      activeTradersList.forEach((t) => {
        const winRate = Number(t.win_rate || 92.5);
        const totRet = Number(t.total_return || 310.0);
        const copiers = Number(t.copiers_count || 1250);
        list.push({
          id: t.id,
          symbol: t.name,
          name: `Quant Master (${winRate}% Win Rate)`,
          category: 'Copy Traders',
          basePrice: 2500.00,
          change24h: Number((totRet / 120).toFixed(2)),
          high24h: Number((2500 * (1 + totRet / 100)).toFixed(2)),
          low24h: 2100.00,
          volume24h: `$${(copiers * 14500).toLocaleString()}`,
          subtitle: `Total Return: +${totRet}% · ${copiers.toLocaleString()} Active Copiers`,
          risk: 'Algorithmic Alpha',
          protection: 'Stop-Loss Auto Guard',
          rawObject: t,
        });
      });
    } else {
      list.push(...DEFAULT_WEALTH_ASSETS.filter((a) => a.category === 'Copy Traders'));
    }

    return list;
  }, [investments, copySubs, plans, dbPlans, copyTraders, dbTraders]);

  // State
  const [selectedAsset, setSelectedAsset] = useState<WealthAsset>(() => allAssets[0] || DEFAULT_WEALTH_ASSETS[0]);
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1H' | '4H' | '1D' | '1W'>('1D');
  const [chartType, setChartType] = useState<'candlestick' | 'area'>('area');
  const [activeTab, setActiveTab] = useState<'chart' | 'allocations' | 'activity'>('chart');
  
  // Custom Interactive Symbol Picker State
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'Active Portfolios' | 'Yield Plans' | 'Copy Traders'>('ALL');
  
  // Indicators State
  const [showEMA, setShowEMA] = useState<boolean>(true);
  const [showBB, setShowBB] = useState<boolean>(false);
  const [showVolume, setShowVolume] = useState<boolean>(true);
  
  // Drawing tool selection
  const [activeTool, setActiveTool] = useState<'cursor' | 'trendline' | 'fib' | 'level' | 'position'>('cursor');

  // Live real-time NAV price state
  const [livePrice, setLivePrice] = useState<number>(selectedAsset.basePrice);
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);
  const [liveChange, setLiveChange] = useState<number>(selectedAsset.change24h);
  
  // Simulated Capital Allocations & Inflows
  const [inflows, setInflows] = useState<{ amount: number; source: string; time: string; tier: string }[]>([]);
  // Simulated Live Activity Stream
  const [liveActivity, setLiveActivity] = useState<{ id: string; title: string; detail: string; amount: string; time: string; type: 'dividend' | 'copy' | 'deposit' }[]>([]);

  // Sync when parent selects a plan
  useEffect(() => {
    if (selectedPlan) {
      const match = allAssets.find((a) => a.id === selectedPlan.id || a.symbol === selectedPlan.name);
      if (match) {
        setSelectedAsset(match);
        setLivePrice(match.basePrice);
        setLiveChange(match.change24h);
      }
    }
  }, [selectedPlan, allAssets]);

  // Update live allocations & activity feed when asset changes
  useEffect(() => {
    const base = selectedAsset.basePrice;
    const isCopy = selectedAsset.category === 'Copy Traders';
    
    const sources = isCopy 
      ? ['Apex Fund Mirroring #12', 'Private Wealth Client #88', 'Institutional Algo Copier', 'Fidelity Quant Pool', 'Family Office Trust #4']
      : ['Sovereign Wealth Trust #4', 'Private Family Office', 'Institutional Account #8921', 'Fidelity Prime Reserve', 'Alpha Quant Syndicate'];
    
    const initialInflows = Array.from({ length: 8 }).map((_, idx) => ({
      amount: Math.round(base * (5 + idx * 4) * 100) / 100,
      source: sources[idx % sources.length],
      time: `${idx * 2 + 1}m ago`,
      tier: isCopy ? 'Copy Execution' : 'Tier-1 Shielded',
    }));
    setInflows(initialInflows);

    const activities = Array.from({ length: 12 }).map((_, idx) => {
      const isDiv = !isCopy && idx % 2 === 0;
      return {
        id: `act-${idx}`,
        title: isDiv ? 'Dividend Payout Credited' : isCopy ? 'Master Trade Executed' : 'New Plan Allocation',
        detail: isDiv ? `${selectedAsset.symbol} (+${selectedAsset.change24h}% ROI)` : isCopy ? `Closed Long Position (+3.4% Target)` : `Allocated capital into portfolio`,
        amount: isDiv ? `+$${(base * (selectedAsset.change24h / 100)).toFixed(2)}` : isCopy ? `+$${(base * 0.15).toFixed(2)}` : `+$${(base * 2.5).toLocaleString()}`,
        time: new Date(Date.now() - idx * 5000).toLocaleTimeString([], { hour12: false }),
        type: isDiv ? 'dividend' as const : 'copy' as const,
      };
    });
    setLiveActivity(activities);
  }, [selectedAsset.id, selectedAsset.basePrice, selectedAsset.change24h, selectedAsset.symbol, selectedAsset.category]);

  // Filtered Assets for the Picker Modal
  const filteredAssets = useMemo(() => {
    return allAssets.filter((a) => {
      const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter;
      const matchesSearch = searchQuery === '' || 
        a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.subtitle && a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [allAssets, categoryFilter, searchQuery]);

  // Build Institutional Chart Canvas
  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
      chartInstanceRef.current = null;
    }

    const container = chartContainerRef.current;
    const width = Math.max(container.clientWidth || 0, 600);
    const height = Math.max(container.clientHeight || 0, 460);
    
    const chart = createChart(container, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#0b0e11' },
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
        scaleMargins: {
          top: 0.1,
          bottom: showVolume ? 0.25 : 0.1,
        },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chartInstanceRef.current = chart;

    const historical = generateHistoricalData(selectedAsset.basePrice, 180, selectedAsset.change24h);

    if (chartType === 'candlestick') {
      const series = chart.addSeries(CandlestickSeries, {
        upColor: '#0ecb81',
        downColor: '#f6465d',
        borderVisible: false,
        wickUpColor: '#0ecb81',
        wickDownColor: '#f6465d',
      });
      series.setData(historical.candles);
      mainSeriesRef.current = series as any;
    } else {
      const series = chart.addSeries(AreaSeries, {
        lineColor: '#13c74b',
        topColor: 'rgba(19, 199, 75, 0.45)',
        bottomColor: 'rgba(19, 199, 75, 0.0)',
        lineWidth: 3,
        title: 'NAV / Capital ($)',
      });
      const areaData = historical.candles.map(c => ({ time: c.time, value: c.close }));
      series.setData(areaData);
      mainSeriesRef.current = series as any;
    }

    if (showVolume) {
      const volSeries = chart.addSeries(HistogramSeries, {
        color: '#26a69a',
        priceFormat: { type: 'volume' },
        priceScaleId: 'volume_scale',
      });
      chart.priceScale('volume_scale').applyOptions({
        scaleMargins: {
          top: 0.78,
          bottom: 0,
        },
      });
      volSeries.setData(historical.volumes);
      volumeSeriesRef.current = volSeries;
    }

    if (showEMA) {
      const ema20 = chart.addSeries(LineSeries, {
        color: '#3b82f6',
        lineWidth: 1.5,
        title: 'EMA 20 (Yield Trend)',
      });
      ema20.setData(historical.ema20);
      ema20SeriesRef.current = ema20;

      const ema50 = chart.addSeries(LineSeries, {
        color: '#a855f7',
        lineWidth: 1.5,
        title: 'EMA 50 (Baseline)',
      });
      ema50.setData(historical.ema50);
      ema50SeriesRef.current = ema50;

      const ema200 = chart.addSeries(LineSeries, {
        color: '#f59e0b',
        lineWidth: 2,
        title: 'EMA 200 (Sovereign Floor)',
      });
      ema200.setData(historical.ema200);
      ema200SeriesRef.current = ema200;
    }

    if (showBB) {
      const bbUp = chart.addSeries(LineSeries, {
        color: 'rgba(59, 130, 246, 0.6)',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        title: 'Upper Target Band',
      });
      bbUp.setData(historical.bollinger.upper);
      bbUpperRef.current = bbUp;

      const bbLow = chart.addSeries(LineSeries, {
        color: 'rgba(59, 130, 246, 0.6)',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        title: 'Lower Protected Band',
      });
      bbLow.setData(historical.bollinger.lower);
      bbLowerRef.current = bbLow;
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartInstanceRef.current) {
        const w = chartContainerRef.current.clientWidth;
        const h = chartContainerRef.current.clientHeight;
        if (w > 0 && h > 0) {
          chartInstanceRef.current.applyOptions({
            width: w,
            height: h || 460,
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const lastCandle = historical.candles[historical.candles.length - 1];
    if (lastCandle) {
      setLivePrice(lastCandle.close);
    }

    return () => {
      resizeObserver.disconnect();
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
    };
  }, [selectedAsset.id, chartType, showEMA, showBB, showVolume]);

  // Live real-time NAV compounding ticks
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        setLivePrice((prev) => {
          const drift = (selectedAsset.change24h / 100) * 0.00025;
          const delta = prev * (drift + (Math.random() - 0.44) * 0.0008);
          const newPrice = Number((prev + delta).toFixed(2));
          
          setPriceFlash(newPrice >= prev ? 'up' : 'down');
          setTimeout(() => setPriceFlash(null), 700);
          
          if (mainSeriesRef.current && chartInstanceRef.current) {
            const nowStr = new Date().toISOString().split('T')[0] as Time;
            if (chartType === 'candlestick') {
              mainSeriesRef.current.update({
                time: nowStr,
                open: prev,
                high: Math.max(prev, newPrice, prev * 1.001),
                low: Math.min(prev, newPrice, prev * 0.999),
                close: newPrice,
              } as any);
            } else {
              mainSeriesRef.current.update({
                time: nowStr,
                value: newPrice,
              } as any);
            }
          }

          return newPrice;
        });
      } catch (err) {}
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedAsset.id, selectedAsset.change24h, chartType]);

  const resetZoom = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.timeScale().fitContent();
    }
  };

  const handlePickAsset = (asset: WealthAsset) => {
    setSelectedAsset(asset);
    setLivePrice(asset.basePrice);
    setLiveChange(asset.change24h);
    setPickerOpen(false);
    if (onSelectAsset) onSelectAsset(asset);
    if (onSelectPlan && asset.rawObject && asset.category === 'Yield Plans') {
      onSelectPlan(asset.rawObject);
    }
  };

  return (
    <div className="bg-[#0b0e11] border border-[#1e2329] rounded-3xl overflow-visible shadow-2xl relative my-6 text-white font-['Outfit'] animate-in fade-in duration-500">
      {/* Top Asset & Ticker Header Bar */}
      <div className="bg-[#181a20] px-4 sm:px-6 py-3.5 border-b border-[#2b313a] flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-t-3xl relative">
        {/* Asset Selector & Quick Info */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6 relative">
          
          {/* Custom Interactive Glassmorphism Asset Picker Trigger */}
          <div className="relative">
            <button
              onClick={() => setPickerOpen(!pickerOpen)}
              className="group flex items-center gap-3 bg-[#131722] hover:bg-[#1f2637] border border-white/10 hover:border-[#13c74b]/50 px-4 py-2.5 rounded-2xl transition-all duration-300 shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-[#13c74b]/15 border border-[#13c74b]/30 flex items-center justify-center text-[#13c74b] shrink-0">
                {selectedAsset.category === 'Yield Plans' ? <ShieldCheck className="w-5 h-5" /> : selectedAsset.category === 'Copy Traders' ? <Users className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-white font-extrabold text-base tracking-tight">{selectedAsset.symbol}</span>
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-[#13c74b]/20 text-[#13c74b]">
                    {selectedAsset.category === 'Yield Plans' ? 'Plan' : selectedAsset.category === 'Copy Traders' ? 'Copy Trader' : 'Portfolio'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-medium truncate max-w-[180px] sm:max-w-[240px]">{selectedAsset.name}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-300 ml-1 ${pickerOpen ? 'rotate-180 text-[#13c74b]' : ''}`} />
            </button>

            {/* Floating Rich Institutional Asset Picker Modal */}
            {pickerOpen && (
              <div className="absolute top-16 left-0 z-50 w-[90vw] sm:w-[500px] md:w-[580px] bg-[#0f141d]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header & Search Bar */}
                <div className="p-4 bg-[#141a24] border-b border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black text-sm text-white">
                      <Sparkles className="w-4 h-4 text-[#13c74b]" />
                      <span>Select Wealth Plan, Copy Strategy, or Portfolio</span>
                    </div>
                    <button onClick={() => setPickerOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search plans, master traders, portfolios..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0b0e14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#13c74b] transition-all"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pt-1">
                    {(['ALL', 'Active Portfolios', 'Yield Plans', 'Copy Traders'] as const).map((cat) => {
                      const count = cat === 'ALL' ? allAssets.length : allAssets.filter(a => a.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                            categoryFilter === cat
                              ? 'bg-[#13c74b] text-black shadow-[0_0_15px_rgba(19,199,75,0.3)]'
                              : 'bg-[#0b0e14] text-gray-400 hover:text-white border border-white/5'
                          }`}
                        >
                          <span>{cat === 'ALL' ? 'All Assets' : cat === 'Active Portfolios' ? '🟢 My Portfolios' : cat === 'Yield Plans' ? '🛡️ Yield Plans' : '⚡ Copy Traders'}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${categoryFilter === cat ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'}`}>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Asset Cards List */}
                <div className="max-h-[380px] overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
                  {filteredAssets.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 font-bold text-xs">
                      No matching wealth assets or strategies found.
                    </div>
                  ) : (
                    filteredAssets.map((asset) => {
                      const isSelected = selectedAsset.id === asset.id;
                      return (
                        <button
                          key={asset.id}
                          onClick={() => handlePickAsset(asset)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group ${
                            isSelected
                              ? 'bg-[#13c74b]/15 border-[#13c74b] shadow-[0_0_20px_rgba(19,199,75,0.15)]'
                              : 'bg-[#141a24]/60 hover:bg-[#1c2432] border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm ${
                              asset.category === 'Yield Plans' ? 'bg-[#13c74b]/15 text-[#13c74b] border border-[#13c74b]/30' :
                              asset.category === 'Copy Traders' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' :
                              'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                            }`}>
                              {asset.category === 'Yield Plans' ? <ShieldCheck className="w-5 h-5" /> : asset.category === 'Copy Traders' ? <Users className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-white text-sm group-hover:text-[#13c74b] transition-colors truncate">{asset.symbol}</span>
                                <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded bg-white/5 text-gray-300 shrink-0">{asset.category === 'Yield Plans' ? 'Plan' : asset.category === 'Copy Traders' ? 'Master' : 'Active'}</span>
                              </div>
                              <div className="text-xs text-gray-400 font-medium truncate mt-0.5">{asset.name} · {asset.subtitle || 'Automated Compounding'}</div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-sm font-black font-mono text-[#0ecb81] flex items-center justify-end gap-1">
                              <TrendingUp className="w-3.5 h-3.5" />
                              +{asset.change24h}%
                            </div>
                            <div className="text-[11px] font-mono text-gray-400 mt-0.5">{asset.volume24h}</div>
                          </div>

                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#13c74b] text-black flex items-center justify-center shrink-0 ml-1">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-3 bg-[#141a24] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 px-4 font-mono">
                  <span>💡 Showing <strong className="text-white">{filteredAssets.length}</strong> available institutional options</span>
                  <span className="text-[#13c74b] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Live Synced
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Live NAV / Price Display */}
          <div className="flex items-baseline gap-2.5 border-l border-white/10 pl-4 sm:pl-6">
            <span
              className={`text-xl sm:text-2xl font-black font-mono transition-colors duration-300 ${
                priceFlash === 'up'
                  ? 'text-[#0ecb81] drop-shadow-[0_0_10px_rgba(14,203,129,0.5)]'
                  : priceFlash === 'down'
                  ? 'text-[#f6465d] drop-shadow-[0_0_10px_rgba(246,70,93,0.5)]'
                  : 'text-white'
              }`}
            >
              ${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-md font-mono flex items-center gap-0.5 ${
                liveChange >= 0
                  ? 'bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/30'
                  : 'bg-[#f6465d]/15 text-[#f6465d] border border-[#f6465d]/30'
              }`}
            >
              {liveChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {liveChange >= 0 ? `+${liveChange}% / Day` : `${liveChange}% / Day`}
            </span>
          </div>

          {/* Institutional Stats Badges */}
          <div className="hidden md:flex items-center gap-6 text-xs text-[#848e9c] border-l border-white/10 pl-6">
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Maturity Target</div>
              <div className="font-mono font-bold text-white">${selectedAsset.high24h.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Capital Protection</div>
              <div className="font-sans font-extrabold text-[#0ecb81] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {selectedAsset.protection || '100% Principal Shield'}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Total Allocated AUM</div>
              <div className="font-mono font-bold text-[#13c74b]">{selectedAsset.volume24h}</div>
            </div>
          </div>
        </div>

        {/* Right Header Badges & View Switchers */}
        <div className="flex items-center justify-between lg:justify-end gap-3 self-stretch lg:self-auto">
          <div className="flex items-center gap-1 bg-[#0b0e11] p-1 rounded-xl border border-white/5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'chart'
                  ? 'bg-[#13c74b] text-black shadow-[0_0_15px_rgba(19,199,75,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Chart</span>
            </button>
            <button
              onClick={() => setActiveTab('allocations')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'allocations'
                  ? 'bg-[#13c74b] text-black shadow-[0_0_15px_rgba(19,199,75,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Allocations</span>
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'activity'
                  ? 'bg-[#13c74b] text-black shadow-[0_0_15px_rgba(19,199,75,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Activity</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0ecb81]/10 border border-[#0ecb81]/20 text-[#0ecb81] text-xs font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#0ecb81] animate-ping" />
            <span>Institutional Wealth NAV</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Toolbar */}
      <div className="bg-[#131722] px-4 sm:px-6 py-2.5 border-b border-[#2b313a] flex items-center justify-between gap-4 overflow-x-auto custom-scrollbar">
        {/* Timeframe Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[11px] font-bold text-gray-500 mr-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Horizon:
          </span>
          {(['1m', '5m', '15m', '1H', '4H', '1D', '1W'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-md text-xs font-extrabold transition-all ${
                timeframe === tf
                  ? 'bg-[#2b313a] text-[#0ecb81] border border-[#0ecb81]/40 shadow-inner'
                  : 'text-[#848e9c] hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Style & Indicators Controls */}
        <div className="flex items-center gap-2 shrink-0 border-l border-white/10 pl-4">
          <div className="flex items-center bg-[#181a20] p-0.5 rounded-lg border border-white/5 text-xs">
            <button
              onClick={() => setChartType('area')}
              title="Area NAV Compounding Curve"
              className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                chartType === 'area' ? 'bg-[#2b313a] text-[#0ecb81]' : 'text-[#848e9c] hover:text-white'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>NAV Area</span>
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              title="Daily Yield Candlestick Chart"
              className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                chartType === 'candlestick' ? 'bg-[#2b313a] text-[#0ecb81]' : 'text-[#848e9c] hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 rotate-90" />
              <span>Yield Candles</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowEMA(!showEMA)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
                showEMA
                  ? 'bg-[#3b82f6]/15 border-[#3b82f6]/40 text-[#3b82f6]'
                  : 'bg-[#181a20] border-white/5 text-gray-500 hover:text-white'
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>Yield Trends (EMA)</span>
            </button>
            <button
              onClick={() => setShowBB(!showBB)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
                showBB
                  ? 'bg-[#a855f7]/15 border-[#a855f7]/40 text-[#a855f7]'
                  : 'bg-[#181a20] border-white/5 text-gray-500 hover:text-white'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>Protection Bands</span>
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
                showVolume
                  ? 'bg-[#26a69a]/15 border-[#26a69a]/40 text-[#26a69a]'
                  : 'bg-[#181a20] border-white/5 text-gray-500 hover:text-white'
              }`}
            >
              <Volume2 className="w-3 h-3" />
              <span>Inflow Vol</span>
            </button>
          </div>

          <button
            onClick={resetZoom}
            title="Reset Chart Zoom"
            className="p-1.5 rounded-lg bg-[#181a20] hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-colors ml-1"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex relative">
        {/* TradingView Left Drawing Tools Sidebar */}
        <div className="w-12 bg-[#181a20] border-r border-[#2b313a] flex flex-col items-center py-4 gap-3 shrink-0 z-10">
          <button
            onClick={() => setActiveTool('cursor')}
            title="Crosshair Cursor"
            className={`p-2 rounded-xl transition-all ${
              activeTool === 'cursor' ? 'bg-[#0ecb81] text-black shadow-[0_0_10px_rgba(14,203,129,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('trendline')}
            title="Yield Projection Line"
            className={`p-2 rounded-xl transition-all ${
              activeTool === 'trendline' ? 'bg-[#0ecb81] text-black shadow-[0_0_10px_rgba(14,203,129,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('fib')}
            title="Fibonacci Growth Targets"
            className={`p-2 rounded-xl transition-all ${
              activeTool === 'fib' ? 'bg-[#0ecb81] text-black shadow-[0_0_10px_rgba(14,203,129,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4 rotate-90" />
          </button>
          <button
            onClick={() => setActiveTool('level')}
            title="Maturity Level Marker"
            className={`p-2 rounded-xl transition-all ${
              activeTool === 'level' ? 'bg-[#0ecb81] text-black shadow-[0_0_10px_rgba(14,203,129,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Minus className="w-4 h-4 stroke-[3]" />
          </button>
          <div className="h-px w-6 bg-white/10 my-1" />
          <button
            onClick={resetZoom}
            title="Fit to Screen"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Center Canvas Workspace */}
        <div className="flex-1 relative bg-[#0b0e11] min-h-[460px]">
          {/* Active Tool Badge Overlay */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2">
            <span className="bg-[#181a20]/90 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-xs font-mono font-bold text-gray-300 flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#0ecb81]" />
              {selectedAsset.symbol} · {selectedAsset.subtitle || 'Automated Compounding'} · {chartType.toUpperCase()}
              {showEMA && ' · EMA(20,50,200)'}
            </span>
          </div>

          {/* Chart Container Ref */}
          <div ref={chartContainerRef} className="w-full h-[460px] sm:h-[520px]" />
        </div>

        {/* Right Sidebar: Institutional Capital Depth & Payout Feed */}
        {activeTab !== 'chart' && (
          <div className="w-72 sm:w-80 bg-[#131722] border-l border-[#2b313a] flex flex-col h-[460px] sm:h-[520px] shrink-0 animate-in slide-in-from-right duration-300">
            {activeTab === 'allocations' ? (
              <div className="flex flex-col h-full p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400 font-bold border-b border-white/10 pb-2 mb-3 text-[11px] uppercase tracking-wider">
                  <span>Recent Institutional Inflows</span>
                  <span>Status</span>
                </div>

                <div className="flex flex-col gap-2 overflow-y-auto flex-1 custom-scrollbar pr-1 mb-4">
                  {inflows.map((inf, idx) => (
                    <div key={`inf-${idx}`} className="p-2.5 rounded-xl bg-[#181a20] border border-white/5 hover:border-[#13c74b]/30 transition-all flex flex-col gap-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-[#0ecb81] text-sm">${inf.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#13c74b]/10 text-[#13c74b]">{inf.tier}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans">
                        <span className="truncate max-w-[150px]">{inf.source}</span>
                        <span className="text-gray-500 text-[10px] font-mono">{inf.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plan Parameters Card */}
                <div className="p-3 bg-[#181a20] border border-white/10 rounded-2xl font-sans text-xs flex flex-col gap-2">
                  <div className="font-extrabold text-white flex items-center gap-1.5 text-sm border-b border-white/10 pb-2">
                    <ShieldCheck className="w-4 h-4 text-[#0ecb81]" />
                    <span>Plan Security Parameters</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Execution Schedule:</span>
                    <strong className="text-white">Daily 00:00 UTC</strong>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Capital Protection:</span>
                    <strong className="text-[#0ecb81]">{selectedAsset.protection || '100% Shielded'}</strong>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Compounding Frequency:</span>
                    <strong className="text-white">Continuous 24/7</strong>
                  </div>
                </div>
              </div>
            ) : (
              /* Live Activity & Payout Stream Feed */
              <div className="flex flex-col h-full p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400 font-bold border-b border-white/10 pb-2 mb-3 text-[11px] uppercase tracking-wider">
                  <span>Live Platform Executions</span>
                  <span>Amount</span>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto flex-1 custom-scrollbar pr-1">
                  {liveActivity.map((t) => (
                    <div key={t.id} className="p-2.5 rounded-xl bg-[#181a20] border border-white/5 hover:bg-white/5 transition-all flex flex-col gap-1 font-sans">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span className="text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0ecb81]" />
                          {t.title}
                        </span>
                        <span className="text-[#0ecb81] font-mono font-black">{t.amount}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <span className="truncate max-w-[160px]">{t.detail}</span>
                        <span className="text-gray-500 text-[10px] font-mono">{t.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Institutional Wealth Ticker Footer */}
      <div className="bg-[#181a20] px-4 sm:px-6 py-3 border-t border-[#2b313a] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400 rounded-b-3xl">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-[#0ecb81]" />
            100% Institutional Capital Segregated & Protected
          </span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="hidden md:inline">Automated Execution Latency: <strong className="text-[#0ecb81]">8ms</strong></span>
          <span className="hidden lg:inline text-gray-500">|</span>
          <span className="hidden lg:inline">Principal Reserve: <strong className="text-[#0ecb81]">100% Guaranteed</strong></span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-500">Powered by</span>
          <span className="text-white font-black font-sans tracking-tight flex items-center gap-1 bg-[#2b313a] px-2.5 py-1 rounded-md text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0ecb81]" /> TradingView Institutional Engine
          </span>
        </div>
      </div>
    </div>
  );
}
