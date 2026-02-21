"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ShieldCheckIcon, ArrowLeftOnRectangleIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { SettingsData, StoreSettings, NotificationToggles } from "@/types/settings";
import SettingsSkeleton from "@/components/Skeletons/SettingsSkeleton";

// Note: Ensure these paths match your actual folder structure!
import StoreProfile from "@/components/modals/settings/StoreProfile";
import NotificationSettings from "@/components/modals/settings/NotificationSettings";
import PreferencesSettings from "@/components/modals/settings/PreferencesSettings";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  
  const [originalStore, setOriginalStore] = useState<StoreSettings | null>(null);
  const [store, setStore] = useState<StoreSettings>({ name: "", owner: "", phone: "", address: "", email: "", isOpen: true, logo: null });
  const [toggles, setToggles] = useState<NotificationToggles>({ orderAlerts: true, stockAlerts: true, whatsappUpdates: false });
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" as "success" | "error" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const isDirty = JSON.stringify(store) !== JSON.stringify(originalStore);

  // --- FETCH SETTINGS & LISTEN FOR NAV TOGGLE ---
  useEffect(() => {
    const fetchSettings = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      try {
        setLoading(true);
        const [_, res] = await Promise.all([minLoadTime, axios.get(`${API_URL}/settings`)]);
        if (res.data) {
          setStore(res.data.store);
          setOriginalStore(res.data.store); 
          setToggles(res.data.toggles);
        }
      } catch (err) {
        showToast("Failed to load settings from server", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();

    // Listen for changes from the Navbar Toggle
    const handleSync = (e: CustomEvent) => {
      setStore(prev => ({ ...prev, isOpen: e.detail }));
      setOriginalStore(prev => prev ? { ...prev, isOpen: e.detail } : null);
    };
    window.addEventListener('sync-store-status', handleSync as EventListener);
    
    return () => window.removeEventListener('sync-store-status', handleSync as EventListener);
  }, []);

  // --- ACTIONS ---

  // 1. Instant Save: Shop Status (Open/Closed)
  const handleToggleStatus = async () => {
    const updatedStore = { ...store, isOpen: !store.isOpen };
    setStore(updatedStore);
    setOriginalStore(prev => prev ? { ...prev, isOpen: updatedStore.isOpen } : null);

    // Shout to the Navbar toggle to update instantly!
    window.dispatchEvent(new CustomEvent('sync-store-status', { detail: updatedStore.isOpen }));

    try {
      await axios.patch(`${API_URL}/settings`, { store: updatedStore });
      showToast(`Store is now ${updatedStore.isOpen ? "OPEN" : "CLOSED"}`);
    } catch (e) {
      setStore(store); 
      setOriginalStore(prev => prev ? { ...prev, isOpen: store.isOpen } : null);
      window.dispatchEvent(new CustomEvent('sync-store-status', { detail: store.isOpen }));
      showToast("Failed to update status", "error");
    }
  };

  // 2. Instant Save: Notification Toggles (FIXED)
  const handleToggle = async (key: keyof NotificationToggles) => {
    const updatedToggles = { ...toggles, [key]: !toggles[key] };
    setToggles(updatedToggles); 
    try {
      await axios.patch(`${API_URL}/settings`, { toggles: updatedToggles });
    } catch (e) {
      setToggles(toggles); 
      showToast("Failed to save preference", "error");
    }
  };

  // 3. Manual Save: Store Details Profile
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await axios.patch(`${API_URL}/settings`, { store });
      setOriginalStore(store);
      showToast("Store details updated!");
    } catch (e) {
      showToast("Failed to save changes", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Logo Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingLogo(true);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", UPLOAD_PRESET!);
      
      try {
        const res = await axios.post(CLOUDINARY_URL, data);
        setStore(prev => ({ ...prev, logo: res.data.secure_url }));
        showToast("Logo added! (Don't forget to save)", "success");
      } catch (err) {
        showToast("Logo upload failed", "error");
      } finally {
        setIsUploadingLogo(false);
      }
    }
  };

  // 5. Logout
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      showToast("Logout failed", "error");
      setLogoutLoading(false);
    }
  };

  return (
    <div className="space-y-6 ">
      
      {/* Toast */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'}`}>
          {toast.type === 'success' ? <CheckBadgeIcon className="h-5 w-5" /> : <ExclamationTriangleIcon className="h-5 w-5" />}
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your store profile and preferences.</p>
        </div>
      </div>

      {loading ? (
        <SettingsSkeleton />
      ) : (
        <div className="space-y-6 pb-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              <StoreProfile 
                store={store} 
                setStore={setStore} 
                handlePhotoUpload={handleLogoUpload} 
                isUploadingLogo={isUploadingLogo}
                onToggleStatus={handleToggleStatus}
                onSave={handleSaveProfile}
                isSaving={isSaving}
                isDirty={isDirty}
              />
              
              {/* Security Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-indigo-500" /> Security
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all duration-300" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all duration-300" />
                  </div>
                </div>
                <button onClick={() => showToast("Password update link sent!", "success")} className="mt-4 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors duration-300">Update Password</button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <NotificationSettings toggles={toggles} onToggle={handleToggle} />
              <PreferencesSettings />

              {/* Logout Card */}
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 text-center transition-all duration-300">
                <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Sign Out</h4>
                <p className="text-xs text-red-500/80 mb-4">Log out of your admin account on this device.</p>
                <button onClick={handleLogout} disabled={logoutLoading} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-500/20">
                    {logoutLoading ? <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> : <ArrowLeftOnRectangleIcon className="h-5 w-5" />}
                    {logoutLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}