import { ArrowPathIcon, BriefcaseIcon, UserCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

const ACTIVITY_LOGS = [
  { id: 1, action: "Updated Inventory", target: "Amul Butter (500g)", time: "2 mins ago", icon: ArrowPathIcon, color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 glow-blue" },
  { id: 2, action: "Processed Order", target: "Order #1024", time: "1 hour ago", icon: BriefcaseIcon, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 glow-emerald" },
  { id: 3, action: "Changed Settings", target: "Notification Preferences", time: "Yesterday", icon: UserCircleIcon, color: "text-purple-600 bg-purple-50 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20 glow-purple" },
  { id: 4, action: "Login", target: "New device detected", time: "Yesterday", icon: ClockIcon, color: "text-orange-600 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-500/20 glow-orange" },
];

export default function ProfileActivity() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      
      {/* 🚀 Custom Staggered Entrance Animation */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger {
          opacity: 0;
          animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
        
        {/* 🚀 UPGRADED: Pulsing "Live" Badge */}
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1.5 rounded-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Live
        </span>
      </div>
      
      <div className="space-y-6">
        {ACTIVITY_LOGS.map((log, index) => (
          
          /* 🚀 Staggered wrapper (Uses index to delay the animation) */
          <div 
            key={log.id} 
            className="relative flex gap-4 group cursor-default animate-stagger"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            
            {/* Connecting Line (Glows on Hover!) */}
            {index !== ACTIVITY_LOGS.length - 1 && (
              <div className="absolute left-5 top-10 -bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {/* The "laser" effect that shoots down */}
                <div className="absolute top-0 w-full h-full bg-indigo-500 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"></div>
              </div>
            )}
            
            {/* Icon Container (Pops and Glows on Hover) */}
            <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] ${log.color}`}>
              <log.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>

            {/* Content (Slight slide on hover) */}
            <div className="transition-transform duration-300 group-hover:translate-x-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{log.action}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{log.target}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-bold tracking-wide uppercase">{log.time}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}