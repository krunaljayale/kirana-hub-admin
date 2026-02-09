import SettingsView from "@/components/settings/SettingsView";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Manage your store profile and preferences.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <SettingsView />
      
    </div>
  );
}