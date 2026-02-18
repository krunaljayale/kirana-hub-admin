import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

interface OrderHeaderProps {
  viewMode: "kanban" | "history";
  setViewMode: (mode: "kanban" | "history") => void;
}

export default function OrderHeader({ viewMode, setViewMode }: OrderHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Order Manager</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage kitchen orders.</p>
      </div>
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-auto">
        <button onClick={() => setViewMode("kanban")} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === "kanban" ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"}`}>
          <Squares2X2Icon className="h-4 w-4" /> Live Board
        </button>
        <button onClick={() => setViewMode("history")} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === "history" ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"}`}>
          <ListBulletIcon className="h-4 w-4" /> History
        </button>
      </div>
    </div>
  );
}