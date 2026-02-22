import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import NextTopLoader from 'nextjs-toploader';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kirana Hub",
  description: "Admin Dashboard",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
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
      
      {/* 🚀 UPGRADED: Added hard background colors and longer transition duration */}
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white">        
        <ThemeProvider>
            <NextTopLoader 
              color="transparent" 
              initialPosition={0.08} 
              crawlSpeed={200} 
              height={2} 
              crawl={true} 
              showSpinner={false} 
              easing="ease" 
              speed={200}
              shadow="none" 
            />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}