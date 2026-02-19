import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function OrdersSkeleton() {
  return (
    <div className="space-y-6 pb-20 relative animate-pulse">
      
      {/* --- 1. STATIC HEADER (No Animation on Text) --- */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Order Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage kitchen orders.</p>
        </div>

        {/* Static View Switcher (Visual only) */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-auto opacity-50 pointer-events-none">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-white dark:bg-slate-900 text-slate-400 shadow-sm">
            <Squares2X2Icon className="h-4 w-4" /> Live Board
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400">
            <ListBulletIcon className="h-4 w-4" /> History
          </button>
        </div>
      </div>

      {/* --- 2. LOADING CONTENT --- */}
      <div className="space-y-6">
        
        {/* Kanban Status Tabs Skeleton */}
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-full sm:w-fit overflow-hidden justify-center">
           <div className="md:h-10 h-20 w-29 bg-white dark:bg-slate-700 rounded-xl shadow-sm"></div>
           <div className="md:h-10 h-20 w-29 bg-slate-200/50 dark:bg-slate-800 rounded-xl"></div>
           <div className="md:h-10 h-20 w-29 bg-slate-200/50 dark:bg-slate-800 rounded-xl"></div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
                
                {/* Header: Order ID & Timer */}
                <div className="flex justify-between items-center mb-5">
                   <div className="h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                   <div className="h-6 w-24 bg-orange-100 dark:bg-orange-900/20 rounded-lg"></div>
                </div>

                {/* Customer Box */}
                <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                   <div className="space-y-2 w-full">
                      <div className="h-3 w-32 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                      <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                   </div>
                   <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 ml-auto"></div>
                </div>

                {/* Order Items List */}
                <div className="space-y-3 flex-1 mb-6">
                   {/* Item 1 */}
                   <div className="flex justify-between items-center">
                     <div className="flex gap-2 items-center">
                       <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                       <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                     </div>
                     <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                   </div>
                   {/* Item 2 */}
                   <div className="flex justify-between items-center">
                     <div className="flex gap-2 items-center">
                       <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                       <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                     </div>
                     <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                   </div>
                   {/* Item 3 */}
                   <div className="flex justify-between items-center">
                     <div className="flex gap-2 items-center">
                       <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                       <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                     </div>
                     <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                   </div>
                </div>

                {/* Footer: Totals & Buttons */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex justify-between items-center mb-5">
                      <div className="space-y-2">
                        <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                      </div>
                      <div className="h-7 w-16 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-lg"></div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <div className="h-12 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30"></div>
                      <div className="h-12 rounded-xl bg-indigo-100/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30"></div>
                   </div>
                </div>

             </div>
           ))}
        </div>
      </div>

    </div>
  );
}