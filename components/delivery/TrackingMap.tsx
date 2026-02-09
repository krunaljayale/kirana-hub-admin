"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPinIcon } from "@heroicons/react/24/solid"; // Using Heroicons for placeholder

// --- Fix Leaflet Default Icon Issue in Next.js ---
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// --- Types ---
interface Runner {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
}

interface MapProps {
  runners: Runner[];
  isLoaded: boolean; // Simulating API load status
}

export default function TrackingMap({ runners, isLoaded }: MapProps) {
  // If map is NOT loaded (simulating no API key), show the Placeholder Image
  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center animate-in fade-in">
        <div className="flex flex-col items-center gap-4 opacity-50">
          {/* Custom Map Icon Placeholder */}
          <div className="relative">
             <MapPinIcon className="h-16 w-16 text-slate-400" />
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-300 rounded-full blur-sm"></div>
          </div>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Live Partner Tracking Map</p>
          <p className="text-xs text-slate-400 max-w-xs text-center">Map integration is pending API configuration. Please check back later.</p>
        </div>
      </div>
    );
  }

  // --- ACTUAL MAP INTEGRATION ---
  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative z-0">
      <MapContainer 
        center={[18.5204, 73.8567]} // Default: Pune, India (Change to your city)
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
      >
        {/* OPEN STREET MAP TILES (Free, No API Key needed for now) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Live Runner Markers */}
        {runners.map((runner) => (
          <Marker key={runner.id} position={[runner.lat, runner.lng]} icon={customIcon}>
            <Popup>
              <div className="p-1">
                <p className="font-bold text-sm">{runner.name}</p>
                <p className="text-xs text-slate-500 capitalize">{runner.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}