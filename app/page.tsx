import Navbar from "@/components/landing/Navbar";
import { ArrowRightIcon, ChartBarIcon, ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        
        {/* Background Gradients/Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
              V 2.0 Now Live
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            Retail clarity, <br />
            built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">the future.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            Empower your local Kirana store with enterprise-grade analytics, 
            real-time inventory management, and instant delivery tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRightIcon className="h-5 w-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all">
              View Demo
            </button>
          </div>

          {/* GLOWING STATS CARDS (The "Clarid" Footer Look) */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Card 1 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Active Stores</p>
                <h3 className="text-4xl font-bold text-white mb-1">2,000+</h3>
                <p className="text-indigo-400 text-xs">Across 12 Cities</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Daily Orders</p>
                <h3 className="text-4xl font-bold text-white mb-1">45k</h3>
                <p className="text-purple-400 text-xs">Processed Real-time</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Uptime</p>
                <h3 className="text-4xl font-bold text-white mb-1">99.9%</h3>
                <p className="text-emerald-400 text-xs">Enterprise Reliability</p>
              </div>
            </div>

          </div>

          {/* TRUST LOGOS */}
          <div className="mt-20 pt-10 border-t border-white/5">
            <p className="text-sm text-slate-500 mb-6">TRUSTED BY RETAIL LEADERS</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using text placeholders for logos, you can replace with <img> */}
              <span className="text-xl font-bold text-white">Zomato</span>
              <span className="text-xl font-bold text-white">Swiggy</span>
              <span className="text-xl font-bold text-white">Dunzo</span>
              <span className="text-xl font-bold text-white">BigBasket</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}