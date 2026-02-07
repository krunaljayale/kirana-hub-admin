"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/50">
          <span className="text-white font-bold">K</span>
        </div>
        <span className="text-xl font-bold text-white tracking-wide">Kirana Hub</span>
      </div>

      {/* Links (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
          Login
        </Link>
        <Link 
          href="/signup" 
          className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}