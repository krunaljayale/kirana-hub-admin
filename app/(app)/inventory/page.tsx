import ProductTable from "@/components/inventory/ProductTable";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your products and stock levels.</p>
        </div>
      </div>
      <ProductTable />
    </div>
  );
}