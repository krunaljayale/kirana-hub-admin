import { 
  ClockIcon, MapPinIcon, XCircleIcon, CheckBadgeIcon, FireIcon, CheckCircleIcon 
} from "@heroicons/react/24/outline";
import { Order, OrderStatus } from "@/types/order";

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string | number, status: OrderStatus) => void;
  onRejectOrder: (id: string | number) => void;
  onRejectItem: (orderId: string | number, itemIndex: number) => void;
}

export default function OrderCard({ order, onUpdateStatus, onRejectOrder, onRejectItem }: OrderCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 relative flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
      
      {/* 🆔 ID & Time */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center font-bold text-sm">
              {String(order.id).includes('-') ? String(order.id).split('-')[1] : order.id}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Order #{order.id}</h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5"><ClockIcon className="h-3 w-3" /> {order.timeAgo}</div>
            </div>
        </div>
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${order.payment === 'COD' ? 'border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'}`}>{order.payment}</span>
      </div>

      {/* Customer Info */}
      <div className="mb-5 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-800">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm">{order.customer.charAt(0)}</div>
          <div><p className="text-sm font-bold text-slate-900 dark:text-slate-200">{order.customer}</p><div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5"><MapPinIcon className="h-3 w-3" /> {order.location}</div></div>
      </div>

      {/* Items List */}
      <div className="space-y-3 mb-5 flex-1 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm group">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded flex items-center justify-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold border border-slate-200 dark:border-slate-700">{item.qty}</span>
                  <span className="text-slate-700 dark:text-slate-300 text-xs font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-900 dark:text-white font-bold text-xs">₹{item.price}</span>
                  {order.status === 'Pending' && (<button onClick={() => onRejectItem(order.id, idx)} className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><XCircleIcon className="h-4 w-4" /></button>)}
                </div>
              </div>
          ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-4"><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Amount</span><span className="text-2xl font-black text-slate-900 dark:text-white">₹{order.total}</span></div>
        <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onRejectOrder(order.id)} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><XCircleIcon className="h-5 w-5" /> Reject</button>
            {order.status === 'Pending' && <button onClick={() => onUpdateStatus(order.id, 'Preparing')} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"><CheckBadgeIcon className="h-5 w-5" /> Accept</button>}
            {order.status === 'Preparing' && <button onClick={() => onUpdateStatus(order.id, 'Ready')} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"><FireIcon className="h-5 w-5" /> Ready</button>}
            {order.status === 'Ready' && <button onClick={() => onUpdateStatus(order.id, 'Delivered')} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"><CheckCircleIcon className="h-5 w-5" /> Done</button>}
        </div>
      </div>
    </div>
  );
}