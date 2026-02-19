export type RunnerStatus = "Available" | "Busy" | "Offline";

export interface Runner {
  id: string;
  name: string;
  phone: string;
  email?: string;
  drivingLicense: string;
  status: RunnerStatus;
  isBlocked?: boolean;        // ✅ New Block Flag
  currentOrder?: string | null;
  avatar: string;
  lat: number; 
  lng: number;
}

export interface Delivery {
  id: string;
  customer: string;
  address: string;
  runnerId: string;
  total: number;
  timeOut: string;
  status: "Out for Delivery" | "Delivered";
}