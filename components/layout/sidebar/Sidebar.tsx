"use client";

import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  TruckIcon
} from "@heroicons/react/24/outline";

import { MenuItem } from "@/types/sidebar";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

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
      {/* 🚀 Mobile Overlay (Swapped transition-all to transition-opacity) */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* 🚀 Sidebar Container (Swapped transition-all to transition-transform) */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 flex flex-col
          bg-white dark:bg-slate-900 
          border-r border-slate-200 dark:border-slate-800/60
          transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        
        {/* 1. Dynamic Logo & Header */}
        <SidebarLogo setMobileOpen={setMobileOpen} />

        {/* 2. Navigation Menu */}
        <SidebarMenu menuItems={menuItems} pathname={pathname} setMobileOpen={setMobileOpen} />

        {/* 3. Footer / Logout */}
        <SidebarFooter />
        
      </aside>
    </>
  );
}