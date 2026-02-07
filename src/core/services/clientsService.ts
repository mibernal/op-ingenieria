// src/core/services/clientsService.ts
import { clients } from '@/modules/projects/data/clientsPartners'
import type { Client } from '@/core/domain/client'

export const clientsService = {
  async list(): Promise<Client[]> {
    return clients
  }
}