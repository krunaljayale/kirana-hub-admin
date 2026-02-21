export default function ProfileSkeleton() {
  return (
    <div className="space-y-6 pb-10 animate-pulse">
      
      {/* Header Section Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
        <div className="flex-1 text-center sm:text-left space-y-3 mt-2 w-full">
           <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto sm:mx-0"></div>
           <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded-md mx-auto sm:mx-0"></div>
           <div className="h-4 w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-md mx-auto sm:mx-0 mt-4"></div>
           <div className="h-4 w-3/4 max-w-sm bg-slate-100 dark:bg-slate-800 rounded-md mx-auto sm:mx-0"></div>
        </div>
        <div className="shrink-0 h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl mt-4 sm:mt-0"></div>
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Form Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
           <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-8"></div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="space-y-2">
                 <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                 <div className="h-12 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800"></div>
               </div>
             ))}
             <div className="space-y-2 sm:col-span-2">
                 <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                 <div className="h-24 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800"></div>
             </div>
           </div>
        </div>

        {/* Right Col: Stats & Activity Skeleton */}
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 h-32 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"></div>
              <div className="bg-white dark:bg-slate-900 h-32 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"></div>
           </div>
           <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-96">
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-6"></div>
              <div className="space-y-6">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4">
                       <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                       <div className="space-y-2 flex-1">
                          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                          <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}