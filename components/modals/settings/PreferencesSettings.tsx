import { UserCircleIcon, SunIcon, MoonIcon, ComputerDesktopIcon, LanguageIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function PreferencesSettings() {
  const { theme, setTheme } = useTheme();

  // 🚀 Swapped 'transition-all' to 'transition-transform' to preserve click physics but drop color fading
  const baseBtnClass = "flex flex-col items-center justify-center py-3 rounded-xl transition-transform duration-300 active:scale-95";
  const activeBtnClass = "bg-white dark:bg-slate-800 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400";
  const inactiveBtnClass = "border border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/60";

  return (
    <div className="bg-white dark:bg-slate-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.1)]">
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
         <UserCircleIcon className="h-5 w-5 text-indigo-500" /> App Preferences
      </h3>
      
      <div className="space-y-8">
        {/* --- Theme Selector --- */}
        <div>
          <div className="mb-4">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Interface Theme</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Select or customize your UI theme.</p>
          </div>
          
          {/* 🚀 Segmented Control Container (Recessed Tray) */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 bg-slate-50 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
            
            {/* Light Mode Button */}
            <button 
              onClick={(e) => setTheme('light', e)}  // 🚀 Pass the event (e) here!
              className={`${baseBtnClass} ${theme === 'light' ? activeBtnClass : inactiveBtnClass}`}
            >
              <SunIcon className={`h-6 w-6 mb-1.5 transition-transform duration-300 ${theme === 'light' ? 'scale-110' : ''}`} />
              <span className="text-[11px] font-extrabold tracking-wide uppercase">Light</span>
            </button>
            
            {/* Dark Mode Button */}
            <button 
              onClick={(e) => setTheme('dark', e)}   // 🚀 Pass the event (e) here!
              className={`${baseBtnClass} ${theme === 'dark' ? activeBtnClass : inactiveBtnClass}`}
            >
              <MoonIcon className={`h-6 w-6 mb-1.5 transition-transform duration-300 ${theme === 'dark' ? 'scale-110' : ''}`} />
              <span className="text-[11px] font-extrabold tracking-wide uppercase">Dark</span>
            </button>
            
            {/* System Mode Button */}
            <button 
              onClick={(e) => setTheme('system', e)} // 🚀 Pass the event (e) here!
              className={`${baseBtnClass} ${theme === 'system' ? activeBtnClass : inactiveBtnClass}`}
            >
              <ComputerDesktopIcon className={`h-6 w-6 mb-1.5 transition-transform duration-300 ${theme === 'system' ? 'scale-110' : ''}`} />
              <span className="text-[11px] font-extrabold tracking-wide uppercase">System</span>
            </button>
            
          </div>
        </div>

        {/* --- Language Setting --- */}
        {/* 🚀 Removed all transition-colors / transition-all from this row */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between group cursor-pointer">
           <div>
             <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Language</p>
             <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">App interface language</p>
           </div>
           <div className="flex items-center gap-3 sm:gap-4">
             {/* 🚀 Recessed Pill for Selection */}
             <span className="text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-200 dark:border-slate-800/60 shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-slate-800/80">
               <LanguageIcon className="h-4 w-4 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" /> 
               English
             </span>
             {/* 🚀 Changed to transition-transform strictly for the hover slide effect */}
             <ChevronRightIcon className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-transform" />
           </div>
        </div>
        
      </div>
    </div>
  );
}