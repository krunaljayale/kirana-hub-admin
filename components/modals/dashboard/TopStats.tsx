import KpiCard from "./ui/KpiCard";
import { DashboardProps } from "@/types/dashboard";

export default function TopStats({ stats }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <KpiCard 
        title="Total Sales" 
        value={`₹${stats.totalSales.toLocaleString()}`} 
        subtext="+14% from last month" 
      />
      <KpiCard 
        title="Total Products" 
        value={stats.totalProducts.toString()} 
        subtext="In active inventory" 
      />
      <KpiCard 
        title="Active Customers" 
        value={stats.activeCustomers.toLocaleString()} 
        subtext="+22 new this week" 
      />
    </div>
  );
}