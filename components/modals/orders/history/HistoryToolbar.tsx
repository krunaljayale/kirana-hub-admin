import { MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface HistoryToolbarProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onExport: () => void;
}

export default function HistoryToolbar({ search, setSearch, statusFilter, setStatusFilter, onExport }: HistoryToolbarProps) {
  return (
    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-all"
          />
        </div>
        <button onClick={onExport} className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all active:scale-95">
          <ArrowDownTrayIcon className="h-4 w-4" /> <span>Export CSV</span>
        </button>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
         {['All', 'Delivered', 'Cancelled'].map((status) => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)} 
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                statusFilter === status 
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' 
                  : 'text-slate-500 border-slate-200 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {status}
            </button>
         ))}
      </div>
    </div>
  );
}