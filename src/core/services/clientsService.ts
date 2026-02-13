// src/core/services/clientsService.ts
import type { Client } from "@/core/domain/client";
import {
  clients,
  getClients,
  getFeaturedClients,
  getClientsByCategory,
} from "@/modules/clients/data/clients";

export const clientsService = {
  // Canon
  list(): Client[] {
    return clients;
  },

  // Alias compat
  getClients(): Client[] {
    return getClients();
  },

  featured(): Client[] {
    return getFeaturedClients();
  },

  byCategory(category: string): Client[] {
    return getClientsByCategory(category);
  },
} as const;
