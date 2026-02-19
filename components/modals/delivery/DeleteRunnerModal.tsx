import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  runnerName?: string;
}

export default function DeleteRunnerModal({ isOpen, onClose, onConfirm, runnerName }: DeleteRunnerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
       <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 scale-100 animate-in zoom-in-95 duration-200">
          <div className="h-14 w-14 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mb-6 mx-auto">
            <TrashIcon className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Remove Partner?</h3>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">
            Are you sure you want to remove <span className="font-bold text-slate-700 dark:text-slate-200">{runnerName}</span>? They will be moved to the historical records.
          </p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button onClick={onConfirm} className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all">Remove</button>
          </div>
       </div>
    </div>
  );
}