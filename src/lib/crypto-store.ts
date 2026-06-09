import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type CryptoAsset = {
  id: string;
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
    const { data, error } = await supabase.from('crypto_assets').select('*');
    if (data && !error) {
      setCryptos(data);
    }
  };

  const addCrypto = async (crypto: CryptoAsset) => {
    // Optimistic update
    setCryptos(prev => [...prev, crypto]);
    const { error } = await supabase.from('crypto_assets').insert([crypto]);
    if (error) {
      console.error('Error adding crypto:', error);
      fetchCryptos();
    }
  };

  const removeCrypto = async (id: string) => {
    // Optimistic update
    setCryptos(prev => prev.filter(c => c.id !== id));
    const { error } = await supabase.from('crypto_assets').delete().eq('id', id);
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
    
    const { error } = await supabase.from('crypto_assets').update({ active: !crypto.active }).eq('id', id);
    if (error) {
      console.error('Error toggling active:', error);
      fetchCryptos();
    }
  };

  const updateAddress = async (id: string, address: string) => {
    // Optimistic update
    setCryptos(prev => prev.map(c => c.id === id ? { ...c, address } : c));
    
    const { error } = await supabase.from('crypto_assets').update({ address }).eq('id', id);
    if (error) {
      console.error('Error updating address:', error);
      fetchCryptos();
    }
  };

  return { cryptos, addCrypto, removeCrypto, toggleActive, updateAddress };
}
