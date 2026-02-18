export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface RemovedItem extends OrderItem {
  reason: string;
}

export interface Order {
  id: string ;
  customer: string;
  location: string;
  timeAgo: string;
  status: OrderStatus;
  payment: "COD" | "UPI";
  total: number;
  items: OrderItem[];
  removedItems?: RemovedItem[];
  rejectionReason?: string;
}