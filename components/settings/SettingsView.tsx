"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  UserCircleIcon, 
  BuildingStorefrontIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  PhotoIcon,
  ArrowLeftOnRectangleIcon, 
  CheckBadgeIcon,
  MoonIcon,
  SunIcon,
  LanguageIcon
} from "@heroicons/react/24/outline";

// --- 1. TYPE DEFINITIONS ---
type SettingsState = {
  orderAlerts: boolean;
  stockAlerts: boolean;
  whatsappUpdates: boolean;
  sound: boolean;
};

// --- 2. FIXED TOGGLE COMPONENT (Clean & Interactive) ---
interface ToggleProps {
  label: string;
  desc: string;
  isOn: boolean;
  onToggle: () => void;
  colorType: "indigo" | "emerald" | "orange";
}

function Toggle({ label, desc, isOn, onToggle, colorType }: ToggleProps) {
  
  // Determine active color based on prop
  let activeClass = "bg-indigo-600";
  if (colorType === "emerald") activeClass = "bg-emerald-500";
  if (colorType === "orange") activeClass = "bg-orange-500";

  return (
    <div className="flex items-center justify-between py-2 cursor-pointer" onClick={onToggle}>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-900 dark:text-white">{label}</span>
        <span className="text-xs text-slate-500">{desc}</span>
      </div>
      
      {/* Switch Track */}
      <div
        className={`
          relative w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out
          ${isOn ? activeClass : 'bg-slate-200 dark:bg-slate-700'}
        `}
      >
        {/* Switch Knob (The White Dot) */}
        <div
          className={`
            bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
            ${isOn ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </div>
    </div>
  );
}

// Helper for the Pencil Icon in the hover overlay
function PencilSquareIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
}

export default function SettingsView() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- States ---
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const [store, setStore] = useState({
    name: "Kirana Hub",
    owner: "Rahul Sharma",
    phone: "9876543210",
    address: "Shop No. 4, Main Market, Pune",
    email: "rahul@kiranahub.com"
  });

  // Explicitly Typed State
  const [toggles, setToggles] = useState<SettingsState>({
    orderAlerts: true,
    stockAlerts: true,
    whatsappUpdates: false,
    sound: true
  });

  // --- Effects ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- Actions ---
  
  // Toggle Logic
  const toggleSwitch = (key: keyof SettingsState) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Settings saved successfully!");
    }, 1500);
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      setLogoutLoading(false);
      router.push("/");
    }, 1500);
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        showToast("Logo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 pb-24 relative">
      
      {/* --- TOAST --- */}
      <div className={`fixed bottom-24 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${
          toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'
        }`}>
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. PROFILE SECTION */}
        <div className="space-y-6 lg:col-span-2">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BuildingStorefrontIcon className="h-5 w-5 text-indigo-500" />
              Store Details
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex-shrink-0">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <div onClick={handleLogoClick} className="relative h-24 w-24 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all group overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <PhotoIcon className="h-8 w-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <span className="text-[10px] font-bold text-slate-400 mt-1 group-hover:text-indigo-500">Upload</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PencilSquareIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shop Name</label>
                  <input type="text" value={store.name} onChange={(e) => setStore({...store, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Owner Name</label>
                  <input type="text" value={store.owner} onChange={(e) => setStore({...store, owner: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Store Address</label>
                <input type="text" value={store.address} onChange={(e) => setStore({...store, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input type="text" value={store.phone} onChange={(e) => setStore({...store, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" value={store.email} onChange={(e) => setStore({...store, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />
              Security
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all" />
               </div>
            </div>
            <button onClick={() => showToast("Password update link sent!", "success")} className="mt-4 text-sm font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">Update Password</button>
          </div>

        </div>

        {/* 2. PREFERENCES SECTION */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-orange-500" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              <Toggle 
                label="Order Alerts" 
                desc="Get notified for new orders" 
                isOn={toggles.orderAlerts} 
                onToggle={() => toggleSwitch('orderAlerts')} 
                colorType="indigo"
              />
              <Toggle 
                label="WhatsApp Updates" 
                desc="Send receipts via WhatsApp" 
                isOn={toggles.whatsappUpdates} 
                onToggle={() => toggleSwitch('whatsappUpdates')} 
                colorType="emerald"
              />
              <Toggle 
                label="Low Stock Warning" 
                desc="Alert below 10 items" 
                isOn={toggles.stockAlerts} 
                onToggle={() => toggleSwitch('stockAlerts')} 
                colorType="orange"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <UserCircleIcon className="h-5 w-5 text-blue-500" />
                App Preferences
             </h3>

             <div className="flex items-center justify-between mb-6">
                <div>
                   <p className="text-sm font-bold text-slate-900 dark:text-white">Theme</p>
                   <p className="text-xs text-slate-500">Switch Light / Dark mode</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                   <button onClick={() => setDarkMode(false)} className={`p-2 rounded-md transition-all ${!darkMode ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-sm' : 'text-slate-400'}`}><SunIcon className="h-5 w-5" /></button>
                   <button onClick={() => setDarkMode(true)} className={`p-2 rounded-md transition-all ${darkMode ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-sm' : 'text-slate-400'}`}><MoonIcon className="h-5 w-5" /></button>
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div>
                   <p className="text-sm font-bold text-slate-900 dark:text-white">Language</p>
                   <p className="text-xs text-slate-500">App interface language</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300">
                   <LanguageIcon className="h-4 w-4" /> English
                </button>
             </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 text-center">
             <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Sign Out</h4>
             <p className="text-xs text-red-500/80 mb-4">Log out of your admin account on this device.</p>
             <button onClick={handleLogout} disabled={logoutLoading} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-500/20">
                {logoutLoading ? <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> : <ArrowLeftOnRectangleIcon className="h-5 w-5" />}
                {logoutLoading ? "Logging out..." : "Logout"}
             </button>
          </div>

        </div>
      </div>

      <div className="fixed bottom-6 left-0 right-0 px-4 md:px-8 flex justify-end pointer-events-none">
         <button onClick={handleSave} disabled={loading} className="pointer-events-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-2xl font-bold shadow-2xl shadow-slate-900/30 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
            {loading ? <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> : <CheckBadgeIcon className="h-6 w-6" />}
            {loading ? "Saving..." : "Save Changes"}
         </button>
      </div>

    </div>
  );
}