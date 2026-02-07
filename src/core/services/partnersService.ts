import type { Partner } from "../domain/partner";
import { partners } from "@/modules/partners/data/partners";

export const getPartners = (): Partner[] => partners;

export const getFeaturedPartners = (): Partner[] =>
  partners.filter(p => p.featured);
