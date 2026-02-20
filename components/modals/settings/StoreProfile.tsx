import { useRef } from "react";
import { BuildingStorefrontIcon, PhotoIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, ArrowPathIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { StoreSettings } from "@/types/settings";

interface StoreProfileProps {
  store: StoreSettings;
  setStore: (val: StoreSettings) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingLogo: boolean;
  onToggleStatus: () => void;   // ✅ New instant toggle prop
  onSave: () => void;           // ✅ New save prop
  isSaving: boolean;
  isDirty: boolean;             // ✅ Determines if button is visible
}

export default function StoreProfile({ store, setStore, handlePhotoUpload, isUploadingLogo, onToggleStatus, onSave, isSaving, isDirty }: StoreProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative transition-all duration-300">
      
      {/* Header & Instant Toggle */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors duration-300">
          <BuildingStorefrontIcon className="h-5 w-5 text-indigo-500" />
          Store Details
        </h3>
        <button 
          onClick={onToggleStatus} 
          className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 transition-all duration-300 active:scale-95 shadow-sm ${
            store.isOpen 
              ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400" 
              : "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${store.isOpen ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></span>
          {store.isOpen ? "SHOP OPEN" : "SHOP CLOSED"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="shrink-0">
          <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" disabled={isUploadingLogo} />
          <div onClick={() => !isUploadingLogo && fileInputRef.current?.click()} className={`relative h-24 w-24 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all duration-300 group overflow-hidden ${isUploadingLogo ? 'opacity-50' : ''}`}>
            {store.logo ? (
              <img src={store.logo} alt="Logo" className="h-full w-full object-cover" />
            ) : isUploadingLogo ? (
              <ArrowPathIcon className="h-6 w-6 text-indigo-500 animate-spin" />
            ) : (
              <><PhotoIcon className="h-8 w-8 text-slate-400 group-hover:text-indigo-500" /><span className="text-[10px] font-bold text-slate-400 mt-1">Upload</span></>
            )}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shop Name</label>
            <input type="text" value={store.name} onChange={(e) => setStore({...store, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Owner Name</label>
            <input type="text" value={store.owner} onChange={(e) => setStore({...store, owner: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Store Address</label>
          <div className="relative">
            <MapPinIcon className="h-5 w-5 text-slate-400 absolute left-3 top-3.5" />
            <input type="text" value={store.address} onChange={(e) => setStore({...store, address: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
          <div className="relative">
            <PhoneIcon className="h-5 w-5 text-slate-400 absolute left-3 top-3.5" />
            <input type="text" value={store.phone} onChange={(e) => setStore({...store, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 text-slate-400 absolute left-3 top-3.5" />
            <input type="email" value={store.email} onChange={(e) => setStore({...store, email: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* ✅ NEW: Magic Sliding Save Footer */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isDirty ? 'max-h-24 opacity-100 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800' : 'max-h-0 opacity-0 m-0 p-0 border-transparent'}`}>
        <div className="flex justify-end">
          <button 
            onClick={onSave} 
            disabled={isSaving || isUploadingLogo} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <CheckBadgeIcon className="h-5 w-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

    </div>
  );
}