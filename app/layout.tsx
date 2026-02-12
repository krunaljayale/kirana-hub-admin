import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// ✅ Metadata stays here
export const metadata = {
  title: "Kirana Hub",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ YOUR EXACT THEME SCRIPT - UNTOUCHED */}
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
      
      {/* ✅ BODY: Kept your background/transition classes. 
          Removed 'flex' here to let the child layouts handle their own structure. */}
      <body className="bg-transparent overflow-hidden transition-colors duration-300 ease-in-out text-slate-900 dark:text-slate-100">
        <ThemeProvider>
           {children}
        </ThemeProvider>
      </body>
    </html>
  );
}