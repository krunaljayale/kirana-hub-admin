import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  targetType: "ORDER" | "ITEM" | null;
  targetOrderId: string | number | null;
  rejectionReason: string;
  setRejectionReason: (val: string) => void;
  quickReasons: string[];
}

export default function RejectModal({
  isOpen, onClose, onConfirm, targetType, targetOrderId, rejectionReason, setRejectionReason, quickReasons
}: RejectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4 text-red-500"><ExclamationTriangleIcon className="h-8 w-8" /></div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{targetType === "ORDER" ? "Reject Full Order?" : "Remove Item?"}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{targetType === "ORDER" ? `Order #${targetOrderId} will be moved to 'Cancelled' history.` : `Removing this item from Order #${targetOrderId}.`}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">{quickReasons.map((reason) => (<button key={reason} onClick={() => setRejectionReason(reason)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${rejectionReason === reason ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/20 dark:border-red-500/30 dark:text-red-400" : "bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"}`}>{reason}</button>))}</div>
          <textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} placeholder="Reason..." className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 mb-6 text-slate-900 dark:text-white resize-none h-20" />
          <div className="grid grid-cols-2 gap-3 w-full"><button onClick={onClose} className="py-3 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button><button onClick={onConfirm} disabled={!rejectionReason.trim()} className={`py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${rejectionReason.trim() ? "bg-red-600 text-white hover:bg-red-700 shadow-red-500/30" : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"}`}>Confirm</button></div>
        </div>
      </div>
    </div>
  );
}