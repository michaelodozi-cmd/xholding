/**
 * XHoldings Push Notification Service
 * Uses the Web Notifications API – works as a native notification on:
 *  - Windows (Chrome/Edge/Firefox)
 *  - Android (Chrome)
 *  - iOS 16.4+ when installed as PWA (Add to Home Screen)
 */

export type PushNotificationPayload = {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
};

const ICON_URL = '/favicon.ico';

/** Request browser notification permission from the user */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  const result = await Notification.requestPermission();
  return result === 'granted';
}

/** Fire a native browser / OS push notification */
export function sendPushNotification(payload: PushNotificationPayload): void {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const n = new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon ?? ICON_URL,
      badge: payload.badge ?? ICON_URL,
      tag: payload.tag,          // prevents duplicates with the same tag
      requireInteraction: false,  // auto-dismiss after a few seconds
    });

    // Auto-close after 6 seconds as a fallback
    setTimeout(() => n.close(), 6000);

    n.onclick = () => {
      window.focus();
      n.close();
    };
  } catch (_) {
    // Some browsers (e.g. Firefox) throw if called outside a user gesture.
    // Silently swallow — the in-app notification store still works.
  }
}

/** Convenience helpers for XHoldings-specific events */

export function notifyDepositApproved(amount: string, asset: string) {
  sendPushNotification({
    title: '✅ Deposit Approved — XHoldings',
    body: `Your deposit of ${amount} ${asset} has been credited to your account.`,
    tag: 'deposit-approved',
  });
}

export function notifyDepositRejected(amount: string, asset: string) {
  sendPushNotification({
    title: '❌ Deposit Rejected — XHoldings',
    body: `Your deposit of ${amount} ${asset} was not approved. Contact support for help.`,
    tag: 'deposit-rejected',
  });
}

export function notifyWithdrawalApproved(amount: string, asset: string) {
  sendPushNotification({
    title: '💸 Withdrawal Sent — XHoldings',
    body: `Your withdrawal of ${amount} ${asset} has been processed and sent.`,
    tag: 'withdrawal-approved',
  });
}

export function notifyWithdrawalRejected(amount: string, asset: string) {
  sendPushNotification({
    title: '❌ Withdrawal Rejected — XHoldings',
    body: `Your withdrawal of ${amount} ${asset} was rejected. Contact support.`,
    tag: 'withdrawal-rejected',
  });
}

export function notifyInvestmentROI(amount: string) {
  sendPushNotification({
    title: '📈 ROI Credited — XHoldings',
    body: `Daily return of $${amount} has been added to your balance.`,
    tag: 'roi-credit',
  });
}
