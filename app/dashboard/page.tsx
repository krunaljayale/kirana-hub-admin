import KpiCard from "@/components/ui/KpiCard";
import SalesChart from "@/components/charts/SalesChart";

import { 
  ShoppingBagIcon, 
  UsersIcon, 
  ArrowPathIcon, 
  CheckCircleIcon 
} from "@heroicons/react/24/solid";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* 1. Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, Admin 👋
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
          + Add New Product
        </button>
      </div>

      {/* 2. Top Stats (White Cards) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <KpiCard title="Total Sales" value="₹84,920" subtext="+14% from last month" />
        <KpiCard title="Total Products" value="124" subtext="In active inventory" />
        <KpiCard title="Active Customers" value="1,240" subtext="+22 new this week" />
      </div>

      {/* 3. Live Activity (Colorful Grid) */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Live Activity
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard 
            title="Today's Orders" 
            value="24" 
            subtext="₹14,920 Revenue" 
            variant="pink" 
            icon={<ShoppingBagIcon className="h-6 w-6" />}
          />
          <KpiCard 
            title="Online Users" 
            value="96" 
            subtext="12 Ordering now" 
            variant="blue" 
            icon={<UsersIcon className="h-6 w-6" />}
          />
          <KpiCard 
            title="Returning" 
            value="13.3k" 
            subtext="+14% Retention" 
            variant="orange" 
            icon={<ArrowPathIcon className="h-6 w-6" />}
          />
          <KpiCard 
            title="Completed" 
            value="981" 
            subtext="98% Success Rate" 
            variant="purple" 
            icon={<CheckCircleIcon className="h-6 w-6" />}
          />
        </div>
      </div>

      {/* 4. Bottom Section (Charts & Delivery) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Main Chart Area (Takes 2 columns) */}
        <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm lg:col-span-2 min-h-[300px]">
          <h3 className="font-bold text-slate-900 dark:text-white">
            Sales Statistics
          </h3>
          <div className="mt-8 flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500">
            <SalesChart />
          </div>
        </div>

        {/* Delivery Partners Widget (Takes 1 column) */}
        <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">
            Delivery Partners
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                <img 
                  src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`} 
                  alt="Driver" 
                  className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-600"
                />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Raju Kumar
                  </h4>
                  <p className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}