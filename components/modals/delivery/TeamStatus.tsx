import { useState } from "react";
import { UserIcon, PhoneIcon, PlusIcon, TrashIcon, ArchiveBoxIcon, PencilSquareIcon, NoSymbolIcon, CheckCircleIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Runner, RunnerStatus } from "@/types/delivery";

interface TeamStatusProps {
  runners: Runner[];
  historicalRunners: Runner[];
  onAddRunner: () => void;
  onEditRunner: (runner: Runner) => void;
  onDeleteRunner: (id: string) => void;
  onToggleBlock: (id: string, currentlyBlocked: boolean) => void;
  onRestoreRunner: (id: string) => void;
}

export default function TeamStatus({ runners, historicalRunners, onAddRunner, onEditRunner, onDeleteRunner, onToggleBlock, onRestoreRunner }: TeamStatusProps) {
  const [view, setView] = useState<"Active" | "Historical">("Active");

  const getStatusColor = (status: RunnerStatus, isBlocked?: boolean) => {
    if (isBlocked) return "bg-red-500 border-red-700";
    switch (status) {
      case "Available": return "bg-emerald-500 border-emerald-700";
      case "Busy": return "bg-orange-500 border-orange-700";
      case "Offline": return "bg-slate-400 border-slate-600";
      default: return "bg-slate-400";
    }
  };

  const displayedRunners = view === "Active" ? runners : historicalRunners;

  return (
    <section>
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-indigo-500" />
            Delivery Team
          </h3>
          
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button onClick={() => setView("Active")} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${view === "Active" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700"}`}>
              Active
            </button>
            <button onClick={() => setView("Historical")} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${view === "Historical" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700"}`}>
              Past Members
            </button>
          </div>
        </div>
        
        {view === "Active" && (
          <button onClick={onAddRunner} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-xl text-sm font-bold transition-all">
            <PlusIcon className="h-4 w-4" /> Add Partner
          </button>
        )}
      </div>
      
      {/* Runners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedRunners.length > 0 ? displayedRunners.map((runner) => (
          <div key={runner.id} className={`bg-white dark:bg-slate-900 p-4 rounded-2xl border ${runner.isBlocked ? 'border-red-200 dark:border-red-900/50' : 'border-slate-200 dark:border-slate-800'} shadow-sm flex items-center justify-between hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-colors group`}>
            
            {/* Left: Avatar & Name */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={runner.avatar} alt={runner.name} className={`h-12 w-12 object-cover rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 ${view === 'Historical' || runner.isBlocked ? 'grayscale opacity-60' : ''}`} />
                {view === "Active" && (
                   <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(runner.status, runner.isBlocked)}`}></span>
                )}
              </div>
              <div>
                <p className={`font-bold text-sm ${view === 'Historical' || runner.isBlocked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                  {runner.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{runner.phone}</p>
              </div>
            </div>
            
            {/* Right: Actions */}
            <div className="flex flex-col items-end gap-2">
              {view === "Active" ? (
                <>
                  {/* Status Pill */}
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                    runner.isBlocked ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' :
                    runner.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                    runner.status === 'Busy' ? 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20' :
                    'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                  }`}>
                    {runner.isBlocked ? "Blocked" : runner.status}
                  </span>
                  
                  {/* Action Buttons (Visible on hover on Desktop) */}
                  <div className="flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity mt-1">
                    <button onClick={() => window.location.href = `tel:${runner.phone}`} className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-indigo-900/40 transition-colors" title="Call">
                      <PhoneIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => onEditRunner(runner)} className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-900/40 transition-colors" title="Edit Runner">
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => onToggleBlock(runner.id, runner.isBlocked || false)} className={`p-1.5 rounded-lg transition-colors ${runner.isBlocked ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-orange-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-orange-900/40'}`} title={runner.isBlocked ? "Unblock Runner" : "Block Runner"}>
                      {runner.isBlocked ? <CheckCircleIcon className="h-4 w-4" /> : <NoSymbolIcon className="h-4 w-4" />}
                    </button>
                    <button onClick={() => onDeleteRunner(runner.id)} className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-red-900/40 transition-colors" title="Move to History">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    <ArchiveBoxIcon className="h-3 w-3" /> Archived
                  </span>
                  {/* Restore Button */}
                  <div className="flex gap-1.5 mt-1">
                     <button onClick={() => onRestoreRunner(runner.id)} className="flex items-center gap-1 p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 transition-colors" title="Restore to Active Team">
                       <ArrowUturnLeftIcon className="h-4 w-4" />
                       <span className="text-[10px] font-bold pr-1">Restore</span>
                     </button>
                  </div>
                </>
              )}
            </div>
            
          </div>
        )) : (
          <div className="col-span-full py-6 text-center text-slate-400 text-sm font-medium border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            {view === "Active" ? "No active delivery partners." : "No historical partners found."}
          </div>
        )}
      </div>
    </section>
  );
}