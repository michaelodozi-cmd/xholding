import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type AppNotification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export function useNotificationStore() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();

    const channelId = `notifications_changes_${Math.random()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (data && !error) {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.is_read).length);
    }
  };

  const markAsRead = async (id?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (id) {
      await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    } else {
      await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id);
    }
  };

  return { notifications, unreadCount, markAsRead };
}
