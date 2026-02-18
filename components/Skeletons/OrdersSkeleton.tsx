import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function OrdersSkeleton() {
  return (
    <div className="space-y-6 pb-20 relative">
      
      {/* --- 1. STATIC HEADER (No Animation) --- */}
      {/* We render the actual text so it looks "ready" immediately */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Order Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage kitchen orders.</p>
        </div>

        {/* Static View Switcher (Visual only) */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-auto opacity-80 pointer-events-none">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-sm">
            <Squares2X2Icon className="h-4 w-4" /> Live Board
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-slate-500 dark:text-slate-400">
            <ListBulletIcon className="h-4 w-4" /> History
          </button>
        </div>
      </div>

      {/* --- 2. LOADING CONTENT (With Pulse) --- */}
      <div className="animate-pulse space-y-6">
        
        {/* Status Bar Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="h-19 md:h-[45.5px] w-full md:w-1/3 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col h-95">
                
                {/* ID & Time Row */}
                <div className="flex justify-between items-start mb-5">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                      <div>
                         <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                         <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded"></div>
                      </div>
                   </div>
                   <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>

                {/* Customer Box */}
                <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                   <div className="space-y-2 w-full">
                      <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800 rounded"></div>
                   </div>
                </div>

                {/* Items Lines */}
                <div className="space-y-3 flex-1">
                   <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                   <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                   <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                   <div className="flex justify-between">
                      <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded"></div>
                      <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="h-11 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                      <div className="h-11 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                   </div>
                </div>

             </div>
           ))}
        </div>
      </div>

    </div>
  );
}