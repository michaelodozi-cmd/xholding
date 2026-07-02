import React, { useState, useRef, useEffect } from 'react';
import { useUserSupport } from '../lib/support-store';
import {
  Send,
  Paperclip,
  ImageIcon,
  X,
  Check,
  CheckCheck,
  HeadphonesIcon,
  ShieldCheck,
  Clock,
  Sparkles,
  HelpCircle,
  User,
  Search,
  BookOpen,
  MessageSquare,
  Award,
  Lock,
  PhoneCall,
  ChevronRight,
  TrendingUp,
  Wallet,
  Users,
  Radio,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export function SupportTab({ profile }: { profile?: any }) {
  const userId = profile?.id;
  const { messages, loading, sending, unreadCount, sendMessage, markAsRead } = useUserSupport(userId);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'faq' | 'sla'>('chat');
  const [selectedDepartment, setSelectedDepartment] = useState('Private Wealth & Plans');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (unreadCount > 0) {
      markAsRead();
    }
  }, [unreadCount, markAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

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
    if (!inputText.trim() && !selectedFile) return;

    const formattedText = `[Dept: ${selectedDepartment}] ${inputText.trim()}`;
    const success = await sendMessage(formattedText, selectedFile);
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

  const departments = [
    { name: 'Private Wealth & Plans', icon: TrendingUp, color: 'from-blue-500/20 to-indigo-500/20', text: 'text-blue-400' },
    { name: 'Treasury & Withdrawals', icon: Wallet, color: 'from-emerald-500/20 to-green-500/20', text: 'text-emerald-400' },
    { name: 'Copy Trading Quant', icon: Users, color: 'from-purple-500/20 to-pink-500/20', text: 'text-purple-400' },
    { name: 'Security & Institutional KYC', icon: Lock, color: 'from-amber-500/20 to-orange-500/20', text: 'text-amber-400' },
  ];

  const quickSuggestions = [
    'How do I upgrade to an institutional high-yield plan?',
    'What is the processing window for priority SWIFT/crypto withdrawals?',
    'How do I allocate capital to a Top Performing Copy Trader?',
    'Can I schedule a 1-on-1 private wealth advisory call?',
  ];

  const advisors = [
    { name: 'Alexander Vance', role: 'Managing Director — Wealth', status: 'Online', img: 'AV' },
    { name: 'Sarah Jenkins', role: 'Senior Treasury Vice President', status: 'In a meeting', img: 'SJ' },
    { name: 'Marcus Thorne', role: 'Lead Institutional Compliance', status: 'Online', img: 'MT' },
  ];

  const faqItems = [
    {
      q: 'How are daily yield returns calculated and credited?',
      a: 'Yields are computed daily based on your active institutional investment plans (such as SPACEXIPO or Growth Plan). Accruals are credited automatically to your available cash balance at 00:00 UTC and can be reinvested or withdrawn immediately without lockup penalties.',
      category: 'Investments',
    },
    {
      q: 'What is the SLA and processing timeframe for fund withdrawals?',
      a: 'Institutional Tier-1 withdrawals (USDT, BTC, ETH, and Bank Wire) are processed via our automated treasury bridge with an average completion time of under 15 minutes. For security exceeding $100,000, multi-sig verification may take up to 2 hours.',
      category: 'Treasury',
    },
    {
      q: 'How does Copy Trading protect my capital from drawdown?',
      a: 'Fedility Holdings enforces strict risk-management protocols on all Master Traders. You can configure custom Stop-Loss thresholds, Take-Profit targets, and maximum capital allocation per trade directly in your Copy Trading settings.',
      category: 'Copy Trading',
    },
    {
      q: 'Is my portfolio covered by institutional custody insurance?',
      a: 'Yes. All client digital assets and fiat reserves are held in segregated cold storage vaults insured up to $500M by Lloyd’s of London and Fireblocks institutional custody.',
      category: 'Security',
    },
  ];

  const filteredFaq = faqItems.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const formatDateHeader = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const today = new Date();
      if (date.toDateString() === today.toDateString()) return 'Today';
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-4 md:py-6 flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Institutional Header & System Status Bar */}
      <div className="bg-gradient-to-r from-[#111613] via-[#1a221d] to-[#111613] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -top-10 w-80 h-80 bg-[#13c74b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* System Status Pill Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10 flex-wrap relative z-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#13c74b]/15 border border-[#13c74b]/30 rounded-full text-xs font-bold text-[#13c74b] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#13c74b] animate-pulse shadow-[0_0_8px_#13c74b]" />
              INSTITUTIONAL DESK ONLINE
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#13c74b]" /> Trading Engine Latency: <strong className="text-white">0.3ms</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute notification chimes' : 'Enable notification chimes'}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl transition-colors border border-white/5"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#13c74b]" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
              <span className="hidden md:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
            </button>
            <span className="flex items-center gap-1.5 text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#13c74b]" /> End-to-End Encrypted
            </span>
          </div>
        </div>

        {/* Main Header Information */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="flex items-start gap-5 max-w-2xl">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#13c74b] to-[#0ea13a] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(19,199,75,0.3)] text-black">
              <HeadphonesIcon className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1.5">
                <h1 className="text-2xl sm:text-3xl text-white font-extrabold tracking-tight font-['Outfit']">
                  Private Wealth & Support Suite
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-extrabold text-white uppercase tracking-widest">
                  VIP SLA TIER-1
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connect directly with our dedicated institutional advisors, treasury managers, and technical specialists. Priority routing guaranteed for all active portfolio holders.
              </p>
            </div>
          </div>

          {/* Dedicated Advisors Showcase */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 lg:min-w-[300px]">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Your Advisory Team</span>
              <span className="text-[#13c74b] text-[10px]">24/7 Coverage</span>
            </div>
            <div className="space-y-2">
              {advisors.map((adv, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                      {adv.img}
                    </div>
                    <div>
                      <div className="font-bold text-white leading-none">{adv.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{adv.role}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${adv.status === 'Online' ? 'bg-[#13c74b]/20 text-[#13c74b]' : 'bg-white/5 text-gray-400'}`}>
                    {adv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'chat'
                ? 'bg-[#13c74b] text-black shadow-[0_0_20px_rgba(19,199,75,0.3)]'
                : 'bg-[#1a221d]/60 text-gray-400 hover:text-white hover:bg-[#1a221d]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Live Advisor Chat</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-black text-white text-xs font-black">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'faq'
                ? 'bg-[#13c74b] text-black shadow-[0_0_20px_rgba(19,199,75,0.3)]'
                : 'bg-[#1a221d]/60 text-gray-400 hover:text-white hover:bg-[#1a221d]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Institutional FAQ & Knowledge Base</span>
          </button>
          <button
            onClick={() => setActiveTab('sla')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'sla'
                ? 'bg-[#13c74b] text-black shadow-[0_0_20px_rgba(19,199,75,0.3)]'
                : 'bg-[#1a221d]/60 text-gray-400 hover:text-white hover:bg-[#1a221d]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Custody & VIP SLA Guarantee</span>
          </button>
        </div>

        <div className="text-xs text-gray-400 hidden sm:flex items-center gap-2">
          <span>Priority Desk:</span>
          <span className="text-white font-bold">Tier-1 Institutional</span>
        </div>
      </div>

      {/* TAB 1: LIVE ADVISOR CHAT */}
      {activeTab === 'chat' && (
        <div className="bg-[#111613] border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[700px] shadow-2xl relative">
          {/* Department Selector Bar */}
          <div className="px-4 sm:px-6 py-3 bg-[#161c18] border-b border-white/10 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0 font-semibold">
              <span>Select Department:</span>
            </div>
            <div className="flex items-center gap-2">
              {departments.map((dept) => {
                const Icon = dept.icon;
                const isSelected = selectedDepartment === dept.name;
                return (
                  <button
                    key={dept.name}
                    type="button"
                    onClick={() => setSelectedDepartment(dept.name)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#13c74b] text-black shadow-md'
                        : 'bg-[#1a221d] text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{dept.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat History Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                <div className="w-8 h-8 border-3 border-[#13c74b] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs uppercase tracking-widest font-bold">Establishing Secure Session...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center max-w-xl mx-auto text-center py-8">
                <div className="w-16 h-16 rounded-3xl bg-[#1a221d] border border-white/10 flex items-center justify-center mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-[#13c74b]" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">How can our private wealth desk assist you?</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  You are connected to the <strong className="text-white">{selectedDepartment}</strong> desk. Select a quick inquiry below or type a customized message. An executive advisor will respond in real-time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                  {quickSuggestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputText(q)}
                      className="p-3.5 rounded-2xl bg-[#1a221d]/60 hover:bg-[#13c74b]/15 border border-white/5 hover:border-[#13c74b]/40 text-left text-xs text-gray-300 hover:text-white font-medium transition-all flex items-center justify-between group"
                    >
                      <span>{q}</span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#13c74b] shrink-0 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Render Messages with Date Headers */}
                {messages.map((msg, idx) => {
                  const isUser = msg.sender_id === userId;
                  const prevMsg = idx > 0 ? messages[idx - 1] : null;
                  const showDateHeader =
                    !prevMsg ||
                    new Date(prevMsg.created_at).toDateString() !== new Date(msg.created_at).toDateString();

                  // Check if message has department tag
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
                    <React.Fragment key={msg.id}>
                      {showDateHeader && (
                        <div className="flex items-center justify-center my-6">
                          <span className="px-4 py-1 rounded-full bg-black/60 border border-white/5 text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                            {formatDateHeader(msg.created_at)}
                          </span>
                        </div>
                      )}
                      <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                        {!isUser && (
                          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#13c74b] to-[#0ea13a] flex items-center justify-center shrink-0 mb-1 shadow-md text-black font-extrabold text-xs">
                            FH
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] sm:max-w-[65%] rounded-3xl p-4.5 relative shadow-lg ${
                            isUser
                              ? 'bg-[#13c74b] text-black rounded-br-xs font-medium'
                              : 'bg-[#1a221d] border border-white/10 text-white rounded-bl-xs'
                          }`}
                        >
                          {!isUser && (
                            <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-white/10">
                              <div className="text-xs font-extrabold text-[#13c74b] flex items-center gap-1.5">
                                <span>Fedility Private Wealth Desk</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#13c74b]" />
                              </div>
                              <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-bold text-gray-300 uppercase tracking-wider">
                                Verified Advisor
                              </span>
                            </div>
                          )}

                          {deptTag && (
                            <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${isUser ? 'bg-black/15 text-black' : 'bg-[#13c74b]/15 text-[#13c74b]'}`}>
                              Topic: {deptTag}
                            </div>
                          )}

                          {msg.attachment_url && (
                            <div className="mb-3 rounded-2xl overflow-hidden bg-black/30 border border-black/10">
                              <a href={msg.attachment_url} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={msg.attachment_url}
                                  alt="Attachment"
                                  className="max-h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </a>
                            </div>
                          )}
                          {displayMessage && (
                            <div className={`text-sm leading-relaxed whitespace-pre-wrap wrap-break-word ${isUser ? 'font-semibold' : ''}`}>
                              {displayMessage}
                            </div>
                          )}
                          <div
                            className={`flex items-center justify-end gap-1.5 mt-2 text-[10px] ${
                              isUser ? 'text-black/70 font-bold' : 'text-gray-400'
                            }`}
                          >
                            <span>{formatTime(msg.created_at)}</span>
                            {isUser && (
                              msg.is_read ? (
                                <span className="flex items-center gap-0.5 text-black font-extrabold" title="Read by advisor">
                                  <CheckCheck className="w-3.5 h-3.5" /> Read
                                </span>
                              ) : (
                                <span className="flex items-center gap-0.5 text-black/60" title="Delivered to queue">
                                  <Check className="w-3.5 h-3.5" /> Sent
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        {isUser && (
                          <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mb-1">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Attachment Preview Bar */}
          {selectedFile && (
            <div className="px-6 py-3 bg-[#1a221d] border-t border-white/10 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
                  {filePreview ? (
                    <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-[#13c74b]" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                    {selectedFile.name}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB • Attached for institutional review
                  </div>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Message Input Bar */}
          <form onSubmit={handleSend} className="p-4 sm:p-5 bg-[#0e120f] border-t border-white/10">
            <div className="flex items-end gap-3 bg-[#131714] border border-white/10 rounded-2xl p-2.5 focus-within:border-[#13c74b]/60 transition-all shadow-inner">
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
                title="Attach screenshot, KYC document, or payment proof"
                className={`p-3 rounded-xl transition-colors ${
                  selectedFile
                    ? 'bg-[#13c74b]/20 text-[#13c74b]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message the ${selectedDepartment} desk... (Press Enter to send)`}
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none resize-none py-3 max-h-32 font-medium"
                style={{ minHeight: '44px' }}
              />
              <button
                type="submit"
                disabled={sending || (!inputText.trim() && !selectedFile)}
                className="px-6 py-3 bg-gradient-to-r from-[#13c74b] to-[#0ea13a] hover:from-[#15db52] hover:to-[#11bd45] disabled:opacity-30 disabled:hover:from-[#13c74b] disabled:hover:to-[#0ea13a] text-black rounded-xl font-extrabold transition-all flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(19,199,75,0.3)] disabled:shadow-none hover:scale-105 active:scale-95"
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2.5 px-2 text-[11px] text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#13c74b]" />
                Institutional routing guaranteed • Active Dept: <strong className="text-white">{selectedDepartment}</strong>
              </span>
              <span>Supports PDF, PNG, JPG up to 10MB</span>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: INSTITUTIONAL FAQ & KNOWLEDGE BASE */}
      {activeTab === 'faq' && (
        <div className="bg-[#111613] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl text-white font-bold font-['Outfit']">
                Institutional Knowledge Base
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Instant answers regarding treasury liquidity, daily ROI yield distribution, and quant algorithms.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search institutional articles..."
                className="w-full bg-[#161b17] border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#13c74b]/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFaq.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-gray-500 text-sm">
                No institutional knowledge base articles found matching "{searchQuery}".
              </div>
            ) : (
              filteredFaq.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#1a221d]/60 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-2.5 py-1 rounded-md bg-[#13c74b]/10 text-[#13c74b] text-[10px] font-bold uppercase tracking-wider mb-3">
                      {faq.category}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{faq.q}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <span>Verified by Wealth Advisory</span>
                    <button
                      onClick={() => {
                        setInputText(`Inquiry regarding: ${faq.q}`);
                        setActiveTab('chat');
                      }}
                      className="text-[#13c74b] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Ask Advisor</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CUSTODY & VIP SLA GUARANTEE */}
      {activeTab === 'sla' && (
        <div className="bg-[#111613] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#13c74b]/15 border border-[#13c74b]/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(19,199,75,0.2)]">
              <Award className="w-8 h-8 text-[#13c74b]" />
            </div>
            <h2 className="text-2xl sm:text-3xl text-white font-extrabold font-['Outfit']">
              Institutional SLA & Custody Assurance
            </h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Fedility Holdings operates under institutional fiduciary standards, providing unmatched capital protection, execution transparency, and priority technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#1a221d] border border-white/10 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">$500M Custody Insurance</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                All client funds are held in multi-signature cold storage vaults safeguarded by Fireblocks institutional custody and insured against third-party breaches.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a221d] border border-white/10 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#13c74b]/15 text-[#13c74b] flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">&lt; 5 Min Priority Response</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Tier-1 portfolio holders receive guaranteed routing to senior treasury analysts 24 hours a day, 365 days a year without queue wait times.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a221d] border border-white/10 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Zero-Knowledge Encryption</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                All communications and identity verification files are encrypted at rest with AES-256 and transmitted via TLS 1.3 institutional encryption channels.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1a221d] to-[#131714] border border-[#13c74b]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#13c74b] text-black flex items-center justify-center shrink-0 font-extrabold">
                VIP
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Need immediate treasury escalation?</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Direct phone concierge is available for accounts exceeding $100,000 in managed assets.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedDepartment('Treasury & Withdrawals');
                setInputText('Requesting Tier-1 Treasury Escalation Callback.');
                setActiveTab('chat');
              }}
              className="px-6 py-3 rounded-xl bg-[#13c74b] hover:bg-[#10a13c] text-black font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-lg hover:scale-105"
            >
              Request Escalation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
