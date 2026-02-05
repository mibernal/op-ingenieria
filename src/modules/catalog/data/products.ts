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

export const products: Product[] = productsData.map((p) => ({
  ...p,
  categoryId: p.category, // normalizamos
}));

export const categories: Category[] = categoriesData.map((c) => ({
  ...c,
  icon: undefined as unknown as LucideIcon, // TODO: Map icons based on category
}));
