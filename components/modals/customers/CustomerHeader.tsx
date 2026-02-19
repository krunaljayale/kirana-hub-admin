import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";

interface CustomerHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  onAdd: () => void;
}

export default function CustomerHeader({ search, setSearch, onAdd }: CustomerHeaderProps) {
  return (
    <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900">
      <div className="relative w-full sm:w-80 group">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone..." 
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
        />
      </div>
      
      <button 
        onClick={onAdd}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
      >
        <UserPlusIcon className="h-5 w-5" />
        Add Customer
      </button>
    </div>
  );
}