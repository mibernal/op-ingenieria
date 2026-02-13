// src/modules/partners/data/partners.ts
import type { Partner } from "@/core/domain/partner";
import data from "./partners.json";
import { publicAsset } from "@/lib/assets";

type PartnerJson = Record<string, unknown>;

const normalizePartner = (p: PartnerJson): Partner => {
  const logo = typeof p.logo === "string" ? publicAsset(p.logo) : undefined;
  const image = typeof p.image === "string" ? publicAsset(p.image) : undefined;
  const images = Array.isArray(p.images)
    ? (p.images.filter((x): x is string => typeof x === "string").map(publicAsset) as string[])
    : undefined;

  return {
    ...(p as any),
    ...(logo ? { logo } : {}),
    ...(image ? { image } : {}),
    ...(images ? { images } : {}),
  } as Partner;
};

const raw = Array.isArray(data) ? (data as PartnerJson[]) : [];

export const partners: Partner[] = raw.map(normalizePartner);
export default partners;
