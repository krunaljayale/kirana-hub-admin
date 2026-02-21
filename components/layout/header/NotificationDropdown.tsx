import { RefObject } from "react";
import { BellIcon, CheckCircleIcon, InboxIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AppNotification } from "@/types/header";

interface Props {
  notifications: AppNotification[];
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: RefObject<HTMLDivElement>;
  onMarkAllRead: () => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onClickItem: (item: AppNotification) => void;
}

export default function NotificationDropdown({ notifications, isOpen, onToggle, dropdownRef, onMarkAllRead, onDelete, onClickItem }: Props) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button 
        onClick={onToggle}
        className={`relative rounded-full p-2 transition-colors duration-300 outline-none ${isOpen ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900 transition-transform duration-300 animate-pulse"></span>
        )}
      </button>

      {/* Dropdown Panel */}
      <div className={`fixed left-4 right-4 top-20 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 origin-top-right z-50 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
          {unreadCount > 0 ? (
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-300 px-2 py-1 rounded-lg">
              {unreadCount} New
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">All caught up</span>
          )}
        </div>

        {/* List */}
        <div className="max-h-[60vh] sm:max-h-[22rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
           {notifications.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <InboxIcon className="h-10 w-10 mb-2 opacity-50" />
                <p className="text-sm font-medium">No notifications yet</p>
             </div>
           ) : (
             notifications.map((item) => (
               <div 
                 key={item.id} 
                 onClick={() => onClickItem(item)} 
                 className={`relative p-4 border-b border-slate-50 dark:border-slate-700/50 cursor-pointer transition-colors duration-200 group ${item.read ? 'bg-white dark:bg-slate-800 opacity-70 hover:opacity-100' : 'bg-indigo-50/30 dark:bg-indigo-900/10 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
               >
                 {!item.read && <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-indigo-500"></span>}
                 <div className="flex gap-3">
                   <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                     item.type === 'order' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                     item.type === 'alert' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                     'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                   }`}>
                     <BellIcon className="h-5 w-5" />
                   </div>
                   <div className="flex-1 pr-6">
                     <p className={`text-sm font-bold ${item.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>{item.title}</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                     <p className="text-[10px] font-bold text-slate-400 mt-2">{item.time}</p>
                   </div>
                   <button onClick={(e) => onDelete(e, item.id)} className="absolute bottom-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all active:scale-95" title="Remove">
                     <XMarkIcon className="h-4 w-4" />
                   </button>
                 </div>
               </div>
             ))
           )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 text-center border-t border-slate-100 dark:border-slate-700">
            <button onClick={onMarkAllRead} disabled={unreadCount === 0} className={`text-xs font-bold flex items-center justify-center gap-1.5 w-full py-2 rounded-xl transition-all active:scale-95 ${unreadCount === 0 ? 'text-slate-400 cursor-not-allowed' : 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-600 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700'}`}>
              <CheckCircleIcon className="h-4 w-4" /> Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
}