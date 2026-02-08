// modules/catalog/data/products.ts
import productsData from "../data/products_normalized.json";
import categoriesData from "../data/categories.json";
import * as LucideIcons from "lucide-react";
import type { Product as CoreProduct } from "@/core/domain/product";

export type Spec = { label: string; value: string };

// Extender el tipo del core con campos específicos del catálogo
export type Product = CoreProduct & {
  // Campos requeridos específicos del catálogo
  slug: string;
  categoryId: string;
  images: string[];
  specs: Spec[];
  // Hacer campos opcionales que podrían no estar en todos los productos
  sku?: string;
  subcategory?: string | null;
  price?: string;
  longDescription?: string;
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

const rawCategories = categoriesData as RawCategory[];

export const categories: Category[] = rawCategories.map((c) => ({
  id: c.id,
  name: c.name,
  subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
  icon: categoryIcons[c.id] ?? "LayoutGrid",
}));

// Crear un mapa de nombres de categoría a IDs para búsqueda más fácil
const categoryNameToIdMap: Record<string, string> = {};
categories.forEach(cat => {
  categoryNameToIdMap[cat.name] = cat.id;
});

// Procesar productos del JSON
export const products: Product[] = productsData.map((item: any) => {
  // Determinar categoryId basado en el campo 'category' del JSON
  const categoryName = item.category || "";
  const categoryId = categoryNameToIdMap[categoryName] || categoryName || "uncategorized";
  
  return {
    ...item,
    categoryId,
    images: Array.isArray(item.images) ? item.images : [],
    specs: Array.isArray(item.specs) ? item.specs : [],
    // Asegurar que los campos requeridos existan
    id: item.id || String(Math.random()),
    slug: item.slug || item.id || String(Math.random()),
    title: item.title || "Producto sin nombre",
    description: item.description || "",
  };
});