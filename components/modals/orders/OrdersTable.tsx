"use client";

import { useState, useMemo, useEffect } from "react";
import axios from "axios"; 
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Order } from "@/types/order";

// --- Sub-Components ---
import HistoryToolbar from "./history/HistoryToolbar";
import HistoryList from "./history/HistoryList";
import DeleteRecordModal from "./history/DeleteRecordModal";

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

  const filteredOrders = useMemo(() => {
    return localOrders.filter((order) => {
      const matchesSearch = String(order.id).toLowerCase().includes(search.toLowerCase()) || order.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      // Strict History Filter
      const isHistoryItem = ['Delivered', 'Cancelled', 'Refunded'].includes(order.status);
      return matchesSearch && matchesStatus && isHistoryItem;
    });
  }, [localOrders, search, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setLocalOrders(localOrders.filter(o => o.id !== deleteTarget)); // Optimistic UI
    setShowDeleteModal(false);

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders/${deleteTarget}`);
      showToast("Order permanently deleted", "success");
    } catch (error) {
      console.warn("Mock server simulation:", error);
      // We don't revert UI here to keep it smooth for Mock Server
    }
  };

  const handleExport = () => {
    const headers = ["ID", "Customer", "Amount", "Status", "Payment", "Date", "Reason", "Removed Items"];
    const rows = filteredOrders.map(o => [
        o.id, o.customer, o.total, o.status, o.payment, o.timeAgo, o.rejectionReason || "",
        o.removedItems?.map(i => `${i.name} (${i.reason})`).join("; ") || ""
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exporting data to CSV...", "success");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-red-500 text-white'}`}>
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* 1. Header Toolbar */}
      <HistoryToolbar 
        search={search} 
        setSearch={setSearch} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
        onExport={handleExport} 
      />

      {/* 2. Main List View */}
      <HistoryList 
        orders={filteredOrders} 
        onDelete={(id) => { setDeleteTarget(id); setShowDeleteModal(true); }}
        onView={() => showToast("View Details")}
      />

      {/* 3. Delete Modal */}
      <DeleteRecordModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        onDelete={handleDelete} 
      />

    </div>
  );
}