import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabase';

export type AppNotification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

// ─── Sound: pleasant chime via Web Audio API (no external file) ──────────────
export function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const playNote = (freq: number, startTime: number, duration: number, gain: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    const now = ctx.currentTime;
    playNote(523.25, now,        0.3, 0.25);  // C5
    playNote(659.25, now + 0.15, 0.4, 0.20); // E5
    setTimeout(() => ctx.close(), 700);
  } catch (_) {}
}

export function useNotificationStore() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestNotif, setLatestNotif] = useState<AppNotification | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const channelRef   = useRef<any>(null);
  const prevUnread   = useRef<number>(0);
  const isFirstLoad  = useRef(true);

  const fetchNotifications = useCallback(async (uid?: string) => {
    const resolvedUid = uid || userId;
    if (!resolvedUid) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      return fetchNotifications(user.id);
    }
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', resolvedUid)
      .order('created_at', { ascending: false })
      .limit(30);
    if (data && !error) {
      const newUnread = data.filter(n => !n.is_read).length;
      if (!isFirstLoad.current && newUnread > prevUnread.current) {
        playNotificationSound();
      }
      prevUnread.current = newUnread;
      isFirstLoad.current = false;
      setNotifications(data);
      setUnreadCount(newUnread);
    }
  }, [userId]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      fetchNotifications(user.id);

      if (channelRef.current) supabase.removeChannel(channelRef.current);

      const channelName = `notif-${user.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
          (payload) => {
            const newNotif = payload.new as AppNotification;
            // Prepend new notification
            setNotifications(prev => [newNotif, ...prev]);
            setUnreadCount(prev => {
              const next = prev + 1;
              prevUnread.current = next;
              return next;
            });
            // Trigger popup toast + sound
            if (!isFirstLoad.current) {
              playNotificationSound();
              setLatestNotif(newNotif);
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
          (payload) => {
            const updated = payload.new as AppNotification;
            setNotifications(prev => prev.map(n => n.id === updated.id ? updated : n));
            if (updated.is_read) {
              setUnreadCount(prev => Math.max(0, prev - 1));
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            isFirstLoad.current = false;
          }
        });

      channelRef.current = channel;
    });

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, []);

  const markAsRead = async (id?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (id) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      prevUnread.current = Math.max(0, prevUnread.current - 1);
      await supabase.from('notifications').update({ is_read: true }).eq('id', id).eq('user_id', user.id);
    } else {
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
      prevUnread.current = 0;
      await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id);
    }
  };

  const dismissLatest = () => setLatestNotif(null);

  return { notifications, unreadCount, markAsRead, refetch: fetchNotifications, latestNotif, dismissLatest };
}
