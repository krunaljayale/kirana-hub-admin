"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

// --- Modals Imports ---
import { Product, CATEGORIES } from "@/types/inventory";
import InventorySkeleton from "@/components/Skeletons/InventorySkeleton";
import InventoryHeader from "@/components/modals/inventory/InventoryHeader";
import ProductList from "@/components/modals/inventory/ProductList";
import ProductModal from "@/components/modals/inventory/ProductModal";
import DeleteProductModal from "@/components/modals/inventory/DeleteProductModal";

// --- CONFIGURATION ---
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function InventoryPage() {
  // --- STATE ---
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // ✅ FIXED: Strictly String ID
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- FORM STATE ---
  const initialFormState = { id: "0", name: "", category: "General", price: 0, stock: 0, unit: "pc", images: [] };
  const [formData, setFormData] = useState<Product>(initialFormState);

  // --- TOAST STATE ---
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" as "success" | "error" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  // --- 1. FETCH DATA (With Normalization) ---
  useEffect(() => {
    const fetchProducts = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      const dataFetch = axios.get(`${API_URL}/products`);

      try {
        setLoading(true);
        const [_, res] = await Promise.all([minLoadTime, dataFetch]);
        
        // ✅ CRITICAL FIX: Convert ALL IDs to String immediately
        // This ensures the frontend ALWAYS works with strings, even if DB has numbers
        const normalizedData = res.data.map((item: any) => ({
          ...item,
          id: String(item.id)
        }));
        
        setProducts(normalizedData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        showToast("Failed to connect to server", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- 2. CLOUDINARY UPLOAD LOGIC ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const files = Array.from(e.target.files);
      
      try {
        const uploadPromises = files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", UPLOAD_PRESET!);
          const res = await axios.post(CLOUDINARY_URL, data);
          return res.data.secure_url;
        });

        const urls = await Promise.all(uploadPromises);
        setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] }));
        showToast("Images uploaded to cloud!", "success");
      } catch (error) {
        console.error("Cloudinary Upload Failed:", error);
        showToast("Image upload failed.", "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove) }));
  };

  // --- 3. CRUD ACTIONS ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (editingProduct) {
      // UPDATE
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? formData : p)); // Optimistic
      showToast("Product updated");
      
      try { 
        // ✅ FIXED: Using .patch() to ensure partial updates (like deleting an image) work.
        // Also ensuring we use the string ID.
        await axios.patch(`${API_URL}/products/${editingProduct.id}`, formData); 
      } catch (e) { 
        console.error("Update failed:", e);
        showToast("Failed to update in DB (Try Refreshing)", "error");
      }
    } else {
      // CREATE
      // ✅ FIXED: Ensure new ID is a String
      const newProduct = { ...formData, id: Date.now().toString() }; 
      setProducts(prev => [newProduct, ...prev]); 
      showToast("Product added successfully");
      
      try { 
        await axios.post(`${API_URL}/products`, newProduct); 
      } catch (e) { 
        console.error("Create failed:", e);
        showToast("Failed to save to DB", "error");
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleteModalOpen(false);
    
    // Optimistic UI
    setProducts(prev => prev.filter(p => p.id !== deleteId)); 
    showToast("Product deleted", "error");
    
    try { 
      // ✅ FIXED: Always sending a string ID to the API
      await axios.delete(`${API_URL}/products/${deleteId}`); 
    } catch (e) { 
      console.error("Delete failed:", e);
      showToast("Failed to delete (Try Refreshing)", "error");
    }
  };

  // --- HELPERS ---
  const openAdd = () => { setEditingProduct(null); setFormData(initialFormState); setIsModalOpen(true); };
  
  const openEdit = (p: Product) => { setEditingProduct(p); setFormData(p); setIsModalOpen(true); };
  
  // ✅ FIXED: Explicitly string
  const confirmDelete = (id: string) => { setDeleteId(id); setIsDeleteModalOpen(true); };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // --- RENDER ---
  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'}`}>
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your products and stock levels.</p>
        </div>
      </div>

      {/* Render Skeleton OR Real Container */}
      {loading ? (
        <div>
           <InventorySkeleton />
        </div>
      ) : (
        // Real Container
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <InventoryHeader 
            search={search} 
            setSearch={setSearch} 
            categoryFilter={categoryFilter} 
            setCategoryFilter={setCategoryFilter} 
            onAdd={openAdd} 
          />

          <ProductList 
            products={filteredProducts} 
            onEdit={openEdit} 
            onDelete={confirmDelete} 
          />
        </div>
      )}

      {/* Modals */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingProduct={editingProduct} 
        formData={formData} 
        setFormData={setFormData} 
        handleSave={handleSave} 
        handleImageUpload={handleImageUpload} 
        isUploading={isUploading}
        removeImage={removeImage}
      />

      <DeleteProductModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onDelete={handleDelete} 
      />

    </div>
  );
}