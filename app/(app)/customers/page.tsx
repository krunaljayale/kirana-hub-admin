import CustomerTable from "@/components/customers/CustomerTable";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Customers</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Manage your customer relationships and track credits (Udhaar).
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Customers</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">142</p>
          </div>
          <div className="px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs text-red-500 uppercase font-bold tracking-wider">Total Credit Given</p>
            <p className="text-2xl font-extrabold text-red-600 mt-1">₹18,450</p>
          </div>
        </div>
      </div>

      <CustomerTable />
      
    </div>
  );
}