"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_ROUTES } from "@/app/constants/api"; 
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  ArrowRightIcon, 
  ShoppingBagIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Call the API
      // The API will automatically set the 'httpOnly' cookie on success
      const response = await axios.post(API_ROUTES.AUTH.LOGIN, formData);
      const { success, user, message } = response.data;

      if (success) {
        // 2. Optional: Store non-sensitive User Info for UI (Name/Avatar)
        // We DO NOT store the token here anymore. It's in the cookie.
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        // 3. Redirect to Dashboard
        // The Middleware will now see the cookie and let us in.
        router.push("/dashboard");
        router.refresh(); // Ensure the new cookie is recognized
      } else {
        setError(message || "Login failed.");
      }

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Invalid credentials.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // h-screen + overflow-hidden ensures NO SCROLLING
    <div className="h-screen w-full flex bg-white dark:bg-[#09090b] overflow-hidden transition-colors duration-500">
      
      {/* === LEFT SIDE: FORM (Full Height) === */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative z-10 bg-white dark:bg-[#09090b]">
        
        {/* Logo Area */}
        <div className="absolute top-8 left-8 sm:left-12 lg:left-24 flex items-center gap-3">
           <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
           </div>
           <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Kirana Hub.</span>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg mb-8">
            Please enter your details to sign in.
          </p>

          {/* Error Message Alert */}
          {error && (
            <div className="flex items-center gap-3 p-4 mb-6 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium animate-in slide-in-from-top-2">
              <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                 </div>
                 <input 
                   id="email"
                   name="email"
                   type="email" 
                   autoComplete="email"
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                   placeholder="admin@kiranahub.com"
                   required
                 />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                 </div>
                 <input 
                   id="password"
                   name="password"
                   type={showPassword ? "text" : "password"} 
                   autoComplete="current-password"
                   value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   className="block w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                   placeholder="••••••••"
                   required
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors"
                 >
                   {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                 </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between pt-1">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800'}`}>
                     <input 
                       type="checkbox" 
                       className="hidden" 
                       checked={rememberMe} 
                       onChange={() => setRememberMe(!rememberMe)} 
                     />
                     {rememberMe && <ArrowRightIcon className="h-3 w-3 text-white -rotate-45" />}
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Remember me</span>
               </label>
               <a href="#" className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Forgot Password?
               </a>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                 <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                 "Login"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
             <p className="text-slate-500 dark:text-zinc-500">
                Don't have an account? <span className="font-bold text-slate-900 dark:text-white cursor-not-allowed opacity-50">Contact Admin</span>
             </p>
          </div>
        </div>
        
        {/* Footer Copyright */}
        <div className="absolute bottom-6 left-8 sm:left-12 lg:left-24">
           <p className="text-xs font-bold text-slate-300 dark:text-zinc-700 uppercase tracking-widest">
             © 2024 Kirana Hub
           </p>
        </div>
      </div>

      {/* === RIGHT SIDE: GRAPHITE IMAGE (Full Height) === */}
      <div className="hidden lg:block lg:w-1/2 relative bg-white dark:bg-[#09090b] overflow-hidden">
         
         {/* Internal Image Container with Unique Curve */}
         <div className="absolute top-4 right-4 bottom-4 left-0 rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
              alt="City Architecture" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
            />
            
            {/* Graphite Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Floating Text */}
            <div className="absolute bottom-16 left-12 max-w-lg z-20">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6">
                 <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                 <span className="text-xs font-medium text-white tracking-wide uppercase">System Operational</span>
               </div>
               <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                  Manage your entire retail empire <br/>
                  <span className="text-indigo-400">from one dashboard.</span>
               </h2>
               <p className="text-slate-300 text-lg">
                  Real-time analytics, inventory management, and instant order processing.
               </p>
            </div>
         </div>
      </div>

    </div>
  );
}