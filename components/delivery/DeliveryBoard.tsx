"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic"; // Crucial for Maps
import { 
  TruckIcon, 
  MapPinIcon, 
  PhoneIcon, 
  CheckCircleIcon, 
  UserIcon,
  ShoppingBagIcon,
  MapIcon,
  ListBulletIcon,
  SignalSlashIcon
} from "@heroicons/react/24/outline";

// --- Dynamic Import for Map (Prevents "window is not defined" error) ---
const TrackingMap = dynamic(() => import("./TrackingMap"), { 
  ssr: false,
  loading: () => (
    // Loading State
    <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse flex items-center justify-center text-slate-400">
      Loading Map...
    </div>
  ) 
});

// --- Types ---
type RunnerStatus = "Available" | "Busy" | "Offline";

interface Runner {
  id: number;
  name: string;
  phone: string;
  status: RunnerStatus;
  currentOrder?: string;
  avatar: string;
  lat: number; 
  lng: number;
}

interface Delivery {
  id: string;
  customer: string;
  address: string;
  runnerId: number;
  total: number;
  timeOut: string;
  status: "Out for Delivery" | "Delivered";
}

// --- Mock Data ---
// Coordinates set around Pune/Mumbai for demo
const initialRunners: Runner[] = [
  { id: 1, name: "Raju Bhai", phone: "9876500001", status: "Busy", currentOrder: "ORD-005", avatar: "https://ui-avatars.com/api/?name=Raju+Bhai&background=random", lat: 18.5204, lng: 73.8567 },
  { id: 2, name: "Sonu Kumar", phone: "9876500002", status: "Available", avatar: "https://ui-avatars.com/api/?name=Sonu+Kumar&background=random", lat: 18.5304, lng: 73.8467 },
  { id: 3, name: "Amit Singh", phone: "9876500003", status: "Offline", avatar: "https://ui-avatars.com/api/?name=Amit+Singh&background=random", lat: 18.5104, lng: 73.8667 },
];

const initialDeliveries: Delivery[] = [
  { id: "ORD-005", customer: "Vikram Malhotra", address: "Flat 402, Sunshine Apts, Station Road", runnerId: 1, total: 2450, timeOut: "12 min ago", status: "Out for Delivery" },
  { id: "ORD-001", customer: "Rahul Sharma", address: "12, Civil Lines, Near Park", runnerId: 1, total: 160, timeOut: "35 min ago", status: "Delivered" },
];

export default function DeliveryBoard() {
  const [activeTab, setActiveTab] = useState<"Active" | "History">("Active");
  const [viewMode, setViewMode] = useState<"List" | "Map">("List");
  const [runners, setRunners] = useState(initialRunners);
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  
  // --- TOGGLE THIS TO TEST "MAP NOT LOADED" SCREEN ---
  const [isMapApiReady, setIsMapApiReady] = useState(true); 

  const activeDeliveries = deliveries.filter(d => d.status === "Out for Delivery");
  const pastDeliveries = deliveries.filter(d => d.status === "Delivered");

  const markDelivered = (id: string, runnerId: number) => {
    setDeliveries(deliveries.map(d => d.id === id ? { ...d, status: "Delivered" } : d));
    setRunners(runners.map(r => r.id === runnerId ? { ...r, status: "Available", currentOrder: undefined } : r));
  };

  const getStatusColor = (status: RunnerStatus) => {
    switch (status) {
      case "Available": return "bg-emerald-500";
      case "Busy": return "bg-orange-500";
      case "Offline": return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* --- TOP SECTION: TEAM STATUS --- */}
      <section>
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
             <UserIcon className="h-5 w-5 text-indigo-500" />
             Delivery Team
           </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {runners.map((runner) => (
            <div key={runner.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={runner.avatar} alt={runner.name} className="h-12 w-12 rounded-full border border-slate-100 dark:border-slate-700" />
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(runner.status)}`}></span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{runner.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{runner.phone}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                 <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                   runner.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                   runner.status === 'Busy' ? 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20' :
                   'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                 }`}>
                   {runner.status}
                 </span>
                 <button 
                   onClick={() => window.location.href = `tel:${runner.phone}`}
                   className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 transition-colors"
                 >
                   <PhoneIcon className="h-4 w-4" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BOTTOM SECTION: LIVE DELIVERIES & MAP --- */}
      <section>
        
        {/* Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-1">
          
          {/* Tabs */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab("Active")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "Active" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
              }`}
            >
              Live Deliveries
              {activeTab === "Active" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
            </button>
            <button 
              onClick={() => setActiveTab("History")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "History" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
              }`}
            >
              Completed
              {activeTab === "History" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
            </button>
          </div>

          {/* Map/List Toggle */}
          {activeTab === "Active" && (
            <div className="flex gap-2 items-center">
              {/* Dev Toggle: Simulate API Failure */}
              {viewMode === "Map" && (
                <button 
                  onClick={() => setIsMapApiReady(!isMapApiReady)}
                  title="Simulate API Connection"
                  className={`p-1.5 rounded-md text-xs font-bold border transition-all ${isMapApiReady ? 'text-emerald-500 border-emerald-200 bg-emerald-50' : 'text-red-500 border-red-200 bg-red-50'}`}
                >
                  {isMapApiReady ? <CheckCircleIcon className="h-4 w-4" /> : <SignalSlashIcon className="h-4 w-4" />}
                </button>
              )}

              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode("List")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    viewMode === "List" 
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                      : "text-slate-500"
                  }`}
                >
                  <ListBulletIcon className="h-4 w-4" /> List
                </button>
                <button 
                  onClick={() => setViewMode("Map")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    viewMode === "Map" 
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                      : "text-slate-500"
                  }`}
                >
                  <MapIcon className="h-4 w-4" /> Map
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- VIEW CONTENT --- */}
        
        {/* 1. MAP VIEW (With Full Setup Fallback) */}
        {activeTab === "Active" && viewMode === "Map" && (
           <TrackingMap runners={runners} isLoaded={isMapApiReady} />
        )}

        {/* 2. LIST VIEW (Cards) */}
        {(activeTab === "History" || (activeTab === "Active" && viewMode === "List")) && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {(activeTab === "Active" ? activeDeliveries : pastDeliveries).length > 0 ? (
              (activeTab === "Active" ? activeDeliveries : pastDeliveries).map((delivery) => {
                const runner = runners.find(r => r.id === delivery.runnerId);
                return (
                  <div key={delivery.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors group animate-in fade-in slide-in-from-bottom-2">
                    
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold font-mono">
                            {delivery.id}
                          </span>
                          {delivery.status === "Out for Delivery" && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg border border-orange-100 dark:border-orange-900/30">
                              <TruckIcon className="h-3 w-3" /> On the way
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mt-2 text-lg">{delivery.customer}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900 dark:text-white">₹{delivery.total}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{delivery.status === 'Out for Delivery' ? 'Cash to collect' : 'Paid'}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex gap-3 mb-4">
                      <MapPinIcon className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{delivery.address}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <img src={runner?.avatar} alt="runner" className="h-8 w-8 rounded-full bg-slate-200" />
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Runner</span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{runner?.name}</span>
                        </div>
                      </div>

                      {delivery.status === "Out for Delivery" ? (
                        <button 
                          onClick={() => markDelivered(delivery.id, delivery.runnerId)}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          Mark Done
                        </button>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-bold">
                          <CheckCircleIcon className="h-4 w-4" /> Delivered
                        </span>
                      )}
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBagIcon className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">No {activeTab.toLowerCase()} deliveries found.</p>
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
}