import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type TransactionStatus = 'pending' | 'approved' | 'rejected';

export type Transaction = {
  id: string;
  userId: string;
  userEmail: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  asset: string;
  txid: string;
  status: TransactionStatus;
  timestamp: number;
  screenshotUrl?: string | null;
};

export function useTransactionStore() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    fetchTransactions();

    const channelId = `transactions_changes_${Math.random()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => {
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (data && !error) {
      const formatted = data.map(tx => ({
        id: tx.id,
        userId: tx.user_id,
        userEmail: tx.user_email,
        type: tx.type as 'deposit' | 'withdrawal',
        amount: Number(tx.amount),
        asset: tx.asset,
        txid: tx.txid,
        status: tx.status as TransactionStatus,
        timestamp: Number(tx.timestamp),
        screenshotUrl: tx.screenshot_url ?? null
      }));
      setTransactions(formatted);
      setHasFetched(true);
    }
  };

  const addTransaction = async (tx: Omit<Transaction, 'id' | 'timestamp' | 'status' | 'userId' | 'userEmail'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newTx = {
      id: Math.random().toString(36).substring(2, 9),
      user_id: user.id,
      user_email: user.email || '',
      type: tx.type,
      amount: tx.amount,
      asset: tx.asset,
      txid: tx.txid,
      status: 'pending',
      timestamp: Date.now(),
      screenshot_url: (tx as any).screenshotUrl || null
    };

    // Optimistic
    setTransactions(prev => [{
      id: newTx.id,
      userId: newTx.user_id,
      userEmail: newTx.user_email,
      type: newTx.type as 'deposit' | 'withdrawal',
      amount: newTx.amount,
      asset: newTx.asset,
      txid: newTx.txid,
      status: newTx.status as TransactionStatus,
      timestamp: newTx.timestamp,
      screenshotUrl: newTx.screenshot_url
    }, ...prev]);

    const { error } = await supabase.from('transactions').insert([newTx]);
    if (error) {
      console.error('Error adding transaction:', error);
      fetchTransactions();
    } else if (tx.type === 'withdrawal') {
      // Immediately deduct balance for pending withdrawal to prevent double spending
      await supabase.rpc('increment_balance', {
        p_user_id: user.id,
        p_amount: -Number(tx.amount)
      });
    }
  };

  const updateStatus = async (id: string, status: TransactionStatus, usdValue?: number) => {
    const tx = transactions.find(t => t.id === id);
    if (!tx) return;

    // Optimistic
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    
    const { error } = await supabase.from('transactions').update({ status }).eq('id', id);
    if (error) {
      console.error('Error updating status:', error);
      fetchTransactions();
      return;
    }

    if (status === 'approved' && tx.type === 'deposit') {
      // Credit balance only for approved deposits (withdrawals are deducted on creation)
      const amountToAdd = usdValue !== undefined ? Number(usdValue) : Number(tx.amount);
      const { error: rpcError } = await supabase.rpc('increment_balance', {
        p_user_id: tx.userId,
        p_amount: amountToAdd
      });
      if (rpcError) console.error('Error incrementing balance:', rpcError);
    } else if (status === 'rejected' && tx.type === 'withdrawal') {
      // Refund balance if withdrawal is rejected by admin
      const { error: rpcError } = await supabase.rpc('increment_balance', {
        p_user_id: tx.userId,
        p_amount: Number(tx.amount)
      });
      if (rpcError) console.error('Error refunding balance:', rpcError);
    }
  };

  return { transactions, hasFetched, addTransaction, updateStatus };
}
