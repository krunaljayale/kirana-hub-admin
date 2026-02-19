import { PhoneIcon, ChatBubbleLeftRightIcon, PencilSquareIcon, TrashIcon, ClockIcon, ShoppingBagIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Customer } from "@/types/customer";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  openWhatsApp: (phone: string) => void;
}

export default function CustomerList({ customers, onEdit, onDelete, openWhatsApp }: CustomerListProps) {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto">
      {/* === MOBILE CARD VIEW === */}
      <div className="md:hidden grid grid-cols-1 gap-4 p-4">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div key={customer.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                 <div className="flex items-center gap-3">
                    <img src={customer.avatar} alt={customer.name} className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{customer.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                         <ClockIcon className="h-3 w-3" />
                         <span>Last visit: {customer.lastVisit}</span>
                      </div>
                    </div>
                 </div>
                 {customer.credit > 0 ? (
                    <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 text-[10px] font-bold uppercase tracking-wide">
                      Due: ₹{customer.credit}
                    </span>
                 ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                      Paid
                    </span>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-3 py-2">
                 <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-mono mt-0.5">{customer.phone}</p>
                 </div>
                 <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Spent</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">₹{customer.spent.toLocaleString()}</p>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button onClick={() => openWhatsApp(customer.phone)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40 transition-colors">
                   <ChatBubbleLeftRightIcon className="h-5 w-5" /> Chat
                 </button>
                 <button onClick={() => window.location.href = `tel:${customer.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/40 transition-colors">
                   <PhoneIcon className="h-5 w-5" /> Call
                 </button>
                 <button onClick={() => onEdit(customer)} className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                   <PencilSquareIcon className="h-5 w-5" />
                 </button>
                 <button onClick={() => onDelete(customer.id)} className="p-2.5 rounded-xl border border-slate-200 text-red-500 hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">
                   <TrashIcon className="h-5 w-5" />
                 </button>
              </div>
            </div>
          ))
        ) : (
           <div className="p-10 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No customers found</p>
           </div>
        )}
      </div>

      {/* === DESKTOP TABLE VIEW === */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm">
            <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 pl-6">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Credit (Udhaar)</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      <img src={customer.avatar} alt={customer.name} className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover bg-slate-100" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{customer.name}</div>
                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Last visit: {customer.lastVisit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300 font-mono">{customer.phone}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      <ShoppingBagIcon className="h-3.5 w-3.5" />
                      {customer.orders}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">₹{customer.spent.toLocaleString()}</td>
                  <td className="p-4">
                    {customer.credit > 0 ? (
                      <span className="px-3 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 text-xs font-bold uppercase tracking-wide">
                        Due: ₹{customer.credit}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-400 text-xs font-bold uppercase tracking-wide">
                        Paid
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openWhatsApp(customer.phone)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all" title="Chat">
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => window.location.href = `tel:${customer.phone}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all" title="Call">
                        <PhoneIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => onEdit(customer)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all" title="Edit">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => onDelete(customer.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all" title="Delete">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="p-12 text-center text-slate-400">No customers found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}