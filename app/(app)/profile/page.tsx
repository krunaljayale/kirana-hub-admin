import ProfileView from "@/components/profile/ProfileView";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Page Title - Only visible on mobile/small screens as header covers it usually */}
      <div className="flex items-end justify-between gap-4 md:hidden">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>
         </div>
      </div>

      <ProfileView />
    </div>
  );
}