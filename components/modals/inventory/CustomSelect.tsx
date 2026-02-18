import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder = "Select..." }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-xl border transition-all ${isOpen ? "border-indigo-500 ring-2 ring-indigo-500/20 bg-white dark:bg-slate-800 shadow-md" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600"} dark:text-white text-sm font-medium focus:outline-none`}>
        <span className={value ? "text-slate-900 dark:text-white" : "text-slate-400"}>{value || placeholder}</span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-100">
          <div className="p-1">
            {options.map((opt) => (
              <div key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors ${value === opt ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"}`}>
                {opt}
                {value === opt && <CheckIcon className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}