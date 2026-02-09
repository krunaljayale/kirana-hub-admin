import DeliveryBoard from "@/components/delivery/DeliveryBoard";

export default function DeliveryPage() {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Delivery</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Track runners and manage active shipments.
          </p>
        </div>
        
        {/* Quick Stat */}
        <div className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm flex items-center gap-3">
           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">2 Runners Active</span>
        </div>
      </div>

      {/* Main Board */}
      <DeliveryBoard />
      
    </div>
  );
}