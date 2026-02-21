"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

import { UserProfile } from "@/types/profile";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";
import ProfileHeader from "@/components/modals/profile/ProfileHeader";
import ProfileForm from "@/components/modals/profile/ProfileForm";
import ProfileStats from "@/components/modals/profile//ProfileStats";
import ProfileActivity from "@/components/modals/profile/ProfileActivity";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileView() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [originalUser, setOriginalUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchProfile = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      try {
        const [_, res] = await Promise.all([minLoadTime, axios.get(`${API_URL}/profile`)]);
        setUser(res.data);
        setOriginalUser(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // --- SAVE ACTIONS ---
  const handleSave = async () => {
    if (!user) return;
    setSaveLoading(true);
    try {
      await axios.patch(`${API_URL}/profile`, user);
      setOriginalUser(user);
      setIsEditing(false);
      showToast("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save profile", error);
      // Revert on error
      if (originalUser) setUser(originalUser);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading || !user) return <ProfileSkeleton />;

  return (
    <div className="space-y-6 pb-10">
      
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-transparent">
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* 1. Header Section */}
      <ProfileHeader 
        user={user} 
        setUser={setUser} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        onSave={handleSave} 
        loading={saveLoading} 
      />

      {/* 2. Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         <div className="lg:col-span-2">
           <ProfileForm user={user} setUser={setUser} isEditing={isEditing} />
         </div>

         <div className="space-y-6">
           <ProfileStats />
           <ProfileActivity />
         </div>
         
      </div>
    </div>
  );
}