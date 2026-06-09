import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type Investment = {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  daily_roi: number;
  duration_days: number;
  status: string;
  created_at: string;
};

export function useInvestmentStore() {
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    fetchInvestments();

    const channelId = `investments_changes_${Math.random()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'investments' },
        () => {
          fetchInvestments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInvestments = async () => {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data && !error) {
      setInvestments(data);
    }
  };

  const addInvestment = async (inv: Omit<Investment, 'id' | 'created_at' | 'user_id' | 'status'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newInv = {
      user_id: user.id,
      plan_name: inv.plan_name,
      amount: inv.amount,
      daily_roi: inv.daily_roi,
      duration_days: inv.duration_days,
      status: 'active'
    };

    const { error } = await supabase.from('investments').insert([newInv]);
    if (error) {
      console.error('Error adding investment:', error);
    } else {
      fetchInvestments();
    }
  };

  return { investments, addInvestment };
}
