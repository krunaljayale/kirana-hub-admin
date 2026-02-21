import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SidebarLogo({ setMobileOpen }: { setMobileOpen: (open: boolean) => void }) {
  return (
    <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/60 transition-all duration-300 shrink-0">
      <div className="flex items-center gap-3">
        {/* Permanent Kirana Hub Logo */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
          <ShoppingBagIcon className="h-6 w-6 text-white" />
        </div>
        
        {/* Permanent Brand Name */}
        <span className="text-xl font-extrabold tracking-wide text-slate-900 dark:text-white transition-all duration-300">
          Kirana Hub
        </span>
      </div>
      
      {/* Mobile Close Button */}
      <button 
        onClick={() => setMobileOpen(false)} 
        className="lg:hidden p-2 -mr-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all duration-300"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}