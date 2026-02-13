// src/core/services/partnersService.ts
import type { Partner } from "@/core/domain/partner";
import { partners } from "@/modules/partners/data/partners";

export const partnersService = {
  // Canon
  list(): Partner[] {
    return partners;
  },

  // Alias compat
  getPartners(): Partner[] {
    return partners;
  },
} as const;
