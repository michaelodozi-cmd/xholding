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
  Radio,
  Volume2,
  VolumeX,
  Sparkles,
  User,
} from 'lucide-react';

export function SupportTab({ profile }: { profile?: any }) {
  const userId = profile?.id;
  const { messages, loading, sending, unreadCount, sendMessage, markAsRead } = useUserSupport(userId);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
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
    scrollToBottom();
  }, [messages]);

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

    const success = await sendMessage(inputText.trim(), selectedFile);
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
      {/* Header & System Status Bar */}
      <div className="bg-gradient-to-r from-[#111613] via-[#1a221d] to-[#111613] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -top-10 w-80 h-80 bg-[#13c74b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* System Status Pill Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10 flex-wrap relative z-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#13c74b]/15 border border-[#13c74b]/30 rounded-full text-xs font-bold text-[#13c74b] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#13c74b] animate-pulse shadow-[0_0_8px_#13c74b]" />
              SUPPORT DESK ONLINE
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#13c74b]" /> Real-Time Chat
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
        <div className="flex items-center justify-between gap-8 relative z-10">
          <div className="flex items-start gap-5 max-w-2xl">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#13c74b] to-[#0ea13a] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(19,199,75,0.3)] text-black">
              <HeadphonesIcon className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1.5">
                <h1 className="text-2xl sm:text-3xl text-white font-extrabold tracking-tight font-['Outfit']">
                  Live Support Chat
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-extrabold text-white uppercase tracking-widest">
                  24/7 HELP DESK
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connect directly with our dedicated support specialists and advisory team in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE ADVISOR CHAT BOX */}
      <div className="bg-[#111613] border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[700px] shadow-2xl relative">
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
              <h3 className="text-xl font-extrabold text-white mb-2">Live Support Chat</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Send us a message below to connect with a support specialist in real-time.
              </p>
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
                              <span>Support Specialist</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#13c74b]" />
                            </div>
                            <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-bold text-gray-300 uppercase tracking-wider">
                              Verified
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
                  {(selectedFile.size / 1024).toFixed(1)} KB • Attached for review
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
              title="Attach screenshot or document"
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
              placeholder="Write a message... (Press Enter to send)"
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
              Secure live support channel
            </span>
            <span>Supports PDF, PNG, JPG up to 10MB</span>
          </div>
        </form>
      </div>
    </div>
  );
}
