import { XMarkIcon, PhotoIcon, IdentificationIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface RunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; phone: string; email: string; photo: string; drivingLicense: string };
  setFormData: (val: any) => void;
  handleSave: (e: React.FormEvent) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLicenseUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingPhoto: boolean;
  isUploadingLicense: boolean;
  isEditMode: boolean; // ✅ Added to switch text
}

export default function RunnerModal({ 
  isOpen, onClose, formData, setFormData, handleSave, 
  handlePhotoUpload, handleLicenseUpload, isUploadingPhoto, isUploadingLicense, isEditMode
}: RunnerModalProps) {
  if (!isOpen) return null;

  const isSubmitDisabled = !formData.drivingLicense || isUploadingPhoto || isUploadingLicense;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh]">
        
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {isEditMode ? "Edit Partner Details" : "Add Delivery Partner"}
          </h3>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
            <XMarkIcon className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="runnerForm" onSubmit={handleSave} className="space-y-5">
            {/* Form Fields Remain Identical */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name <span className="text-red-500">*</span></label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="e.g. Suresh Kumar" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="98765 43210" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address <span className="text-slate-400 lowercase font-normal">(Optional)</span></label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="suresh@example.com" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Profile Photo</label>
                <label className={`relative h-28 w-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all overflow-hidden ${isUploadingPhoto ? 'opacity-50 pointer-events-none' : ''}`}>
                  {formData.photo ? ( <img src={formData.photo} alt="Profile" className="absolute inset-0 w-full h-full object-cover" /> ) : isUploadingPhoto ? ( <ArrowPathIcon className="h-6 w-6 text-indigo-500 animate-spin" /> ) : ( <><PhotoIcon className="h-6 w-6 text-slate-400 mb-1" /><span className="text-xs text-slate-500 font-medium">Upload</span></> )}
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={isUploadingPhoto} />
                </label>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Driving License <span className="text-red-500">*</span></label>
                <label className={`relative h-28 w-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed ${!formData.drivingLicense ? 'border-red-300 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/10' : 'border-slate-300 dark:border-slate-600'} hover:border-indigo-50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all overflow-hidden ${isUploadingLicense ? 'opacity-50 pointer-events-none' : ''}`}>
                  {formData.drivingLicense ? ( <img src={formData.drivingLicense} alt="License" className="absolute inset-0 w-full h-full object-cover" /> ) : isUploadingLicense ? ( <ArrowPathIcon className="h-6 w-6 text-indigo-500 animate-spin" /> ) : ( <><IdentificationIcon className={`h-6 w-6 mb-1 ${!formData.drivingLicense ? 'text-red-400' : 'text-slate-400'}`} /><span className={`text-xs font-medium ${!formData.drivingLicense ? 'text-red-500' : 'text-slate-500'}`}>Upload ID</span></> )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleLicenseUpload} disabled={isUploadingLicense} />
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-4 shrink-0">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors">Cancel</button>
          <button form="runnerForm" type="submit" disabled={isSubmitDisabled} className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitDisabled ? "Upload License First" : isEditMode ? "Save Changes" : "Add Partner"}
          </button>
        </div>

      </div>
    </div>
  );
}