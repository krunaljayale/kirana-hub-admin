"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { AppNotification } from "@/types/header";
import LiveClock from "./LiveClock";
import StoreStatusToggle from "./StoreStatusToggle";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_URL}/notifications`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to load notifications", error);
      }
    };
    fetchNotifications();
  }, []);

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

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.read);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await Promise.all(unread.map(n => axios.patch(`${API_URL}/notifications/${n.id}`, { read: true })));
    } catch (e) {
      console.error("Failed to mark read on server");
    }
  };

  const deleteNotification = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    setNotifications(prev => prev.filter(n => n.id !== id));
    try {
      await axios.delete(`${API_URL}/notifications/${id}`);
    } catch (e) {
      console.error("Failed to delete from server");
    }
  };

  const handleNotificationClick = async (item: AppNotification) => {
    if (!item.read) {
      setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
      axios.patch(`${API_URL}/notifications/${item.id}`, { read: true }).catch(console.error);
    }
    setShowNotifications(false);
    if (item.type === 'order') router.push('/orders');
    else if (item.type === 'alert') router.push('/inventory');
  };

  return (
    <header 
      className="
        sticky top-0 z-20 flex h-20 w-full items-center justify-between px-4 sm:px-6 
        bg-white/80 backdrop-blur-md dark:bg-slate-900/80
        border-b border-slate-200 dark:border-slate-800/60
      "
    >
      
      {/* LEFT: Mobile Menu & Live Clock */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* 🚀 Removed color transition */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <LiveClock />
      </div>

      {/* RIGHT: Status, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        <StoreStatusToggle />

        {/* 🚀 Removed color transition */}
        <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
        
        <NotificationDropdown 
          notifications={notifications}
          isOpen={showNotifications}
          onToggle={() => {
            setShowNotifications(!showNotifications);
            setShowProfileMenu(false);
          }}
          dropdownRef={notificationRef}
          onMarkAllRead={markAllAsRead}
          onDelete={deleteNotification}
          onClickItem={handleNotificationClick}
        />

        {/* 🚀 Removed color transition */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

        <ProfileDropdown 
          isOpen={showProfileMenu}
          onToggle={() => {
            setShowProfileMenu(!showProfileMenu);
            setShowNotifications(false);
          }}
          dropdownRef={profileRef}
        />

      </div>
    </header>
  );
}