import { useRef, useState } from "react";
import axios from "axios";
import { CameraIcon, CheckBadgeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { UserProfile } from "@/types/profile";

interface Props {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSave: () => void;
  loading: boolean;
}

// 🚀 Cloudinary Credentials
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function ProfileHeader({ user, setUser, isEditing, setIsEditing, onSave, loading }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  // 🚀 UPGRADED: Upload to Cloudinary instead of saving heavy Base64 strings
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET!);

    try {
      const res = await axios.post(CLOUDINARY_URL, data);
      // Save the lightweight Cloudinary URL to our state
      setUser(prev => ({ ...prev, avatar: res.data.secure_url }));
    } catch (err) {
      console.error("Avatar upload failed", err);
      alert("Failed to upload image. Please check your Cloudinary settings.");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 transition-all duration-300">
      
      {/* 🚀 Ultra-Premium Physics & Staggered Load Animations */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          60% { transform: scale(1.1) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up-delayed {
          opacity: 0;
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.08s;
        }
        .animate-pop-in {
          animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-stagger {
          opacity: 0;
          animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Avatar Section */}
      <div className="relative group shrink-0 animate-stagger" style={{ animationDelay: '0ms' }}>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        <div 
          onClick={handleAvatarClick}
          className={`relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-slate-50 dark:border-slate-800 overflow-hidden transition-all duration-500 ease-out
            ${isEditing 
              ? 'cursor-pointer ring-4 ring-indigo-500/30 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 opacity-90 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
              : 'shadow-lg'
            }`}
        >
          {/* 🚀 Loading Spinner while uploading to Cloudinary */}
          {isUploadingAvatar && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 backdrop-blur-sm">
               <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            </div>
          )}
          
          <img src={user.avatar} alt="Profile" className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isUploadingAvatar ? 'opacity-50' : 'opacity-100'}`} />
        </div>
        
        {/* Glassmorphic Pop-in Camera Button */}
        {isEditing && (
          <button 
            onClick={handleAvatarClick} 
            disabled={isUploadingAvatar}
            className="absolute bottom-1 right-1 p-2.5 bg-indigo-600/90 backdrop-blur-md text-white rounded-full hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-500/30 active:scale-95 border-2 border-white dark:border-slate-900 animate-pop-in z-10 disabled:opacity-50"
          >
            <CameraIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1 text-center sm:text-left space-y-1 sm:mt-2 animate-stagger" style={{ animationDelay: '100ms' }}>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.name}</h1>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center sm:justify-start gap-1.5 text-sm">
          <CheckBadgeIcon className="h-5 w-5" /> {user.role}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto sm:mx-0 leading-relaxed font-medium">
          {user.bio}
        </p>
      </div>

      {/* Actions Wrapper */}
      <div className="shrink-0 mt-4 sm:mt-2 w-full sm:w-auto h-11 flex items-center justify-center sm:justify-end animate-stagger" style={{ animationDelay: '200ms' }}>
        {isEditing ? (
          <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsEditing(false)} 
              className="animate-slide-up flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={onSave} 
              disabled={loading || isUploadingAvatar} 
              className="animate-slide-up-delayed flex-[2] sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-b from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)} 
            className="animate-slide-up w-full sm:w-auto flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all gap-2 bg-white dark:bg-slate-800 shadow-sm active:scale-95 group"
          >
            <PencilSquareIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" /> 
            Edit Profile
          </button>
        )}
      </div>

    </div>
  );
}