"use client"; 

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar/Sidebar"; 
import Header from "@/components/layout/header/Header"; 
// Note: No need for usePathname or isFullScreen checks anymore!

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // ✅ Re-added the 'flex' container that was originally on your body tag
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar - Always rendered here */}
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      {/* ✅ Kept your EXACT classes. Note: 'lg:ml-72' is now permanent. */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out lg:ml-72">
        
        {/* Header - Always rendered here */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page Content */}
        {/* ✅ Kept your EXACT main classes */}
        <main className="bg-transparent flex-1 transition-colors duration-300 ease-in-out overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}