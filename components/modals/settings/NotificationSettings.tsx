import { BellIcon } from "@heroicons/react/24/outline";
import { NotificationToggles } from "@/types/settings";

interface NotificationProps {
  toggles: NotificationToggles;
  onToggle: (key: keyof NotificationToggles) => void;
}

function Toggle({ label, desc, isOn, onToggle, colorType }: { label: string; desc?: string; isOn: boolean; onToggle: () => void; colorType: string }) {
  let activeClass = "bg-indigo-600";
  if (colorType === "emerald") activeClass = "bg-emerald-500";
  if (colorType === "orange") activeClass = "bg-orange-500";

  return (
    <div className="flex items-center justify-between py-2 cursor-pointer group" onClick={onToggle}>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-300">{label}</span>
        {desc && <span className="text-xs text-slate-500 transition-colors duration-300">{desc}</span>}
      </div>
      <div className={`relative w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out ${isOn ? activeClass : 'bg-slate-200 dark:bg-slate-700'}`}>
        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}

export default function NotificationSettings({ toggles, onToggle }: NotificationProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <BellIcon className="h-5 w-5 text-orange-500" /> Notifications
      </h3>
      <div className="space-y-4">
        <Toggle label="Order Alerts" desc="Get notified for new orders" isOn={toggles.orderAlerts} onToggle={() => onToggle('orderAlerts')} colorType="indigo" />
        <Toggle label="WhatsApp Updates" desc="Send receipts via WhatsApp" isOn={toggles.whatsappUpdates} onToggle={() => onToggle('whatsappUpdates')} colorType="emerald" />
        <Toggle label="Low Stock Warning" desc="Alert below 10 items" isOn={toggles.stockAlerts} onToggle={() => onToggle('stockAlerts')} colorType="orange" />
      </div>
    </div>
  );
}