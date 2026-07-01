import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type CryptoAsset = {
  id: string;       // symbol.toLowerCase(), e.g. "btc"
  dbId: string;     // actual uuid in the database
  name: string;
  symbol: string;
  color: string;
  address: string;
  network: string;
  active: boolean;
};

export function useCryptoStore() {
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);

  useEffect(() => {
    fetchCryptos();
    
    const channelId = `crypto_assets_changes_${Math.random()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'crypto_assets' },
        () => {
          fetchCryptos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCryptos = async () => {
    const { data, error } = await supabase.from('crypto_assets').select('*').order('name');
    if (data && !error) {
      // Remap uuid-based ids to symbol-based ids for UI compatibility
      const mapped: CryptoAsset[] = data.map((row: any) => ({
        ...row,
        dbId: row.id,
        id: row.symbol.toLowerCase(),
      }));
      setCryptos(mapped);
    }
  };

  const addCrypto = async (crypto: Omit<CryptoAsset, 'dbId'>) => {
    // Optimistic update
    const optimistic = { ...crypto, dbId: '' };
    setCryptos(prev => [...prev, optimistic]);
    const { data, error } = await supabase.from('crypto_assets').insert([{
      name: crypto.name,
      symbol: crypto.symbol,
      color: crypto.color,
      address: crypto.address,
      network: crypto.network,
      active: crypto.active,
    }]).select().single();
    if (error) {
      console.error('Error adding crypto:', error);
      fetchCryptos();
    } else if (data) {
      fetchCryptos();
    }
  };

  const removeCrypto = async (id: string) => {
    const crypto = cryptos.find(c => c.id === id);
    if (!crypto) return;
    // Optimistic update
    setCryptos(prev => prev.filter(c => c.id !== id));
    const { error } = await supabase.from('crypto_assets').delete().eq('id', crypto.dbId);
    if (error) {
      console.error('Error removing crypto:', error);
      fetchCryptos();
    }
  };

  const toggleActive = async (id: string) => {
    const crypto = cryptos.find(c => c.id === id);
    if (!crypto) return;
    
    // Optimistic update
    setCryptos(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    
    const { error } = await supabase.from('crypto_assets').update({ active: !crypto.active }).eq('id', crypto.dbId);
    if (error) {
      console.error('Error toggling active:', error);
      fetchCryptos();
    }
  };

  const updateAddress = async (id: string, address: string) => {
    const crypto = cryptos.find(c => c.id === id);
    if (!crypto) return;
    // Optimistic update
    setCryptos(prev => prev.map(c => c.id === id ? { ...c, address } : c));
    
    const { error } = await supabase.from('crypto_assets').update({ address }).eq('id', crypto.dbId);
    if (error) {
      console.error('Error updating address:', error);
      fetchCryptos();
    }
  };

  return { cryptos, addCrypto, removeCrypto, toggleActive, updateAddress };
}
