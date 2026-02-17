export default function OrdersSkeleton() {
  return (
    // 'animate-pulse' creates the fading effect automatically
    <div className="space-y-6 pb-20 animate-pulse">
      
      {/* --- HEADER SKELETON --- */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
        <div>
          {/* Title Placeholder */}
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2"></div>
          {/* Subtitle Placeholder */}
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
        {/* View Switcher Placeholder */}
        <div className="h-10 w-full md:w-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* --- STATUS BAR SKELETON --- */}
      <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>

      {/* --- CARDS GRID SKELETON --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* We create an array of 6 dummy items to show 6 skeleton cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 relative flex flex-col h-[340px]">
            
            {/* Top: ID & Badge */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                {/* Square Icon Box */}
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                <div>
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-1"></div>
                  <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
              </div>
              {/* Payment Pill */}
              <div className="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>

            {/* Customer Row */}
            <div className="mb-5 flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
               <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
               <div className="flex-1">
                 <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                 <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
               </div>
            </div>

            {/* Items List Placeholder (3 lines) */}
            <div className="space-y-2 mb-5">
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-auto grid grid-cols-2 gap-3">
               <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
               <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}