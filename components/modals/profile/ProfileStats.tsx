import { ClockIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      
      {/* 🚀 Custom Staggered Entrance Animation */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger {
          opacity: 0;
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* First Stat Card (Container is static, content animates) */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
        
        {/* Inner elements staggering in (100ms -> 150ms -> 200ms) */}
        <div 
          className="animate-stagger h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
          style={{ animationDelay: '100ms' }}
        >
          <ClockIcon className="h-6 w-6" />
        </div>
        
        <h4 
          className="animate-stagger text-2xl font-extrabold text-slate-900 dark:text-white"
          style={{ animationDelay: '150ms' }}
        >
          2y
        </h4>
        
        <p 
          className="animate-stagger text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1"
          style={{ animationDelay: '200ms' }}
        >
          With KiranaHub
        </p>
      </div>
      
      {/* Second Stat Card (Container is static, content animates) */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
        
        {/* Inner elements staggering in (250ms -> 300ms -> 350ms) */}
        <div 
          className="animate-stagger h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
          style={{ animationDelay: '250ms' }}
        >
          <CheckBadgeIcon className="h-6 w-6" />
        </div>
        
        <h4 
          className="animate-stagger text-2xl font-extrabold text-slate-900 dark:text-white"
          style={{ animationDelay: '300ms' }}
        >
          1.2k
        </h4>
        
        <p 
          className="animate-stagger text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1"
          style={{ animationDelay: '350ms' }}
        >
          Orders Handled
        </p>
      </div>

    </div>
  );
}