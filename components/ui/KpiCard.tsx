import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  subtext: string;
  icon?: React.ReactNode;
  variant?: 'white' | 'pink' | 'blue' | 'orange' | 'purple';
}

const KpiCard = ({ title, value, subtext, icon, variant = 'white' }: KpiCardProps) => {
  
  // 1. Define the styles for each color variant
  const variants = {
    // White card: Dark text in light mode, White text in dark mode
    white: "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700",
    
    // Colorful cards: Always white text
    pink: "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20",
    blue: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20",
    orange: "bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-500/20",
    purple: "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/20",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${variants[variant]}`}>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <h3 className={`text-sm font-medium ${variant === 'white' ? 'text-slate-500 dark:text-slate-400' : 'text-white/90'}`}>
          {title}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">
            {value}
          </span>
        </div>
        <p className={`mt-2 text-xs font-medium ${variant === 'white' ? 'text-emerald-600' : 'text-white/80'}`}>
          {subtext}
        </p>
      </div>

      {/* Background Icon (Watermark Effect) */}
      {icon && (
        <div className="absolute -bottom-4 -right-4 text-9xl opacity-10 rotate-12 pointer-events-none">
          {icon}
        </div>
      )}
      
      {/* Foreground Icon (Small Top Right) */}
      {icon && (
        <div className="absolute top-4 right-4 text-2xl opacity-80">
          {icon}
        </div>
      )}
    </div>
  );
};

export default KpiCard;