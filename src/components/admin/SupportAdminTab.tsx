import React, { useState, useRef, useEffect } from 'react';
import { useAdminSupport } from '../../lib/support-store';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  ImageIcon,
  X,
  Check,
  CheckCheck,
  User,
  Clock,
  Copy,
  Sparkles,
  Mail,
  ArrowLeft,
  ShieldCheck,
  Filter,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Wallet,
  Lock,
  HeadphonesIcon,
  Radio,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SupportAdminTab() {
  const {
    threads,
    loading,
    activeUserId,
    setActiveUserId,
    activeMessages,
    sending,
    sendAdminReply,
  } = useAdminSupport();

  const [adminId, setAdminId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'unread' | 'active'>('all');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setAdminId(data.user.id);
      }
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeUserId || !adminId || (!inputText.trim() && !selectedFile)) return;

    const success = await sendAdminReply(activeUserId, adminId, inputText, selectedFile);
    if (success) {
      setInputText('');
      clearFile();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const cannedCategories = [
    {
      category: 'Treasury & Deposits',
      icon: Wallet,
      color: 'text-emerald-400',
      replies: [
        'We have verified your deposit and credited your account balance ✅',
        'Your withdrawal request is currently being processed via institutional multi-sig queue 💸',
        'Please verify your destination wallet address and blockchain network before submitting.',
      ],
    },
    {
      category: 'Institutional KYC & Security',
      icon: Lock,
      color: 'text-amber-400',
      replies: [
        'Your KYC identity documents have been reviewed and approved by compliance 🛡️',
        'For security reasons, please confirm your 2FA authentication code or email token.',
        'We have temporarily restricted withdrawal limits pending security re-verification.',
      ],
    },
    {
      category: 'Quant Copy Trading',
      icon: TrendingUp,
      color: 'text-purple-400',
      replies: [
        'Copy trading master allocation parameters have been synced to your portfolio 📊',
        'Our quant algorithms automatically rebalance master trader allocations every 24 hours.',
        'Yield distribution has been calculated and applied to your account.',
      ],
    },
    {
      category: 'General Courtesy',
      icon: HeadphonesIcon,
      color: 'text-[#13c74b]',
      replies: [
        'Hello! I am reviewing your account details now with senior management.',
        'Thank you for contacting Fedility Institutional Desk. How else can we assist today?',
        'We appreciate your patience while our technical team investigated this matter.',
      ],
    },
  ];

  const handleCannedClick = (text: string) => {
    setInputText((prev) => (prev ? prev + ' ' + text : text));
  };

  const copyUserId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const filteredThreads = threads.filter((t) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      t.user_name?.toLowerCase().includes(q) ||
      t.user_email?.toLowerCase().includes(q) ||
      t.user_id.toLowerCase().includes(q) ||
      t.last_message?.toLowerCase().includes(q);

    if (!matchesQuery) return false;
    if (filterMode === 'unread') return t.unread_count > 0;
    if (filterMode === 'active') {
      if (!t.last_message_time) return false;
      const date = new Date(t.last_message_time);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }
    return true;
  });

  const activeThread = threads.find((t) => t.user_id === activeUserId);

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const formatMsgTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const totalUnread = threads.reduce((acc, t) => acc + (t.unread_count || 0), 0);

  return (
    <div className="animate-in fade-in duration-500 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* Responsive Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 bg-gradient-to-r from-[#111613] via-[#1a221d] to-[#111613] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl w-full min-w-0 max-w-full">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#13c74b]/15 border border-[#13c74b]/30 flex items-center justify-center text-[#13c74b] shrink-0 shadow-[0_0_20px_rgba(19,199,75,0.2)]">
            <HeadphonesIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h1 className="text-lg sm:text-2xl md:text-3xl text-white font-extrabold font-['Outfit'] truncate">
                Enterprise VIP Helpdesk
              </h1>
              {totalUnread > 0 && (
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-600 text-white text-[10px] sm:text-xs font-black animate-bounce shadow-md shrink-0">
                  {totalUnread} Unread
                </span>
              )}
            </div>
            <p className="text-xs sm:text-[13px] text-gray-400 mt-1 hidden sm:block truncate">
              Manage live institutional communications, KYC document verifications, and treasury escalations.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#13c74b]/10 border border-[#13c74b]/20 rounded-full text-[11px] sm:text-xs font-bold text-[#13c74b] uppercase tracking-wider shrink-0">
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse text-[#13c74b]" />
            <span>Live Sync</span>
          </div>
          <span className="text-xs text-gray-400 font-semibold sm:hidden">
            {threads.length} Tickets
          </span>
        </div>
      </div>

      {/* Main Helpdesk Responsive Workspace Container */}
      <div className="bg-[#131714] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col xl:flex-row h-[650px] lg:h-[calc(100vh-180px)] min-h-[500px] max-h-[900px] shadow-2xl relative w-full min-w-0 max-w-full">
        
        {/* Left Pane: Ticket Queue & Filters (Hidden on smaller screens when ticket selected, or when manually toggled off) */}
        <div
          className={`w-full xl:w-72 2xl:w-80 border-b xl:border-b-0 xl:border-r border-white/10 flex-col h-full bg-[#0d100e] shrink-0 min-w-0 max-w-full transition-all duration-300 ${
            activeUserId ? (showSidebar ? 'hidden xl:flex' : 'hidden') : 'flex'
          }`}
        >
          {/* Search & Queue Filters */}
          <div className="p-3 sm:p-4 border-b border-white/10 space-y-2.5 sm:space-y-3 bg-[#111512] shrink-0 w-full min-w-0">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket, name, email..."
                className="w-full bg-[#181f19] border border-white/10 text-white pl-10 pr-8 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs focus:outline-none focus:border-[#13c74b]/60 transition-all font-medium min-w-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/5 w-full min-w-0">
              <button
                onClick={() => setFilterMode('all')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition-all truncate px-1 ${
                  filterMode === 'all' ? 'bg-[#13c74b] text-black shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                All ({threads.length})
              </button>
              <button
                onClick={() => setFilterMode('unread')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 truncate px-1 ${
                  filterMode === 'unread' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>Unread</span>
                {totalUnread > 0 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />}
              </button>
              <button
                onClick={() => setFilterMode('active')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition-all truncate px-1 ${
                  filterMode === 'active' ? 'bg-[#13c74b] text-black shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Today
              </button>
            </div>
          </div>

          {/* Ticket Thread List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 min-h-0 w-full min-w-0">
            {loading ? (
              <div className="p-10 text-center text-gray-500 flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#13c74b] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs uppercase tracking-widest font-bold">Syncing tickets...</span>
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="p-10 text-center text-gray-500 text-xs flex flex-col items-center">
                <MessageSquare className="w-8 h-8 mb-2 opacity-30 text-gray-400" />
                <span>No tickets match selected filter</span>
              </div>
            ) : (
              filteredThreads.map((thread) => {
                const isSelected = thread.user_id === activeUserId;
                return (
                  <button
                    key={thread.user_id}
                    onClick={() => {
                      setActiveUserId(thread.user_id);
                      if (window.innerWidth < 1280) setShowSidebar(false);
                    }}
                    className={`w-full p-3.5 sm:p-4 text-left transition-all flex items-start gap-3 relative min-w-0 ${
                      isSelected
                        ? 'bg-[#1c261f] border-l-4 border-l-[#13c74b] shadow-inner'
                        : 'hover:bg-white/5 border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-sm border ${isSelected ? 'bg-[#13c74b] text-black border-[#13c74b]' : 'bg-gradient-to-br from-[#1c241e] to-[#111613] border-white/10'}`}>
                        {thread.user_name ? thread.user_name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      {thread.unread_count > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-md border border-white/20">
                          {thread.unread_count}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                          {thread.user_name || 'Anonymous Investor'}
                        </span>
                        <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                          {formatTime(thread.last_message_time)}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 truncate mb-1 flex items-center gap-1 min-w-0">
                        <Mail className="w-3 h-3 shrink-0 text-gray-500" />
                        <span className="truncate">{thread.user_email || thread.user_id}</span>
                      </div>
                      <div
                        className={`text-xs truncate ${
                          thread.unread_count > 0 ? 'text-[#13c74b] font-bold' : 'text-gray-400'
                        }`}
                      >
                        {thread.last_message || 'No messages yet'}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Ticket Workspace (strictly bounded with min-w-0, max-w-full, overflow-hidden) */}
        <div className={`flex-1 flex flex-col h-full bg-[#111613] relative min-w-0 max-w-full overflow-hidden ${!activeUserId ? 'hidden xl:flex' : 'flex'}`}>
          {!activeUserId ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 max-w-lg mx-auto min-w-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#1a221d] border border-white/10 flex items-center justify-center mb-4 sm:mb-5 shadow-2xl">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#13c74b]" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2 font-['Outfit']">No Ticket Selected</h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                Select an institutional client from the left queue to review their complete transcript, inspect KYC status, and dispatch official executive responses.
              </p>
            </div>
          ) : (
            <>
              {/* Ultra-Responsive Ticket Header */}
              <div className="p-2.5 sm:p-4 bg-[#161c18] border-b border-white/10 flex items-center justify-between shrink-0 gap-2 min-w-0 max-w-full w-full">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  {/* Back to Tickets button on mobile / tablet / laptop screens (< xl) */}
                  <button
                    onClick={() => {
                      setActiveUserId(null);
                      setShowSidebar(true);
                    }}
                    className="xl:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white shrink-0 border border-white/5 flex items-center gap-1"
                    title="Back to Tickets List"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-bold hidden sm:inline">Tickets</span>
                  </button>

                  {/* Toggle Sidebar on wide desktop screens (xl+) */}
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="hidden xl:flex p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white shrink-0 border border-white/5 items-center justify-center transition-all"
                    title={showSidebar ? "Expand Chat Fullscreen" : "Show Ticket Sidebar"}
                  >
                    {showSidebar ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4 text-[#13c74b]" />}
                  </button>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#13c74b]/20 border border-[#13c74b]/40 flex items-center justify-center text-[#13c74b] font-black text-xs sm:text-sm shadow shrink-0">
                    {activeThread?.user_name ? activeThread.user_name.charAt(0).toUpperCase() : 'U'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
                      <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-white font-['Outfit'] truncate min-w-0">
                        {activeThread?.user_name || 'Client Investor'}
                      </h3>
                      <span className="px-1.5 py-0.5 rounded bg-[#13c74b]/15 border border-[#13c74b]/30 text-[#13c74b] text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider shrink-0">
                        VIP Tier-1
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate min-w-0">
                      <span className="flex items-center gap-1 truncate min-w-0">
                        <Mail className="w-3 h-3 text-gray-500 shrink-0" />
                        <span className="truncate">{activeThread?.user_email || 'No email registered'}</span>
                      </span>
                      <button
                        onClick={() => copyUserId(activeUserId)}
                        title="Copy Client UUID"
                        className="flex items-center gap-1 hover:text-white transition-colors text-[9px] sm:text-[10px] bg-black/40 px-1.5 sm:px-2 py-0.5 rounded border border-white/5 font-mono shrink-0"
                      >
                        <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#13c74b]" />
                        <span>{copiedId ? 'Copied!' : 'ID'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setShowProfileDrawer(!showProfileDrawer)}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                      showProfileDrawer
                        ? 'bg-[#13c74b] text-black border-[#13c74b]'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden md:inline">Client 360°</span>
                    <span className="md:hidden">Info</span>
                  </button>
                </div>
              </div>

              {/* Main Workspace Split (Chat vs Client 360 Drawer) */}
              <div className="flex-1 flex overflow-hidden relative min-h-0 min-w-0 max-w-full w-full">
                {/* Transcript Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 bg-[#0d100e] min-w-0 max-w-full w-full">
                  {activeMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-[#1a221d] flex items-center justify-center mb-3 shadow shrink-0">
                        <Sparkles className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-400 max-w-sm">
                        No previous message history with this institutional investor. Select a quick reply below or type an official greeting.
                      </p>
                    </div>
                  ) : (
                    <>
                      {activeMessages.map((msg) => {
                        const isAdmin = msg.sender_id !== activeUserId;
                        
                        let displayMessage = msg.message;
                        let deptTag = null;
                        if (displayMessage.startsWith('[Dept: ')) {
                          const closeIdx = displayMessage.indexOf(']');
                          if (closeIdx !== -1) {
                            deptTag = displayMessage.substring(7, closeIdx);
                            displayMessage = displayMessage.substring(closeIdx + 1).trim();
                          }
                        }

                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'} w-full min-w-0 max-w-full`}
                          >
                            <span
                              className={`text-[10px] font-bold mb-1 flex items-center gap-1 max-w-full truncate ${
                                isAdmin ? 'text-[#13c74b] mr-1' : 'text-gray-400 ml-1'
                              }`}
                            >
                              {isAdmin ? (
                                <>
                                  <span className="truncate">You (Support Admin)</span>
                                  <ShieldCheck className="w-3 h-3 inline shrink-0" />
                                </>
                              ) : (
                                <span className="truncate">{activeThread?.user_name || 'Client Investor'}</span>
                              )}
                            </span>
                            <div
                              className={`max-w-[92%] sm:max-w-[85%] md:max-w-[80%] rounded-2xl p-3 sm:p-4 text-xs leading-relaxed shadow-lg break-words min-w-0 ${
                                isAdmin
                                  ? 'bg-[#13c74b] text-black rounded-br-xs font-semibold'
                                  : 'bg-[#1a221d] border border-white/10 text-white rounded-bl-xs'
                              }`}
                            >
                              {deptTag && (
                                <div className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-2 ${isAdmin ? 'bg-black/15 text-black' : 'bg-[#13c74b]/15 text-[#13c74b]'}`}>
                                  Dept: {deptTag}
                                </div>
                              )}
                              {msg.attachment_url && (
                                <div className="mb-2 rounded-xl overflow-hidden bg-black/30 border border-black/10 max-w-full">
                                  <a href={msg.attachment_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                      src={msg.attachment_url}
                                      alt="Attachment"
                                      className="max-h-48 sm:max-h-60 w-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                  </a>
                                </div>
                              )}
                              {displayMessage && (
                                <div className="whitespace-pre-wrap break-words text-xs sm:text-sm min-w-0 max-w-full">
                                  {displayMessage}
                                </div>
                              )}
                              <div
                                className={`flex items-center justify-end gap-1 mt-1.5 text-[9px] sm:text-[10px] shrink-0 ${
                                  isAdmin ? 'text-black/70 font-extrabold' : 'text-gray-400'
                                }`}
                              >
                                <span>{formatMsgTime(msg.created_at)}</span>
                                {isAdmin && (
                                  msg.is_read ? (
                                    <span className="flex items-center gap-0.5 text-black" title="Read by client">
                                      <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Read
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-0.5 text-black/60" title="Delivered">
                                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Sent
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Client 360° Profile Sidebar (Slide-over overlay bounded inside container) */}
                {showProfileDrawer && (
                  <div className="absolute right-0 top-0 bottom-0 z-30 w-full sm:w-80 max-w-full border-l border-white/10 bg-[#141a16] p-4 sm:p-5 flex flex-col gap-5 overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.95)] animate-in slide-in-from-right duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h4 className="text-xs font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4 text-[#13c74b]" /> Client 360° Overview
                      </h4>
                      <button
                        onClick={() => setShowProfileDrawer(false)}
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                        <div>
                          <div className="text-[10px] text-gray-500">Account Verification</div>
                          <div className="text-xs font-bold text-[#13c74b] flex items-center gap-1.5 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> KYC Verified Tier-1
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500">Registered Email Address</div>
                          <div className="text-xs font-medium text-white truncate mt-0.5">
                            {activeThread?.user_email || 'N/A'}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500">Security Routing Channel</div>
                          <div className="text-xs font-medium text-gray-300 mt-0.5">
                            End-to-End Encrypted TLS 1.3
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#13c74b]" /> Quick VIP Actions
                      </h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setInputText('Your account has been upgraded to VIP Institutional Tier-1 status 🎉');
                            setShowProfileDrawer(false);
                          }}
                          className="w-full p-3 rounded-xl bg-white/5 hover:bg-[#13c74b]/20 border border-white/5 hover:border-[#13c74b]/40 text-left text-xs text-gray-300 hover:text-white font-medium transition-all flex items-center justify-between group min-w-0"
                        >
                          <span className="truncate pr-2">🎉 Grant VIP Status Notice</span>
                          <Send className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#13c74b] shrink-0" />
                        </button>
                        <button
                          onClick={() => {
                            setInputText('We have prioritized your pending SWIFT / Crypto withdrawal for immediate execution 🚀');
                            setShowProfileDrawer(false);
                          }}
                          className="w-full p-3 rounded-xl bg-white/5 hover:bg-[#13c74b]/20 border border-white/5 hover:border-[#13c74b]/40 text-left text-xs text-gray-300 hover:text-white font-medium transition-all flex items-center justify-between group min-w-0"
                        >
                          <span className="truncate pr-2">🚀 Prioritize Withdrawal Notice</span>
                          <Send className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#13c74b] shrink-0" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-[#1c241e] to-[#111613] border border-white/10 text-center">
                      <Lock className="w-5 h-5 text-[#13c74b] mx-auto mb-1.5 opacity-80" />
                      <div className="text-[11px] font-bold text-white">Lloyd’s $500M Custody</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Institutional Segregated Vaults</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enterprise Categorized Canned Responses Toolbar (Wrapped to eliminate overflow!) */}
              <div className="px-2.5 sm:px-4 py-2 bg-[#161c18] border-t border-white/10 flex flex-col gap-1.5 shrink-0 min-w-0 max-w-full w-full">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-extrabold flex items-center justify-between">
                  <span>Executive Quick Replies:</span>
                  <span className="text-gray-500 hidden sm:inline">Click to append</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto no-scrollbar py-0.5 w-full min-w-0 max-w-full">
                  {cannedCategories.map((cat, idx) => {
                    const Icon = cat.icon;
                    return cat.replies.map((reply, rIdx) => (
                      <button
                        key={`${idx}-${rIdx}`}
                        type="button"
                        onClick={() => handleCannedClick(reply)}
                        className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#1d2620] hover:bg-[#13c74b] hover:text-black border border-white/10 text-[11px] sm:text-xs text-gray-200 font-medium transition-all shrink-0 flex items-center gap-1.5 group shadow-sm active:scale-95 max-w-full truncate"
                      >
                        <Icon className={`w-3 h-3 shrink-0 ${cat.color} group-hover:text-black`} />
                        <span className="truncate">{reply.slice(0, 28)}...</span>
                      </button>
                    ));
                  })}
                </div>
              </div>

              {/* Attachment Preview Bar */}
              {selectedFile && (
                <div className="px-4 py-2 bg-[#1a221d] border-t border-white/10 flex items-center justify-between text-xs animate-in fade-in shrink-0 min-w-0 max-w-full w-full">
                  <div className="flex items-center gap-2 truncate min-w-0">
                    <ImageIcon className="w-4 h-4 text-[#13c74b] shrink-0" />
                    <span className="text-white truncate font-bold">{selectedFile.name}</span>
                    <span className="text-gray-400 text-[10px] hidden sm:inline shrink-0">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button onClick={clearFile} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Ultra-Responsive Input Footer */}
              <form onSubmit={handleSend} className="p-2 sm:p-4 bg-[#111613] border-t border-white/10 shrink-0 min-w-0 max-w-full w-full">
                <div className="flex items-end gap-1.5 sm:gap-3 bg-[#181f1a] border border-white/10 rounded-2xl p-1.5 sm:p-2 focus-within:border-[#13c74b]/60 transition-all shadow-inner w-full min-w-0 max-w-full">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach official documentation or transaction receipt"
                    className={`p-2 sm:p-3 rounded-xl transition-colors shrink-0 ${
                      selectedFile
                        ? 'bg-[#13c74b]/20 text-[#13c74b]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type official reply... (Enter to send)"
                    rows={1}
                    className="flex-1 bg-transparent text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none resize-none py-2 sm:py-2.5 max-h-24 font-medium min-w-0 max-w-full"
                    style={{ minHeight: '36px' }}
                  />
                  <button
                    type="submit"
                    disabled={sending || (!inputText.trim() && !selectedFile)}
                    className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#13c74b] to-[#0ea13a] hover:from-[#15db52] hover:to-[#11bd45] disabled:opacity-30 text-black rounded-xl font-extrabold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(19,199,75,0.3)] disabled:shadow-none hover:scale-105 active:scale-95"
                  >
                    {sending ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="hidden sm:inline">Dispatch</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
