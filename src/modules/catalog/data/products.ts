import productsData from "../data/products_normalized.json";
import categoriesData from "../data/categories.json";
import * as LucideIcons from "lucide-react";
import type { Product as CoreProduct } from "@/core/domain/product";
import { publicAssets } from "@/lib/assets";

export type Spec = { label: string; value: string };

// Extender el tipo del core con campos específicos del catálogo
export type Product = CoreProduct & {
  slug: string;
  categoryId: string;
  images: string[];
  specs: Spec[];
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
categories.forEach((cat) => {
  categoryNameToIdMap[cat.name] = cat.id;
});

// Procesar productos del JSON
export const products: Product[] = (productsData as any[]).map((item: any) => {
  const categoryName = item.category || "";
  const categoryId = categoryNameToIdMap[categoryName] || categoryName || "uncategorized";

  const imagesRaw = Array.isArray(item.images) ? item.images : [];
  const images = publicAssets(imagesRaw); // ✅ aquí se corrige para GH Pages

  return {
    ...item,
    categoryId,
    images,
    specs: Array.isArray(item.specs) ? item.specs : [],
    id: item.id || crypto.randomUUID?.() || String(Math.random()),
    slug: item.slug || item.id || crypto.randomUUID?.() || String(Math.random()),
    title: item.title || "Producto sin nombre",
    description: item.description || "",
  };
});
