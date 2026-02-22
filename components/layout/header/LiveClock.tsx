import { useState, useEffect } from "react";
import { ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";

export default function LiveClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div className="h-10 w-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse hidden md:block" />;

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="hidden md:flex items-center gap-4 text-slate-600 dark:text-slate-300">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {getGreeting()}, Admin
        </span>
        <div className="flex items-center gap-3 mt-0.5">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <CalendarIcon className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold">
              {time.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <ClockIcon className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-xs font-bold tabular-nums">
              {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}