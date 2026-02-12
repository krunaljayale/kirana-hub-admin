"use client";

import { useState } from "react";
import OrdersTable from "@/components/orders/OrdersTable";
import { 
  Squares2X2Icon, 
  ListBulletIcon,
  ClockIcon,
  FireIcon,
  CheckCircleIcon,
  MapPinIcon,
  XCircleIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

// --- Types ---
type OrderStatus = "Pending" | "Preparing" | "Ready";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  location: string;
  timeAgo: string;
  status: OrderStatus;
  payment: "COD" | "UPI";
  total: number;
  items: OrderItem[];
}

// --- Mock Data ---
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Rahul Sharma",
    location: "1.2 km • Civil Lines",
    timeAgo: "2 min ago",
    status: "Pending",
    payment: "COD",
    total: 160,
    items: [
      { name: "Amul Milk 500ml", qty: 2, price: 30 },
      { name: "Modern Bread", qty: 1, price: 40 },
      { name: "Eggs (6pcs)", qty: 1, price: 60 },
    ]
  },
  {
    id: "ORD-004",
    customer: "Sneha Patil",
    location: "3.5 km • Market Yard",
    timeAgo: "5 min ago",
    status: "Pending",
    payment: "UPI",
    total: 480,
    items: [
      { name: "Maggi 6-Pack", qty: 2, price: 90 },
      { name: "Kissan Ketchup", qty: 1, price: 140 },
      { name: "Britannia Marie Gold", qty: 4, price: 40 },
    ]
  },
  {
    id: "ORD-005",
    customer: "Vikram Malhotra",
    location: "0.8 km • Station Road",
    timeAgo: "8 min ago",
    status: "Pending",
    payment: "COD",
    total: 2450,
    items: [
      { name: "Aashirvaad Atta 10kg", qty: 1, price: 450 },
      { name: "Daawat Rice 5kg", qty: 1, price: 800 },
      { name: "Fortune Oil 5L", qty: 1, price: 850 },
      { name: "Tata Salt 1kg", qty: 2, price: 25 },
      { name: "Toor Dal 1kg", qty: 2, price: 150 },
    ]
  },
  {
    id: "ORD-002",
    customer: "Priya Singh",
    location: "2.1 km • Gandhi Nagar",
    timeAgo: "15 min ago",
    status: "Preparing",
    payment: "UPI",
    total: 1250,
    items: [
      { name: "Fortune Oil 5L", qty: 1, price: 850 },
      { name: "Basmati Rice 1kg", qty: 2, price: 200 },
    ]
  },
  {
    id: "ORD-003",
    customer: "Amit Verma",
    location: "Takeaway",
    timeAgo: "45 min ago",
    status: "Ready",
    payment: "UPI",
    total: 270,
    items: [
      { name: "Coke 2.25L", qty: 1, price: 90 },
      { name: "Lays Chips", qty: 3, price: 20 },
      { name: "Dairy Milk", qty: 1, price: 60 },
    ]
  }
];

export default function OrdersPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "history">("kanban");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("Pending");
  const [liveOrders, setLiveOrders] = useState(mockOrders);

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setLiveOrders(liveOrders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = liveOrders.filter(o => o.status === statusFilter);

  const getTabStyle = (tab: OrderStatus) => {
    if (statusFilter === tab) {
      if (tab === 'Pending') return 'bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500 border-orange-200 dark:border-orange-500/50';
      if (tab === 'Preparing') return 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500 border-blue-200 dark:border-blue-500/50';
      if (tab === 'Ready') return 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/50';
    }
    return 'text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800';
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Order Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage kitchen orders.</p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-auto">
          <button 
            onClick={() => setViewMode("kanban")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              viewMode === "kanban" 
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            <Squares2X2Icon className="h-4 w-4" />
            Live Board
          </button>
          <button 
            onClick={() => setViewMode("history")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              viewMode === "history" 
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            <ListBulletIcon className="h-4 w-4" />
            History
          </button>
        </div>
      </div>

      {/* --- LIVE BOARD VIEW --- */}
      {viewMode === "kanban" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* --- STATUS BAR (Light/Dark Responsive) --- */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="grid grid-cols-3 gap-1 md:flex md:gap-2">
              <button 
                onClick={() => setStatusFilter("Pending")}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${getTabStyle("Pending")}`}
              >
                <ClockIcon className="h-4 w-4 md:h-5 md:w-5" />
                Pending
                {liveOrders.filter(o => o.status === 'Pending').length > 0 && (
                   <span className="md:ml-1 h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                )}
              </button>

              <button 
                onClick={() => setStatusFilter("Preparing")}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${getTabStyle("Preparing")}`}
              >
                <FireIcon className="h-4 w-4 md:h-5 md:w-5" />
                Preparing
              </button>

              <button 
                onClick={() => setStatusFilter("Ready")}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 px-2 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${getTabStyle("Ready")}`}
              >
                <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5" />
                Ready
              </button>
            </div>
          </div>

          {/* --- CARDS GRID (Light/Dark Responsive) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 relative flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
                  
                  {/* Top: Order # & Time */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                       <span className="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center font-bold text-sm">
                          {order.id.split('-')[1]}
                       </span>
                       <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-base">Order #{order.id}</h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                             <ClockIcon className="h-3 w-3" />
                             {order.timeAgo}
                          </div>
                       </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                      order.payment === 'COD' 
                        ? 'border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-500/10' 
                        : 'border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                    }`}>
                       {order.payment}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-5 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-800">
                     <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm">
                        {order.customer.charAt(0)}
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{order.customer}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                           <MapPinIcon className="h-3 w-3" />
                           {order.location}
                        </div>
                     </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 mb-5 flex-1 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                     {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                           <div className="flex items-center gap-3">
                              <span className="h-5 w-5 rounded flex items-center justify-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold border border-slate-200 dark:border-slate-700">
                                 {item.qty}
                              </span>
                              <span className="text-slate-700 dark:text-slate-300 text-xs font-medium">{item.name}</span>
                           </div>
                           <span className="text-slate-900 dark:text-white font-bold text-xs">₹{item.price}</span>
                        </div>
                     ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-4">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Amount</span>
                       <span className="text-2xl font-black text-slate-900 dark:text-white">₹{order.total}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                       <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                          <XCircleIcon className="h-5 w-5" />
                          Reject
                       </button>
                       {order.status === 'Pending' && (
                          <button 
                             onClick={() => updateStatus(order.id, 'Preparing')} 
                             className="flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                          >
                             <CheckBadgeIcon className="h-5 w-5" />
                             Accept
                          </button>
                       )}
                       {order.status === 'Preparing' && (
                          <button 
                             onClick={() => updateStatus(order.id, 'Ready')} 
                             className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                          >
                             <FireIcon className="h-5 w-5" />
                             Ready
                          </button>
                       )}
                       {order.status === 'Ready' && (
                          <button 
                             className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
                          >
                             <CheckCircleIcon className="h-5 w-5" />
                             Done
                          </button>
                       )}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500">
                 <p>No orders in {statusFilter}.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- HISTORY VIEW --- */}
      {viewMode === "history" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <OrdersTable />
        </div>
      )}

    </div>
  );
}