"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios"; // 👈 IMPORT AXIOS
import { 
  PencilSquareIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  CheckBadgeIcon,
  PhotoIcon,
  ChevronDownIcon,
  CheckIcon,
  TagIcon
} from "@heroicons/react/24/outline";

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  images: string[];
}

const CATEGORIES = ["Dairy", "Snacks", "Oil & Ghee", "Spices", "Beverages", "Flour", "General"];

// --- REUSABLE CUSTOM SELECT ---
function CustomSelect({ value, onChange, options, placeholder = "Select..." }: { value: string; onChange: (val: string) => void; options: string[]; placeholder?: string; }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative w-full" ref={containerRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-xl border transition-all ${isOpen ? "border-indigo-500 ring-2 ring-indigo-500/20 bg-white dark:bg-slate-800 shadow-md" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600"} dark:text-white text-sm font-medium focus:outline-none`}>
        <span className={value ? "text-slate-900 dark:text-white" : "text-slate-400"}>{value || placeholder}</span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-100">
          <div className="p-1">
            {options.map((option) => (
              <div key={option} onClick={() => { onChange(option); setIsOpen(false); }} className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors ${value === option ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"}`}>
                {option}
                {value === option && <CheckIcon className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]); // Start empty
  const [loading, setLoading] = useState(true); // Add loading state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState<Product>({
    id: 0, name: "", category: "General", price: 0, stock: 0, unit: "pc", images: []
  });

  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  // ✅ FETCH PRODUCTS ON LOAD
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        showToast("Failed to load inventory", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Image Handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
             setFormData(prev => ({ ...prev, images: [...prev.images, reader.result as string] }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, index) => index !== indexToRemove) });
  };

  // Actions
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ id: 0, name: "", category: "General", price: 0, stock: 0, unit: "pc", images: [] });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  // ✅ SAVE (CREATE OR UPDATE)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false); // Close modal immediately (Optimistic)
    
    // 1. Snapshot for revert
    const previousProducts = [...products];

    if (editingProduct) {
      // --- UPDATE LOGIC ---
      const updatedList = products.map(p => p.id === editingProduct.id ? formData : p);
      setProducts(updatedList); // Optimistic Update

      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${editingProduct.id}`, formData);
        showToast("Product updated successfully!");
      } catch (error) {
        setProducts(previousProducts); // Revert
        showToast("Failed to update product", "error");
        console.error(error);
      }

    } else {
      // --- CREATE LOGIC ---
      const newProduct = { ...formData, id: Date.now() }; // Generate ID client-side for mock
      const newList = [newProduct, ...products];
      setProducts(newList); // Optimistic Update

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct);
        showToast("New product added to inventory!");
      } catch (error) {
        setProducts(previousProducts); // Revert
        showToast("Failed to add product", "error");
        console.error(error);
      }
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // ✅ DELETE LOGIC
  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleteModalOpen(false);

    const previousProducts = [...products];
    setProducts(products.filter(p => p.id !== deleteId)); // Optimistic

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${deleteId}`);
      showToast("Product removed from inventory", "error");
    } catch (error) {
      setProducts(previousProducts);
      showToast("Failed to delete product", "error");
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800" };
    if (stock < 10) return { label: "Low Stock", color: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800" };
    return { label: "In Stock", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" };
  };

  if (loading) {
     return <div className="p-20 text-center text-slate-500 animate-pulse">Loading inventory...</div>;
  }

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* --- TOAST --- */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'}`}>
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full h-full sm:h-auto sm:max-w-2xl rounded-none sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[100dvh] sm:max-h-[90vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200">
            <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{editingProduct ? "Edit Product" : "New Product"}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fill in details to update inventory.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"><XMarkIcon className="h-5 w-5 text-slate-500" /></button>
            </div>
            <div className="px-4 sm:px-8 py-4 overflow-y-auto custom-scrollbar flex-1">
              <form id="productForm" onSubmit={handleSave} className="space-y-6 sm:space-y-8 pb-32">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Product Images</label>
                  <div className="flex flex-wrap gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden group shadow-sm">
                        <img src={img} alt="preview" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => removeImage(idx)} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"><TrashIcon className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                    <label className="h-20 w-20 sm:h-24 sm:w-24 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all group">
                      <PhotoIcon className="h-6 w-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <span className="text-[10px] text-slate-500 font-bold mt-2 group-hover:text-indigo-600 hidden sm:block">Add Image</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Amul Butter 500g" />
                  </div>
                  <div className="relative z-50">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                    <CustomSelect value={formData.category} onChange={(val) => setFormData({...formData, category: val})} options={CATEGORIES} />
                  </div>
                  <div className="relative z-10">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Unit</label>
                    <input type="text" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="e.g. 1kg, 500ml" />
                  </div>
                  <div className="relative z-0">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (₹)</label>
                    <input required type="number" value={formData.price === 0 ? "" : formData.price} onChange={(e) => setFormData({...formData, price: e.target.value === "" ? 0 : Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="0" />
                  </div>
                  <div className="relative z-0">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stock Qty</label>
                    <input required type="number" value={formData.stock === 0 ? "" : formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value === "" ? 0 : Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="0" />
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-4 z-50 relative shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm">Cancel</button>
              <button form="productForm" type="submit" className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02]">{editingProduct ? "Save Changes" : "Create Product"}</button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRM MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 scale-100 animate-in zoom-in-95 duration-200">
              <div className="h-14 w-14 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mb-6 mx-auto"><TrashIcon className="h-7 w-7" /></div>
              <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Delete Product?</h3>
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">Are you sure? This will remove the item from your inventory permanently.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all">Delete</button>
              </div>
           </div>
        </div>
      )}

      {/* --- TOOLBAR --- */}
      <div className="p-5 flex flex-col xl:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="relative w-full sm:w-72 group">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inventory..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white" />
          </div>
          <div className="w-full sm:w-56 z-20">
             <CustomSelect value={categoryFilter} onChange={(val) => setCategoryFilter(val)} options={["All Categories", ...CATEGORIES]} />
          </div>
        </div>
        <button onClick={handleOpenAdd} className="w-full xl:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"><PlusIcon className="h-5 w-5" />Add Product</button>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
        {/* === MOBILE CARD VIEW === */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const status = getStockStatus(product.stock);
              return (
                <div key={product.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                  <div className="flex gap-4">
                     <div className="relative h-20 w-20 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                        {product.images.length > 0 ? ( <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> ) : ( <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-800">{product.name.charAt(0)}</div> )}
                        {product.stock < 10 && ( <div className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg shadow-sm"><TagIcon className="h-3 w-3" /></div> )}
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold text-slate-900 dark:text-white line-clamp-2">{product.name}</h4>
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${status.color}`}>{status.label}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{product.category} • {product.unit}</p>
                        <div className="flex items-end gap-2 mt-2">
                           <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{product.price}</span>
                           <span className="text-xs text-slate-400 mb-1">Stock: {product.stock}</span>
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => handleOpenEdit(product)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"><PencilSquareIcon className="h-4 w-4" />Edit</button>
                     <button onClick={() => confirmDelete(product.id)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"><TrashIcon className="h-4 w-4" />Delete</button>
                  </div>
                </div>
              );
            })
          ) : (
             <div className="p-10 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No products found</p>
             </div>
          )}
        </div>

        {/* === DESKTOP TABLE VIEW === */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm">
              <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 pl-6">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const status = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600 flex-shrink-0 shadow-sm">
                            {product.images.length > 0 ? ( <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> ) : ( <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-800">{product.name.charAt(0)}</div> )}
                            {product.images.length > 1 && ( <div className="absolute bottom-0 right-0 bg-black/70 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 font-bold rounded-tl-md">+{product.images.length - 1}</div> )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm">{product.name}</div>
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{product.unit}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400"><span className="inline-block px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">{product.category}</span></td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">₹{product.price}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                           <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border ${status.color}`}>{status.label}</span>
                           <span className="text-xs font-medium text-slate-400">({product.stock})</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleOpenEdit(product)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all" title="Edit"><PencilSquareIcon className="h-5 w-5" /></button>
                          <button onClick={() => confirmDelete(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all" title="Delete"><TrashIcon className="h-5 w-5" /></button>
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
    </div>
  );
}