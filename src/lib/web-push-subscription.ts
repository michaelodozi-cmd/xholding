/**
 * Fedility Holding Web Push Subscription Service
 * 
 * Handles:
 * 1. Registering the Service Worker
 * 2. Subscribing the user to Web Push
 * 3. Saving the subscription to Supabase
 */

import { supabase } from './supabase';

// â”€â”€â”€ VAPID Public Key â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// This is the PUBLIC key only â€” safe to expose in client code.
// The private key stays on the server (Supabase Edge Function secret).
export const VAPID_PUBLIC_KEY = 'BFpA9qck6mVvXczwUS4uYnD1CClquj5hXJRtFG5Njw8EvCQAzJPcs97Kai2CDnVWkVV7uDJmXppiDAmDLhuSuew';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

/** Register the service worker and subscribe to push, saving the subscription to Supabase */
export async function registerPushSubscription(): Promise<boolean> {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('[Push] Service workers or PushManager not supported.');
      return false;
    }

    // Register SW
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;

    // Check permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('[Push] Permission denied.');
      return false;
    }

    // Subscribe
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
    });

    // Get logged-in user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Upsert subscription in database
    const subJson = subscription.toJSON();
    await supabase.from('push_subscriptions').upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      subscription: subJson,
    }, { onConflict: 'user_id,endpoint' });

    console.log('[Push] Subscription saved successfully.');
    return true;
  } catch (err) {
    console.error('[Push] Failed to register push subscription:', err);
    return false;
  }
}

/** Unsubscribe and remove from database */
export async function unregisterPushSubscription(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.getRegistration('/sw.js');
    if (!registration) return;

    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      await supabase
        .from('push_subscriptions')
        .delete()
        .eq('endpoint', subscription.endpoint);
    }
  } catch (err) {
    console.error('[Push] Failed to unsubscribe:', err);
  }
}

