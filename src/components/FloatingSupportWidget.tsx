import React, { useState, useRef, useEffect } from 'react';
import { useUserSupport } from '../lib/support-store';
import {
  MessageSquare,
  HeadphonesIcon,
  X,
  Send,
  Paperclip,
  Maximize2,
  Check,
  CheckCheck,
  Sparkles,
  ImageIcon,
  ChevronRight,
  ArrowRight,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Radio,
  TrendingUp,
  Wallet,
  Lock,
} from 'lucide-react';

export function FloatingSupportWidget({
  profile,
  setActiveTab,
}: {
  profile?: any;
  setActiveTab?: (tab: string) => void;
}) {
  const userId = profile?.id;
  const { messages, loading, sending, unreadCount, sendMessage, markAsRead } = useUserSupport(userId);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'home' | 'chat'>('home');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && view === 'chat' && unreadCount > 0) {
      markAsRead();
    }
  }, [isOpen, view, unreadCount, markAsRead]);

  useEffect(() => {
    if (isOpen && view === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, view, messages]);

  // If new messages arrive while widget is open in home view, or when closed
  useEffect(() => {
    if (unreadCount > 0 && !isOpen) {
      // Keep notification indicator
    }
  }, [unreadCount, isOpen]);

  const handleOpenFullscreen = () => {
    setIsOpen(false);
    if (setActiveTab) {
      setActiveTab('support');
    }
  };

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

    const success = await sendMessage(inputText, selectedFile);
    if (success) {
      setInputText('');
      clearFile();
    }
  };

  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  if (!userId) return null;

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => {
              setIsOpen(true);
              if (messages.length > 0) setView('chat');
            }}
            className="group flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#13c74b] to-[#0ea13a] hover:from-[#15db52] hover:to-[#11bd45] text-black font-extrabold rounded-full shadow-[0_8px_30px_rgba(19,199,75,0.4)] hover:shadow-[0_10px_35px_rgba(19,199,75,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 border border-[#15db52]/40"
          >
            <div className="relative">
              <HeadphonesIcon className="w-6 h-6 text-black fill-current" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-[11px] font-black rounded-full flex items-center justify-center animate-bounce shadow-md border border-white/20">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start leading-none hidden sm:flex">
              <span className="text-xs font-black tracking-wide">Live VIP Desk</span>
              <span className="text-[9px] font-bold text-black/70 mt-0.5">24/7 Institutional</span>
            </div>
            {unreadCount > 0 && (
              <span className="sm:hidden px-2 py-0.5 bg-black text-white rounded-full text-xs font-black">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Mini-Chat Popup Window (Intercom VIP Style) */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] md:w-[430px] h-[580px] max-h-[85vh] bg-[#0c100d] border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          
          {/* VIEW 1: HOME DASHBOARD VIEW */}
          {view === 'home' && (
            <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-[#111813] to-[#0c100d]">
              {/* Institutional Hero Banner */}
              <div className="p-6 bg-gradient-to-br from-[#13c74b]/20 via-[#161f18] to-[#111713] border-b border-white/10 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-[#13c74b]/15 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between relative z-10 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#13c74b]/20 border border-[#13c74b]/40 text-[10px] font-extrabold text-[#13c74b] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13c74b] animate-pulse" />
                    Tier-1 Institutional Desk
                  </span>
                  <div className="flex items-center gap-1">
                    {setActiveTab && (
                      <button
                        onClick={handleOpenFullscreen}
                        title="Expand to Full Screen"
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      title="Close"
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-extrabold text-white font-['Outfit'] mb-1">
                    Hello, {profile?.name ? profile.name.split(' ')[0] : 'Investor'} 👋
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    How can our private wealth advisory or treasury team assist you today?
                  </p>

                  {/* Overlapping Advisor Avatars */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#161f18] flex items-center justify-center text-[10px] font-bold text-white shadow">
                        AV
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#161f18] flex items-center justify-center text-[10px] font-bold text-white shadow">
                        SJ
                      </div>
                      <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-[#161f18] flex items-center justify-center text-[10px] font-bold text-white shadow">
                        MT
                      </div>
                    </div>
                    <span className="text-[11px] text-[#13c74b] font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Reply under 3 min
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Actions Area */}
              <div className="p-4 space-y-4 flex-1">
                {/* Active Conversation Card */}
                <div className="bg-[#151c17] border border-white/10 rounded-2xl p-4 shadow-lg hover:border-[#13c74b]/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Your Support Session
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">
                        {unreadCount} New
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setView('chat')}
                    className="w-full text-left group flex items-center justify-between gap-3 pt-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white group-hover:text-[#13c74b] transition-colors flex items-center gap-2">
                        <span>{messages.length > 0 ? 'Continue Conversation' : 'Start New Inquiry'}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-1">
                        {lastMessage ? lastMessage.message || 'Attachment sent' : 'Connected to executive advisors'}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-[#13c74b]/15 group-hover:bg-[#13c74b] text-[#13c74b] group-hover:text-black flex items-center justify-center transition-all shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>

                {/* Quick Shortcuts */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-1">
                    Quick Help & Topics
                  </span>
                  <button
                    onClick={() => {
                      setInputText('How do I verify a new SWIFT or crypto withdrawal address?');
                      setView('chat');
                    }}
                    className="w-full p-3 rounded-xl bg-[#131714] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-left flex items-center justify-between text-xs text-gray-300 group"
                  >
                    <span className="flex items-center gap-2.5 font-medium">
                      <Wallet className="w-4 h-4 text-emerald-400" /> Treasury & Withdrawal FAQ
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={() => {
                      setInputText('Requesting information on Tier-1 Copy Trading institutional yields.');
                      setView('chat');
                    }}
                    className="w-full p-3 rounded-xl bg-[#131714] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-left flex items-center justify-between text-xs text-gray-300 group"
                  >
                    <span className="flex items-center gap-2.5 font-medium">
                      <TrendingUp className="w-4 h-4 text-blue-400" /> Quant Copy Trading SLA
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={() => {
                      setInputText('I need help with institutional KYC account verification.');
                      setView('chat');
                    }}
                    className="w-full p-3 rounded-xl bg-[#131714] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-left flex items-center justify-between text-xs text-gray-300 group"
                  >
                    <span className="flex items-center gap-2.5 font-medium">
                      <Lock className="w-4 h-4 text-amber-400" /> Security & Custody Assurance
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              {/* Footer SLA Bar */}
              <div className="p-4 bg-[#0e120f] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#13c74b]" /> End-to-End Encrypted
                </span>
                <span>Lloyd’s $500M Custody</span>
              </div>
            </div>
          )}

          {/* VIEW 2: LIVE CHAT VIEW */}
          {view === 'chat' && (
            <>
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#131714] to-[#1a221d] border-b border-white/10 px-4 py-3.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setView('home')}
                    title="Back to Home"
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-9 h-9 rounded-xl bg-[#13c74b]/20 border border-[#13c74b]/40 flex items-center justify-center shrink-0 text-[#13c74b] font-extrabold text-xs">
                    FH
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white leading-none">Fedility Wealth Desk</h3>
                      <span className="w-2 h-2 rounded-full bg-[#13c74b] animate-pulse" title="Online" />
                    </div>
                    <span className="text-[10px] text-[#13c74b] font-semibold flex items-center gap-1 mt-0.5">
                      <Radio className="w-2.5 h-2.5" /> Active VIP Session
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {setActiveTab && (
                    <button
                      onClick={handleOpenFullscreen}
                      title="Open Full Screen Desk"
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Widget"
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages List Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0e0b]/80">
                {loading ? (
                  <div className="h-full flex items-center justify-center text-gray-500 text-xs gap-2">
                    <div className="w-5 h-5 border-2 border-[#13c74b] border-t-transparent rounded-full animate-spin" />
                    <span>Loading session...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1a221d] flex items-center justify-center mb-3 shadow">
                      <Sparkles className="w-6 h-6 text-[#13c74b]" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Welcome to VIP Support!</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      An executive wealth manager is on standby. Send us your inquiry below.
                    </p>
                    <button
                      onClick={() => setInputText('Hello! I would like to inquire about institutional deposit bonuses.')}
                      className="px-3.5 py-2 bg-white/5 hover:bg-[#13c74b]/20 border border-white/5 rounded-xl text-xs text-gray-300 hover:text-white transition-all text-left"
                    >
                      💡 Inquire about institutional bonuses
                    </button>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => {
                      const isUser = msg.sender_id === userId;
                      
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
                          className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                        >
                          {!isUser && (
                            <span className="text-[10px] font-bold text-[#13c74b] ml-1 mb-0.5 flex items-center gap-1">
                              <span>Fedility Advisor</span>
                              <ShieldCheck className="w-3 h-3 inline" />
                            </span>
                          )}
                          <div
                            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                              isUser
                                ? 'bg-[#13c74b] text-black rounded-br-xs font-medium'
                                : 'bg-[#1a221d] border border-white/10 text-white rounded-bl-xs'
                            }`}
                          >
                            {deptTag && (
                              <div className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1.5 ${isUser ? 'bg-black/15 text-black' : 'bg-[#13c74b]/20 text-[#13c74b]'}`}>
                                {deptTag}
                              </div>
                            )}
                            {msg.attachment_url && (
                              <div className="mb-2 rounded-lg overflow-hidden bg-black/20">
                                <a href={msg.attachment_url} target="_blank" rel="noopener noreferrer">
                                  <img
                                    src={msg.attachment_url}
                                    alt="Attachment"
                                    className="max-h-40 w-full object-cover rounded"
                                  />
                                </a>
                              </div>
                            )}
                            {displayMessage && <div className="whitespace-pre-wrap">{displayMessage}</div>}
                            <div
                              className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                                isUser ? 'text-black/70 font-semibold' : 'text-gray-400'
                              }`}
                            >
                              <span>{formatTime(msg.created_at)}</span>
                              {isUser && (
                                msg.is_read ? (
                                  <CheckCheck className="w-3 h-3 text-black font-extrabold" title="Read" />
                                ) : (
                                  <Check className="w-3 h-3 text-black/60" title="Delivered" />
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

              {/* Attachment Preview Bar */}
              {selectedFile && (
                <div className="px-4 py-2 bg-[#1a221d] border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <ImageIcon className="w-4 h-4 text-[#13c74b] shrink-0" />
                    <span className="text-white truncate">{selectedFile.name}</span>
                  </div>
                  <button onClick={clearFile} className="text-gray-400 hover:text-white p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Mini Input Footer */}
              <form onSubmit={handleSend} className="p-3 bg-[#131714] border-t border-white/10 flex items-center gap-2">
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
                  title="Attach screenshot or document"
                  className={`p-2 rounded-xl transition-colors ${
                    selectedFile ? 'bg-[#13c74b]/20 text-[#13c74b]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Write an inquiry..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#13c74b]/50"
                />
                <button
                  type="submit"
                  disabled={sending || (!inputText.trim() && !selectedFile)}
                  className="p-2 bg-[#13c74b] hover:bg-[#10a13c] disabled:opacity-30 text-black rounded-xl font-bold transition-all shrink-0"
                >
                  {sending ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
