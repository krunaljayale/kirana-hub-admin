export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 pb-20">
      
      {/* 1. STATIC HEADER (Visible Immediately) */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, Admin 👋
          </p>
        </div>
      </div>

      {/* --- LOADING CONTENT (With Pulse) --- */}
      <div className="animate-pulse space-y-8">
        
        {/* 2. Top Stats Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm h-32">
              <div className="h-4 w-24 bg-slate-100 dark:bg-slate-700 rounded-md mb-3"></div>
              <div className="h-8 w-32 bg-slate-200 dark:bg-slate-600 rounded-lg mb-2"></div>
              <div className="h-3 w-36 bg-slate-100 dark:bg-slate-700 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* 3. Live Activity Skeleton (With Faded Premium Colors) */}
                <div>
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                    // Pink Faded
                    { bg: "bg-pink-50 dark:bg-pink-500/10", border: "border-pink-100 dark:border-pink-500/20", ghost: "bg-pink-200 dark:bg-pink-500/20" },
                    // Blue Faded
                    { bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", ghost: "bg-blue-200 dark:bg-blue-500/20" },
                    // Orange Faded
                    { bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-100 dark:border-orange-500/20", ghost: "bg-orange-200 dark:bg-orange-500/20" },
                    // Purple Faded
                    { bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20", ghost: "bg-purple-200 dark:bg-purple-500/20" }
                    ].map((color, i) => (
                    <div key={i} className={`rounded-2xl p-6 border h-32 relative overflow-hidden ${color.bg} ${color.border}`}>
                        <div className={`h-4 w-24 rounded-md mb-3 ${color.ghost}`}></div>
                        <div className={`h-8 w-16 rounded-lg mb-2 ${color.ghost}`}></div>
                        <div className={`h-3 w-28 rounded-md ${color.ghost}`}></div>
                        <div className={`absolute top-4 right-4 h-6 w-6 rounded-full ${color.ghost}`}></div>
                    </div>
                    ))}
                </div>
                </div>

        {/* 4. Bottom Section Skeleton */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Chart Skeleton */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm lg:col-span-2 h-[400px]">
            <div className="flex justify-between mb-6">
              <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
            </div>
            <div className="h-[280px] w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl"></div>
          </div>

          {/* Premium Live Partners Widget Skeleton */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm flex flex-col h-[400px]">
            
            {/* Widget Header */}
            <div className="flex justify-between items-center mb-6">
               <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
               <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
            </div>
            
            {/* Runner List */}
            <div className="space-y-4 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between px-1 py-1">
                  <div className="flex items-center gap-3">
                    {/* Ghost Avatar with Status Ring */}
                    <div className="relative shrink-0">
                      <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-600"></div>
                    </div>
                    {/* Ghost Text & Badge */}
                    <div className="space-y-2">
                      <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                      <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                    </div>
                  </div>
                  {/* Ghost Phone Action Button */}
                  <div className="shrink-0 h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                </div>
              ))}
            </div>
            
            {/* Footer Action Button */}
            <div className="w-full mt-4 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>

          </div>
        </div>
      </div>
    </div>
  );
}