export default function DeliverySkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* --- Top Section: Team Status Skeleton --- */}
      <section>
        {/* Header (Icon + Title + Add Button) */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-800 rounded-md shrink-0"></div>
            <div className="h-6 w-24 sm:w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          </div>
          <div className="h-9 w-28 sm:w-32 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
        </div>
        
        {/* Runner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
               {/* Left: Avatar & Name */}
               <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                  <div className="space-y-2">
                     <div className="h-4 w-20 sm:w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                     <div className="h-3 w-14 sm:w-16 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                  </div>
               </div>
               
               {/* Right: Status Pill & Call Button */}
               <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-7 w-7 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Bottom Section: Deliveries Skeleton --- */}
      <section>
        {/* ✅ FIXED: Controls exactly match the real UI's responsive stacking (flex-col sm:flex-row) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
           <div className="flex gap-6">
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
              <div className="h-5 w-20 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
           </div>
           <div className="h-9 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>

        {/* Delivery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
           {[1, 2, 3].map((i) => (
             <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0"></div>
                      <div className="h-6 w-20 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg shrink-0"></div>
                    </div>
                    <div className="h-5 w-full max-w-[160px] bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                  </div>
                  <div className="space-y-2 text-right shrink-0">
                    <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-md ml-auto"></div>
                    <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded-md ml-auto"></div>
                  </div>
                </div>

                {/* Address Box */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex gap-3 mb-4 items-center">
                   <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                   <div className="space-y-2 w-full">
                     <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                     <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                   </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-10 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                      <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    </div>
                  </div>
                  <div className="h-8 w-24 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-xl shrink-0"></div>
                </div>

             </div>
           ))}
        </div>
      </section>
      
    </div>
  );
}