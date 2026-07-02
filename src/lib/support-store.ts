import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from './supabase';
import { toast } from 'sonner';

const triggerSupportNotification = (title: string, body: string) => {
  toast(title, {
    description: body.length > 80 ? body.slice(0, 80) + '...' : body,
    duration: 6000,
  });

  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, { body, icon: '/favicon.svg' });
      } catch (e) {}
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          try {
            new Notification(title, { body, icon: '/favicon.svg' });
          } catch (e) {}
        }
      });
    }
  }
};

export type SupportMessage = {
  id: string;
  user_id: string;
  sender_id: string;
  message: string;
  attachment_url?: string | null;
  is_read: boolean;
  created_at: string;
};

export type SupportThread = {
  user_id: string;
  user_email?: string;
  user_name?: string;
  avatar_url?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
};

export function useUserSupport(userId?: string) {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sending, setSending] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('support_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data as SupportMessage[]);
      const unread = data.filter(m => !m.is_read && m.sender_id !== userId).length;
      setUnreadCount(unread);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchMessages();

    const channelId = `user_support_${userId}_${Math.random()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'support_messages', filter: `user_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMsg = payload.new as SupportMessage;
            setMessages(prev => {
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
            if (newMsg.sender_id !== userId && !newMsg.is_read) {
              setUnreadCount(prev => prev + 1);
              triggerSupportNotification('🛡️ VIP Headquarters Dispatch', newMsg.message || 'New official document received');
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedMsg = payload.new as SupportMessage;
            setMessages(prev => prev.map(m => m.id === updatedMsg.id ? updatedMsg : m));
          } else {
            fetchMessages();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchMessages]);

  const uploadAttachment = useCallback(async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `support_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error } = await supabase.storage.from('images').upload(fileName, file);
      if (error) throw error;

      const { data: signedData, error: signedErr } = await supabase.storage
        .from('images')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10); // 10 years
      if (signedErr) throw signedErr;
      return signedData.signedUrl;
    } catch (err) {
      console.error('Error uploading support attachment:', err);
      return null;
    }
  }, []);

  const sendMessage = useCallback(async (text: string, file?: File | null): Promise<boolean> => {
    if (!userId || (!text.trim() && !file)) return false;
    setSending(true);

    let attachmentUrl = null;
    if (file) {
      attachmentUrl = await uploadAttachment(file);
    }

    const { error } = await supabase.from('support_messages').insert({
      user_id: userId,
      sender_id: userId,
      message: text.trim() || (file ? 'Sent an attachment' : ''),
      attachment_url: attachmentUrl,
      is_read: false,
    });

    setSending(false);
    if (!error) {
      await fetchMessages();
      return true;
    }
    console.error('Error sending support message:', error);
    return false;
  }, [userId, uploadAttachment, fetchMessages]);

  const markAsRead = useCallback(async () => {
    if (!userId || unreadCount === 0) return;
    setUnreadCount(0);
    setMessages(prev => prev.map(m => m.sender_id !== userId ? { ...m, is_read: true } : m));

    await supabase
      .from('support_messages')
      .update({ is_read: true })
      .eq('user_id', userId)
      .neq('sender_id', userId)
      .eq('is_read', false);
  }, [userId, unreadCount]);

  return {
    messages,
    loading,
    unreadCount,
    sending,
    sendMessage,
    markAsRead,
    refresh: fetchMessages,
  };
}

export function useAdminSupport() {
  const [threads, setThreads] = useState<SupportThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<SupportMessage[]>([]);
  const [sending, setSending] = useState(false);

  const fetchThreads = useCallback(async () => {
    setLoading(true);
    // Fetch all non-admin profiles
    const { data: profiles, error: pErr } = await supabase
      .from('profiles')
      .select('id, name, email, role')
      .neq('role', 'admin');

    // Fetch all support messages ordered by creation time descending
    const { data: messages, error: mErr } = await supabase
      .from('support_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!pErr && profiles && !mErr && messages) {
      const threadMap: Record<string, SupportThread> = {};

      profiles.forEach(p => {
        threadMap[p.id] = {
          user_id: p.id,
          user_name: p.name || p.email?.split('@')[0] || 'User',
          user_email: p.email || '',
          unread_count: 0,
        };
      });

      // Populate thread data from messages
      const msgs = messages as SupportMessage[];
      msgs.forEach(m => {
        if (!threadMap[m.user_id]) {
          threadMap[m.user_id] = {
            user_id: m.user_id,
            user_name: 'User (' + m.user_id.slice(0, 6) + ')',
            unread_count: 0,
          };
        }
        const thread = threadMap[m.user_id];
        if (!thread.last_message_time) {
          thread.last_message = m.message;
          thread.last_message_time = m.created_at;
        }
        if (!m.is_read && m.sender_id === m.user_id) {
          thread.unread_count += 1;
        }
      });

      const threadList = Object.values(threadMap).sort((a, b) => {
        if (a.unread_count !== b.unread_count) return b.unread_count - a.unread_count;
        const timeA = a.last_message_time ? new Date(a.last_message_time).getTime() : 0;
        const timeB = b.last_message_time ? new Date(b.last_message_time).getTime() : 0;
        return timeB - timeA;
      });

      setThreads(threadList);
    }
    setLoading(false);
  }, []);

  const fetchActiveMessages = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('support_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setActiveMessages(data as SupportMessage[]);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  useEffect(() => {
    fetchThreads();

    const channelId = `admin_support_channel_${Math.random()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'support_messages' },
        (payload) => {
          fetchThreads();
          if (payload.eventType === 'INSERT') {
            const newMsg = payload.new as SupportMessage;
            if (newMsg && newMsg.sender_id === newMsg.user_id) {
              triggerSupportNotification('📬 Client Support Inquiry', `Client (${newMsg.user_id.slice(0, 8)}...): ${newMsg.message || 'Attachment sent'}`);
            }
          }
          if (activeUserId && (payload.new as any)?.user_id === activeUserId) {
            fetchActiveMessages(activeUserId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchThreads, activeUserId, fetchActiveMessages]);

  useEffect(() => {
    if (activeUserId) {
      fetchActiveMessages(activeUserId);
      markThreadAsRead(activeUserId);
    } else {
      setActiveMessages([]);
    }
  }, [activeUserId, fetchActiveMessages]);

  const markThreadAsRead = useCallback(async (userId: string) => {
    setThreads(prev => prev.map(t => t.user_id === userId ? { ...t, unread_count: 0 } : t));
    setActiveMessages(prev => prev.map(m => m.sender_id === userId ? { ...m, is_read: true } : m));

    await supabase
      .from('support_messages')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('sender_id', userId)
      .eq('is_read', false);
  }, []);

  const uploadAttachment = useCallback(async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `support_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error } = await supabase.storage.from('images').upload(fileName, file);
      if (error) throw error;

      const { data: signedData, error: signedErr } = await supabase.storage
        .from('images')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10);
      if (signedErr) throw signedErr;
      return signedData.signedUrl;
    } catch (err) {
      console.error('Error uploading support attachment:', err);
      return null;
    }
  }, []);

  const sendAdminReply = useCallback(async (userId: string, adminId: string, text: string, file?: File | null): Promise<boolean> => {
    if (!userId || (!text.trim() && !file)) return false;
    setSending(true);

    let attachmentUrl = null;
    if (file) {
      attachmentUrl = await uploadAttachment(file);
    }

    const { error } = await supabase.from('support_messages').insert({
      user_id: userId,
      sender_id: adminId,
      message: text.trim() || (file ? 'Sent an attachment' : ''),
      attachment_url: attachmentUrl,
      is_read: false,
    });

    setSending(false);
    if (!error) {
      await fetchActiveMessages(userId);
      await fetchThreads();
      return true;
    }
    console.error('Error sending admin reply:', error);
    return false;
  }, [uploadAttachment, fetchActiveMessages, fetchThreads]);

  return {
    threads,
    loading,
    activeUserId,
    setActiveUserId,
    activeMessages,
    sending,
    sendAdminReply,
    markThreadAsRead,
    refresh: fetchThreads,
  };
}
