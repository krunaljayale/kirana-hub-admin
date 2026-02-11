"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  TruckIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

interface MenuItem {
  name: string;
  path: string;
  icon: any;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Live Orders", path: "/orders", icon: ShoppingBagIcon },
  { name: "Inventory", path: "/inventory", icon: ChartBarIcon },
  { name: "Customers", path: "/customers", icon: UsersIcon },
  { name: "Delivery", path: "/delivery", icon: TruckIcon },
  { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (open: boolean) => void }) {
  const pathname = usePathname();

  return (
    <>

          {/* Mobile Overlay */}
          <div 
            className={`fixed inset-0 z-40 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
              mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar Container */}
          <aside 
            className={`
              fixed top-0 left-0 z-50 h-screen w-72 flex flex-col
              bg-white dark:bg-slate-900 
              border-r border-slate-200 dark:border-slate-800
              transition-all duration-300 ease-in-out 
              lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            
            {/* Header / Logo Area */}
            {/* Added transition-colors to the border here */}
            <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/60 transition-colors duration-300 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
                  <ShoppingBagIcon className="h-6 w-6 text-white" />
                </div>
                {/* Added transition-colors to the text here */}
                <span className="text-xl font-bold tracking-wide text-slate-900 dark:text-white transition-colors duration-300">
                  Kirana Hub
                </span>
              </div>
              <button 
                onClick={() => setMobileOpen(false)} 
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 transition-colors duration-300">
                Menu
              </p>
              
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium relative overflow-hidden transition-all duration-300
                      ${isActive ? "text-white shadow-md shadow-indigo-500/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"}
                    `}
                  >
                    {/* Smooth Fade for Active Background */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 transition-opacity duration-300 ease-in-out ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`} 
                    />

                    <div className="relative z-10 flex items-center gap-3">
                      <item.icon className={`h-5 w-5 transition-colors duration-300 ${
                        isActive 
                          ? "text-white" 
                          : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                      }`} />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Footer / Logout */}
            {/* Added transition-colors to the border here */}
            <div className="border-t border-slate-100 dark:border-slate-800/60 p-4 shrink-0 transition-colors duration-300">
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors duration-300">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </aside>

    </>
  );
}