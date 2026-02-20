import { UserCircleIcon, SunIcon, MoonIcon, ComputerDesktopIcon, LanguageIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function PreferencesSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
         <UserCircleIcon className="h-5 w-5 text-blue-500" /> App Preferences
      </h3>
      
      <div className="space-y-6">
        {/* --- Theme Selector --- */}
        <div>
          <div className="mb-3">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Interface Theme</p>
            <p className="text-xs text-slate-500 mt-0.5">Select or customize your UI theme.</p>
          </div>
          
          {/* Segmented Control Container */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            
            {/* Light Mode Button */}
            <button 
              onClick={() => setTheme('light')} 
              className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${
                theme === 'light' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400' 
                  : 'border border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <SunIcon className="h-6 w-6 mb-1.5" />
              <span className="text-[11px] font-bold tracking-wide">Light</span>
            </button>
            
            {/* Dark Mode Button */}
            <button 
              onClick={() => setTheme('dark')} 
              className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400' 
                  : 'border border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <MoonIcon className="h-6 w-6 mb-1.5" />
              <span className="text-[11px] font-bold tracking-wide">Dark</span>
            </button>
            
            {/* System Mode Button */}
            <button 
              onClick={() => setTheme('system')} 
              className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${
                theme === 'system' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400' 
                  : 'border border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ComputerDesktopIcon className="h-6 w-6 mb-1.5" />
              <span className="text-[11px] font-bold tracking-wide">System</span>
            </button>
            
          </div>
        </div>

        {/* --- Language Setting --- */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between group cursor-pointer">
           <div>
             <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Language</p>
             <p className="text-xs text-slate-500 mt-0.5">App interface language</p>
           </div>
           <div className="flex items-center gap-3">
             <span className="text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors group-hover:border-indigo-200 dark:group-hover:border-indigo-800">
               <LanguageIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" /> English
             </span>
             <ChevronRightIcon className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all" />
           </div>
        </div>
        
      </div>
    </div>
  );
}