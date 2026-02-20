export default function SettingsSkeleton() {
  return (
    <div className="space-y-6 pb-24 relative animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- Left Column (Span 2) --- */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Store Profile Skeleton */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
              <div className="h-7 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              {/* Logo Box */}
              <div className="h-24 w-24 rounded-2xl bg-slate-200 dark:bg-slate-700 shrink-0"></div>
              {/* Inputs */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Security Skeleton */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
               <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
               <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
            </div>
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>

        {/* --- Right Column --- */}
        <div className="space-y-6">
          
          {/* Notifications Skeleton */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div className="space-y-1.5">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  </div>
                  <div className="h-7 w-12 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences Skeleton */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
              <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-6 w-36 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
             </div>
             <div className="mb-6 space-y-2">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-16 w-full bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
             </div>
             <div className="flex justify-between items-center">
                <div className="space-y-1.5">
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-3 w-28 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="h-9 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
             </div>
          </div>

          {/* Logout Skeleton */}
          <div className="bg-red-50/50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-100/50 dark:border-red-900/30">
            <div className="h-5 w-24 bg-red-200 dark:bg-red-800/50 rounded mx-auto mb-2"></div>
            <div className="h-3 w-48 bg-red-100 dark:bg-red-900/50 rounded mx-auto mb-4"></div>
            <div className="h-12 w-full bg-red-200 dark:bg-red-800/50 rounded-xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}