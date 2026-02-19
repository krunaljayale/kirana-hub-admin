export default function InventorySkeleton() {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col animate-pulse">
      
      {/* --- TOOLBAR SKELETON --- */}
      <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
          {/* Search Bar Placeholder */}
          <div className="h-11 w-full sm:max-w-xs bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center px-4 gap-3">
             <div className="h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0"></div>
             <div className="h-3 w-24 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
          </div>
          {/* Filter Dropdown Placeholder */}
          <div className="h-11 w-full sm:w-40 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        {/* Add Product Button Placeholder */}
        <div className="h-11 w-full sm:w-40 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-xl shrink-0"></div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
        
        {/* === MOBILE CARD SKELETON === */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              
              {/* Top: Image & Basic Info */}
              <div className="flex gap-4 items-start">
                <div className="h-20 w-20 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                <div className="flex-1 space-y-2.5 py-1">
                  <div className="h-4 w-full max-w-45 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                  <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded-md"></div>
                  <div className="flex gap-2 pt-1">
                    <div className="h-6 w-20 bg-slate-100 dark:bg-slate-700/50 rounded-lg"></div>
                    <div className="h-6 w-16 bg-slate-100 dark:bg-slate-700/50 rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Bottom: Price, Stock & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                 <div className="space-y-1.5">
                    <div className="h-3 w-10 bg-slate-100 dark:bg-slate-700 rounded-md"></div>
                    <div className="h-5 w-16 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                 </div>
                 <div className="flex gap-2">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-700"></div>
                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-700"></div>
                 </div>
              </div>

            </div>
          ))}
        </div>

        {/* === DESKTOP TABLE SKELETON === */}
        <div className="hidden md:block overflow-x-auto w-full h-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/80 sticky top-0 z-10">
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 pl-6"><div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
                <th className="p-4"><div className="h-3 w-16 mx-auto bg-slate-200 dark:bg-slate-700 rounded-md"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i}>
                  
                  {/* Product Info (Image + Name + Unit) */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 xl:w-48 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                        <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Category Badge */}
                  <td className="p-4">
                    <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                  </td>
                  
                  {/* Price */}
                  <td className="p-4">
                    <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                  </td>
                  
                  {/* Stock Badge */}
                  <td className="p-4">
                    <div className="h-6 w-20 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg border border-emerald-100 dark:border-emerald-800/30"></div>
                  </td>
                  
                  {/* Actions (Edit / Delete) */}
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                      <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
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