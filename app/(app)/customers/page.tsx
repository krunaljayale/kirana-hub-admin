"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// --- Components ---
import { Customer } from "@/types/customer";
import CustomerSkeleton from "@/components/Skeletons/CustomerSkeleton";
import CustomerHeader from "@/components/modals/customers/CustomerHeader";
import CustomerList from "@/components/modals/customers/CustomerList";
import CustomerModal from "@/components/modals/customers/CustomerModal";
import DeleteCustomerModal from "@/components/modals/customers/DeleteCustomerModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CustomersPage() {
  // --- STATE ---
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // --- FORM STATE ---
  const initialFormState: Customer = { id: "0", name: "", phone: "", orders: 0, spent: 0, credit: 0, lastVisit: "Just now", avatar: "" };
  const [formData, setFormData] = useState<Customer>(initialFormState);

  // --- TOAST STATE ---
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" as "success" | "error" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchCustomers = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      const dataFetch = axios.get(`${API_URL}/customers`);

      try {
        setLoading(true);
        const [_, res] = await Promise.all([minLoadTime, dataFetch]);
        
        // Ensure string IDs
        const normalizedData = res.data.map((item: any) => ({
          ...item,
          id: String(item.id)
        }));
        
        setCustomers(normalizedData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        showToast("Failed to connect to server", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // --- 2. CRUD ACTIONS ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    
    // Auto-generate avatar
    const finalAvatar = editingCustomer && formData.avatar ? formData.avatar : `https://ui-avatars.com/api/?name=${formData.name.replace(" ", "+")}&background=random`;
    const dataToSave = { ...formData, avatar: finalAvatar };

    if (editingCustomer) {
      // UPDATE (PATCH)
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? dataToSave : c)); 
      showToast("Customer updated");
      try { 
        await axios.patch(`${API_URL}/customers/${editingCustomer.id}`, dataToSave); 
      } catch (e) { 
        showToast("Failed to update in DB", "error");
      }
    } else {
      // CREATE (POST)
      const newCustomer = { ...dataToSave, id: Date.now().toString() }; 
      setCustomers(prev => [newCustomer, ...prev]); 
      showToast("Customer added successfully");
      try { 
        await axios.post(`${API_URL}/customers`, newCustomer); 
      } catch (e) { 
        showToast("Failed to save to DB", "error");
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleteModalOpen(false);
    
    // Optimistic UI
    setCustomers(prev => prev.filter(c => c.id !== deleteId)); 
    showToast("Customer removed permanently", "error");
    
    try { 
      await axios.delete(`${API_URL}/customers/${deleteId}`); 
    } catch (e) { 
      showToast("Failed to delete from DB", "error");
    }
  };

  // --- HELPERS ---
  const handleOpenAdd = () => { setEditingCustomer(null); setFormData(initialFormState); setIsModalOpen(true); };
  const handleOpenEdit = (customer: Customer) => { setEditingCustomer(customer); setFormData(customer); setIsModalOpen(true); };
  const confirmDelete = (id: string) => { setDeleteId(id); setIsDeleteModalOpen(true); };
  
  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/91${cleanPhone}`, '_blank');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  // Dynamic Stats
  const totalCredit = customers.reduce((sum, customer) => sum + customer.credit, 0);

  // --- RENDER ---
  return (
    <div className="space-y-6">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Customers</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your customer relationships and track credits.</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Customers</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{loading ? "-" : customers.length}</p>
          </div>
          <div className="px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs text-red-500 uppercase font-bold tracking-wider">Total Credit</p>
            <p className="text-2xl font-extrabold text-red-600 mt-1">₹{loading ? "-" : totalCredit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
         <CustomerSkeleton />
      ) : (
         <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            {/* Toast Notification */}
            <div className={`absolute top-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
              <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'}`}>
                {toast.type === 'success' ? <CheckBadgeIcon className="h-5 w-5" /> : <ExclamationTriangleIcon className="h-5 w-5" />}
                <span className="font-medium text-sm">{toast.msg}</span>
              </div>
            </div>

            <CustomerHeader search={search} setSearch={setSearch} onAdd={handleOpenAdd} />
            
            <CustomerList customers={filteredCustomers} onEdit={handleOpenEdit} onDelete={confirmDelete} openWhatsApp={openWhatsApp} />
         </div>
      )}

      {/* Modals */}
      <CustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingCustomer={editingCustomer} formData={formData} setFormData={setFormData} handleSave={handleSave} />
      <DeleteCustomerModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />

    </div>
  );
}