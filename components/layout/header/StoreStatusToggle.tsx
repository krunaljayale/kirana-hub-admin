import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StoreStatusToggle() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // 1. Fetch initial status & Listen for global sync events
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${API_URL}/settings`);
        if (res.data?.store?.isOpen !== undefined) {
          setIsOpen(res.data.store.isOpen);
        }
      } catch (error) {
        console.error("Failed to fetch store status", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();

    // ✅ NEW: Listen for changes from the Settings page
    const handleSync = (e: CustomEvent) => setIsOpen(e.detail);
    window.addEventListener('sync-store-status', handleSync as EventListener);
    
    return () => window.removeEventListener('sync-store-status', handleSync as EventListener);
  }, []);

  const handleToggle = async () => {
    const newState = !isOpen;
    
    // Optimistic UI Update
    setIsOpen(newState);

    // ✅ NEW: Shout to the rest of the app (Settings page) to update instantly!
    window.dispatchEvent(new CustomEvent('sync-store-status', { detail: newState }));

    try {
      const res = await axios.get(`${API_URL}/settings`);
      const currentStore = res.data.store;
      
      await axios.patch(`${API_URL}/settings`, { 
        store: { ...currentStore, isOpen: newState } 
      });
    } catch (error) {
      // Revert if API fails
      setIsOpen(!newState);
      window.dispatchEvent(new CustomEvent('sync-store-status', { detail: !newState }));
      console.error("Failed to update store status", error);
    }
  };

  // Loading Skeleton
  if (loading) return (
    <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-800/50 p-1 pr-3 rounded-full border border-slate-200 dark:border-slate-700">
       <div className="h-7 w-12 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
       <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
    </div>
  );

  return (
    <button
      onClick={handleToggle}
      className={`group flex items-center gap-2.5 p-1 pr-3 sm:pr-4 rounded-full border transition-all duration-300 active:scale-95 shadow-sm outline-none
        ${isOpen 
          ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20" 
          : "bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"
        }
      `}
    >
      <div className={`relative w-10 h-6 rounded-full transition-colors duration-300 ease-in-out shrink-0 shadow-inner ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}>
        <div className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out flex items-center justify-center ${isOpen ? 'translate-x-4' : 'translate-x-0'}`}>
          {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>}
          <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
        </div>
      </div>
      <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wide transition-colors ${isOpen ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
        {isOpen ? "Shop Open" : "Shop Closed"}
      </span>
    </button>
  );
}