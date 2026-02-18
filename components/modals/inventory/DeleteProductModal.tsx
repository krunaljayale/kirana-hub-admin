import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteProductModal({ isOpen, onClose, onDelete }: DeleteProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
       <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 scale-100 animate-in zoom-in-95 duration-200">
          <div className="h-14 w-14 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mb-6 mx-auto"><TrashIcon className="h-7 w-7" /></div>
          <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Delete Product?</h3>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">Are you sure? This will remove the item from your inventory permanently.</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button onClick={onDelete} className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all">Delete</button>
          </div>
       </div>
    </div>
  );
}