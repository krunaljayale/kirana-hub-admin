"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  TruckIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

interface MenuItem {
  name: string;
  path: string;
  icon: any;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Live Orders", path: "/orders", icon: ShoppingBagIcon },
  { name: "Inventory", path: "/inventory", icon: ChartBarIcon },
  { name: "Customers", path: "/customers", icon: UsersIcon },
  { name: "Delivery", path: "/delivery", icon: TruckIcon },
  { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ✅ UPDATED LOGOUT LOGIC
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // 1. Call the server to delete the cookie
      await fetch("/api/logout", { method: "POST" });

      // 2. Force a hard reload to Login (Clears all client state)
      window.location.href = "/login";
      
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 flex flex-col
          bg-white dark:bg-slate-900 
          border-r border-slate-200 dark:border-slate-800
          transition-all duration-300 ease-in-out 
          lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        
        {/* Header / Logo Area */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/60 transition-colors duration-300 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide text-slate-900 dark:text-white transition-colors duration-300">
              Kirana Hub
            </span>
          </div>
          <button 
            onClick={() => setMobileOpen(false)} 
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors duration-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 transition-colors duration-300">
            Menu
          </p>
          
          {menuItems.map((item) => {
            // Check if current path starts with the menu item path
            const isActive = pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium relative overflow-hidden transition-all duration-300
                  ${isActive ? "text-white shadow-md shadow-indigo-500/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"}
                `}
              >
                {/* Smooth Fade for Active Background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 transition-opacity duration-300 ease-in-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`} 
                />

                <div className="relative z-10 flex items-center gap-3">
                  <item.icon className={`h-5 w-5 transition-colors duration-300 ${
                    isActive 
                      ? "text-white" 
                      : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                  }`} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout Button */}
        <div className="border-t border-slate-100 dark:border-slate-800/60 p-4 shrink-0 transition-colors duration-300">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300
              ${isLoggingOut 
                ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 cursor-not-allowed opacity-80" 
                : "text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              }
            `}
          >
            {isLoggingOut ? (
              <>
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging out...
              </>
            ) : (
              <>
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}