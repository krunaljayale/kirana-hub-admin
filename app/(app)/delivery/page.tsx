"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { ListBulletIcon, MapIcon, CheckCircleIcon, SignalSlashIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// --- Components ---
import { Runner, Delivery } from "@/types/delivery";
import DeliverySkeleton from "@/components/Skeletons/DeliverySkeleton";
import TeamStatus from "@/components/modals/delivery/TeamStatus";
import DeliveryList from "@/components/modals/delivery/DeliveryList";
import RunnerModal from "@/components/modals/delivery/RunnerModal";
import DeleteRunnerModal from "@/components/modals/delivery/DeleteRunnerModal";

const TrackingMap = dynamic(() => import("@/components/modals/delivery/TrackingMap"), { ssr: false, loading: () => <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"></div> });

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function DeliveryPage() {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [historicalRunners, setHistoricalRunners] = useState<Runner[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<"Active" | "History">("Active");
  const [viewMode, setViewMode] = useState<"List" | "Map">("List");
  const [isMapApiReady, setIsMapApiReady] = useState(true); 
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" as "success" | "error" });

  // Modal States
  const [isRunnerModalOpen, setIsRunnerModalOpen] = useState(false);
  const [editingRunnerId, setEditingRunnerId] = useState<string | null>(null);
  const initialRunnerForm = { name: "", phone: "", email: "", photo: "", drivingLicense: "" };
  const [runnerFormData, setRunnerFormData] = useState(initialRunnerForm);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingLicense, setIsUploadingLicense] = useState(false);

  const [isDeleteRunnerModalOpen, setIsDeleteRunnerModalOpen] = useState(false);
  const [runnerToDelete, setRunnerToDelete] = useState<Runner | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      try {
        setLoading(true);
        const [_, runnersRes, deliveriesRes, historyRes] = await Promise.all([
          minLoadTime,
          axios.get(`${API_URL}/runners`),
          axios.get(`${API_URL}/deliveries`),
          axios.get(`${API_URL}/historicalRunners`).catch(() => ({ data: [] })) 
        ]);
        setRunners(runnersRes.data.map((r: any) => ({ ...r, id: String(r.id) })));
        setDeliveries(deliveriesRes.data.map((d: any) => ({ ...d, id: String(d.id), runnerId: String(d.runnerId) })));
        setHistoricalRunners(historyRes.data.map((r: any) => ({ ...r, id: String(r.id) })));
      } catch (err) { showToast("Failed to connect to server", "error"); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  // --- Cloudinary Uploads ---
  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET!);
    const res = await axios.post(CLOUDINARY_URL, data);
    return res.data.secure_url;
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingPhoto(true);
      try {
        const url = await uploadToCloudinary(e.target.files[0]);
        setRunnerFormData(prev => ({ ...prev, photo: url }));
        showToast("Photo attached!", "success");
      } catch (err) { showToast("Upload failed", "error"); } finally { setIsUploadingPhoto(false); }
    }
  };

  const handleLicenseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploadingLicense(true);
      try {
        const url = await uploadToCloudinary(e.target.files[0]);
        setRunnerFormData(prev => ({ ...prev, drivingLicense: url }));
        showToast("License attached!", "success");
      } catch (err) { showToast("Upload failed", "error"); } finally { setIsUploadingLicense(false); }
    }
  };

  // --- ACTIONS ---
  const handleMarkDelivered = async (deliveryId: string, runnerId: string) => {
    setDeliveries(prev => prev.map(d => d.id === deliveryId ? { ...d, status: "Delivered" } : d));
    setRunners(prev => prev.map(r => r.id === runnerId ? { ...r, status: "Available", currentOrder: null } : r));
    showToast("Delivery completed successfully!");
    try {
      await Promise.all([
        axios.patch(`${API_URL}/deliveries/${deliveryId}`, { status: "Delivered" }),
        axios.patch(`${API_URL}/runners/${runnerId}`, { status: "Available", currentOrder: null })
      ]);
    } catch (e) { showToast("Sync failed", "error"); }
  };

  const handleSaveRunner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRunnerModalOpen(false);

    const finalAvatar = runnerFormData.photo || `https://ui-avatars.com/api/?name=${runnerFormData.name.replace(" ", "+")}&background=random`;
    
    if (editingRunnerId) {
       // UPDATE EXISTING
       const updatedData = { ...runnerFormData, avatar: finalAvatar };
       setRunners(prev => prev.map(r => r.id === editingRunnerId ? { ...r, ...updatedData } : r));
       showToast("Partner updated successfully!");
       try { await axios.patch(`${API_URL}/runners/${editingRunnerId}`, updatedData); } 
       catch (e) { showToast("Database sync failed", "error"); }
    } else {
       // CREATE NEW (Status = Offline)
       const newRunner: Runner = {
         id: Date.now().toString(),
         ...runnerFormData,
         status: "Offline", // ✅ Default to Offline
         isBlocked: false,
         avatar: finalAvatar,
         lat: 18.5204 + (Math.random() * 0.02 - 0.01), 
         lng: 73.8567 + (Math.random() * 0.02 - 0.01),
       };
       setRunners(prev => [newRunner, ...prev]);
       showToast(`${newRunner.name} added (Status: Offline)`);
       try { await axios.post(`${API_URL}/runners`, newRunner); } 
       catch (error) { showToast("Database sync failed", "error"); }
    }
  };

  const openAddRunner = () => {
    setEditingRunnerId(null);
    setRunnerFormData(initialRunnerForm);
    setIsRunnerModalOpen(true);
  };

  const openEditRunner = (runner: Runner) => {
    setEditingRunnerId(runner.id);
    setRunnerFormData({ name: runner.name, phone: runner.phone, email: runner.email || "", photo: runner.avatar.includes("ui-avatars") ? "" : runner.avatar, drivingLicense: runner.drivingLicense });
    setIsRunnerModalOpen(true);
  };

  // Block/Unblock
  const toggleBlockRunner = async (id: string, currentlyBlocked: boolean) => {
    const runner = runners.find(r => r.id === id);
    if (runner?.status === 'Busy' && !currentlyBlocked) {
      return showToast("Cannot block a runner who is out on delivery!", "error");
    }

    const newBlockedState = !currentlyBlocked;
    // ✅ If blocking, force status to Offline. If unblocking, keep as Offline until they 'clock in'.
    const newStatus = newBlockedState ? "Offline" : "Offline"; 

    setRunners(prev => prev.map(r => r.id === id ? { ...r, isBlocked: newBlockedState, status: newStatus } : r));
    showToast(newBlockedState ? "Runner Blocked" : "Runner Unblocked");

    try { await axios.patch(`${API_URL}/runners/${id}`, { isBlocked: newBlockedState, status: newStatus }); } 
    catch (e) { showToast("Sync failed", "error"); }
  };

  // Archive / Delete
  const promptDeleteRunner = (id: string) => {
    const runner = runners.find(r => r.id === id);
    if (runner?.status === 'Busy') return showToast("Cannot remove a runner who is on a delivery!", "error");
    setRunnerToDelete(runner || null);
    setIsDeleteRunnerModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!runnerToDelete) return;
    setIsDeleteRunnerModalOpen(false);

    // ✅ Set to offline when archiving
    const archivedRunner = { ...runnerToDelete, status: "Offline" as RunnerStatus };

    setRunners(prev => prev.filter(r => r.id !== runnerToDelete.id));
    setHistoricalRunners(prev => [archivedRunner, ...prev]);
    showToast(`${runnerToDelete.name} moved to history.`, "success");

    try {
      await axios.post(`${API_URL}/historicalRunners`, archivedRunner);
      await axios.delete(`${API_URL}/runners/${runnerToDelete.id}`);
    } catch (e) { showToast("Sync failed", "error"); }
  };

  // Restore Runner
  const handleRestoreRunner = async (id: string) => {
    const runner = historicalRunners.find(r => r.id === id);
    if (!runner) return;

    // ✅ Restore as Offline and Unblocked
    const restoredRunner = { ...runner, status: "Offline" as RunnerStatus, isBlocked: false };

    setHistoricalRunners(prev => prev.filter(r => r.id !== id));
    setRunners(prev => [restoredRunner, ...prev]);
    showToast(`${runner.name} restored to active team.`);

    try {
      await axios.post(`${API_URL}/runners`, restoredRunner);
      await axios.delete(`${API_URL}/historicalRunners/${id}`);
    } catch (e) { showToast("Sync failed", "error"); }
  };

  const activeDeliveries = deliveries.filter(d => d.status === "Out for Delivery");
  const pastDeliveries = deliveries.filter(d => d.status === "Delivered");
  const activeRunnersCount = runners.filter(r => r.status === "Busy" || r.status === "Available").length; // Exclude offline/blocked from active count

  return (
    <div className="space-y-6 pb-20 relative">
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent' : 'bg-red-500 text-white border-red-600'}`}>
          {toast.type === 'success' ? <CheckBadgeIcon className="h-5 w-5" /> : <ExclamationTriangleIcon className="h-5 w-5" />}
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Delivery</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Track runners and manage active shipments.</p>
        </div>
        <div className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm flex items-center gap-3">
           <div className={`h-2 w-2 rounded-full ${activeRunnersCount > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
           <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{loading ? "-" : activeRunnersCount} Runners Online</span>
        </div>
      </div>

      {loading ? (
         <DeliverySkeleton />
      ) : (
        <div className="space-y-8">
          
          <TeamStatus 
            runners={runners} 
            historicalRunners={historicalRunners} 
            onAddRunner={openAddRunner} 
            onEditRunner={openEditRunner}
            onDeleteRunner={promptDeleteRunner} 
            onToggleBlock={toggleBlockRunner}
            onRestoreRunner={handleRestoreRunner}
          />
          
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-1">
              <div className="flex items-center gap-6">
                <button onClick={() => setActiveTab("Active")} className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "Active" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}>
                  Live Deliveries {activeTab === "Active" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>}
                </button>
                <button onClick={() => setActiveTab("History")} className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "History" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}>
                  Completed {activeTab === "History" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>}
                </button>
              </div>

              {activeTab === "Active" && (
                <div className="flex gap-2 items-center">
                  {viewMode === "Map" && (
                    <button onClick={() => setIsMapApiReady(!isMapApiReady)} className={`p-1.5 rounded-md border ${isMapApiReady ? 'text-emerald-500 border-emerald-200' : 'text-red-500 border-red-200'}`}>
                      {isMapApiReady ? <CheckCircleIcon className="h-4 w-4" /> : <SignalSlashIcon className="h-4 w-4" />}
                    </button>
                  )}
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button onClick={() => setViewMode("List")} className={`flex gap-2 px-3 py-1.5 rounded-md text-xs font-bold ${viewMode === "List" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                      <ListBulletIcon className="h-4 w-4" /> List
                    </button>
                    <button onClick={() => setViewMode("Map")} className={`flex gap-2 px-3 py-1.5 rounded-md text-xs font-bold ${viewMode === "Map" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                      <MapIcon className="h-4 w-4" /> Map
                    </button>
                  </div>
                </div>
              )}
            </div>

            {activeTab === "Active" && viewMode === "Map" && <TrackingMap runners={runners.filter(r => !r.isBlocked && r.status !== 'Offline')} isLoaded={isMapApiReady} />}
            {(activeTab === "History" || (activeTab === "Active" && viewMode === "List")) && (
               <DeliveryList deliveries={activeTab === "Active" ? activeDeliveries : pastDeliveries} runners={runners} activeTab={activeTab} markDelivered={handleMarkDelivered} />
            )}
          </section>
        </div>
      )}

      <RunnerModal 
        isOpen={isRunnerModalOpen} 
        onClose={() => setIsRunnerModalOpen(false)} 
        formData={runnerFormData} 
        setFormData={setRunnerFormData} 
        handleSave={handleSaveRunner} 
        handlePhotoUpload={handlePhotoUpload}
        handleLicenseUpload={handleLicenseUpload}
        isUploadingPhoto={isUploadingPhoto}
        isUploadingLicense={isUploadingLicense}
        isEditMode={!!editingRunnerId}
      />

      <DeleteRunnerModal 
        isOpen={isDeleteRunnerModalOpen} 
        onClose={() => setIsDeleteRunnerModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
        runnerName={runnerToDelete?.name}
      />
      
    </div>
  );
}