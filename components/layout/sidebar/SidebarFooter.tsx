import { useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SidebarFooter() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="border-t border-slate-100 dark:border-slate-800/60 p-4 shrink-0">
      <button 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-transform duration-300 active:scale-95
          ${isLoggingOut 
            ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 cursor-not-allowed opacity-80" 
            : "text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          }
        `}
      >
        {isLoggingOut ? (
          <>
            {/* 🚀 Removed transition-all; animate-spin is all it needs */}
            <div className="h-5 w-5 rounded-full border-2 border-red-200 border-t-red-600 animate-spin"></div>
            Logging out...
          </>
        ) : (
          <>
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </>
        )}
      </button>
    </div>
  );
}