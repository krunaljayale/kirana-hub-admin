import { Runner } from "@/types/delivery";
import { PhoneIcon, MapPinIcon, TruckIcon } from "@heroicons/react/24/outline";

export default function DeliveryWidget({ runners }: { runners: Runner[] }) {
  // Only show active runners, limit to top 4 for the widget
  const allActiveRunners = runners.filter(r => r.status !== "Offline" && !r.isBlocked);
  const displayedRunners = allActiveRunners.slice(0, 4);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm flex flex-col h-full transition-all duration-300">
      
      {/* --- Widget Header --- */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TruckIcon className="h-5 w-5 text-indigo-500" />
          Live Partners
        </h3>
        <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg">
          {allActiveRunners.length} Online
        </span>
      </div>
      
      {/* --- Runner List --- */}
      {displayedRunners.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 opacity-60">
          <MapPinIcon className="h-8 w-8" />
          <span className="text-sm font-medium">No active partners.</span>
        </div>
      ) : (
        <div className="space-y-1 flex-1">
          {displayedRunners.map((runner) => (
            <div 
              key={runner.id} 
              className="group flex items-center justify-between p-3 -mx-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
            >
              
              <div className="flex items-center gap-3">
                {/* Avatar with Slack-style Status Ring */}
                <div className="relative shrink-0">
                  <img 
                    src={runner.avatar} 
                    alt={runner.name} 
                    className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 bg-slate-100" 
                  />
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                    runner.status === 'Available' ? 'bg-emerald-500' : 'bg-orange-500'
                  }`}></span>
                </div>

                {/* Runner Details & Task Context */}
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {runner.name}
                  </h4>
                  <div className="flex items-center mt-0.5">
                    {runner.status === 'Busy' ? (
                      <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-1.5 py-0.5 rounded-md border border-orange-100 dark:border-orange-500/20">
                        Delivering #{runner.currentOrder || Math.floor(1000 + Math.random() * 9000)}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-500/20">
                        Waiting at store
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Action: One-Click Call */}
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); // Prevents clicking the row
                  window.location.href = `tel:${runner.phone}`; 
                }} 
                title={`Call ${runner.name}`}
                className="shrink-0 h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-400 transition-all active:scale-95"
              >
                <PhoneIcon className="h-4 w-4" />
              </button>

            </div>
          ))}
        </div>
      )}
      
      {/* --- Footer Action --- */}
      <button 
        onClick={() => window.location.href='/delivery'} 
        className="w-full mt-4 py-3 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors active:scale-[0.98]"
      >
        Open Map View
      </button>
      
    </div>
  );
}