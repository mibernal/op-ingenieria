import productsData from "../data/products_normalized.json";
import categoriesData from "../data/categories.json";
import { LucideIcon } from "lucide-react";

export type Spec = { label: string; value: string };

export type Product = {
  id: string;
  sku?: string;
  title: string;
  slug: string;
  categoryId: string;
  subcategory?: string | null;
  description?: string;
  longDescription?: string;
  images: string[];
  price?: string;
  specs: Spec[];
};

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  subcategories: string[];
};

// Crear un mapa para convertir nombres de categoría a IDs
const categoryNameToId: Record<string, string> = {};
categoriesData.forEach(cat => {
  categoryNameToId[cat.name] = cat.id;
});

export const products: Product[] = productsData.map((p) => ({
  ...p,
  categoryId: categoryNameToId[p.category] || p.category, // Usar el mapa
}));

export const categories: Category[] = categoriesData.map((c) => ({
  ...c,
  icon: undefined as unknown as LucideIcon, // TODO: Map icons based on category
}));