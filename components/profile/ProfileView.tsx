"use client";

import { useState, useRef } from "react";
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CameraIcon,
  PencilSquareIcon,
  CheckBadgeIcon,
  ClockIcon,
  BriefcaseIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

// --- Types ---
interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
}

// --- Dummy Data ---
const INITIAL_USER: UserProfile = {
  name: "Rahul Sharma",
  role: "Super Admin",
  email: "rahul@kiranahub.com",
  phone: "+91 98765 43210",
  location: "Pune, Maharashtra",
  bio: "Managing the store operations and inventory. Passionate about retail tech.",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const ACTIVITY_LOGS = [
  { id: 1, action: "Updated Inventory", target: "Amul Butter (500g)", time: "2 mins ago", icon: ArrowPathIcon, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { id: 2, action: "Processed Order", target: "Order #1024", time: "1 hour ago", icon: BriefcaseIcon, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
  { id: 3, action: "Changed Settings", target: "Notification Preferences", time: "Yesterday", icon: UserCircleIcon, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" },
  { id: 4, action: "Login", target: "New device detected", time: "Yesterday", icon: ClockIcon, color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20" },
];

export default function ProfileView() {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Actions ---

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      setToast({ show: true, msg: "Profile updated successfully!" });
      setTimeout(() => setToast({ show: false, msg: "" }), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* --- TOAST NOTIFICATION --- */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-transparent">
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* --- HEADER SECTION (No Cover Photo) --- */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        {/* Avatar Area */}
        <div className="relative group shrink-0">
           <input 
             type="file" 
             ref={fileInputRef} 
             onChange={handleFileChange} 
             className="hidden" 
             accept="image/*" 
           />
           <div 
             onClick={handleAvatarClick}
             className={`h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-slate-50 dark:border-slate-800 overflow-hidden shadow-lg transition-all ${isEditing ? 'cursor-pointer hover:opacity-90 ring-4 ring-indigo-500/20' : ''}`}
           >
              <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
           </div>
           
           {/* Camera Icon (Only visible in Edit Mode) */}
           {isEditing && (
             <button 
               onClick={handleAvatarClick}
               className="absolute bottom-1 right-1 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
               title="Change Photo"
             >
                <CameraIcon className="h-4 w-4" />
             </button>
           )}
        </div>

        {/* Info Area */}
        <div className="flex-1 text-center sm:text-left space-y-1 mt-2">
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center sm:justify-start gap-2">
             <CheckBadgeIcon className="h-5 w-5 text-indigo-500" />
             {user.role}
           </p>
           <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-md mx-auto sm:mx-0">
             {user.bio}
           </p>
        </div>

        {/* Edit Action */}
        <div className="shrink-0">
           {isEditing ? (
             <div className="flex flex-col sm:flex-row gap-3">
               <button 
                 onClick={() => setIsEditing(false)}
                 className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={handleSave}
                 disabled={loading}
                 className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
               >
                 {loading ? "Saving..." : "Save Changes"}
               </button>
             </div>
           ) : (
             <button 
               onClick={() => setIsEditing(true)}
               className="px-6 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 bg-white dark:bg-slate-800 shadow-sm"
             >
               <PencilSquareIcon className="h-4 w-4" />
               Edit Profile
             </button>
           )}
        </div>
      </div>

      {/* --- GRID CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* LEFT COL: Form */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <UserCircleIcon className="h-5 w-5 text-indigo-500" />
                  Personal Information
               </h3>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                     <div className="relative">
                        <UserCircleIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={user.name}
                          onChange={(e) => setUser({...user, name: e.target.value})}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isEditing ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800' : 'border-transparent bg-slate-50 dark:bg-slate-800/50'} text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`}
                        />
                     </div>
                  </div>

                  {/* Role (Read Only) */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                     <div className="relative">
                        <CheckBadgeIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input 
                          type="text" 
                          disabled
                          value={user.role}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                        />
                     </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                     <div className="relative">
                        <EnvelopeIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input 
                          type="email" 
                          disabled={!isEditing}
                          value={user.email}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isEditing ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800' : 'border-transparent bg-slate-50 dark:bg-slate-800/50'} text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`}
                        />
                     </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                     <div className="relative">
                        <PhoneIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={user.phone}
                          onChange={(e) => setUser({...user, phone: e.target.value})}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isEditing ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800' : 'border-transparent bg-slate-50 dark:bg-slate-800/50'} text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`}
                        />
                     </div>
                  </div>

                  {/* Location (Full Width) */}
                  <div className="space-y-2 sm:col-span-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                     <div className="relative">
                        <MapPinIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={user.location}
                          onChange={(e) => setUser({...user, location: e.target.value})}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isEditing ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800' : 'border-transparent bg-slate-50 dark:bg-slate-800/50'} text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`}
                        />
                     </div>
                  </div>

                  {/* Bio (Full Width) */}
                  <div className="space-y-2 sm:col-span-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bio / About</label>
                     <textarea 
                        disabled={!isEditing}
                        value={user.bio}
                        onChange={(e) => setUser({...user, bio: e.target.value})}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800' : 'border-transparent bg-slate-50 dark:bg-slate-800/50'} text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none`}
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT COL: Stats & Activity */}
         <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center mb-2">
                     <ClockIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">2y</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">With KiranaHub</p>
               </div>
               <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center mb-2">
                     <CheckBadgeIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">1.2k</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Orders Handled</p>
               </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
               <div className="space-y-6">
                  {ACTIVITY_LOGS.map((log, index) => (
                     <div key={log.id} className="relative flex gap-4 group">
                        {/* Connecting Line */}
                        {index !== ACTIVITY_LOGS.length - 1 && (
                           <div className="absolute left-5 top-10 -bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors"></div>
                        )}
                        
                        {/* Icon */}
                        <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${log.color}`}>
                           <log.icon className="h-5 w-5" />
                        </div>

                        {/* Content */}
                        <div>
                           <p className="text-sm font-bold text-slate-900 dark:text-white">{log.action}</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400">{log.target}</p>
                           <p className="text-[10px] text-slate-400 mt-1 font-medium">{log.time}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}