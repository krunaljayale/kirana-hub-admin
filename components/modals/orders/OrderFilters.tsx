import { ClockIcon, FireIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Order, OrderStatus } from "@/types/order";

interface OrderFiltersProps {
  statusFilter: OrderStatus;
  setStatusFilter: (status: OrderStatus) => void;
  orders: Order[];
}

export default function OrderFilters({ statusFilter, setStatusFilter, orders }: OrderFiltersProps) {
  const getTabStyle = (tab: OrderStatus) => {
    if (statusFilter === tab) {
      if (tab === 'Pending') return 'bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-500/50';
      if (tab === 'Preparing') return 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500 border-blue-200 dark:border-blue-500/50';
      if (tab === 'Ready') return 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/50';
    }
    return 'text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="grid grid-cols-3 gap-1 md:flex md:gap-2">
        <button onClick={() => setStatusFilter("Pending")} className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${getTabStyle("Pending")}`}>
          <ClockIcon className="h-4 w-4 md:h-5 md:w-5" /> Pending 
          {orders.filter(o => o.status === 'Pending').length > 0 && <span className="md:ml-1 h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>}
        </button>
        <button onClick={() => setStatusFilter("Preparing")} className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${getTabStyle("Preparing")}`}>
          <FireIcon className="h-4 w-4 md:h-5 md:w-5" /> Preparing
        </button>
        <button onClick={() => setStatusFilter("Ready")} className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${getTabStyle("Ready")}`}>
          <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5" /> Ready
        </button>
      </div>
    </div>
  );
}