import { EyeIcon, TrashIcon, XCircleIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Order } from "@/types/order";

interface HistoryListProps {
  orders: Order[];
  onDelete: (id: string | number) => void;
  onView: () => void;
}

export default function HistoryList({ orders, onDelete, onView }: HistoryListProps) {
  
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20';
      case 'Cancelled': return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 border border-rose-200 dark:border-rose-500/20';
      case 'Refunded': return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
      
      {/* 📱 MOBILE VIEW */}
      <div className="md:hidden grid grid-cols-1 gap-3 p-3 pb-20">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                 <div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order ID</span><p className="font-bold text-slate-900 dark:text-white">#{order.id}</p></div>
                 <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(order.status)}`}>{order.status}</span>
              </div>
              <div className="flex items-center gap-3 mb-4 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl">
                 <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">{order.customer.charAt(0)}</div>
                 <div><p className="text-xs font-bold text-slate-900 dark:text-white">{order.customer}</p><p className="text-[10px] text-slate-400">{order.timeAgo}</p></div>
                 <div className="ml-auto"><p className="text-sm font-black text-slate-900 dark:text-white">₹{order.total}</p></div>
              </div>
              {/* Removed Items Section */}
              {order.removedItems && order.removedItems.length > 0 && (
                 <div className="mb-4 px-3 py-2 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-100 dark:border-red-500/20">
                    <p className="text-[10px] text-red-600 dark:text-red-400 font-bold mb-1">Removed Items:</p>
                    <div className="space-y-1">
                      {order.removedItems.map((item, idx) => (<div key={idx} className="flex justify-between items-start text-[10px]"><span className="text-red-700 dark:text-red-300 font-medium">{item.qty}x {item.name}</span><span className="text-red-500 italic text-right">- {item.reason}</span></div>))}
                    </div>
                 </div>
              )}
              {/* Rejection Note */}
              {order.rejectionReason && !order.removedItems && (
                 <div className="mb-4 px-3 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg"><p className="text-[10px] text-slate-500 font-bold">Note:</p><p className="text-[10px] text-slate-600 dark:text-slate-400">{order.rejectionReason}</p></div>
              )}
              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={onView} className="flex flex-col items-center justify-center py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"><EyeIcon className="h-4 w-4 mb-0.5" /> <span className="text-[10px]">View</span></button>
                 <button className="flex flex-col items-center justify-center py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"><CheckBadgeIcon className="h-4 w-4 mb-0.5" /> <span className="text-[10px]">Invoice</span></button>
                 <button onClick={() => onDelete(order.id)} className="flex flex-col items-center justify-center py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30"><TrashIcon className="h-4 w-4 mb-0.5" /> <span className="text-[10px]">Delete</span></button>
              </div>
            </div>
          ))
        ) : (
           <div className="p-10 text-center flex flex-col items-center text-slate-400"><XCircleIcon className="h-10 w-10 mb-2 opacity-20" /><p>No matching orders found.</p></div>
        )}
      </div>

      {/* 💻 DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm">
            <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 pl-6">Order ID</th><th className="p-4">Customer</th><th className="p-4">Items Summary</th><th className="p-4">Amount</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-700 dark:text-slate-200">#{order.id}</td>
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">{order.customer}<div className="text-[10px] text-slate-400">{order.location}</div></td>
                  <td className="p-4 text-sm text-slate-500 max-w-xs">
                    <div className="truncate">{order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>
                    {order.removedItems && order.removedItems.length > 0 && (<div className="text-[10px] text-red-500 font-medium mt-1 truncate" title={order.removedItems.map(i => `${i.name} (${i.reason})`).join(', ')}>Removed: {order.removedItems.length} items</div>)}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">₹{order.total}</td>
                  <td className="p-4 text-center"><span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(order.status)}`}>{order.status}</span></td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={onView} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"><EyeIcon className="h-5 w-5" /></button>
                    <button onClick={() => onDelete(order.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><TrashIcon className="h-5 w-5" /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="p-10 text-center text-slate-500">No matching orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}