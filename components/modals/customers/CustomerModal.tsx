import { XMarkIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { Customer } from "@/types/customer";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCustomer: Customer | null;
  formData: Customer;
  setFormData: (val: Customer) => void;
  handleSave: (e: React.FormEvent) => void;
}

export default function CustomerModal({ isOpen, onClose, editingCustomer, formData, setFormData, handleSave }: CustomerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingCustomer ? "Edit Customer" : "Add New Customer"}
          </h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
            <XMarkIcon className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <form id="customerForm" onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="98765 43210" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Credit (Udhaar)</label>
                <div className="relative">
                  <CurrencyRupeeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  {/* ✅ FIXED: Allows backspacing 0 */}
                  <input 
                    type="number" 
                    value={formData.credit === 0 ? "" : formData.credit} 
                    onChange={(e) => setFormData({...formData, credit: e.target.value === "" ? 0 : Number(e.target.value)})} 
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 outline-none transition-all ${formData.credit > 0 ? "border-red-200 dark:border-red-900 focus:border-red-500 focus:ring-red-500/20 text-red-600 font-bold" : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"}`} 
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Spent</label>
                <div className="relative">
                   <CurrencyRupeeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   {/* ✅ FIXED: Allows backspacing 0 */}
                   <input 
                     type="number" 
                     value={formData.spent === 0 ? "" : formData.spent} 
                     onChange={(e) => setFormData({...formData, spent: e.target.value === "" ? 0 : Number(e.target.value)})} 
                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" 
                     placeholder="0"
                   />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-4">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors">Cancel</button>
          <button form="customerForm" type="submit" className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02]">{editingCustomer ? "Save Changes" : "Add Customer"}</button>
        </div>
      </div>
    </div>
  );
}