"use client";

import { useState } from "react";
import OrderCard from "@/components/orders/OrderCard";
import OrdersTable from "@/components/orders/OrdersTable"; // Import the new table
import { ArchiveBoxIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

// ... Keep your 'mockOrders' array here ...
const mockOrders = [
  // --- PENDING ORDERS ---
  {
    id: "ORD-001",
    customer: "Rahul Sharma",
    timeAgo: "2 min ago",
    status: "pending",
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
    timeAgo: "5 min ago",
    status: "pending",
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
    timeAgo: "8 min ago",
    status: "pending",
    payment: "COD",
    total: 2450,
    items: [
      { name: "Aashirvaad Atta 10kg", qty: 1, price: 450 },
      { name: "Daawat Basmati Rice 5kg", qty: 1, price: 800 },
      { name: "Fortune Oil 5L", qty: 1, price: 850 },
      { name: "Tata Salt 1kg", qty: 2, price: 25 },
      { name: "Toor Dal 1kg", qty: 2, price: 150 },
    ]
  },
  {
    id: "ORD-006",
    customer: "Anjali Das",
    timeAgo: "12 min ago",
    status: "pending",
    payment: "UPI",
    total: 85,
    items: [
      { name: "Coriander Bunch", qty: 1, price: 20 },
      { name: "Green Chilli 100g", qty: 1, price: 15 },
      { name: "Ginger 100g", qty: 1, price: 20 },
      { name: "Curry Leaves", qty: 1, price: 10 },
      { name: "Lemon (3pcs)", qty: 1, price: 20 },
    ]
  },

  // --- PREPARING ORDERS ---
  {
    id: "ORD-002",
    customer: "Priya Singh",
    timeAgo: "15 min ago",
    status: "preparing",
    payment: "UPI",
    total: 1250,
    items: [
      { name: "Fortune Oil 5L", qty: 1, price: 850 },
      { name: "Basmati Rice 1kg", qty: 2, price: 200 },
    ]
  },
  {
    id: "ORD-007",
    customer: "Rohan Gupta",
    timeAgo: "22 min ago",
    status: "preparing",
    payment: "COD",
    total: 340,
    items: [
      { name: "Dettol Handwash", qty: 2, price: 90 },
      { name: "Vim Bar 3-Pack", qty: 1, price: 60 },
      { name: "Surf Excel 1kg", qty: 1, price: 100 },
    ]
  },
  {
    id: "ORD-008",
    customer: "Meera Reddy",
    timeAgo: "30 min ago",
    status: "preparing",
    payment: "UPI",
    total: 560,
    items: [
      { name: "Amul Butter 500g", qty: 1, price: 260 },
      { name: "Paneer 200g", qty: 2, price: 90 },
      { name: "Amul Cheese Slices", qty: 1, price: 120 },
    ]
  },

  // --- READY ORDERS ---
  {
    id: "ORD-003",
    customer: "Amit Verma",
    timeAgo: "45 min ago",
    status: "ready",
    payment: "UPI",
    total: 270,
    items: [
      { name: "Coke 2.25L", qty: 1, price: 90 },
      { name: "Lays Classic Salt", qty: 3, price: 20 },
      { name: "Kurkure Masala Munch", qty: 3, price: 20 },
      { name: "Dairy Milk Silk", qty: 1, price: 60 },
    ]
  },
  {
    id: "ORD-009",
    customer: "Kavita Joshi",
    timeAgo: "55 min ago",
    status: "ready",
    payment: "COD",
    total: 1100,
    items: [
      { name: "Red Label Tea 1kg", qty: 1, price: 450 },
      { name: "Nescafe Coffee 200g", qty: 1, price: 550 },
      { name: "Sugar 1kg", qty: 2, price: 50 },
    ]
  },
  {
    id: "ORD-010",
    customer: "Arjun Nair",
    timeAgo: "1 hour ago",
    status: "ready",
    payment: "UPI",
    total: 180,
    items: [
      { name: "Good Day Cashew", qty: 4, price: 30 },
      { name: "Oreo Packet", qty: 2, price: 30 },
    ]
  },

  // --- COMPLETED ORDERS ---
  {
    id: "ORD-011",
    customer: "Suresh Raina",
    timeAgo: "2 hours ago",
    status: "completed",
    payment: "UPI",
    total: 2100,
    items: [
      { name: "Pampers Diapers L", qty: 1, price: 1200 },
      { name: "Johnson Baby Powder", qty: 1, price: 400 },
      { name: "Baby Wipes", qty: 2, price: 250 },
    ]
  },
  {
    id: "ORD-012",
    customer: "Pooja Hegde",
    timeAgo: "3 hours ago",
    status: "completed",
    payment: "COD",
    total: 450,
    items: [
      { name: "Colgate MaxFresh", qty: 2, price: 110 },
      { name: "Dove Shampoo 350ml", qty: 1, price: 230 },
    ]
  },
  {
    id: "ORD-013",
    customer: "Deepak Chopra",
    timeAgo: "Yesterday",
    status: "completed",
    payment: "UPI",
    total: 890,
    items: [
      { name: "Kellogg's Cornflakes", qty: 1, price: 340 },
      { name: "Dabur Honey 500g", qty: 1, price: 200 },
      { name: "Quaker Oats 1kg", qty: 1, price: 180 },
      { name: "Almonds 100g", qty: 1, price: 170 },
    ]
  },
  {
    id: "ORD-014",
    customer: "Neha Kakkar",
    timeAgo: "Yesterday",
    status: "completed",
    payment: "UPI",
    total: 150,
    items: [
      { name: "Onion 1kg", qty: 1, price: 40 },
      { name: "Potato 1kg", qty: 1, price: 30 },
      { name: "Tomato 1kg", qty: 1, price: 50 },
      { name: "Green Peas 250g", qty: 1, price: 30 },
    ]
  },
  {
    id: "ORD-015",
    customer: "Virat Kohli",
    timeAgo: "Yesterday",
    status: "completed",
    payment: "COD",
    total: 3200,
    items: [
      { name: "Whey Protein Sachet", qty: 10, price: 150 },
      { name: "Peanut Butter 1kg", qty: 1, price: 500 },
      { name: "Multigrain Bread", qty: 2, price: 60 },
      { name: "Broccoli", qty: 2, price: 80 },
      { name: "Avocado", qty: 2, price: 150 },
      { name: "Eggs (30 Tray)", qty: 2, price: 180 },
    ]
  }
] as any[];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");

  // "History" is the magic tab that switches views
  const tabs = ["All", "Pending", "Preparing", "Ready", "History"];

  const filteredOrders = activeTab === "All" || activeTab === "History"
    ? mockOrders 
    : mockOrders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Orders Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {activeTab === 'History' ? 'View past transaction records.' : 'Real-time feed of incoming customer requests.'}
          </p>
        </div>
        
        {activeTab !== 'History' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full font-bold text-sm">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
             {mockOrders.length} Active Orders
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl inline-flex w-full sm:w-auto overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === tab 
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm scale-100" 
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            {/* Add Icons for better UX */}
            <span className="flex items-center gap-2">
              {tab === 'History' && <ArchiveBoxIcon className="h-4 w-4" />}
              {tab === 'All' && <Squares2X2Icon className="h-4 w-4" />}
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* --- CONDITIONAL RENDERING --- */}
      {activeTab === 'History' ? (
        // SHOW TABLE
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <OrdersTable />
        </div>
      ) : (
        // SHOW GRID
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
             <div className="col-span-full py-20 text-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
               <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No active orders</h3>
               <p className="text-slate-500">You are all caught up!</p>
             </div>
          )}
        </div>
      )}

    </div>
  );
}