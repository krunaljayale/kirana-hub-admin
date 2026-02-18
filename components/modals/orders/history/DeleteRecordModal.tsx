interface DeleteRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteRecordModal({ isOpen, onClose, onDelete }: DeleteRecordModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Record?</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">This will remove the order from history permanently.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
          <button onClick={onDelete} className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}