import KpiCard from "./ui/KpiCard";
import { DashboardProps } from "@/types/dashboard";
import { ShoppingBagIcon, UsersIcon, ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function LiveActivity({ stats }: DashboardProps) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Live Activity</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Today's Orders" 
          value={stats.todaysOrders.toString()} 
          subtext={`₹${stats.todaysRevenue.toLocaleString()} Revenue`} 
          variant="pink" 
          icon={<ShoppingBagIcon className="h-6 w-6" />}
        />
        <KpiCard 
          title="Online Users" 
          value={stats.onlineUsers.toString()} 
          subtext="Ordering now" 
          variant="blue" 
          icon={<UsersIcon className="h-6 w-6" />}
        />
        <KpiCard 
          title="Returning" 
          value={stats.returningUsers} 
          subtext="+14% Retention" 
          variant="orange" 
          icon={<ArrowPathIcon className="h-6 w-6" />}
        />
        <KpiCard 
          title="Completed" 
          value={stats.completedOrders.toString()} 
          subtext={`${stats.successRate} Success Rate`} 
          variant="purple" 
          icon={<CheckCircleIcon className="h-6 w-6" />}
        />
      </div>
    </div>
  );
}