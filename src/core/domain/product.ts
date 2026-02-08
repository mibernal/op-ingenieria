// core/domain/product.ts
export interface Product {
  id: string
  title: string
  description?: string
  image?: string
  categories?: string[]
  // Campos extendidos para compatibilidad con el catálogo
  sku?: string
  slug?: string
  categoryId?: string
  subcategory?: string
  images?: string[]
  price?: string
  specs?: Array<{ label: string; value: string }>
  longDescription?: string
}