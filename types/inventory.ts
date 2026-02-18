export interface Product {
  id: string; // ✅ Strict String
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  images: string[];
}

export const CATEGORIES = ["Dairy", "Snacks", "Oil & Ghee", "Spices", "Beverages", "Flour", "General"];