import { UserCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CheckBadgeIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { UserProfile } from "@/types/profile";

interface Props {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isEditing: boolean;
}

export default function ProfileForm({ user, setUser, isEditing }: Props) {
  // 🚀 UPGRADED: Added shadow-inner to make inputs look like physical recessed boxes when editing
  const inputBaseClass = `w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
    isEditing 
      ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[inset_0_2px_6px_rgba(0,0,0,0.02)] focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.0)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white' 
      : 'border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300'
  }`;

  const textAreaClass = `w-full p-4 rounded-xl border transition-all duration-300 outline-none resize-none leading-relaxed ${
    isEditing 
      ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[inset_0_2px_6px_rgba(0,0,0,0.02)] focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.0)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white' 
      : 'border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300'
  }`;

  const MAX_BIO_LENGTH = 150;
  const isBioOverLimit = (user.bio?.length || 0) > MAX_BIO_LENGTH;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all duration-300">
      
      {/* 🚀 Custom Physics Animations */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-stagger {
          opacity: 0;
          animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-error-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 animate-stagger" style={{ animationDelay: '0ms' }}>
        <UserCircleIcon className="h-5 w-5 text-indigo-500" /> Personal Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Full Name */}
        <div className="space-y-2 animate-stagger" style={{ animationDelay: '50ms' }}>
          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Full Name</label>
          <div className="relative group/input">
            <UserCircleIcon className={`absolute left-4 top-3.5 h-5 w-5 transition-all duration-300 ${isEditing ? 'text-slate-400 group-focus-within/input:text-indigo-500 group-focus-within/input:scale-110' : 'text-slate-400'}`} />
            <input type="text" disabled={!isEditing} value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className={inputBaseClass} />
          </div>
        </div>

        {/* Role (Read Only) */}
        <div className="space-y-2 animate-stagger" style={{ animationDelay: '100ms' }}>
          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Role</label>
          <div className="relative">
            <CheckBadgeIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input type="text" disabled value={user.role} className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed font-medium" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2 animate-stagger" style={{ animationDelay: '150ms' }}>
          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Email Address</label>
          <div className="relative group/input">
            <EnvelopeIcon className={`absolute left-4 top-3.5 h-5 w-5 transition-all duration-300 ${isEditing ? 'text-slate-400 group-focus-within/input:text-indigo-500 group-focus-within/input:scale-110' : 'text-slate-400'}`} />
            <input type="email" disabled={!isEditing} value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className={inputBaseClass} />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2 animate-stagger" style={{ animationDelay: '200ms' }}>
          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Phone Number</label>
          <div className="relative group/input">
            <PhoneIcon className={`absolute left-4 top-3.5 h-5 w-5 transition-all duration-300 ${isEditing ? 'text-slate-400 group-focus-within/input:text-indigo-500 group-focus-within/input:scale-110' : 'text-slate-400'}`} />
            <input type="text" disabled={!isEditing} value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} className={inputBaseClass} />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2 sm:col-span-2 animate-stagger" style={{ animationDelay: '250ms' }}>
          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Location</label>
          <div className="relative group/input">
            <MapPinIcon className={`absolute left-4 top-3.5 h-5 w-5 transition-all duration-300 ${isEditing ? 'text-slate-400 group-focus-within/input:text-indigo-500 group-focus-within/input:scale-110' : 'text-slate-400'}`} />
            <input type="text" disabled={!isEditing} value={user.location} onChange={(e) => setUser({...user, location: e.target.value})} className={inputBaseClass} />
          </div>
        </div>

        {/* Bio / About Section */}
        <div className="space-y-2 sm:col-span-2 mt-2 animate-stagger" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <DocumentTextIcon className={`h-4 w-4 transition-colors ${isEditing ? 'text-indigo-500' : 'text-slate-400'}`} /> 
              Bio / About
            </label>
            
            {/* Live Character Counter */}
            <div className={`transition-all duration-300 ${isEditing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <span 
                key={isBioOverLimit ? 'error' : 'normal'} // Forces re-render to trigger animation
                className={`text-[10px] font-bold inline-block ${isBioOverLimit ? 'text-red-500 animate-error-shake' : 'text-slate-400'}`}
              >
                {user.bio?.length || 0} / {MAX_BIO_LENGTH}
              </span>
            </div>
          </div>
          
          <div className="relative group/textarea">
            <textarea 
              disabled={!isEditing} 
              value={user.bio} 
              onChange={(e) => setUser({...user, bio: e.target.value})} 
              rows={4} 
              placeholder="Write a short bio about your role and experience..."
              className={textAreaClass} 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}