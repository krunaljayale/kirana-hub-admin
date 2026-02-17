"use client";

import { useState, useMemo, useEffect } from "react";
import axios from "axios"; 
import { 
  EyeIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  XCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

// --- Types ---
interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

// ✅ NEW: Interface for removed items
interface RemovedItem extends OrderItem {
  reason: string;
}

interface Order {
  id: string | number;
  customer: string;
  location: string;
  timeAgo: string;
  status: string;
  payment: "COD" | "UPI";
  total: number;
  items: OrderItem[];
  removedItems?: RemovedItem[]; 
  rejectionReason?: string;
}

interface OrdersTableProps {
  orders?: Order[]; 
}

export default function OrdersTable({ orders = [] }: OrdersTableProps) {
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | number | null>(null);
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error', show: boolean }>({ msg: '', type: 'success', show: false });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  // ✅ LOGIC: Export to CSV
  const handleExport = () => {
    const headers = ["ID", "Customer", "Amount", "Status", "Payment", "Date", "Reason", "Removed Items"];
    const rows = filteredOrders.map(o => [
        o.id, 
        o.customer, 
        o.total, 
        o.status, 
        o.payment, 
        o.timeAgo, 
        o.rejectionReason || "",
        o.removedItems?.map(i => `${i.name} (${i.reason})`).join("; ") || ""
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exporting data to CSV...", "success");
  };

  const filteredOrders = useMemo(() => {
    return localOrders.filter((order) => {
      const matchesSearch = 
        String(order.id).toLowerCase().includes(search.toLowerCase()) || 
        order.customer.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      
      // Strict History Filter
      const isHistoryItem = ['Delivered', 'Cancelled', 'Refunded'].includes(order.status);

      return matchesSearch && matchesStatus && isHistoryItem;
    });
  }, [localOrders, search, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const previousOrders = [...localOrders];
    setLocalOrders(localOrders.filter(o => o.id !== deleteTarget));
    setShowDeleteModal(false);

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders/${deleteTarget}`);
      showToast("Order permanently deleted", "success");
    } catch (error) {
      setLocalOrders(previousOrders); 
      showToast("Failed to delete order", "error");
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      
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
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Record?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">This will remove the order from history permanently.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TOOLBAR --- */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search history..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-all"
            />
          </div>
          <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all active:scale-95">
            <ArrowDownTrayIcon className="h-4 w-4" /> <span>Export CSV</span>
          </button>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
           {['All', 'Delivered', 'Cancelled'].map((status) => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)} 
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
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
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
        
        {/* 📱 MOBILE VIEW (Fixed & Complete) */}
        <div className="md:hidden grid grid-cols-1 gap-3 p-3 pb-20">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-3">
                   <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order ID</span>
                      <p className="font-bold text-slate-900 dark:text-white">#{order.id}</p>
                   </div>
                   <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(order.status)}`}>
                      {order.status}
                   </span>
                </div>

                {/* Card Body */}
                <div className="flex items-center gap-3 mb-4 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl">
                   <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">{order.customer.charAt(0)}</div>
                   <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{order.customer}</p>
                      <p className="text-[10px] text-slate-400">{order.timeAgo}</p>
                   </div>
                   <div className="ml-auto">
                      <p className="text-sm font-black text-slate-900 dark:text-white">₹{order.total}</p>
                   </div>
                </div>

                {/* 🔴 Removed Items Section (Only shows if exists) */}
                {order.removedItems && order.removedItems.length > 0 && (
                   <div className="mb-4 px-3 py-2 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-100 dark:border-red-500/20">
                      <p className="text-[10px] text-red-600 dark:text-red-400 font-bold mb-1">Removed Items:</p>
                      <div className="space-y-1">
                        {order.removedItems.map((item, idx) => (
                           <div key={idx} className="flex justify-between items-start text-[10px]">
                              <span className="text-red-700 dark:text-red-300 font-medium">{item.qty}x {item.name}</span>
                              <span className="text-red-500 italic text-right">- {item.reason}</span>
                           </div>
                        ))}
                      </div>
                   </div>
                )}

                {/* ⚠ Cancellation Reason (If whole order cancelled) */}
                {order.rejectionReason && !order.removedItems && (
                   <div className="mb-4 px-3 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                      <p className="text-[10px] text-slate-500 font-bold">Note:</p>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400">{order.rejectionReason}</p>
                   </div>
                )}

                {/* Card Actions */}
                <div className="grid grid-cols-3 gap-2">
                   <button onClick={() => showToast("View Details")} className="flex flex-col items-center justify-center py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
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
             <div className="p-10 text-center flex flex-col items-center text-slate-400">
                <XCircleIcon className="h-10 w-10 mb-2 opacity-20" />
                <p>No matching orders found.</p>
             </div>
          )}
        </div>

        {/* 💻 DESKTOP VIEW (Complete) */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm">
              <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items Summary</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-700 dark:text-slate-200">#{order.id}</td>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                      {order.customer}
                      <div className="text-[10px] text-slate-400">{order.location}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-500 max-w-xs">
                      <div className="truncate">{order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>
                      {/* Show Removed Items Desktop */}
                      {order.removedItems && order.removedItems.length > 0 && (
                        <div className="text-[10px] text-red-500 font-medium mt-1 truncate" title={order.removedItems.map(i => `${i.name} (${i.reason})`).join(', ')}>
                          Removed: {order.removedItems.length} items
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">₹{order.total}</td>
                    <td className="p-4 text-center"><span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(order.status)}`}>{order.status}</span></td>
                    <td className="p-4 flex justify-center gap-2">
                      <button onClick={() => showToast("View Details")} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"><EyeIcon className="h-5 w-5" /></button>
                      <button onClick={() => { setDeleteTarget(order.id); setShowDeleteModal(true); }} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><TrashIcon className="h-5 w-5" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={6} className="p-10 text-center text-slate-500">
                      No matching orders found.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}