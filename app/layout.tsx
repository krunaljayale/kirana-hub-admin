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
// Hide layout on Landing Page AND Login Page
  const isFullScreen = pathname === "/" || pathname === "/login";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CRITICAL FIX: Now handles 'system' value correctly */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  // LOGIC FIX:
                  // 1. If saved is 'dark' -> DARK
                  // 2. If saved is 'system' AND OS is dark -> DARK
                  // 3. If saved is null (first visit) AND OS is dark -> DARK
                  if (saved === 'dark' || ((saved === 'system' || !saved) && sys)) {
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
      
      {/* Body with smooth background transition */}
      <body className={`flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300 ease-in-out ${isFullScreen ? 'block' : 'flex'}`}>
        
        <ThemeProvider>
          
          {!isFullScreen && (
            <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
          )}

          {/* Main Content Wrapper */}
          <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${!isFullScreen ? 'lg:ml-72' : ''}`}>
            
            {!isFullScreen && (
              <Header onMenuClick={() => setSidebarOpen(true)} />
            )}
            
            {/* Page Content */}
            <main className={`bg-slate-50 dark:bg-slate-900 flex-1 transition-colors duration-300 ease-in-out ${!isFullScreen ? 'overflow-y-auto p-4 md:p-8' : 'overflow-auto'}`}>
              {children}
            </main>
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}