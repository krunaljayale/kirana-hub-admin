import { Runner } from "./delivery"; // Reusing your existing runner type

export interface ChartData {
  name: string;
  sales: number;
}

export interface DashboardStats {
  totalSales: number;
  totalProducts: number;
  activeCustomers: number;
  todaysOrders: number;
  todaysRevenue: number;
  completedOrders: number;
  successRate: string;
  onlineUsers: number;
  returningUsers: string;
}

export interface DashboardProps {
  stats: DashboardStats;
}