import { useRef } from "react";
import { BuildingStorefrontIcon, PhotoIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, ArrowPathIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { StoreSettings } from "@/types/settings";

interface StoreProfileProps {
  store: StoreSettings;
  setStore: (val: StoreSettings) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingLogo: boolean;
  onToggleStatus: () => void;   // ✅ Instant toggle prop
  onSave: () => void;           // ✅ Save prop
  isSaving: boolean;
  isDirty: boolean;             // ✅ Determines if button is visible
}

export default function StoreProfile({ store, setStore, handlePhotoUpload, isUploadingLogo, onToggleStatus, onSave, isSaving, isDirty }: StoreProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🚀 Standardized Premium Input Class (Removed color transitions)
  const inputClass = "w-full py-3 rounded-xl border outline-none border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] focus:shadow-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:bg-slate-800/80";
  const labelClass = "block text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2";

  return (
    <div className="bg-white dark:bg-slate-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.1)] relative">
      
      {/* Header & Instant Toggle */}
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <BuildingStorefrontIcon className="h-5 w-5 text-indigo-500" />
          Store Details
        </h3>
        
        {/* 🚀 Tactile Status Toggle (Kept transform for click physics) */}
        <button 
          onClick={onToggleStatus} 
          className={`px-3 sm:px-4 py-2 rounded-full text-xs font-extrabold tracking-wide border flex items-center gap-2 transition-transform duration-300 active:scale-95 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ${
            store.isOpen 
              ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400" 
              : "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/15 dark:border-red-500/30 dark:text-red-400"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${store.isOpen ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></span>
          {store.isOpen ? "SHOP OPEN" : "SHOP CLOSED"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        
        {/* 🚀 Recessed Logo Upload Well */}
        <div className="shrink-0">
          <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" disabled={isUploadingLogo} />
          <div 
            onClick={() => !isUploadingLogo && fileInputRef.current?.click()} 
            className={`relative h-28 w-28 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500/60 group overflow-hidden shadow-inner dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] ${isUploadingLogo ? 'opacity-50' : ''}`}
          >
            {store.logo ? (
              <img src={store.logo} alt="Logo" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : isUploadingLogo ? (
              <ArrowPathIcon className="h-6 w-6 text-indigo-500 animate-spin" />
            ) : (
              <>
                <PhotoIcon className="h-8 w-8 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest group-hover:text-indigo-500">Upload</span>
              </>
            )}
          </div>
        </div>

        {/* Name Inputs */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="group/input">
            <label className={labelClass}>Shop Name</label>
            <input type="text" value={store.name} onChange={(e) => setStore({...store, name: e.target.value})} className={`${inputClass} px-4`} />
          </div>
          <div className="group/input">
            <label className={labelClass}>Owner Name</label>
            <input type="text" value={store.owner} onChange={(e) => setStore({...store, owner: e.target.value})} className={`${inputClass} px-4`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2 group/input">
          <label className={labelClass}>Store Address</label>
          <div className="relative">
            <MapPinIcon className="h-5 w-5 absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 group-focus-within/input:text-indigo-500" />
            <input type="text" value={store.address} onChange={(e) => setStore({...store, address: e.target.value})} className={`${inputClass} pl-12 pr-4`} />
          </div>
        </div>
        <div className="group/input">
          <label className={labelClass}>Phone Number</label>
          <div className="relative">
            <PhoneIcon className="h-5 w-5 absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 group-focus-within/input:text-indigo-500" />
            <input type="text" value={store.phone} onChange={(e) => setStore({...store, phone: e.target.value})} className={`${inputClass} pl-12 pr-4`} />
          </div>
        </div>
        <div className="group/input">
          <label className={labelClass}>Email Address</label>
          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 group-focus-within/input:text-indigo-500" />
            <input type="email" value={store.email} onChange={(e) => setStore({...store, email: e.target.value})} className={`${inputClass} pl-12 pr-4`} />
          </div>
        </div>
      </div>

      {/* 🚀 Tactile Magic Sliding Save Footer (Kept layout transitions only) */}
      <div className={`transition-[max-height,opacity,margin,padding] duration-500 ease-in-out overflow-hidden ${isDirty ? 'max-h-24 opacity-100 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800' : 'max-h-0 opacity-0 m-0 p-0 border-transparent'}`}>
        <div className="flex justify-end">
          <button 
            onClick={onSave} 
            disabled={isSaving || isUploadingLogo} 
            className="px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50 text-white bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(99,102,241,0.2)] text-sm"
          >
            {isSaving ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <CheckBadgeIcon className="h-5 w-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

    </div>
  );
}