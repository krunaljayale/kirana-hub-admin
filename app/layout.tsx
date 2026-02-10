"use client"; 

import "./globals.css";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar"; 
import Header from "@/components/layout/Header"; 
import { usePathname } from "next/navigation"; 
import { ThemeProvider } from "@/components/providers/ThemeProvider"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); 
  const isLandingPage = pathname === "/";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CRITICAL: This script prevents the "White Flash" on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && sys)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden ${isLandingPage ? 'block' : 'flex'}`}>
        
        <ThemeProvider>
          
          {!isLandingPage && (
            <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
          )}

          <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${!isLandingPage ? 'lg:ml-72' : ''}`}>
            
            {!isLandingPage && (
              <Header onMenuClick={() => setSidebarOpen(true)} />
            )}
            
            <main className={`bg-slate-50 dark:bg-slate-900 flex-1 ${!isLandingPage ? 'overflow-y-auto p-4 md:p-8' : 'overflow-auto'}`}>
              {children}
            </main>
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}