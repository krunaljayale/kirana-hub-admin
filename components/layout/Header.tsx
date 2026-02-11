"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  ChevronDownIcon,
  Bars3Icon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  CheckCircleIcon,
  InboxIcon
} from "@heroicons/react/24/outline";

// Notification Type Definition
type Notification = {
  id: number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'order' | 'alert' | 'system';
};

// Initial Dummy Data
const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, title: "New Order #1024", desc: " ₹450 order from Rahul Sharma", time: "2 min ago", read: false, type: 'order' },
  { id: 2, title: "Low Stock Warning", desc: "Aashirvaad Atta is below 5 units", time: "1 hour ago", read: false, type: 'alert' },
  { id: 3, title: "System Update", desc: "Kirana Hub v2.0 is live!", time: "Yesterday", read: true, type: 'system' },
];

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Notification State
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  // Derived State
  const unreadCount = notifications.filter(n => !n.read).length;

  // Refs for click-outside detection
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- ACTIONS ---

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!searchQuery.trim()) return;
      console.log("Searching for:", searchQuery);
      router.push(`/orders?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent triggering navigation
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // ✅ NEW: Handle Click & Navigate
  const handleNotificationClick = (item: Notification) => {
    // 1. Mark as read
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
    
    // 2. Close Dropdown
    setShowNotifications(false);

    // 3. Navigate based on type
    if (item.type === 'order') {
      router.push('/orders');
    } else if (item.type === 'alert') {
      router.push('/inventory');
    } else if (item.type === 'system') {
      // Optional: Redirect to settings or changelog
      // router.push('/settings'); 
    }
  };

  return (
    <header 
      className="
        sticky top-0 z-20 flex h-20 w-full items-center justify-between px-6 
        bg-white/80 backdrop-blur-md dark:bg-slate-900/80
        border-b border-slate-200 dark:border-slate-800/60
        transition-all duration-300 ease-in-out
      "
    >
      
      {/* LEFT: Menu & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-md dark:text-slate-400 dark:hover:bg-slate-800 transition-colors duration-300"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="hidden md:flex relative group">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search orders (Press Enter)..." 
            className="
              h-10 w-72 rounded-xl border pl-10 pr-12 text-sm outline-none transition-all duration-300
              border-slate-200 bg-slate-50 text-slate-900
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
              dark:border-slate-700 dark:bg-slate-800 dark:text-white
            "
          />
          {searchQuery ? (
             <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
               <XMarkIcon className="h-4 w-4" />
             </button>
          ) : (
            <kbd className="
              absolute right-3 top-1/2 -translate-y-1/2 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors duration-300
              border-slate-200 bg-white text-slate-500 
              dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400
            ">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        
        {/* --- NOTIFICATIONS --- */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative rounded-full p-2 transition-colors duration-300 ${showNotifications ? 'bg-slate-100 dark:bg-slate-800 text-indigo-500' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            <BellIcon className="h-6 w-6" />
            {/* Dynamic Red Dot */}
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900 transition-transform duration-300 animate-pulse"></span>
            )}
          </button>

          {/* ✅ MOBILE FIX: 
              Using 'fixed' on mobile ensures it centers on screen (left-4 right-4).
              Using 'absolute' on desktop (sm:) places it normally under the bell.
          */}
          <div className={`
            fixed left-4 right-4 top-20 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 
            sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 
            overflow-hidden transition-all duration-200 origin-top-right z-50 
            ${showNotifications ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `}>
            
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 ? (
                <span className="text-xs font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-300 px-2 py-1 rounded-full">
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
                    <InboxIcon className="h-12 w-12 mb-2 opacity-50" />
                    <p className="text-sm">No notifications yet</p>
                 </div>
               ) : (
                 notifications.map((item) => (
                   <div 
                     key={item.id} 
                     onClick={() => handleNotificationClick(item)} // ✅ Navigate on Click
                     className={`
                       relative p-4 border-b border-slate-50 dark:border-slate-700/50 cursor-pointer transition-colors duration-200 group
                       ${item.read ? 'bg-white dark:bg-slate-800 opacity-60 hover:opacity-100' : 'bg-indigo-50/30 dark:bg-indigo-900/10 hover:bg-slate-50 dark:hover:bg-slate-700'}
                     `}
                   >
                     {/* Blue Dot for Unread */}
                     {!item.read && (
                       <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-indigo-500"></span>
                     )}
                     
                     <div className="flex gap-3">
                       {/* Icon based on type */}
                       <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                         item.type === 'order' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                         item.type === 'alert' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                         'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                       }`}>
                         <BellIcon className="h-5 w-5" />
                       </div>
                       <div className="flex-1 pr-6">
                         <p className={`text-sm font-medium ${item.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                           {item.title}
                         </p>
                         <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                           {item.desc}
                         </p>
                         <p className="text-[10px] text-slate-400 mt-2 font-medium">
                           {item.time}
                         </p>
                       </div>
                       
                       {/* Delete Button (Visible on Hover) */}
                       <button 
                         onClick={(e) => deleteNotification(e, item.id)}
                         className="absolute bottom-4 right-4 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                         title="Remove"
                       >
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
                <button 
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className={`text-xs font-bold flex items-center justify-center gap-1 w-full py-1 rounded-lg transition-colors ${
                    unreadCount === 0 
                    ? 'text-slate-400 cursor-not-allowed' 
                    : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10'
                  }`}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2 transition-colors duration-300"></div>

        {/* --- USER PROFILE --- */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 cursor-pointer group outline-none"
          >
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Admin" 
              className="h-9 w-9 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm transition-colors duration-300 group-hover:border-indigo-500" 
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-700 dark:text-white transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Admin User
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                Super Admin
              </p>
            </div>
            <ChevronDownIcon className={`hidden md:block h-4 w-4 text-slate-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          <div className={`absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 origin-top-right z-50 ${showProfileMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
             <div className="p-4 border-b border-slate-100 dark:border-slate-700 md:hidden">
               <p className="font-semibold text-slate-900 dark:text-white">Admin User</p>
               <p className="text-xs text-slate-500">Super Admin</p>
             </div>
             
             <div className="p-2 space-y-1">
               <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                 <UserCircleIcon className="h-4 w-4" /> Profile
               </Link>
               <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                 <Cog6ToothIcon className="h-4 w-4" /> Settings
               </Link>
             </div>

             <div className="p-2 border-t border-slate-100 dark:border-slate-700">
               <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                 <ArrowRightOnRectangleIcon className="h-4 w-4" /> Logout
               </button>
             </div>
          </div>
        </div>

      </div>
    </header>
  );
}