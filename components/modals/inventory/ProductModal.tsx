import { XMarkIcon, PhotoIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import CustomSelect from "./CustomSelect";
import { Product, CATEGORIES } from "@/types/inventory";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  formData: Product;
  setFormData: (val: Product | ((prev: Product) => Product)) => void;
  handleSave: (e: React.FormEvent) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  removeImage: (index: number) => void;
}

export default function ProductModal({
  isOpen, onClose, editingProduct, formData, setFormData, handleSave, handleImageUpload, isUploading, removeImage
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full h-full sm:h-auto sm:max-w-2xl rounded-none sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-dvh sm:max-h-[90vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200">
        <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
          <div><h3 className="text-xl font-bold text-slate-900 dark:text-white">{editingProduct ? "Edit Product" : "New Product"}</h3><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fill in details to update inventory.</p></div>
          <button onClick={onClose} className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"><XMarkIcon className="h-5 w-5 text-slate-500" /></button>
        </div>
        <div className="px-4 sm:px-8 py-4 overflow-y-auto custom-scrollbar flex-1">
          <form id="productForm" onSubmit={handleSave} className="space-y-6 sm:space-y-8 pb-32">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Product Images</label>
              <div className="flex flex-wrap gap-4">
                {formData.images.map((img, idx) => (<div key={idx} className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden group shadow-sm"><img src={img} alt="preview" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button type="button" onClick={() => removeImage(idx)} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"><TrashIcon className="h-4 w-4" /></button></div></div>))}
                <label className={`h-20 w-20 sm:h-24 sm:w-24 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all group ${isUploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {isUploading ? <ArrowPathIcon className="h-6 w-6 text-indigo-500 animate-spin" /> : <><PhotoIcon className="h-6 w-6 text-slate-400 group-hover:text-indigo-500 transition-colors" /><span className="text-[10px] text-slate-500 font-bold mt-2 group-hover:text-indigo-600 hidden sm:block">Add Image</span></>}
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-1 md:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label><input required type="text" value={formData.name} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Amul Butter 500g" /></div>
              <div className="relative z-50"><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label><CustomSelect value={formData.category} onChange={(val) => setFormData(prev => ({...prev, category: val}))} options={CATEGORIES} /></div>
              <div className="relative z-10"><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Unit</label><input type="text" value={formData.unit} onChange={(e) => setFormData(prev => ({...prev, unit: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="e.g. 1kg, 500ml" /></div>
              <div className="relative z-0"><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (₹)</label><input required type="number" value={formData.price === 0 ? "" : formData.price} onChange={(e) => setFormData(prev => ({...prev, price: e.target.value === "" ? 0 : Number(e.target.value)}))} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="0" /></div>
              <div className="relative z-0"><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stock Qty</label><input required type="number" value={formData.stock === 0 ? "" : formData.stock} onChange={(e) => setFormData(prev => ({...prev, stock: e.target.value === "" ? 0 : Number(e.target.value)}))} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="0" /></div>
            </div>
          </form>
        </div>
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-4 z-50 relative shrink-0">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm">Cancel</button>
          <button form="productForm" type="submit" disabled={isUploading} className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">{isUploading ? "Uploading..." : editingProduct ? "Save Changes" : "Create Product"}</button>
        </div>
      </div>
    </div>
  );
}