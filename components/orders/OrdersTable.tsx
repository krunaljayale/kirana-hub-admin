"use client";

import { useState, useMemo } from "react";
import { 
  EyeIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

const initialData = [
  { id: "ORD-7845", customer: "Rajesh Kumar", amount: 1245, status: "Delivered", date: "2023-10-25", method: "UPI" },
  { id: "ORD-7844", customer: "Priya Singh", amount: 856, status: "Cancelled", date: "2023-10-25", method: "COD" },
  { id: "ORD-7843", customer: "Amit Patel", amount: 2340, status: "Delivered", date: "2023-10-25", method: "UPI" },
  { id: "ORD-7842", customer: "Neha Sharma", amount: 1890, status: "Pending", date: "2023-10-24", method: "UPI" },
  { id: "ORD-7841", customer: "Vikram Reddy", amount: 3120, status: "Refunded", date: "2023-10-24", method: "Online" },
  { id: "ORD-7840", customer: "Anita Desai", amount: 2780, status: "Delivered", date: "2023-10-24", method: "COD" },
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

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(search.toLowerCase()) || 
        order.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const confirmDelete = (id: string) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setOrders(orders.filter(o => o.id !== deleteTarget));
      setShowDeleteModal(false);
      showToast("Order record deleted successfully", "error");
    }
  };

  const handleMarkDelivered = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: "Delivered" } : o));
    showToast(`Order ${id} marked as Delivered`);
  };

  const handleExport = () => {
    showToast("Exporting data to CSV...", "success");
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20';
      case 'Cancelled': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20';
      case 'Refunded': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border ${
          toast.type === 'success' 
            ? 'bg-slate-900 text-white border-slate-800 dark:bg-white dark:text-slate-900' 
            : 'bg-red-500 text-white border-red-600'
        }`}>
          {toast.type === 'success' ? <CheckBadgeIcon className="h-5 w-5" /> : <ExclamationTriangleIcon className="h-5 w-5" />}
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 scale-100 animate-in zoom-in-95 duration-200">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mb-4 mx-auto">
              <TrashIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 dark:text-white mb-2">Delete Order?</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-6">
              This action cannot be undone. Are you sure?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/30 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-5 flex flex-col xl:flex-row gap-4 justify-between items-center border-b border-slate-100 dark:border-slate-800/50">
        <div className="relative w-full xl:w-80 group">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:flex-none">
            <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none appearance-none cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-semibold">
              <th className="p-4 pl-6 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{order.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                        {order.customer.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{order.customer}</div>
                        <div className="text-xs text-slate-400">{order.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => showToast(`Opening Invoice for ${order.id}`)}
                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>

                      {order.status !== 'Delivered' ? (
                        <button 
                          onClick={() => handleMarkDelivered(order.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
                          title="Mark Delivered"
                        >
                          <CheckBadgeIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <div className="h-9 w-9"></div> 
                      )}

                      <button 
                        onClick={() => confirmDelete(order.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
                        title="Delete Record"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <MagnifyingGlassIcon className="h-8 w-8 opacity-20" />
                    <p>No orders found matching "{search}"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}