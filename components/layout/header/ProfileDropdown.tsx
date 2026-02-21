import { RefObject, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: RefObject<HTMLDivElement>;
}

export default function ProfileDropdown({ isOpen, onToggle, dropdownRef }: Props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* ✅ Fixed Mobile Button UI */}
      <button 
        onClick={onToggle} 
        className="flex items-center gap-2 sm:gap-3 cursor-pointer group outline-none sm:bg-slate-50 sm:dark:bg-slate-800/50 sm:p-1.5 sm:pr-3 rounded-full sm:border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
      >
        <img 
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Admin" 
          className="h-9 w-9 sm:h-8 sm:w-8 rounded-full object-cover border-2 border-slate-200 sm:border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105" 
        />
        <div className="hidden sm:block text-left">
          <p className="text-xs font-bold text-slate-700 dark:text-white">Admin User</p>
        </div>
        <ChevronDownIcon className={`hidden sm:block h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      <div className={`absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 origin-top-right z-50 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 sm:hidden">
          <p className="font-bold text-slate-900 dark:text-white">Admin User</p>
          <p className="text-xs text-slate-500">Super Admin</p>
        </div>
        
        <div className="p-2 space-y-1">
          <Link href="/profile" onClick={onToggle} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors">
            <UserCircleIcon className="h-5 w-5" /> Profile
          </Link>
          <Link href="/settings" onClick={onToggle} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors">
            <Cog6ToothIcon className="h-5 w-5" /> Settings
          </Link>
        </div>

        <div className="p-2 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-wait"
          >
            {isLoggingOut ? <div className="h-5 w-5 rounded-full border-2 border-red-200 border-t-red-600 animate-spin"></div> : <ArrowRightOnRectangleIcon className="h-5 w-5" />}
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}