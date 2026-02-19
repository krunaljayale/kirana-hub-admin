export default function CustomerSkeleton() {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col animate-pulse">
      
      {/* --- Toolbar Skeleton --- */}
      <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900 shrink-0">
        <div className="h-11 w-full sm:w-80 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-11 w-full sm:w-40 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* --- Content Skeleton --- */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
        
        {/* === MOBILE CARD VIEW SKELETON === */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              
              {/* Card Header */}
              <div className="flex items-start justify-between">
                 <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                    <div className="space-y-2">
                       <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                       <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700/50 rounded-md"></div>
                    </div>
                 </div>
                 <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg shrink-0"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 py-2">
                 <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 space-y-2">
                    <div className="h-2 w-10 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                 </div>
                 <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 space-y-2">
                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                 <div className="flex-1 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
                 <div className="flex-1 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
                 <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-xl shrink-0"></div>
                 <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-xl shrink-0"></div>
              </div>

            </div>
          ))}
        </div>
        
        {/* === DESKTOP TABLE VIEW SKELETON === */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/80">
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 pl-6"><div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-md mx-auto"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  {/* Customer Info */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                      </div>
                    </div>
                  </td>
                  {/* Contact */}
                  <td className="p-4">
                    <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                  </td>
                  {/* Orders */}
                  <td className="p-4">
                    <div className="h-6 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                  </td>
                  {/* Total Spent */}
                  <td className="p-4">
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                  </td>
                  {/* Credit */}
                  <td className="p-4">
                    <div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                  </td>
                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800"></div>
                      <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800"></div>
                      <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800"></div>
                      <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}