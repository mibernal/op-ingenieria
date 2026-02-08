import productsData from "../data/products_normalized.json";
import categoriesData from "../data/categories.json";
import * as LucideIcons from "lucide-react";

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
  icon: keyof typeof LucideIcons;
  subcategories: string[];
};

type RawCategory = {
  id: string;
  name: string;
  subcategories: string[];
  count: number;
};

// Iconos definidos por arquitectura frontend
const categoryIcons: Record<string, keyof typeof LucideIcons> = {
  baterias: "Battery",
  medidores: "Gauge",
  energia: "Zap",
  potencia: "Power",
  sensores: "CircleDot",
};

export const products: Product[] = productsData.map((p) => ({
  ...p,
  categoryId: p.category || "uncategorized",
  images: Array.isArray(p.images) ? p.images : [],
  specs: Array.isArray(p.specs) ? p.specs : [],
}));

const rawCategories = categoriesData as RawCategory[];

export const categories: Category[] = rawCategories.map((c) => ({
  id: c.id,
  name: c.name,
  subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
  icon: categoryIcons[c.id] ?? "LayoutGrid",
}));
