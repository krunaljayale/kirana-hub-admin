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
      if (tab === 'Pending') return 'bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/30 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(249,115,22,0.15)] shadow-sm';
      if (tab === 'Preparing') return 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.15)] shadow-sm';
      if (tab === 'Ready') return 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(16,185,129,0.15)] shadow-sm';
    }
    // Inactive state: blends into the recessed tray until hovered
    return 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-300';
  };

  return (
    <div className="bg-white dark:bg-slate-900/40 rounded-2xl p-2 border border-slate-200 dark:border-slate-800/60 shadow-sm dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] dark:backdrop-blur-xl transition-colors duration-300">
      <div className="grid grid-cols-3 gap-1 md:flex md:gap-2">
        
        {/* Pending Tab */}
        <button 
          onClick={() => setStatusFilter("Pending")} 
          className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 md:px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 active:scale-95 border ${getTabStyle("Pending")}`}
        >
          <ClockIcon className="h-4 w-4 md:h-5 md:w-5" /> Pending 
          {/* Glowing Radar Pulse */}
          {orders.filter(o => o.status === 'Pending').length > 0 && (
            <span className="md:ml-1 h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-400 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
          )}
        </button>

        {/* Preparing Tab */}
        <button 
          onClick={() => setStatusFilter("Preparing")} 
          className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 md:px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 active:scale-95 border ${getTabStyle("Preparing")}`}
        >
          <FireIcon className="h-4 w-4 md:h-5 md:w-5" /> Preparing
        </button>

        {/* Ready Tab */}
        <button 
          onClick={() => setStatusFilter("Ready")} 
          className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 md:px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 active:scale-95 border ${getTabStyle("Ready")}`}
        >
          <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5" /> Ready
        </button>

      </div>
    </div>
  );
}