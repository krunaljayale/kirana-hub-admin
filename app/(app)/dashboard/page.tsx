"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";
import TopStats from "@/components/modals/dashboard/TopStats";
import LiveActivity from "@/components/modals/dashboard/LiveActivity";
import DeliveryWidget from "@/components/modals/dashboard/DeliveryWidget";
import SalesChart from "@/components/modals/dashboard/charts/SalesChart";
import { DashboardStats, ChartData } from "@/types/dashboard";
import { Runner } from "@/types/delivery";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [runners, setRunners] = useState<Runner[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      
      try {
        setLoading(true);
        // Fetch all required collections
        const [_, ordersRes, productsRes, customersRes, runnersRes] = await Promise.all([
          minLoadTime,
          axios.get(`${API_URL}/orders`),
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/customers`),
          axios.get(`${API_URL}/runners`)
        ]);

        const orders = ordersRes.data;
        
        // --- Calculate Dynamic Stats ---
        const totalSales = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
        const todaysOrdersList = orders.filter((o: any) => o.status === "Pending" || o.status === "Preparing" || o.status === "Ready");
        const todaysRevenue = todaysOrdersList.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
        const completedCount = orders.filter((o: any) => o.status === "Delivered").length;
        
        setStats({
          totalSales,
          totalProducts: productsRes.data.length,
          activeCustomers: customersRes.data.length,
          todaysOrders: todaysOrdersList.length,
          todaysRevenue,
          completedOrders: completedCount,
          successRate: orders.length ? `${Math.round((completedCount / orders.length) * 100)}%` : "0%",
          onlineUsers: Math.floor(Math.random() * 50) + 10, // Mocked live data
          returningUsers: "13.3k" // Mocked historic metric
        });

        // --- Generate Chart Data ---
        // Simulating a week of data based on the real total
        const base = totalSales / 7 || 3000;
        setChartData([
          { name: 'Mon', sales: Math.round(base * 0.8) },
          { name: 'Tue', sales: Math.round(base * 1.2) },
          { name: 'Wed', sales: Math.round(base * 0.9) },
          { name: 'Thu', sales: Math.round(base * 1.1) },
          { name: 'Fri', sales: Math.round(base * 1.5) },
          { name: 'Sat', sales: Math.round(base * 1.8) },
          { name: 'Sun', sales: Math.round(base * 1.3) },
        ]);

        setRunners(runnersRes.data);

      } catch (error) {
        console.error("Failed to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !stats) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, Admin 👋
          </p>
        </div>
      </div>

      {/* 2. Top Stats */}
      <TopStats stats={stats} />

      {/* 3. Live Activity */}
      <LiveActivity stats={stats} />

      {/* 4. Bottom Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Chart Area */}
        <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Sales Statistics</h3>
            <select className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg px-3 py-1.5 outline-none cursor-pointer">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="flex-1">
             <SalesChart data={chartData} />
          </div>
        </div>

        {/* Delivery Partners Widget */}
        <DeliveryWidget runners={runners} />
      </div>
    </div>
  );
}