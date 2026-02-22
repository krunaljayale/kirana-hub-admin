import Link from "next/link";
import { MenuItem } from "@/types/sidebar";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface SidebarMenuProps {
  menuItems: MenuItem[];
  pathname: string;
  setMobileOpen: (open: boolean) => void;
}

export default function SidebarMenu({ menuItems, pathname, setMobileOpen }: SidebarMenuProps) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
      
      {/* Premium Fading Header */}
      <div className="flex items-center gap-4 px-5 mb-4 mt-2">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Main Menu
        </p>
        {/* 🚀 Removed transition-all duration-300 from the divider */}
        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 to-transparent"></div>
      </div>
      
      {menuItems.map((item) => {
        const isActive = pathname.startsWith(item.path);
        
        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setMobileOpen(false)}
            className={`
              group flex items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-bold relative overflow-hidden outline-none
              ${isActive 
                ? "text-indigo-700 dark:text-indigo-300 bg-gradient-to-r from-indigo-500/15 via-indigo-500/5 to-transparent" 
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-200"
              }
            `}
          >
            {/* 1. Premium Glowing Neon Indicator */}
            {/* 🚀 Swapped transition-all to transition-[transform,opacity] */}
            <div 
              className={`absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-gradient-to-b from-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-[transform,opacity] duration-300 ease-out ${
                isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              }`} 
            />

            {/* 2. Text & Icon Wrapper (With smooth hover slide & pop) */}
            {/* 🚀 Swapped transition-all to transition-transform */}
            <div className={`relative z-10 flex items-center gap-3 transition-transform duration-300 ${!isActive && 'group-hover:translate-x-1.5'}`}>
              {/* 🚀 Swapped transition-all to transition-transform */}
              <item.icon className={`h-5 w-5 transition-transform duration-300 ${
                isActive 
                  ? "text-indigo-600 dark:text-indigo-400 scale-110" 
                  : "text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 dark:text-slate-500 dark:group-hover:text-indigo-400"
              }`} />
              
              <span className="tracking-wide">{item.name}</span>
            </div>
            
            {/* 3. ✅ NEW: Slide-in Chevron Arrow */}
            {/* 🚀 Swapped transition-all to transition-[transform,opacity] */}
            <ChevronRightIcon 
              className={`relative z-10 h-4 w-4 transition-all duration-300 ease-out ${
                isActive 
                  ? "text-indigo-500 opacity-100 translate-x-0" 
                  : "text-slate-400 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
              }`} 
            />

          </Link>
        );
      })}
    </nav>
  );
}