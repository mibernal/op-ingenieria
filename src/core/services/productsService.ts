import data from '@/modules/catalog/data/products_normalized.json'
import type { Product } from '@/core/domain/product'

export const productsService = {
  async list(): Promise<Product[]> {
    return data as Product[]
  },

  async findById(id: string): Promise<Product | null> {
    const items = data as Product[]
    return items.find(p => p.id === id) || null
  }
}
