export default function InventorySkeleton() {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
      
      {/* --- TOOLBAR SKELETON --- */}
      <div className="p-5 flex flex-col xl:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800/50 shrink-0">
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          {/* Search Bar */}
          <div className="h-11 w-full sm:w-72 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
          {/* Filter Dropdown */}
          <div className="h-11 w-full sm:w-56 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
        </div>
        {/* Add Button */}
        <div className="h-11 w-full xl:w-40 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden">
        
        {/* === MOBILE CARD SKELETON (Visible on small screens) === */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex gap-4">
                {/* Image Placeholder */}
                <div className="h-20 w-20 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                     <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                     <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  <div className="pt-2 flex gap-2">
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-6 w-12 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800"></div>
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800"></div>
              </div>
            </div>
          ))}
        </div>

        {/* === DESKTOP TABLE SKELETON (Visible on large screens) === */}
        <div className="hidden md:block overflow-x-auto w-full h-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="p-4"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-4 w-16 mx-auto bg-slate-200 dark:bg-slate-800 rounded"></div></th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-3 w-16 bg-slate-100 dark:bg-slate-900 rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg"></div></td>
                  <td className="p-4"><div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div></td>
                  <td className="p-4"><div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded"></div></td>
                  <td className="p-4 flex justify-center gap-2">
                    <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                    <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
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