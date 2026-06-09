import { useState } from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../../lib/notification-store";

export function UserNotificationsMenu() {
  const { notifications, unreadCount, markAsRead } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => { setIsOpen(!isOpen); if (!isOpen) markAsRead(); }} className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
        <Bell className="w-5 h-5 text-gray-300" />
        {unreadCount > 0 && <div className="absolute top-2 right-2 w-2 h-2 bg-[#00d4aa] rounded-full"></div>}
      </button>
      {isOpen && (
        <div className="absolute right-0 md:right-0 top-full mt-2 w-80 bg-[#0a0f1c] border border-white/10 rounded-sm shadow-xl z-50 overflow-hidden -mr-4 md:mr-0">
          <div className="p-4 border-b border-white/5 font-bold text-[11px] text-gray-400 uppercase tracking-widest flex justify-between items-center">
            Notifications
            {unreadCount > 0 && <span className="text-[#00d4aa] text-[10px]">{unreadCount} New</span>}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-[12px] text-gray-500 text-center">No notifications yet.</div>
            ) : notifications.map(n => (
              <div key={n.id} className={`p-4 border-b border-white/5 last:border-0 ${!n.is_read ? 'bg-white/5' : ''}`}>
                <div className="text-[13px] text-white font-medium mb-1">{n.title}</div>
                <div className="text-[12px] text-gray-400 leading-relaxed">{n.message}</div>
                <div className="text-[10px] text-gray-600 mt-3 uppercase tracking-widest font-semibold">{new Date(n.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
