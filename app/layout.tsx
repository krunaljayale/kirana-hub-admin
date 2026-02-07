"use client"; 

import "./globals.css";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar"; 
import Header from "../components/layout/Header"; 
import { usePathname } from "next/navigation"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); 

  const isLandingPage = pathname === "/";

  return (
    <html lang="en">
      <body className={`flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden ${isLandingPage ? 'block' : 'flex'}`}>
        
        {/* Sidebar */}
        {!isLandingPage && (
          <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
        )}

        {/* Main Content */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${!isLandingPage ? 'lg:ml-72' : ''}`}>
          
          {/* Header with Menu Click Handler */}
          {!isLandingPage && (
            <Header onMenuClick={() => setSidebarOpen(true)} />
          )}
          
          {/* Page Content */}
          <main className={`flex-1 ${!isLandingPage ? 'overflow-y-auto p-4 md:p-8' : 'overflow-auto'}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}