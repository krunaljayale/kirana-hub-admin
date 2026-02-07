import { 
  ClockIcon, 
  MapPinIcon, 
  BanknotesIcon, 
  CheckCircleIcon,
  XCircleIcon 
} from "@heroicons/react/24/outline";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderProps {
  id: string;
  customer: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed";
  timeAgo: string;
  payment: "COD" | "UPI";
}

export default function OrderCard({ order }: { order: OrderProps }) {
  
  // Premium Status Colors (Background + Text)
  const statusStyles = {
    pending: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border-orange-100 dark:border-orange-500/20",
    preparing: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-100 dark:border-blue-500/20",
    ready: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
    completed: "bg-slate-50 text-slate-600 dark:bg-slate-700/50 dark:text-slate-400 border-slate-100 dark:border-slate-700",
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-indigo-900/20">
      
      {/* --- Header: ID & Timer --- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-fit p-1 items-center justify-center rounded-xl border ${statusStyles[order.status]}`}>
            <span className="text-lg font-bold">{order.id.split('-')[1]}</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Order #{order.id}</h3>
            <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <ClockIcon className="h-3.5 w-3.5" />
              <span>{order.timeAgo}</span>
            </div>
          </div>
        </div>
        
        {/* Payment Badge */}
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${
          order.payment === 'COD' 
            ? 'bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/20 dark:border-amber-900/50 dark:text-amber-500' 
            : 'bg-indigo-50 border-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-900/50 dark:text-indigo-400'
        }`}>
          {order.payment}
        </span>
      </div>

      {/* --- Customer Info --- */}
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
        <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
          {order.customer.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{order.customer}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" />
            1.2 km • Civil Lines
          </p>
        </div>
      </div>

      {/* --- Items List --- */}
      <div className="mb-5 flex-1 space-y-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="flex h-5 w-5 items-center justify-center rounded text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {item.qty}
              </span>
              <span>{item.name}</span>
            </div>
            <span className="font-medium text-slate-900 dark:text-white">₹{item.price * item.qty}</span>
          </div>
        ))}
        {order.items.length > 2 && (
            <p className="text-xs font-medium text-indigo-500">+ {order.items.length - 2} more items</p>
        )}
      </div>

      {/* --- Footer: Total & Actions --- */}
      <div className="mt-auto pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
        <div className="flex items-end justify-between mb-4">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Amount</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">₹{order.total}</p>
        </div>

        {/* Action Buttons based on Status */}
        {order.status === 'pending' && (
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-100 bg-white text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-900/20">
              <XCircleIcon className="h-5 w-5" />
              Reject
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all">
              <CheckCircleIcon className="h-5 w-5" />
              Accept
            </button>
          </div>
        )}

        {order.status === 'preparing' && (
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] transition-all">
            <CheckCircleIcon className="h-5 w-5" />
            Mark Order Ready
          </button>
        )}

        {order.status === 'ready' && (
          <div className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold">Waiting for Pickup</span>
          </div>
        )}
      </div>

    </div>
  );
}