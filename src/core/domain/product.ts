// src/core/domain/product.ts
export interface Product {
  id: string;
  title: string;
  description?: string;

  // Catálogo (front)
  slug?: string;
  categoryId?: string;
  subcategory?: string | null;
  images?: string[];
  longDescription?: string;
}
