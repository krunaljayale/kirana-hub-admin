import { TruckIcon, MapPinIcon, CheckCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Delivery, Runner } from "@/types/delivery";

interface DeliveryListProps {
  deliveries: Delivery[];
  runners: Runner[];
  activeTab: "Active" | "History";
  markDelivered: (deliveryId: string, runnerId: string) => void;
}

export default function DeliveryList({ deliveries, runners, activeTab, markDelivered }: DeliveryListProps) {
  if (deliveries.length === 0) {
    return (
      <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBagIcon className="h-8 w-8 text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">No {activeTab.toLowerCase()} deliveries found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {deliveries.map((delivery) => {
        const runner = runners.find(r => r.id === delivery.runnerId);
        
        return (
          <div key={delivery.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors group animate-in fade-in slide-in-from-bottom-2">
            {/* Card Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold font-mono">
                    {delivery.id}
                  </span>
                  {delivery.status === "Out for Delivery" && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg border border-orange-100 dark:border-orange-900/30">
                      <TruckIcon className="h-3 w-3" /> On the way
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mt-2 text-lg">{delivery.customer}</h4>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 dark:text-white">₹{delivery.total}</p>
                <p className="text-xs text-slate-400 mt-0.5">{delivery.status === 'Out for Delivery' ? 'Cash to collect' : 'Paid'}</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex gap-3 mb-4">
              <MapPinIcon className="h-5 w-5 text-indigo-500 flex-shrink-0" />
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{delivery.address}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <img src={runner?.avatar} alt="runner" className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Runner</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{runner ? runner.name : "Unassigned"}</span>
                </div>
              </div>

              {delivery.status === "Out for Delivery" ? (
                <button 
                  onClick={() => markDelivered(delivery.id, delivery.runnerId)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Mark Done
                </button>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-bold">
                  <CheckCircleIcon className="h-4 w-4" /> Delivered
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}