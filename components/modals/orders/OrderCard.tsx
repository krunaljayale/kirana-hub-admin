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
    <div className="bg-white dark:bg-slate-800/90 dark:backdrop-blur-xl rounded-3xl p-5 border border-slate-200 dark:border-slate-700/60 relative flex flex-col hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.2)] group/card">
      
      {/* 🆔 ID & Time */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center font-black text-sm shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              {String(order.id).includes('-') ? String(order.id).split('-')[1] : order.id}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">Order #{order.id}</h3>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                <ClockIcon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" /> {order.timeAgo}
              </div>
            </div>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${
          order.payment === 'COD' 
            ? 'border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10' 
            : 'border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
        }`}>
          {order.payment}
        </span>
      </div>

      {/* 🧑 Customer Info (Upgraded Recessed Look) */}
      <div className="mb-5 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-800/60 dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm border border-transparent dark:border-slate-700 shadow-sm">
            {order.customer.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{order.customer}</p>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              <MapPinIcon className="h-3.5 w-3.5 text-slate-400" /> {order.location}
            </div>
          </div>
      </div>

      {/* 📦 Items List (Upgraded Recessed Look) */}
      <div className="space-y-3 mb-5 flex-1 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/60 dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
          {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm group">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-md flex items-center justify-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 text-[10px] font-black border border-slate-200 dark:border-slate-700 shadow-sm">
                    {item.qty}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 text-xs font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-900 dark:text-white font-black text-xs">₹{item.price}</span>
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => onRejectItem(order.id, idx)} 
                      className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <XCircleIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
          ))}
      </div>

      {/* ⚡ Footer Actions */}
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-4">
          <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Amount</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">₹{order.total}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
            {/* Reject Button */}
            <button 
              onClick={() => onRejectOrder(order.id)} 
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 font-bold text-sm bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 transition-all dark:hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] active:scale-95"
            >
              <XCircleIcon className="h-5 w-5" /> Reject
            </button>
            
            {/* Primary Buttons (Tactile 3D Gradients) */}
            {order.status === 'Pending' && (
              <button onClick={() => onUpdateStatus(order.id, 'Preparing')} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-bold text-sm hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-500/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(99,102,241,0.2)] active:scale-95">
                <CheckBadgeIcon className="h-5 w-5" /> Accept
              </button>
            )}
            {order.status === 'Preparing' && (
              <button onClick={() => onUpdateStatus(order.id, 'Ready')} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 text-white font-bold text-sm hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(59,130,246,0.2)] active:scale-95">
                <FireIcon className="h-5 w-5" /> Ready
              </button>
            )}
            {order.status === 'Ready' && (
              <button onClick={() => onUpdateStatus(order.id, 'Delivered')} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 text-white font-bold text-sm hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(16,185,129,0.2)] active:scale-95">
                <CheckCircleIcon className="h-5 w-5" /> Done
              </button>
            )}
        </div>
      </div>
    </div>
  );
}