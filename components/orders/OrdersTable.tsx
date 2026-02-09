"use client";

import { useState, useMemo } from "react";
import { 
  EyeIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";

// --- Mock Data ---
const initialData = [
  { id: "ORD-7845", customer: "Rajesh Kumar", amount: 1245, status: "Delivered", date: "Oct 25, 2023", method: "UPI" },
  { id: "ORD-7844", customer: "Priya Singh", amount: 856, status: "Cancelled", date: "Oct 25, 2023", method: "COD" },
  { id: "ORD-7843", customer: "Amit Patel", amount: 2340, status: "Delivered", date: "Oct 25, 2023", method: "UPI" },
  { id: "ORD-7842", customer: "Neha Sharma", amount: 1890, status: "Pending", date: "Oct 24, 2023", method: "UPI" },
  { id: "ORD-7841", customer: "Vikram Reddy", amount: 3120, status: "Refunded", date: "Oct 24, 2023", method: "Online" },
  { id: "ORD-7840", customer: "Anita Desai", amount: 2780, status: "Delivered", date: "Oct 24, 2023", method: "COD" },
];

export default function OrdersTable() {
  const [orders, setOrders] = useState(initialData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error', show: boolean }>({ msg: '', type: 'success', show: false });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleExport = () => {
    showToast("Exporting data to CSV...", "success");
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(search.toLowerCase()) || 
        order.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const handleDelete = () => {
    if (deleteTarget) {
      setOrders(orders.filter(o => o.id !== deleteTarget));
      setShowDeleteModal(false);
      showToast("Deleted successfully", "error");
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20';
      case 'Cancelled': return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 border border-rose-200 dark:border-rose-500/20';
      case 'Refunded': return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* --- TOAST --- */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border ${
          toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-red-500 text-white'
        }`}>
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* --- DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Order?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TOOLBAR --- */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4">
        
        {/* Search & Export */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white"
            />
          </div>
          <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold">
            <ArrowDownTrayIcon className="h-4 w-4" /> <span>Export CSV</span>
          </button>
        </div>

        {/* Filters (Grid on Mobile) */}
        <div className="grid grid-cols-2 gap-2 md:flex">
           {['All', 'Delivered', 'Cancelled', 'Refunded'].map((status) => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)} 
                className={`px-3 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border text-center ${
                  statusFilter === status 
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' 
                    : 'text-slate-500 border-slate-200 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
           ))}
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50">
        
        {/* Mobile View */}
        <div className="md:hidden grid grid-cols-1 gap-3 p-3">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                   <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order ID</span>
                      <p className="font-bold text-slate-900 dark:text-white">{order.id}</p>
                   </div>
                   <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(order.status)}`}>
                      {order.status}
                   </span>
                </div>

                {/* Body */}
                <div className="flex items-center gap-3 mb-4 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl">
                   <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">{order.customer.charAt(0)}</div>
                   <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{order.customer}</p>
                      <p className="text-[10px] text-slate-400">{order.date}</p>
                   </div>
                   <div className="ml-auto">
                      <p className="text-sm font-black text-slate-900 dark:text-white">₹{order.amount}</p>
                   </div>
                </div>

                {/* Footer Buttons (Grid) */}
                <div className="grid grid-cols-3 gap-2">
                   <button onClick={() => showToast("View")} className="flex flex-col items-center justify-center py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                      <EyeIcon className="h-4 w-4 mb-0.5" /> <span className="text-[10px]">View</span>
                   </button>
                   <button className="flex flex-col items-center justify-center py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                      <CheckBadgeIcon className="h-4 w-4 mb-0.5" /> <span className="text-[10px]">Invoice</span>
                   </button>
                   <button onClick={() => { setDeleteTarget(order.id); setShowDeleteModal(true); }} className="flex flex-col items-center justify-center py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30">
                      <TrashIcon className="h-4 w-4 mb-0.5" /> <span className="text-[10px]">Delete</span>
                   </button>
                </div>
              </div>
            ))
          ) : (
             <div className="p-8 text-center text-slate-400">No orders found</div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm">
              <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-700 dark:text-slate-200">{order.id}</td>
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">{order.customer}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">₹{order.amount}</td>
                  <td className="p-4 text-center"><span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(order.status)}`}>{order.status}</span></td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => showToast("View")} className="p-2 text-slate-400 hover:text-indigo-500"><EyeIcon className="h-5 w-5" /></button>
                    <button onClick={() => { setDeleteTarget(order.id); setShowDeleteModal(true); }} className="p-2 text-slate-400 hover:text-red-500"><TrashIcon className="h-5 w-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}