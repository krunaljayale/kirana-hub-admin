"use client";

import { useEffect } from "react";
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  ChevronDownIcon,
  Bars3Icon // <--- Added this import
} from "@heroicons/react/24/outline";

// Accept a new prop to handle the click
export default function Header({ onMenuClick }: { onMenuClick: () => void }) {

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 transition-colors duration-300">
      
      <div className="flex items-center gap-4">
        {/* --- NEW: Hamburger Menu (Mobile Only) --- */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-md dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Search Bar (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden md:flex relative group">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="h-10 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Admin" 
            className="h-9 w-9 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" 
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700 dark:text-white">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
          </div>
          <ChevronDownIcon className="hidden md:block h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}