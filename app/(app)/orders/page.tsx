"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

// --- Imports from Modals ---
import { Order, OrderStatus } from "@/types/order";
import OrdersSkeleton from "@/components/Skeletons/OrdersSkeleton"; 
import OrdersTable from "@/components/modals/orders/OrdersTable";
import OrderHeader from "@/components/modals/orders/OrderHeader";
import OrderFilters from "@/components/modals/orders/OrderFilters";
import OrderCard from "@/components/modals/orders/OrderCard";
import RejectModal from "@/components/modals/orders/RejectModal";

const QUICK_REASONS = ["Out of Stock", "Damaged Item", "Expired", "Price Mismatch"];

export default function OrdersPage() {
  // --- STATE ---
  const [viewMode, setViewMode] = useState<"kanban" | "history">("kanban");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("Pending");
  const [liveOrders, setLiveOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // --- MODAL STATE ---
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(""); 
  const [targetType, setTargetType] = useState<"ORDER" | "ITEM" | null>(null);
  const [targetOrderId, setTargetOrderId] = useState<string | number | null>(null);
  const [targetItemIndex, setTargetItemIndex] = useState<number | null>(null);

  // --- HELPERS ---
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        setLiveOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        showToast("Failed to load orders", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // --- ACTIONS ---
  const updateStatus = async (id: string | number, newStatus: OrderStatus) => {
      setLiveOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      
      if (newStatus === 'Preparing') showToast(`Order #${id} Accepted!`);
      if (newStatus === 'Ready') showToast(`Order #${id} Marked Ready!`);
      if (newStatus === 'Delivered') showToast(`Order #${id} Completed!`);

      try {
        // ✅ FIXED: Changed .put() to .patch() to prevent data loss
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { status: newStatus });
      } catch (error) { console.warn("Mock server update simulation:", error); }
  };

  const openRejectOrderModal = (id: string | number) => {
    setTargetType("ORDER");
    setTargetOrderId(id);
    setRejectionReason("");
    setIsRejectModalOpen(true);
  };

  const openRejectItemModal = (orderId: string | number, itemIndex: number) => {
    setTargetType("ITEM");
    setTargetOrderId(orderId);
    setTargetItemIndex(itemIndex);
    setRejectionReason("");
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!targetOrderId) return;
    if (!rejectionReason.trim()) return;

    if (targetType === "ORDER") {
       setLiveOrders(prev => prev.map(o => o.id === targetOrderId ? { ...o, status: 'Cancelled', rejectionReason: rejectionReason } : o));
       showToast(`Order #${targetOrderId} Rejected`, "error");
       
       try {
         // ✅ FIXED: Changed .put() to .patch() here as well
         await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${targetOrderId}`, { status: 'Cancelled', reason: rejectionReason });
       } catch (error) { console.warn("Mock simulation error"); }
    }

    if (targetType === "ITEM" && targetItemIndex !== null) {
       const orderIndex = liveOrders.findIndex(o => o.id === targetOrderId);
       if (orderIndex === -1) return;

       const updatedOrders = [...liveOrders];
       const order = { ...updatedOrders[orderIndex] };
       
       const itemToRemove = order.items[targetItemIndex];
       const deductionAmount = itemToRemove.price;

       if (!order.removedItems) order.removedItems = [];
       order.removedItems.push({ ...itemToRemove, reason: rejectionReason });

       order.items = order.items.filter((_, idx) => idx !== targetItemIndex);
       order.total = order.total - deductionAmount;

       if (order.items.length === 0) {
          order.status = 'Cancelled';
          order.rejectionReason = "All items rejected";
          showToast(`Order #${targetOrderId} Cancelled (Empty)`, "error");
       } else {
          showToast("Item removed from order", "success");
       }

       updatedOrders[orderIndex] = order;
       setLiveOrders(updatedOrders);

       try { 
         // ✅ Note: For removing items, we still use .put() OR .patch() with the full modified object
         // Since we modified the whole 'order' object locally above, .put() or .patch() with the whole object is fine.
         // But .patch() is safer generally.
         await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${targetOrderId}`, order); 
       } 
       catch (error) { console.warn("Mock simulation error"); }
    }

    setIsRejectModalOpen(false);
    setTargetType(null);
    setTargetOrderId(null);
    setTargetItemIndex(null);
  };

  const filteredOrders = liveOrders.filter(o => o.status === statusFilter);

  if (loading) return <OrdersSkeleton />;

  return (
    <div className="space-y-6 pb-20 relative">
      
      {/* Toast */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'}`}>
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      {/* Header Module */}
      <OrderHeader viewMode={viewMode} setViewMode={setViewMode} />

      {/* Live Board View */}
      {viewMode === "kanban" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Filters Module */}
          <OrderFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} orders={liveOrders} />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onUpdateStatus={updateStatus} 
                onRejectOrder={openRejectOrderModal} 
                onRejectItem={openRejectItemModal} 
              />
            )) : <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500"><p>No orders in {statusFilter}.</p></div>}
          </div>
        </div>
      )}

      {/* History View */}
      {viewMode === "history" && (<div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><OrdersTable orders={liveOrders} /></div>)}

      {/* Modal Module */}
      <RejectModal 
        isOpen={isRejectModalOpen} 
        onClose={() => setIsRejectModalOpen(false)} 
        onConfirm={handleConfirmReject}
        targetType={targetType}
        targetOrderId={targetOrderId}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        quickReasons={QUICK_REASONS}
      />
    </div>
  );
}