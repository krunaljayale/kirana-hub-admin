import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon, TagIcon } from "@heroicons/react/24/outline";
import { Product } from "@/types/inventory";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void; // ✅ Strict String
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800" };
    if (stock < 10) return { label: "Low Stock", color: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800" };
    return { label: "In Stock", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" };
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
      {/* MOBILE VIEW */}
      <div className="md:hidden grid grid-cols-1 gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => {
            const status = getStockStatus(product.stock);
            return (
              <div key={product.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex gap-4">
                   <div className="relative h-20 w-20 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                      {product.images.length > 0 ? ( <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> ) : ( <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-800">{product.name.charAt(0)}</div> )}
                      {product.stock < 10 && ( <div className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg shadow-sm"><TagIcon className="h-3 w-3" /></div> )}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start"><h4 className="font-bold text-slate-900 dark:text-white line-clamp-2">{product.name}</h4><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${status.color}`}>{status.label}</span></div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{product.category} • {product.unit}</p>
                      <div className="flex items-end gap-2 mt-2"><span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{product.price}</span><span className="text-xs text-slate-400 mb-1">Stock: {product.stock}</span></div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => onEdit(product)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><PencilSquareIcon className="h-4 w-4" />Edit</button>
                   <button onClick={() => onDelete(product.id)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"><TrashIcon className="h-4 w-4" />Delete</button>
                </div>
              </div>
            );
          })
        ) : (
           <div className="p-10 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"><MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-50" /><p>No products found</p></div>
        )}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm">
            <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 pl-6">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock Level</th><th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
            {products.length > 0 ? (
              products.map((product) => {
                const status = getStockStatus(product.stock);
                return (
                  <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600 shrink-0 shadow-sm">
                          {product.images.length > 0 ? ( <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> ) : ( <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-800">{product.name.charAt(0)}</div> )}
                          {product.images.length > 1 && ( <div className="absolute bottom-0 right-0 bg-black/70 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 font-bold rounded-tl-md">+{product.images.length - 1}</div> )}
                        </div>
                        <div><div className="font-bold text-slate-900 dark:text-white text-sm">{product.name}</div><div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{product.unit}</div></div>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400"><span className="inline-block px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">{product.category}</span></td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">₹{product.price}</td>
                    <td className="p-4"><div className="flex items-center gap-2"><span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border ${status.color}`}>{status.label}</span><span className="text-xs font-medium text-slate-400">({product.stock})</span></div></td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => onEdit(product)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all" title="Edit"><PencilSquareIcon className="h-5 w-5" /></button>
                        <button onClick={() => onDelete(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all" title="Delete"><TrashIcon className="h-5 w-5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan={5} className="p-12 text-center text-slate-400"><div className="flex flex-col items-center gap-3"><div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><MagnifyingGlassIcon className="h-6 w-6 text-slate-300" /></div><p className="font-medium">No products found</p></div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}