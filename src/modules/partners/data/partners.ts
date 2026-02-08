import type { Partner } from "@/core/domain/partner";
import data from "./partners.json";
import { publicAsset } from "@/lib/assets";

function normalizePartner(p: any): any {
  // Si tu JSON tiene "logo" o "image" o algo parecido
  if (p?.logo) p.logo = publicAsset(p.logo);
  if (p?.image) p.image = publicAsset(p.image);
  if (Array.isArray(p?.images)) p.images = p.images.map(publicAsset);
  return p;
}

export const partners: Partner[] = (data as any[]).map(normalizePartner) as Partner[];
export default partners;
