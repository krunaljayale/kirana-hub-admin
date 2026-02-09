"use client";

import { useState } from "react";
import { 
  MagnifyingGlassIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

// --- Types ---
interface Customer {
  id: number;
  name: string;
  phone: string;
  orders: number;
  spent: number;
  credit: number;
  lastVisit: string;
  avatar: string;
}

// --- Initial Data ---
const initialCustomers: Customer[] = [
  { id: 1, name: "Rahul Sharma", phone: "9876543210", orders: 12, spent: 4500, credit: 1200, lastVisit: "2 days ago", avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=random" },
  { id: 2, name: "Priya Singh", phone: "9876512345", orders: 8, spent: 2100, credit: 0, lastVisit: "Today", avatar: "https://ui-avatars.com/api/?name=Priya+Singh&background=random" },
  { id: 3, name: "Amit Verma", phone: "9988777665", orders: 25, spent: 15400, credit: 500, lastVisit: "Yesterday", avatar: "https://ui-avatars.com/api/?name=Amit+Verma&background=random" },
  { id: 4, name: "Sneha Patil", phone: "8877665544", orders: 5, spent: 1200, credit: 0, lastVisit: "1 week ago", avatar: "https://ui-avatars.com/api/?name=Sneha+Patil&background=random" },
];

export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");

  // --- Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // --- Form State ---
  const [formData, setFormData] = useState<Customer>({
    id: 0, name: "", phone: "", orders: 0, spent: 0, credit: 0, lastVisit: "Today", avatar: ""
  });

  // --- Toast State ---
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  // --- ACTIONS ---
  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({ id: 0, name: "", phone: "", orders: 0, spent: 0, credit: 0, lastVisit: "Just now", avatar: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAvatar = editingCustomer ? formData.avatar : `https://ui-avatars.com/api/?name=${formData.name.replace(" ", "+")}&background=random`;
    
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...formData, avatar: finalAvatar } : c));
      showToast("Customer details updated!");
    } else {
      const newCustomer = { ...formData, id: Date.now(), avatar: finalAvatar };
      setCustomers([newCustomer, ...customers]);
      showToast("New customer added successfully!");
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      setCustomers(customers.filter(c => c.id !== deleteId));
      setIsDeleteModalOpen(false);
      showToast("Customer removed permanently", "error");
    }
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/91${cleanPhone}`, '_blank');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* --- TOAST --- */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${
          toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'
        }`}>
          {toast.type === 'success' ? <CheckBadgeIcon className="h-5 w-5" /> : <ExclamationTriangleIcon className="h-5 w-5" />}
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingCustomer ? "Edit Customer" : "Add New Customer"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
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
                      <input type="number" value={formData.credit} onChange={(e) => setFormData({...formData, credit: Number(e.target.value)})} className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 outline-none transition-all ${formData.credit > 0 ? "border-red-200 dark:border-red-900 focus:border-red-500 focus:ring-red-500/20 text-red-600 font-bold" : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"}`} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Spent</label>
                    <div className="relative">
                       <CurrencyRupeeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                       <input type="number" value={formData.spent} onChange={(e) => setFormData({...formData, spent: Number(e.target.value)})} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors">Cancel</button>
              <button form="customerForm" type="submit" className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02]">{editingCustomer ? "Save Changes" : "Add Customer"}</button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRM MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 scale-100 animate-in zoom-in-95 duration-200">
              <div className="h-14 w-14 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mb-6 mx-auto">
                <TrashIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Remove Customer?</h3>
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">Are you sure? This will delete their order history and credit records permanently.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all">Delete</button>
              </div>
           </div>
        </div>
      )}

      {/* --- TOOLBAR --- */}
      <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900">
        <div className="relative w-full sm:w-80 group">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
          />
        </div>
        
        <button 
          onClick={handleOpenAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <UserPlusIcon className="h-5 w-5" />
          Add Customer
        </button>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50">
        
        {/* === MOBILE CARD VIEW === */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-3">
                      <img src={customer.avatar} alt={customer.name} className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{customer.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                           <ClockIcon className="h-3 w-3" />
                           <span>Last visit: {customer.lastVisit}</span>
                        </div>
                      </div>
                   </div>
                   {customer.credit > 0 ? (
                      <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 text-[10px] font-bold uppercase tracking-wide">
                        Due: ₹{customer.credit}
                      </span>
                   ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                        Paid
                      </span>
                   )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 py-2">
                   <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-mono mt-0.5">{customer.phone}</p>
                   </div>
                   <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Spent</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">₹{customer.spent.toLocaleString()}</p>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                   <button 
                     onClick={() => openWhatsApp(customer.phone)}
                     className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40 transition-colors"
                   >
                     <ChatBubbleLeftRightIcon className="h-5 w-5" />
                     Chat
                   </button>
                   <button 
                     onClick={() => window.location.href = `tel:${customer.phone}`}
                     className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/40 transition-colors"
                   >
                     <PhoneIcon className="h-5 w-5" />
                     Call
                   </button>
                   <button 
                     onClick={() => handleOpenEdit(customer)}
                     className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                   >
                     <PencilSquareIcon className="h-5 w-5" />
                   </button>
                   <button 
                     onClick={() => confirmDelete(customer.id)}
                     className="p-2.5 rounded-xl border border-slate-200 text-red-500 hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                   >
                     <TrashIcon className="h-5 w-5" />
                   </button>
                </div>

              </div>
            ))
          ) : (
             <div className="p-10 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No customers found</p>
             </div>
          )}
        </div>

        {/* === DESKTOP TABLE VIEW === */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm">
              <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 pl-6">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Credit (Udhaar)</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <img src={customer.avatar} alt={customer.name} className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover bg-slate-100" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{customer.name}</div>
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Last visit: {customer.lastVisit}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300 font-mono">
                      {customer.phone}
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        <ShoppingBagIcon className="h-3.5 w-3.5" />
                        {customer.orders}
                      </span>
                    </td>

                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      ₹{customer.spent.toLocaleString()}
                    </td>

                    <td className="p-4">
                      {customer.credit > 0 ? (
                        <span className="px-3 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 text-xs font-bold uppercase tracking-wide">
                          Due: ₹{customer.credit}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-400 text-xs font-bold uppercase tracking-wide">
                          Paid
                        </span>
                      )}
                    </td>

                    {/* ACTIONS - ALWAYS VISIBLE NOW */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openWhatsApp(customer.phone)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all" title="Chat">
                          <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => window.location.href = `tel:${customer.phone}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all" title="Call">
                          <PhoneIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleOpenEdit(customer)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all" title="Edit">
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => confirmDelete(customer.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all" title="Delete">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-12 text-center text-slate-400">No customers found</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}