import React, { useState, useRef, useEffect } from 'react';
import { useUserSupport } from '../lib/support-store';
import {
  HeadphonesIcon,
  X,
  Send,
  Paperclip,
  Maximize2,
  Check,
  CheckCheck,
  Sparkles,
  ImageIcon,
  ShieldCheck,
  Radio,
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
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      markAsRead();
    }
  }, [isOpen, unreadCount, markAsRead]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

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

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => setIsOpen(true)}
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
              <span className="text-xs font-black tracking-wide">Live Support</span>
              <span className="text-[9px] font-bold text-black/70 mt-0.5">24/7 Help Desk</span>
            </div>
            {unreadCount > 0 && (
              <span className="sm:hidden px-2 py-0.5 bg-black text-white rounded-full text-xs font-black">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Mini-Chat Popup Window */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] md:w-[430px] h-[580px] max-h-[85vh] bg-[#0c100d] border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#131714] to-[#1a221d] border-b border-white/10 px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#13c74b]/20 border border-[#13c74b]/40 flex items-center justify-center shrink-0 text-[#13c74b] font-extrabold text-xs">
                FH
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white leading-none">Live Support Chat</h3>
                  <span className="w-2 h-2 rounded-full bg-[#13c74b] animate-pulse" title="Online" />
                </div>
                <span className="text-[10px] text-[#13c74b] font-semibold flex items-center gap-1 mt-0.5">
                  <Radio className="w-2.5 h-2.5" /> Active Session
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
                <h4 className="text-sm font-bold text-white mb-1">Welcome to Live Support!</h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[240px]">
                  Our support team is online. Send us a message below and an advisor will reply shortly.
                </p>
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
                          <span>Support Advisor</span>
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
              placeholder="Write a message..."
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
        </div>
      )}
    </>
  );
}
